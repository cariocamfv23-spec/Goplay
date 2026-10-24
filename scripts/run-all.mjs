import { generateAllIcons } from "./generate-icons.mjs"
import { runIntegrityCheck } from "./verify-icons.mjs"

console.log("=== STEP 1: GENERATING ICONS ===")
generateAllIcons()

console.log("\n=== STEP 2: VERIFYING ICONS ===")
runIntegrityCheck()

console.log("\nIcon pipeline completed successfully!")
