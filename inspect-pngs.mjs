import fs from "fs"
import path from "path"

const assetsDir = "./src/assets"
const publicDir = "./public"

function readPngHeader(filePath) {
  try {
    const buf = fs.readFileSync(filePath)
    if (buf.slice(0, 8).toString("hex") !== "89504e470d0a1a0a") {
      return { isPng: false, size: buf.length }
    }
    const width = buf.readUInt32BE(16)
    const height = buf.readUInt32BE(20)
    const bitDepth = buf.readUInt8(24)
    const colorType = buf.readUInt8(25)
    return { isPng: true, width, height, bitDepth, colorType, size: buf.length }
  } catch (e) {
    return { error: e.message }
  }
}

console.log("=== SRC/ASSETS ===")
for (const file of fs.readdirSync(assetsDir)) {
  const full = path.join(assetsDir, file)
  console.log(file, readPngHeader(full))
}

console.log("\n=== PUBLIC ===")
for (const file of fs.readdirSync(publicDir)) {
  if (file.endsWith(".png") || file.endsWith(".ico")) {
    const full = path.join(publicDir, file)
    console.log(file, readPngHeader(full))
  }
}
