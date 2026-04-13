/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(
      (registration) => {
        console.log('SW registered: ', registration.scope)
      },
      (err) => {
        console.log('SW registration failed: ', err)
      },
    )
  })
}

createRoot(document.getElementById('root')!).render(<App />)
