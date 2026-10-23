import fs from "node:fs"
import path from "node:path"

const assetsDir = "src/assets"
const files = fs.readdirSync(assetsDir)
for (const f of files) {
  const p = path.join(assetsDir, f)
  const stat = fs.statSync(p)
  const buf = Buffer.alloc(32)
  const fd = fs.openSync(p, "r")
  fs.readSync(fd, buf, 0, 32, 0)
  fs.closeSync(fd)
  console.log(
    f,
    "size:",
    stat.size,
    "magic:",
    buf.subarray(0, 8).toString("hex"),
  )
}
