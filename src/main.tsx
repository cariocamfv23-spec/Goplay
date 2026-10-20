/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { registerServiceWorker } from './services/push-notifications'

// Register Service Worker early on browser boot
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    registerServiceWorker().catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(<App />)
