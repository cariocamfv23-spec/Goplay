import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

// 1. Pure JS PNG encoder
function crc32(buf) {
  let table = crc32.table
  if (!table) {
    table = new Uint32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let k = 0; k < 8; k++) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      }
      table[i] = c
    }
    crc32.table = table
  }
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function makePng(width, height, rgbaBuffer) {
  // Signature: 89 50 4E 47 0D 0A 1A 0A
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR chunk
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8 // bit depth: 8
  ihdrData[9] = 6 // color type: 6 (RGBA)
  ihdrData[10] = 0 // compression: 0
  ihdrData[11] = 0 // filter: 0
  ihdrData[12] = 0 // interlace: 0

  const ihdrChunk = createChunk('IHDR', ihdrData)

  // Scanlines with filter type 0 (None)
  const rowLen = width * 4
  const rawData = Buffer.alloc((1 + rowLen) * height)
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + rowLen)
    rawData[rowOffset] = 0 // Filter type 0
    rgbaBuffer.copy(rawData, rowOffset + 1, y * rowLen, (y + 1) * rowLen)
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 })
  const idatChunk = createChunk('IDAT', compressedData)
  const iendChunk = createChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk])
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const len = data.length
  const chunk = Buffer.alloc(4 + 4 + len + 4)
  chunk.writeUInt32BE(len, 0)
  typeBuf.copy(chunk, 4)
  data.copy(chunk, 8)
  const crc = crc32(Buffer.concat([typeBuf, data]))
  chunk.writeUInt32BE(crc, 8 + len)
  return chunk
}

// 2. Geometry & Math
function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  const d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
  const d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3)
  const d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1)
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0
  return !(hasNeg && hasPos)
}

function hexToRgb(hex) {
  const c = parseInt(hex.replace('#', ''), 16)
  return [(c >> 16) & 255, (c >> 8) & 255, c & 255]
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

// Rasterize official Goplay icon
function renderGoplayIcon(size) {
  const buf = Buffer.alloc(size * size * 4)
  const scale = size / 512

  // Gradient background #7C3AED (124, 58, 237) -> #4C1D95 (76, 29, 149)
  const bgStart = [124, 58, 237]
  const bgEnd = [76, 29, 149]

  // Play gold gradient:
  // stop 0: #FDE68A (253, 230, 138)
  // stop 0.5: #FBBF24 (251, 191, 36)
  // stop 1: #D97706 (217, 119, 6)

  // Triangle 1: Motion Effect
  // M140 180 L320 256 L140 332 Z
  const mX1 = 140,
    mY1 = 180
  const mX2 = 320,
    mY2 = 256
  const mX3 = 140,
    mY3 = 332

  // Triangle 2: Main Play Symbol
  // M180 140 L400 256 L180 372 Z
  const pX1 = 180,
    pY1 = 140
  const pX2 = 400,
    pY2 = 256
  const pX3 = 180,
    pY3 = 372

  // Drop shadow approximation for play (dx=0, dy=8, stdDev=12)
  // Shadow triangle: offset by dy=8
  const sX1 = 180,
    sY1 = 140 + 8
  const sX2 = 400,
    sY2 = 256 + 8
  const sX3 = 180,
    sY3 = 372 + 8

  // Pre-render super-sampled (2x2 subpixels for smooth anti-aliasing)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rAcc = 0,
        gAcc = 0,
        bAcc = 0,
        aAcc = 0

      for (let sy = 0; sy < 2; sy++) {
        for (let sx = 0; sx < 2; sx++) {
          const origX = (x + (sx + 0.5) / 2) / scale
          const origY = (y + (sy + 0.5) / 2) / scale

          // 1. Base gradient
          // Linear gradient x1=0 y1=0 x2=512 y2=512 -> t = (origX + origY) / 1024
          const tBg = Math.max(0, Math.min(1, (origX + origY) / 1024))
          let curR = lerp(bgStart[0], bgEnd[0], tBg)
          let curG = lerp(bgStart[1], bgEnd[1], tBg)
          let curB = lerp(bgStart[2], bgEnd[2], tBg)
          let curA = 1.0

          // 2. Motion triangle: white with opacity 0.2
          if (pointInTriangle(origX, origY, mX1, mY1, mX2, mY2, mX3, mY3)) {
            // Alpha blend white (255, 255, 255, 0.2)
            curR = curR * 0.8 + 255 * 0.2
            curG = curG * 0.8 + 255 * 0.2
            curB = curB * 0.8 + 255 * 0.2
          }

          // 3. Drop shadow around play symbol
          const isMainPlay = pointInTriangle(
            origX,
            origY,
            pX1,
            pY1,
            pX2,
            pY2,
            pX3,
            pY3,
          )
          if (!isMainPlay) {
            // Subtle blur shadow
            if (pointInTriangle(origX, origY, sX1, sY1, sX2, sY2, sX3, sY3)) {
              curR = curR * 0.65
              curG = curG * 0.65
              curB = curB * 0.65
            }
          }

          // 4. Main play symbol
          if (isMainPlay) {
            // Gold gradient: x1=150 y1=150 x2=400 y2=400
            // vector from (150, 150) to (400, 400) has len 250*sqrt(2)
            const dx = origX - 150
            const dy = origY - 150
            let tGold = (dx + dy) / 500
            tGold = Math.max(0, Math.min(1, tGold))

            let goldR, goldG, goldB
            if (tGold < 0.5) {
              const localT = tGold / 0.5
              goldR = lerp(253, 251, localT)
              goldG = lerp(230, 191, localT)
              goldB = lerp(138, 36, localT)
            } else {
              const localT = (tGold - 0.5) / 0.5
              goldR = lerp(251, 217, localT)
              goldG = lerp(191, 119, localT)
              goldB = lerp(36, 6, localT)
            }

            curR = goldR
            curG = goldG
            curB = goldB
          }

          rAcc += curR
          gAcc += curG
          bAcc += curB
          aAcc += curA
        }
      }

      const pixelIdx = (y * size + x) * 4
      buf[pixelIdx] = Math.round(rAcc / 4)
      buf[pixelIdx + 1] = Math.round(gAcc / 4)
      buf[pixelIdx + 2] = Math.round(bAcc / 4)
      buf[pixelIdx + 3] = Math.round((aAcc / 4) * 255)
    }
  }

  return makePng(size, size, buf)
}

