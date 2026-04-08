import { SeasonalTheme } from './seasonal-utils'

export function getGoplayIconInnerSvg(theme: SeasonalTheme | null): string {
  let seasonalElements = ''

  if (theme === 'christmas') {
    seasonalElements = `
      <g filter="url(#hat-shadow)">
        <path d="M 125 95 L 195 105 C 180 20, 90 10, 60 50 C 50 70, 90 80, 125 95" fill="url(#goplay-holiday-red)" stroke="#7f1d1d" stroke-width="0.5" />
        <path d="M 110 90 Q 155 78 210 105 Q 210 125 160 115 Q 115 120 110 90 Z" fill="url(#goplay-snow-white)" stroke="#d1d5db" stroke-width="0.5" />
        <circle cx="65" cy="55" r="16" fill="url(#goplay-snow-white)" stroke="#d1d5db" stroke-width="0.5" />
        <path d="M 135 85 Q 160 50 170 90" stroke="white" stroke-width="3" stroke-opacity="0.2" fill="none" stroke-linecap="round" />
      </g>
    `
  } else if (theme === 'carnival') {
    seasonalElements = `
      <g filter="url(#seasonal-glow)">
        <path d="M 100 400 Q 150 350 120 300 Q 90 250 140 200" fill="none" stroke="#d946ef" stroke-width="5" stroke-linecap="round" opacity="0.9" />
        <path d="M 400 100 Q 350 150 380 200" fill="none" stroke="#0ea5e9" stroke-width="5" stroke-linecap="round" opacity="0.9" />
        <circle cx="180" cy="150" r="8" fill="#fbbf24" />
        <circle cx="350" cy="350" r="6" fill="#d946ef" />
        <circle cx="300" cy="80" r="5" fill="#22c55e" />
        <circle cx="150" cy="380" r="6" fill="#0ea5e9" />
        <circle cx="450" cy="200" r="5" fill="#fbbf24" />
      </g>
    `
  } else if (theme === 'easter') {
    seasonalElements = `
      <g filter="url(#seasonal-glow)">
        <path d="M 230 64 Q 210 10 230 0 Q 250 10 240 64" fill="white" opacity="0.9" stroke="#f3f4f6" stroke-width="1" />
        <path d="M 280 64 Q 300 10 280 0 Q 260 10 270 64" fill="white" opacity="0.9" stroke="#f3f4f6" stroke-width="1" />
        <ellipse cx="480" cy="270" rx="14" ry="18" fill="#f472b6" transform="rotate(15 480 270)" stroke="white" stroke-width="2" />
      </g>
    `
  } else if (theme === 'world-cup') {
    seasonalElements = `
      <g filter="url(#seasonal-glow)">
        <circle cx="445" cy="290" r="18" fill="url(#goplay-gold-metallic)" stroke="white" stroke-width="2" />
        <path d="M 445 280 L 452 285 L 445 298 L 438 285 Z" fill="#16a34a" opacity="0.9" />
        <path d="M 100 420 Q 256 500 412 420" fill="none" stroke="#fbbf24" stroke-width="8" stroke-linecap="round" opacity="0.7" />
        <path d="M 100 435 Q 256 515 412 435" fill="none" stroke="#16a34a" stroke-width="8" stroke-linecap="round" opacity="0.7" />
      </g>
    `
  } else if (theme === 'commemorative') {
    seasonalElements = `
      <g filter="url(#seasonal-glow)">
        <g transform="translate(100, 100) scale(1.5)">
          <path d="M 0 0 L 0 -20 M 0 0 L 15 -15 M 0 0 L 20 0 M 0 0 L 15 15 M 0 0 L 0 20 M 0 0 L -15 15 M 0 0 L -20 0 M 0 0 L -15 -15" stroke="#fbbf24" stroke-width="2" stroke-linecap="round">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
          </path>
        </g>
        <g transform="translate(400, 400) scale(1.2)">
          <path d="M 0 0 L 0 -20 M 0 0 L 15 -15 M 0 0 L 20 0 M 0 0 L 15 15 M 0 0 L 0 20 M 0 0 L -15 15 M 0 0 L -20 0 M 0 0 L -15 -15" stroke="#60a5fa" stroke-width="2" stroke-linecap="round">
            <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    `
  }

  return `
    <defs>
      <linearGradient id="goplay-purple-deep" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7c3aed" stop-opacity="1" />
        <stop offset="60%" stop-color="#7c3aed" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#1a0b2e" />
      </linearGradient>
      <linearGradient id="goplay-purple-shine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="white" stop-opacity="0.6" />
        <stop offset="50%" stop-color="white" stop-opacity="0.1" />
        <stop offset="100%" stop-color="white" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="goplay-gold-metallic" x1="20%" y1="20%" x2="80%" y2="80%">
        <stop offset="0%" stop-color="#FFFACD" />
        <stop offset="30%" stop-color="#eab308" />
        <stop offset="70%" stop-color="#B8860B" />
        <stop offset="100%" stop-color="#eab308" />
      </linearGradient>
      <radialGradient id="goplay-holiday-red" cx="30%" cy="30%" r="80%" fx="30%" fy="30%">
        <stop offset="0%" stop-color="#ef4444" />
        <stop offset="60%" stop-color="#b91c1c" />
        <stop offset="100%" stop-color="#7f1d1d" />
      </radialGradient>
      <linearGradient id="goplay-snow-white" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#f3f4f6" />
        <stop offset="100%" stop-color="#d1d5db" />
      </linearGradient>
      <filter id="goplay-bevel" filterUnits="userSpaceOnUse">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
        <feOffset in="blur" dx="4" dy="6" result="offsetBlur" />
        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" lighting-color="#ffffff" result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
        <feMerge>
          <feMergeNode in="offsetBlur" />
          <feMergeNode in="litPaint" />
        </feMerge>
      </filter>
      <filter id="goplay-gold-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="seasonal-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="hat-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="8" stdDeviation="4" flood-color="black" flood-opacity="0.5" />
      </filter>
    </defs>

    <path d="M 430 150 C 400 100 330 64 256 64 C 150 64 64 150 64 256 C 64 362 150 448 256 448 C 350 448 430 380 445 290" fill="none" stroke="url(#goplay-purple-deep)" stroke-width="68" stroke-linecap="round" filter="url(#goplay-bevel)" />
    
    <path d="M 430 150 C 400 100 330 64 256 64 C 150 64 64 150 64 256 C 64 362 150 448 256 448 C 350 448 430 380 445 290" fill="none" stroke="url(#goplay-purple-shine)" stroke-width="12" stroke-linecap="round" opacity="0.6" style="mix-blend-mode: overlay;" />

    <g filter="url(#goplay-gold-glow)">
      <path d="M 215 170 L 365 256 L 215 342 L 225 256 Z" fill="url(#goplay-gold-metallic)" stroke="#B8860B" stroke-width="1" stroke-linejoin="round" />
    </g>

    <circle cx="445" cy="290" r="18" fill="#eab308" filter="url(#goplay-gold-glow)">
      <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
    </circle>

    ${seasonalElements}
  `
}

export function getGoplayIconFullSvg(theme: SeasonalTheme | null): string {
  return `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${getGoplayIconInnerSvg(theme)}</svg>`
}
