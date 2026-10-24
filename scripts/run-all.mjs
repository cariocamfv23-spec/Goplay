import { generateAllIcons } from "./generate-icons.mjs"
import { verifyAllIcons } from "./verify-icons.mjs"

console.log("=== GENERATING ICONS ===")
generateAllIcons()

console.log("\n=== VERIFYING ICONS ===")
const results = verifyAllIcons()
let hasFailure = false
for (const r of results) {
  const status = r.dimMatch && r.cornersAreExpected ? "PASS" : "FAIL"
  if (status === "FAIL") hasFailure = true
  console.log(
    `[${status}] ${r.name}: dim=${r.dim} (${
      r.dimMatch ? "OK" : "MISMATCH"
    }), ratio=${r.contentRatio}, cornersOK=${r.cornersAreExpected}`,
  )
}
if (hasFailure) {
  console.error("Some icons failed verification!")
  process.exit(1)
}
console.log("Icon generation and verification completed successfully!")
