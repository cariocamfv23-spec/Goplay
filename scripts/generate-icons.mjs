import fs from "fs"
import path from "path"
import { decodePng, encodePng } from "./png-codec.mjs"

import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")

// Load source PNG
const sourcePath = path.join(projectRoot, "src/assets/goplay-icon-0e955.png")
const sourceBuf = fs.readFileSync(sourcePath)
const src = decodePng(sourceBuf)

console.log(`Source image loaded: ${src.width}x${src.height}`)

// Step 1: Find tight bounding box of the non-white content
// In the source image, background is white (r > 240, g > 240, b > 240)
let minX = src.width,
  maxX = 0,
  minY = src.height,
  maxY = 0
for (let y = 0; y < src.height; y++) {
  for (let x = 0; x < src.width; x++) {
    const idx = (y * src.width + x) * 4
    const r = src.data[idx]
    const g = src.data[idx + 1]
    const b = src.data[idx + 2]
    const a = src.data[idx + 3]
    // Consider pixel content if not transparent and not near pure white
    const isWhite = r > 245 && g > 245 && b > 245
    if (a > 20 && !isWhite) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

console.log(
  `Content bounding box: [${minX}, ${minY}] to [${maxX}, ${maxY}] (size: ${maxX - minX + 1}x${maxY - minY + 1})`,
)

const bboxWidth = maxX - minX + 1
const bboxHeight = maxY - minY + 1
const bboxCenterX = (minX + maxX) / 2
const bboxCenterY = (minY + maxY) / 2
const bboxMaxDim = Math.max(bboxWidth, bboxHeight)

// Bilinear sample from source (with white clamped outside boundaries)
function sampleSrc(sx, sy) {
  if (sx < 0 || sx >= src.width - 1 || sy < 0 || sy >= src.height - 1) {
    if (sx < -1 || sx >= src.width || sy < -1 || sy >= src.height) {
      return [255, 255, 255, 255]
    }
    const clX = Math.max(0, Math.min(src.width - 1, Math.round(sx)))
    const clY = Math.max(0, Math.min(src.height - 1, Math.round(sy)))
    const idx = (clY * src.width + clX) * 4
    return [
      src.data[idx],
      src.data[idx + 1],
      src.data[idx + 2],
      src.data[idx + 3],
    ]
  }
  const x0 = Math.floor(sx)
  const y0 = Math.floor(sy)
  const x1 = x0 + 1
  const y1 = y0 + 1
  const dx = sx - x0
  const dy = sy - y0

  const i00 = (y0 * src.width + x0) * 4
  const i10 = (y0 * src.width + x1) * 4
  const i01 = (y1 * src.width + x0) * 4
  const i11 = (y1 * src.width + x1) * 4

  const out = [0, 0, 0, 0]
  for (let c = 0; c < 4; c++) {
    const top = src.data[i00 + c] * (1 - dx) + src.data[i10 + c] * dx
    const bot = src.data[i01 + c] * (1 - dx) + src.data[i11 + c] * dx
    out[c] = Math.round(top * (1 - dy) + bot * dy)
  }
  return out
}

/**
 * Render standard icon (with white background)
 * @param {number} targetDim 512, 192, 48
 * @param {number} contentRatio fraction of targetDim occupied by content (e.g. 0.65 for any, 0.78 for maskable)
 */
function renderWhiteBgIcon(targetDim, contentRatio) {
  const buf = Buffer.alloc(targetDim * targetDim * 4)
  const targetContentSize = targetDim * contentRatio
  const scale = targetContentSize / bboxMaxDim
  const targetCenter = (targetDim - 1) / 2

  for (let ty = 0; ty < targetDim; ty++) {
    for (let tx = 0; tx < targetDim; tx++) {
      // Map target (tx, ty) back to source coords
      const sx = (tx - targetCenter) / scale + bboxCenterX
      const sy = (ty - targetCenter) / scale + bboxCenterY

      const pixel = sampleSrc(sx, sy)
      const outIdx = (ty * targetDim + tx) * 4

      // If source had alpha, composite over white
      const a = pixel[3] / 255
      buf[outIdx] = Math.round(pixel[0] * a + 255 * (1 - a))
      buf[outIdx + 1] = Math.round(pixel[1] * a + 255 * (1 - a))
      buf[outIdx + 2] = Math.round(pixel[2] * a + 255 * (1 - a))
      buf[outIdx + 3] = 255
    }
  }
  return buf
}

/**
 * Render monochrome / badge icon with transparency:
 * Dark/purple/gold logo becomes solid silhouette (white or dark) with transparent background
 * @param {number} targetDim
 * @param {number} contentRatio
 * @param {'white'|'dark'} colorMode
 */
function renderTransparentSilhouetteIcon(
  targetDim,
  contentRatio,
  colorMode = "white",
) {
  const buf = Buffer.alloc(targetDim * targetDim * 4)
  const targetContentSize = targetDim * contentRatio
  const scale = targetContentSize / bboxMaxDim
  const targetCenter = (targetDim - 1) / 2

  const rVal = colorMode === "white" ? 255 : 30
  const gVal = colorMode === "white" ? 255 : 30
  const bVal = colorMode === "white" ? 255 : 30

  for (let ty = 0; ty < targetDim; ty++) {
    for (let tx = 0; tx < targetDim; tx++) {
      const sx = (tx - targetCenter) / scale + bboxCenterX
      const sy = (ty - targetCenter) / scale + bboxCenterY

      const pixel = sampleSrc(sx, sy)
      const outIdx = (ty * targetDim + tx) * 4

      // Whiteness distance: source background is ~255,255,255
      const whiteness = (pixel[0] + pixel[1] + pixel[2]) / 3
      // Non-whiteness = alpha of the logo silhouette
      let alpha = 0
      if (whiteness < 240) {
        // Linear fade between 240 and 210 for smooth antialiased edges
        if (whiteness <= 210) {
          alpha = 255
        } else {
          alpha = Math.round((1 - (whiteness - 210) / 30) * 255)
        }
      }

      buf[outIdx] = rVal
      buf[outIdx + 1] = gVal
      buf[outIdx + 2] = bVal
      buf[outIdx + 3] = alpha
    }
  }
  return buf
}

// Generate the 7 icons:
// 1. icon-512-v2.png: 512x512, any, white bg, ~65% content
// 2. icon-192-v2.png: 192x192, any, white bg, ~65% content
// 3. icon-512-maskable-v2.png: 512x512, maskable, white bg, safe zone ~78-80% (65% fits safely within 80% circle)
// 4. icon-192-maskable-v2.png: 192x192, maskable, white bg, safe zone ~78-80%
// 5. favicon-v2.png: 48x48, any, white bg, ~68% content
// 6. icon-monochrome-v2.png: 512x512, monochrome, transparent bg, white silhouette, ~65% content
// 7. notification-badge-v2.png: 96x96, status bar badge, transparent bg, white silhouette, ~70% content

export function generateAllIcons() {
  const publicDir = path.join(projectRoot, "public")

  console.log("Generating icon-512-v2.png (512x512, 65% content, white bg)...")
  const buf512 = renderWhiteBgIcon(512, 0.65)
  fs.writeFileSync(
    path.join(publicDir, "icon-512-v2.png"),
    encodePng(512, 512, buf512),
  )

  console.log("Generating icon-192-v2.png (192x192, 65% content, white bg)...")
  const buf192 = renderWhiteBgIcon(192, 0.65)
  fs.writeFileSync(
    path.join(publicDir, "icon-192-v2.png"),
    encodePng(192, 192, buf192),
  )

  console.log(
    "Generating icon-512-maskable-v2.png (512x512, 70% content, white bg)...",
  )
  const buf512Maskable = renderWhiteBgIcon(512, 0.7)
  fs.writeFileSync(
    path.join(publicDir, "icon-512-maskable-v2.png"),
    encodePng(512, 512, buf512Maskable),
  )

  console.log(
    "Generating icon-192-maskable-v2.png (192x192, 70% content, white bg)...",
  )
  const buf192Maskable = renderWhiteBgIcon(192, 0.7)
  fs.writeFileSync(
    path.join(publicDir, "icon-192-maskable-v2.png"),
    encodePng(192, 192, buf192Maskable),
  )

  console.log("Generating favicon-v2.png (48x48, 68% content, white bg)...")
  const bufFavicon = renderWhiteBgIcon(48, 0.68)
  fs.writeFileSync(
    path.join(publicDir, "favicon-v2.png"),
    encodePng(48, 48, bufFavicon),
  )

  console.log(
    "Generating icon-monochrome-v2.png (512x512, 65% content, transparent silhouette)...",
  )
  const bufMono = renderTransparentSilhouetteIcon(512, 0.65, "white")
  fs.writeFileSync(
    path.join(publicDir, "icon-monochrome-v2.png"),
    encodePng(512, 512, bufMono),
  )

  console.log(
    "Generating notification-badge-v2.png (96x96, 70% content, transparent silhouette)...",
  )
  const bufBadge = renderTransparentSilhouetteIcon(96, 0.7, "white")
  fs.writeFileSync(
    path.join(publicDir, "notification-badge-v2.png"),
    encodePng(96, 96, bufBadge),
  )

  console.log("All 7 icons generated successfully!")
}

generateAllIcons()
