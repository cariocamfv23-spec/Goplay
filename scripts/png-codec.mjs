import fs from "fs"
import zlib from "zlib"

export function decodePng(buffer) {
  // Validate PNG signature
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") {
    throw new Error("Invalid PNG signature")
  }

  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  let interlace = 0
  const idatChunks = []
  let palette = []
  let transColor = null

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii")
    const data = buffer.subarray(offset + 8, offset + 8 + length)
    offset += 12 + length

    if (type === "IHDR") {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
      interlace = data[12]
      if (interlace !== 0) {
        throw new Error("Interlaced PNG not supported in simple decoder")
      }
    } else if (type === "PLTE") {
      const entries = Math.floor(data.length / 3)
      for (let i = 0; i < entries; i++) {
        palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 255])
      }
    } else if (type === "tRNS") {
      if (colorType === 3) {
        for (let i = 0; i < data.length; i++) {
          if (palette[i]) palette[i][3] = data[i]
        }
      } else if (colorType === 2) {
        transColor = [
          data.readUInt16BE(0),
          data.readUInt16BE(2),
          data.readUInt16BE(4),
        ]
      }
    } else if (type === "IDAT") {
      idatChunks.push(data)
    } else if (type === "IEND") {
      break
    }
  }

  const compressed = Buffer.concat(idatChunks)
  const decompressed = zlib.inflateSync(compressed)

  // Determine bytes per pixel for filter unfiltering
  let bpp = 4 // bytes per pixel
  if (colorType === 6)
    bpp = 4 // RGBA
  else if (colorType === 2)
    bpp = 3 // RGB
  else if (colorType === 0)
    bpp = 1 // Grayscale
  else if (colorType === 4)
    bpp = 2 // Gray + Alpha
  else if (colorType === 3) bpp = 1 // Palette index

  const scanlineBytes = (width * bpp * bitDepth) / 8
  const rowBytes = 1 + scanlineBytes
  const rawRgba = Buffer.alloc(width * height * 4)

  const unfilteredLine = Buffer.alloc(scanlineBytes)
  let lastLine = Buffer.alloc(scanlineBytes)

  function paeth(a, b, c) {
    const p = a + b - c
    const pa = Math.abs(p - a)
    const pb = Math.abs(p - b)
    const pc = Math.abs(p - c)
    if (pa <= pb && pa <= pc) return a
    if (pb <= pc) return b
    return c
  }

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes
    const filter = decompressed[rowOffset]

    for (let x = 0; x < scanlineBytes; x++) {
      const rawByte = decompressed[rowOffset + 1 + x]
      const left = x >= bpp ? unfilteredLine[x - bpp] : 0
      const up = lastLine[x]
      const upLeft = x >= bpp ? lastLine[x - bpp] : 0

      let val = 0
      if (filter === 0) {
        val = rawByte
      } else if (filter === 1) {
        val = (rawByte + left) & 0xff
      } else if (filter === 2) {
        val = (rawByte + up) & 0xff
      } else if (filter === 3) {
        val = (rawByte + Math.floor((left + up) / 2)) & 0xff
      } else if (filter === 4) {
        val = (rawByte + paeth(left, up, upLeft)) & 0xff
      } else {
        throw new Error(`Unknown filter type: ${filter}`)
      }
      unfilteredLine[x] = val
    }

    // Convert unfiltered scanline to RGBA8
    const outRowOffset = y * width * 4
    for (let x = 0; x < width; x++) {
      const outIdx = outRowOffset + x * 4
      if (colorType === 6) {
        // RGBA
        const inIdx = x * 4
        rawRgba[outIdx] = unfilteredLine[inIdx]
        rawRgba[outIdx + 1] = unfilteredLine[inIdx + 1]
        rawRgba[outIdx + 2] = unfilteredLine[inIdx + 2]
        rawRgba[outIdx + 3] = unfilteredLine[inIdx + 3]
      } else if (colorType === 2) {
        // RGB
        const inIdx = x * 3
        rawRgba[outIdx] = unfilteredLine[inIdx]
        rawRgba[outIdx + 1] = unfilteredLine[inIdx + 1]
        rawRgba[outIdx + 2] = unfilteredLine[inIdx + 2]
        rawRgba[outIdx + 3] = 255
      } else if (colorType === 3) {
        // Palette
        const idx = unfilteredLine[x]
        const col = palette[idx] || [0, 0, 0, 255]
        rawRgba[outIdx] = col[0]
        rawRgba[outIdx + 1] = col[1]
        rawRgba[outIdx + 2] = col[2]
        rawRgba[outIdx + 3] = col[3]
      }
    }

    // Swap lines for next row
    const temp = lastLine
    lastLine = Buffer.from(unfilteredLine)
  }

  return { width, height, data: rawRgba }
}

const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1)
    else c = c >>> 1
  }
  crcTable[n] = c
}

function crc32(buf, offset = 0, length = buf.length) {
  let c = 0xffffffff
  for (let i = offset; i < offset + length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

export function encodePng(width, height, rgbaBuffer) {
  // Construct uncompressed scanlines with filter byte 0
  const scanlineLength = width * 4
  const rawData = Buffer.alloc(height * (1 + scanlineLength))

  for (let y = 0; y < height; y++) {
    const rawOffset = y * (1 + scanlineLength)
    rawData[rawOffset] = 0 // filter 0
    rgbaBuffer.copy(
      rawData,
      rawOffset + 1,
      y * scanlineLength,
      (y + 1) * scanlineLength,
    )
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 })

  const chunks = []
  // PNG signature
  chunks.push(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))

  function makeChunk(typeStr, data) {
    const len = data ? data.length : 0
    const chunk = Buffer.alloc(12 + len)
    chunk.writeUInt32BE(len, 0)
    chunk.write(typeStr, 4, 4, "ascii")
    if (data && len > 0) {
      data.copy(chunk, 8)
    }
    const crc = crc32(chunk, 4, 4 + len)
    chunk.writeUInt32BE(crc, 8 + len)
    return chunk
  }

  // IHDR
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // colorType RGBA
  ihdr[10] = 0 // compression
  ihdr[11] = 0 // filter
  ihdr[12] = 0 // interlace
  chunks.push(makeChunk("IHDR", ihdr))

  // IDAT
  chunks.push(makeChunk("IDAT", compressedData))

  // IEND
  chunks.push(makeChunk("IEND", Buffer.alloc(0)))

  return Buffer.concat(chunks)
}

/**
 * Encode an ICO file containing one or more PNG images
 * @param {Array<{width: number, height: number, pngBuffer: Buffer}>} images
 * @returns {Buffer}
 */
export function encodeIco(images) {
  const count = images.length
  const headerLen = 6 + count * 16
  let currentOffset = headerLen

  const entries = []
  for (const img of images) {
    const entry = Buffer.alloc(16)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2) // color count
    entry.writeUInt8(0, 3) // reserved
    entry.writeUInt16LE(1, 4) // color planes
    entry.writeUInt16LE(32, 6) // bits per pixel
    entry.writeUInt32LE(img.pngBuffer.length, 8) // dwBytesInRes
    entry.writeUInt32LE(currentOffset, 12) // dwImageOffset
    entries.push(entry)
    currentOffset += img.pngBuffer.length
  }

  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = ICO
  header.writeUInt16LE(count, 4) // count of images

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((img) => img.pngBuffer),
  ])
}
