import fs from "fs"
import path from "path"
import { decodePng } from "./scripts/png-codec.mjs"

const assetsDir = "./src/assets"
for (const file of fs.readdirSync(assetsDir)) {
  if (file.endsWith(".png")) {
    const full = path.join(assetsDir, file)
    try {
      const buf = fs.readFileSync(full)
      const decoded = decodePng(buf)
      console.log(`PNG ${file}: ${decoded.width}x${decoded.height}`)
      // Analyze colors / bounding box of non-white pixels
      let minX = decoded.width,
        maxX = 0,
        minY = decoded.height,
        maxY = 0
      let nonWhiteCount = 0
      for (let y = 0; y < decoded.height; y++) {
        for (let x = 0; x < decoded.width; x++) {
          const idx = (y * decoded.width + x) * 4
          const r = decoded.data[idx]
          const g = decoded.data[idx + 1]
          const b = decoded.data[idx + 2]
          const a = decoded.data[idx + 3]
          // Not white and not transparent
          const isWhite = r > 240 && g > 240 && b > 240
          if (a > 30 && !isWhite) {
            nonWhiteCount++
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }
      console.log(
        `  nonWhite: ${nonWhiteCount}, bbox: [${minX}, ${minY}] to [${maxX}, ${maxY}], w=${maxX - minX + 1}, h=${maxY - minY + 1}`,
      )
    } catch (e) {
      console.log(`PNG ${file} decode error: ${e.message}`)
    }
  }
}
