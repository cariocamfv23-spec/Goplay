/* Main entry point for the application - renders the root React component */
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./main.css"
import { registerServiceWorker } from "./services/push-notifications"

// Register Service Worker early on browser boot and check for updates
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    registerServiceWorker()
      .then((reg) => {
        reg?.update().catch(() => {})
      })
      .catch(() => {})
  })

  // Periodically check for SW updates when user returns to the app
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => reg?.update().catch(() => {}))
        .catch(() => {})
    }
  })
}

const rootElement = document.getElementById("root")
createRoot(rootElement!).render(<App />)
