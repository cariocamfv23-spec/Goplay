// Pure JS PNG encoder to generate 192x192, 512x512 and badge PNGs
import zlib from "node:zlib"
import fs from "node:fs"

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

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii")
  const len = data.length
  const chunk = Buffer.alloc(4 + 4 + len + 4)
  chunk.writeUInt32BE(len, 0)
  typeBuf.copy(chunk, 4)
  data.copy(chunk, 8)
  const crc = crc32(Buffer.concat([typeBuf, data]))
  chunk.writeUInt32BE(crc, 8 + len)
  return chunk
}

function makePng(width, height, rgbaBuffer) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8
  ihdrData[9] = 6
  ihdrData[10] = 0
  ihdrData[11] = 0
  ihdrData[12] = 0

  const ihdrChunk = createChunk("IHDR", ihdrData)

  const rowLen = width * 4
  const rawData = Buffer.alloc((1 + rowLen) * height)
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + rowLen)
    rawData[rowOffset] = 0
    rgbaBuffer.copy(rawData, rowOffset + 1, y * rowLen, (y + 1) * rowLen)
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 })
  const idatChunk = createChunk("IDAT", compressedData)
  const iendChunk = createChunk("IEND", Buffer.alloc(0))

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk])
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  const d1 = (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
  const d2 = (px - x3) * (y2 - y3) - (x2 - x3) * (py - y3)
  const d3 = (px - x1) * (y3 - y1) - (x3 - x1) * (py - y1)
  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0
  return !(hasNeg && hasPos)
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

export function renderGoplayIcon(size) {
  const buf = Buffer.alloc(size * size * 4)
  const scale = size / 512

  const bgStart = [124, 58, 237] // #7C3AED
  const bgEnd = [76, 29, 149] // #4C1D95

  const mX1 = 140,
    mY1 = 180
  const mX2 = 320,
    mY2 = 256
  const mX3 = 140,
    mY3 = 332

  const pX1 = 180,
    pY1 = 140
  const pX2 = 400,
    pY2 = 256
  const pX3 = 180,
    pY3 = 372

  const sX1 = 180,
    sY1 = 148
  const sX2 = 400,
    sY2 = 264
  const sX3 = 180,
    sY3 = 380

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

          const tBg = Math.max(0, Math.min(1, (origX + origY) / 1024))
          let curR = lerp(bgStart[0], bgEnd[0], tBg)
          let curG = lerp(bgStart[1], bgEnd[1], tBg)
          let curB = lerp(bgStart[2], bgEnd[2], tBg)
          let curA = 1.0

          if (pointInTriangle(origX, origY, mX1, mY1, mX2, mY2, mX3, mY3)) {
            curR = curR * 0.8 + 255 * 0.2
            curG = curG * 0.8 + 255 * 0.2
            curB = curB * 0.8 + 255 * 0.2
          }

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
            if (pointInTriangle(origX, origY, sX1, sY1, sX2, sY2, sX3, sY3)) {
              curR = curR * 0.65
              curG = curG * 0.65
              curB = curB * 0.65
            }
          } else {
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

export function renderBadgeIcon(size) {
  const buf = Buffer.alloc(size * size * 4)
  const scale = size / 512

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
      buf[pixelIdx] = 255
      buf[pixelIdx + 1] = 255
      buf[pixelIdx + 2] = 255
      buf[pixelIdx + 3] = Math.round(alpha * 255)
    }
  }

  return makePng(size, size, buf)
}

const icon192 = renderGoplayIcon(192)
fs.writeFileSync("public/icon-192.png", icon192)

const icon512 = renderGoplayIcon(512)
fs.writeFileSync("public/icon-512.png", icon512)

const badge96 = renderBadgeIcon(96)
fs.writeFileSync("public/notification-badge.png", badge96)

const monochrome512 = renderBadgeIcon(512)
fs.writeFileSync("public/icon-monochrome.png", monochrome512)

console.log("BASE64_192:" + icon192.toString("base64"))
console.log("BASE64_512:" + icon512.toString("base64"))
console.log("BASE64_BADGE:" + badge96.toString("base64"))
console.log("BASE64_MONOCHROME_512:" + monochrome512.toString("base64"))
