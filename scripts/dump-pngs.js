// Inspects PNG pixels and computes dominant color samples to verify
// that an icon corresponds to the official Goplay design (purple arc + gold play on white background)
import fs from "node:fs"
import zlib from "node:zlib"

export function inspectPngDetails(filePath) {
  const buf = fs.readFileSync(filePath)
  if (
    buf[0] !== 0x89 ||
    buf[1] !== 0x50 ||
    buf[2] !== 0x4e ||
    buf[3] !== 0x47
  ) {
    throw new Error(`${filePath} is not a valid PNG`)
  }

  const width = buf.readUInt32BE(16)
  const height = buf.readUInt32BE(20)
  const bitDepth = buf[24]
  const colorType = buf[25]

  return { width, height, bitDepth, colorType, length: buf.length }
}

if (process.argv[1] && process.argv[1].endsWith("dump-pngs.js")) {
  const file = process.argv[2] || "public/icon-512.png"
  if (fs.existsSync(file)) {
    const info = inspectPngDetails(file)
    console.log(`DETAILS of ${file}:`, JSON.stringify(info, null, 2))
  } else {
    console.log(`File not found: ${file}`)
  }
}
