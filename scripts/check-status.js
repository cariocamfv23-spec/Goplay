import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"

const files = [
  "public/icon-512-v2.png",
  "public/icon-192-v2.png",
  "public/icon-512-maskable-v2.png",
  "public/icon-192-maskable-v2.png",
  "public/icon-monochrome-v2.png",
  "public/favicon-v2.png",
  "public/notification-badge-v2.png",
  "public/icon-512.png",
  "public/icon-192.png",
  "public/icon-512-maskable.png",
  "public/icon-192-maskable.png",
  "public/icon-monochrome.png",
  "public/favicon.png",
  "public/favicon.ico",
  "public/notification-badge.png",
]

function inspectPng(buf) {
  if (buf.length < 24) return null
  const isPng =
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
  if (!isPng) return { isPng: false }
  const width = buf.readUInt32BE(16)
  const height = buf.readUInt32BE(20)
  return { isPng: true, width, height }
}

const report = {}
for (const f of files) {
  if (!fs.existsSync(f)) {
    report[f] = { exists: false }
    continue
  }
  const stat = fs.statSync(f)
  const buf = fs.readFileSync(f)
  const pngInfo = f.endsWith(".png") ? inspectPng(buf) : null
  report[f] = {
    exists: true,
    size: stat.size,
    mtime: stat.mtime.toISOString(),
    pngInfo,
  }
}

console.log("STATUS_REPORT:", JSON.stringify(report, null, 2))