// Monochromatic badge for Android notification tray (96x96, white play silhouette on transparent)
function renderBadgeIcon(size) {
  const buf = Buffer.alloc(size * size * 4)
  const scale = size / 512

  // Play triangle scaled nicely to badge: M160 120 L380 256 L160 392
  const pX1 = 160,
    pY1 = 120
  const pX2 = 380,
    pY2 = 256
  const pX3 = 160,
    pY3 = 392

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let aAcc = 0
      for (let sy = 0; sy < 2; sy++) {
        for (let sx = 0; sx < 2; sx++) {
          const origX = (x + (sx + 0.5) / 2) / scale
          const origY = (y + (sy + 0.5) / 2) / scale
          if (pointInTriangle(origX, origY, pX1, pY1, pX2, pY2, pX3, pY3)) {
            aAcc += 1.0
          }
        }
      }

      const pixelIdx = (y * size + x) * 4
      const alpha = aAcc / 4
      buf[pixelIdx] = 255 // White
      buf[pixelIdx + 1] = 255 // White
      buf[pixelIdx + 2] = 255 // White
      buf[pixelIdx + 3] = Math.round(alpha * 255)
    }
  }

  return makePng(size, size, buf)
}

// Make an ICO file from 16x16, 32x32 and 48x48 PNG buffers
function makeIco(images) {
  // ICONDIR header: 6 bytes
  // reserved (2) = 0, type (2) = 1 (ico), count (2) = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(images.length, 4)

  const dirEntries = []
  let offset = 6 + images.length * 16

  for (const img of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2) // color palette
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)])
}

export function generateAssets(publicDir) {
  console.log('Generating official PNG assets...')

  const icon192 = renderGoplayIcon(192)
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192)
  console.log('Created public/icon-192.png (192x192), size:', icon192.length)

  const icon512 = renderGoplayIcon(512)
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512)
  console.log('Created public/icon-512.png (512x512), size:', icon512.length)

  const badge96 = renderBadgeIcon(96)
  fs.writeFileSync(path.join(publicDir, 'notification-badge.png'), badge96)
  console.log(
    'Created public/notification-badge.png (96x96), size:',
    badge96.length,
  )

  const monochrome512 = renderBadgeIcon(512)
  fs.writeFileSync(path.join(publicDir, 'icon-monochrome.png'), monochrome512)
  console.log(
    'Created public/icon-monochrome.png (512x512), size:',
    monochrome512.length,
  )

  // Favicon PNG (48x48) and ICO (16, 32, 48)
  const fav48 = renderGoplayIcon(48)
  const fav32 = renderGoplayIcon(32)
  const fav16 = renderGoplayIcon(16)
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), fav48)
  console.log('Created public/favicon.png (48x48), size:', fav48.length)

  const icoBuf = makeIco([
    { width: 16, height: 16, buffer: fav16 },
    { width: 32, height: 32, buffer: fav32 },
    { width: 48, height: 48, buffer: fav48 },
  ])
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuf)
  console.log('Created public/favicon.ico (multi-res), size:', icoBuf.length)

  console.log('All PNG/ICO assets generated successfully!')
}

// Run immediately if executed via node
if (process.argv[1] && process.argv[1].endsWith('generate-png-assets.js')) {
  const publicDir = path.resolve(process.cwd(), 'public')
  generateAssets(publicDir)
}
