import fs from "node:fs"
import path from "node:path"

const file = path.resolve("src/assets/screenshot20261022203052chrome-07272.jpg")
const buf = fs.readFileSync(file)

console.log("File size:", buf.length)
console.log("Magic bytes:", buf.slice(0, 10))

// Check if JPEG
if (buf[0] === 0xff && buf[1] === 0xd8) {
  console.log("Confirmed JPEG format")
  let offset = 2
  while (offset < buf.length) {
    if (buf[offset] !== 0xff) {
      break
    }
    const marker = buf[offset + 1]
    if (marker === 0xd9 || marker === 0xda) break
    const len = buf.readUInt16BE(offset + 2)
    if (
      marker === 0xc0 ||
      marker === 0xc1 ||
      marker === 0xc2 ||
      marker === 0xc3
    ) {
      const h = buf.readUInt16BE(offset + 5)
      const w = buf.readUInt16BE(offset + 7)
      console.log(`Dimensions: ${w}x${h}`)
      break
    }
    offset += 2 + len
  }
}
