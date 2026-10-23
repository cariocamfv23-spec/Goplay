import { generateAllIcons } from "./generate-icons.mjs"
import { verifyAllIcons } from "./verify-icons.mjs"

console.log("=== GENERATING ICONS ===")
generateAllIcons()

console.log("=== VERIFYING ICONS ===")
const results = verifyAllIcons()
for (const r of results) {
  console.log(
    `[ICON] ${r.name}: dim=${r.dim} (${
      r.dimMatch ? "OK" : "MISMATCH"
    }), ratio=${r.contentRatio}, cornersOK=${r.cornersAreExpected}`,
  )
}
