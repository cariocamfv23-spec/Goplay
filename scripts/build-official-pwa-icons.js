import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"
import { decodeJpeg } from "./jpeg-decoder.js"

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

// 2. High-quality bilinear / area-averaging resizer
function resizeRgba(srcBuf, srcW, srcH, dstW, dstH, options = {}) {
  const { padding = 0, bgColor = [255, 255, 255, 255] } = options
  const outBuf = Buffer.alloc(dstW * dstH * 4)

  // Fill background
  for (let i = 0; i < dstW * dstH; i++) {
    outBuf[i * 4] = bgColor[0]
    outBuf[i * 4 + 1] = bgColor[1]
    outBuf[i * 4 + 2] = bgColor[2]
    outBuf[i * 4 + 3] = bgColor[3]
  }

  const innerW = dstW - padding * 2
  const innerH = dstH - padding * 2
  if (innerW <= 0 || innerH <= 0) return outBuf

  const xRatio = srcW / innerW
  const yRatio = srcH / innerH

  for (let dy = 0; dy < innerH; dy++) {
    const targetY = dy + padding
    const srcY = dy * yRatio

    const yLow = Math.floor(srcY)
    const yHigh = Math.min(srcH - 1, Math.ceil(srcY))
    const yWeight = srcY - yLow

    for (let dx = 0; dx < innerW; dx++) {
      const targetX = dx + padding
      const srcX = dx * xRatio

      const xLow = Math.floor(srcX)
      const xHigh = Math.min(srcW - 1, Math.ceil(srcX))
      const xWeight = srcX - xLow

      const idx00 = (yLow * srcW + xLow) * 4
      const idx10 = (yLow * srcW + xHigh) * 4
      const idx01 = (yHigh * srcW + xLow) * 4
      const idx11 = (yHigh * srcW + xHigh) * 4

      const outIdx = (targetY * dstW + targetX) * 4

      for (let c = 0; c < 4; c++) {
        const top =
          srcBuf[idx00 + c] * (1 - xWeight) + srcBuf[idx10 + c] * xWeight
        const bottom =
          srcBuf[idx01 + c] * (1 - xWeight) + srcBuf[idx11 + c] * xWeight
        const val = top * (1 - yWeight) + bottom * yWeight
        outBuf[outIdx + c] = Math.round(val)
      }
    }
  }

  return outBuf
}

// 3. Generate Monochrome (white play silhouette on transparent)
// From the official art, the golden play triangle is near center and has distinct chromatic hue (gold)
// or we can detect the play region: x around 35%-65%, y around 35%-65%, golden yellow vs white/purple
function generateMonochrome(srcBuf, srcW, srcH, size) {
  // First resize to size x size
  const resized = resizeRgba(srcBuf, srcW, srcH, size, size)
  const monoBuf = Buffer.alloc(size * size * 4)

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      const r = resized[idx]
      const g = resized[idx + 1]
      const b = resized[idx + 2]

      // Foreground detection: any non-white pixel in the official art (purple C arc + golden play)
      // Standard monochrome PWA icon specification: "The monochrome purpose specifies that an icon is intended to be used as a silhouette... All transparent pixels remain transparent, and non-transparent pixels are recolored by the user agent."
      // So any non-background element (both the purple C arc and the play triangle) should have solid white with alpha = (255 - luminance of bg)
      const isWhiteBg = r > 245 && g > 245 && b > 245

      if (!isWhiteBg) {
        // Compute alpha based on distance from white background
        const distFromWhite = Math.max(255 - r, 255 - g, 255 - b)
        const alpha = Math.min(255, Math.round(distFromWhite * 1.5))
        monoBuf[idx] = 255
        monoBuf[idx + 1] = 255
        monoBuf[idx + 2] = 255
        monoBuf[idx + 3] = alpha
      } else {
        monoBuf[idx] = 255
        monoBuf[idx + 1] = 255
        monoBuf[idx + 2] = 255
        monoBuf[idx + 3] = 0 // Transparent
      }
    }
  }

  return makePng(size, size, monoBuf)
}

