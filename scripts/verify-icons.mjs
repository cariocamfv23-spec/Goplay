import fs from "fs"
import path from "path"
import { decodePng } from "./png-codec.mjs"

const files = [
  { name: "icon-512-v2.png", expectedDim: 512, expectedType: "whiteBg" },
  { name: "icon-192-v2.png", expectedDim: 192, expectedType: "whiteBg" },
  {
    name: "icon-512-maskable-v2.png",
    expectedDim: 512,
    expectedType: "whiteBg",
  },
  {
    name: "icon-192-maskable-v2.png",
    expectedDim: 192,
    expectedType: "whiteBg",
  },
  { name: "favicon-v2.png", expectedDim: 48, expectedType: "whiteBg" },
  {
    name: "icon-monochrome-v2.png",
    expectedDim: 512,
    expectedType: "transparent",
  },
  {
    name: "notification-badge-v2.png",
    expectedDim: 96,
    expectedType: "transparent",
  },
]

import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "..")

export function verifyAllIcons() {
  const publicDir = path.join(projectRoot, "public")
  const report = []

  for (const item of files) {
    const filePath = path.join(publicDir, item.name)
    if (!fs.existsSync(filePath)) {
      report.push({ name: item.name, error: "File does not exist" })
      continue
    }

    const buf = fs.readFileSync(filePath)
    const img = decodePng(buf)

    // Check corners
    const corners = [
      [0, 0],
      [img.width - 1, 0],
      [0, img.height - 1],
      [img.width - 1, img.height - 1],
    ]

    const cornerSamples = corners.map(([x, y]) => {
      const idx = (y * img.width + x) * 4
      return [
        img.data[idx],
        img.data[idx + 1],
        img.data[idx + 2],
        img.data[idx + 3],
      ]
    })

    // Find bounding box of content
    let minX = img.width,
      maxX = 0,
      minY = img.height,
      maxY = 0
    let contentPixels = 0

    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const idx = (y * img.width + x) * 4
        const r = img.data[idx]
        const g = img.data[idx + 1]
        const b = img.data[idx + 2]
        const a = img.data[idx + 3]

        let isContent = false
        if (item.expectedType === "whiteBg") {
          // Content is non-white
          if (r < 240 || g < 240 || b < 240) isContent = true
        } else {
          // Content is non-transparent
          if (a > 20) isContent = true
        }

        if (isContent) {
          contentPixels++
          if (x < minX) minX = x
          if (x > maxX) maxX = x
          if (y < minY) minY = y
          if (y > maxY) maxY = y
        }
      }
    }

    const contentWidth = maxX >= minX ? maxX - minX + 1 : 0
    const contentHeight = maxY >= minY ? maxY - minY + 1 : 0
    const ratioW = contentWidth / img.width
    const ratioH = contentHeight / img.height
    const maxRatio = Math.max(ratioW, ratioH)

    report.push({
      name: item.name,
      dim: `${img.width}x${img.height}`,
      expectedDim: `${item.expectedDim}x${item.expectedDim}`,
      dimMatch:
        img.width === item.expectedDim && img.height === item.expectedDim,
      bbox: `[${minX}, ${minY}] - [${maxX}, ${maxY}]`,
      contentSize: `${contentWidth}x${contentHeight}`,
      contentRatio: `${(maxRatio * 100).toFixed(1)}%`,
      contentPixels,
      cornerSamples,
      cornersAreExpected:
        item.expectedType === "whiteBg"
          ? cornerSamples.every(
              (c) => c[0] > 240 && c[1] > 240 && c[2] > 240 && c[3] === 255,
            )
          : cornerSamples.every((c) => c[3] === 0),
    })
  }

  return report
}
