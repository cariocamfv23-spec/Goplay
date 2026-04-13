/* Main entry point for the application - renders the root React component */
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'

// Import local assets
import goplayIcon192 from './assets/goplay-icon-192.png'
import goplayIcon512 from './assets/goplay-icon-512.png'

// Cleanup existing head tags for dynamic injection
document
  .querySelectorAll(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], meta[property="og:image"], link[rel="manifest"]',
  )
  .forEach((el) => el.remove())

// Inject Browser Icons
const icon192 = document.createElement('link')
icon192.rel = 'icon'
icon192.type = 'image/png'
icon192.sizes = '192x192'
icon192.href = goplayIcon192
document.head.appendChild(icon192)

const shortcutIcon = document.createElement('link')
shortcutIcon.rel = 'shortcut icon'
shortcutIcon.type = 'image/png'
shortcutIcon.href = goplayIcon192
document.head.appendChild(shortcutIcon)

const appleTouchIcon = document.createElement('link')
appleTouchIcon.rel = 'apple-touch-icon'
appleTouchIcon.href = goplayIcon192
document.head.appendChild(appleTouchIcon)

// Inject Social Metadata
const ogImage = document.createElement('meta')
ogImage.setAttribute('property', 'og:image')
ogImage.content = goplayIcon512
document.head.appendChild(ogImage)

// Generate Dynamic Manifest
const manifest = {
  name: 'GoPlay App',
  short_name: 'GoPlay',
  description:
    'Sua plataforma imersiva de atividades e notificações motivacionais.',
  start_url: '/',
  display: 'standalone',
  background_color: '#000000',
  theme_color: '#7c3aed',
  icons: [
    {
      src: goplayIcon192,
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any maskable',
    },
    {
      src: goplayIcon512,
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}

const manifestBlob = new Blob([JSON.stringify(manifest)], {
  type: 'application/json',
})
const manifestUrl = URL.createObjectURL(manifestBlob)

const manifestLink = document.createElement('link')
manifestLink.rel = 'manifest'
manifestLink.href = manifestUrl
document.head.appendChild(manifestLink)

createRoot(document.getElementById('root')!).render(<App />)