// 4. Multi-resolution ICO builder
function makeIco(images) {
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
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(img.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)])
}

export function buildPwaIcons() {
  const sourcePath = path.resolve(
    "src/assets/screenshot20261022203052chrome-d2bdf.jpg",
  )
  const publicDir = path.resolve("public")

  console.log("Loading source image from:", sourcePath)
  const sourceRaw = fs.readFileSync(sourcePath)
  const decoded = decodeJpeg(sourceRaw)
  console.log(
    `Source image decoded: ${decoded.width}x${decoded.height}, RGBA bytes: ${decoded.data.length}`,
  )

  // 1. icon-512.png (512x512, any)
  console.log("Generating public/icon-512.png...")
  const rgba512 = resizeRgba(
    decoded.data,
    decoded.width,
    decoded.height,
    512,
    512,
  )
  const png512 = makePng(512, 512, rgba512)
  fs.writeFileSync(path.join(publicDir, "icon-512.png"), png512)

  // 2. icon-192.png (192x192, any)
  console.log("Generating public/icon-192.png...")
  const rgba192 = resizeRgba(
    decoded.data,
    decoded.width,
    decoded.height,
    192,
    192,
  )
  const png192 = makePng(192, 192, rgba192)
  fs.writeFileSync(path.join(publicDir, "icon-192.png"), png192)

  // 3. Maskable icons (512 and 192). Safe zone in maskable icons is 80% diameter (10% padding on each side).
  // The source image already has white background and comfortable margins, but adding a slight padding ensures no clipping in circular/squircle masks.
  console.log("Generating maskable icons...")
  const rgba512Maskable = resizeRgba(
    decoded.data,
    decoded.width,
    decoded.height,
    512,
    512,
    {
      padding: 32, // safe zone margin on white
      bgColor: [255, 255, 255, 255],
    },
  )
  const png512Maskable = makePng(512, 512, rgba512Maskable)
  fs.writeFileSync(
    path.join(publicDir, "icon-512-maskable.png"),
    png512Maskable,
  )

  const rgba192Maskable = resizeRgba(
    decoded.data,
    decoded.width,
    decoded.height,
    192,
    192,
    {
      padding: 12,
      bgColor: [255, 255, 255, 255],
    },
  )
  const png192Maskable = makePng(192, 192, rgba192Maskable)
  fs.writeFileSync(
    path.join(publicDir, "icon-192-maskable.png"),
    png192Maskable,
  )

  // 4. icon-monochrome.png (512x512)
  console.log("Generating public/icon-monochrome.png...")
  const pngMono = generateMonochrome(
    decoded.data,
    decoded.width,
    decoded.height,
    512,
  )
  fs.writeFileSync(path.join(publicDir, "icon-monochrome.png"), pngMono)

  // 5. Favicon 48x48 PNG and favicon.ico (16, 32, 48)
  console.log("Generating favicon.png and favicon.ico...")
  const rgba48 = resizeRgba(decoded.data, decoded.width, decoded.height, 48, 48)
  const png48 = makePng(48, 48, rgba48)
  fs.writeFileSync(path.join(publicDir, "favicon.png"), png48)

  const rgba32 = resizeRgba(decoded.data, decoded.width, decoded.height, 32, 32)
  const png32 = makePng(32, 32, rgba32)

  const rgba16 = resizeRgba(decoded.data, decoded.width, decoded.height, 16, 16)
  const png16 = makePng(16, 16, rgba16)

  const icoBuf = makeIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ])
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuf)

  // Also notification-badge.png (96x96 monochrome for Android notification status bar)
  const badgeMono = generateMonochrome(
    decoded.data,
    decoded.width,
    decoded.height,
    96,
  )
  fs.writeFileSync(path.join(publicDir, "notification-badge.png"), badgeMono)

  console.log("All PWA icons successfully generated from official art!")
}

buildPwaIcons()
