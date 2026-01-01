export const SportsPatternPaths = () => (
  // Updated for High-Fidelity WhatsApp-style Sports Doodles
  // Increased detail and variety for a premium aesthetic
  <g
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* ROW 1 */}
    {/* Soccer Ball - Detailed */}
    <g transform="translate(20, 20) scale(1.1)">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
      <path d="M12 2l-4 7h8l-4-7Z" />
      <path d="M12 22l4-7H8l4 7Z" />
      <path d="M2 12l7-4" />
      <path d="M2 12l7 4" />
      <path d="M22 12l-7-4" />
      <path d="M22 12l-7 4" />
    </g>

    {/* Tennis Racket - Detailed */}
    <g transform="translate(100, 20) scale(1.0) rotate(45 12 12)">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.8 1.1 5.3 2.9 7.1L10 24h4l5.1-4.9c1.8-1.8 2.9-4.3 2.9-7.1 0-5.5-4.5-10-10-10Z" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
      <path d="M7 3.3v17.4" />
      <path d="M17 3.3v17.4" />
      <path d="M3.3 7h17.4" />
      <path d="M3.3 17h17.4" />
    </g>

    {/* Basketball - Detailed */}
    <g transform="translate(180, 20) scale(1.1)">
      <circle cx="12" cy="12" r="10" />
      <path d="M2.2 12h19.6" />
      <path d="M12 2.2v19.6" />
      <path d="M2 12a10 10 0 0 1 10-10" />
      <path d="M2 12a10 10 0 0 0 10 10" />
      <path d="M22 12a10 10 0 0 1-10 10" />
      <path d="M22 12a10 10 0 0 0-10-10" />
    </g>

    {/* Whistle - Detailed */}
    <g transform="translate(260, 25) scale(1.1)">
      <path d="M11 3H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3.5" />
      <path d="M14 17.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
      <path d="M14 8.5v-3h-3" />
      <path d="M18.5 13H22" />
      <path d="M5 8h2" />
    </g>

    {/* ROW 2 */}
    {/* Boxing Glove - Detailed */}
    <g transform="translate(60, 100) scale(1.1)">
      <path d="M8 2h8a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6Z" />
      <path d="M16 17v4a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4" />
      <path d="M2 8v4" />
      <path d="M13 2v15" />
      <path d="M8 8h5" />
      <path d="M8 12h5" />
    </g>

    {/* Swimming/Waves - Detailed */}
    <g transform="translate(140, 100) scale(1.2)">
      <path d="M2 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M12 6c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M12 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M12 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </g>

    {/* American Football - Detailed */}
    <g transform="translate(220, 100) scale(1.1) rotate(-15 12 12)">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
      <path d="M2 12h20" />
      <path d="M12 2v20" />
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
      <path d="M8 2v20" />
      <path d="M16 2v20" />
    </g>

    {/* Stopwatch - Detailed */}
    <g transform="translate(300, 100) scale(1.1)">
      <circle cx="12" cy="13" r="9" />
      <path d="M12 4V2" />
      <path d="M10 2h4" />
      <path d="M20 6l-2-2" />
      <path d="M12 13l3-3" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
    </g>

    {/* ROW 3 */}
    {/* Dumbbell/Weights - Detailed */}
    <g transform="translate(20, 180) scale(1.0)">
      <path d="M6.5 5h11" />
      <path d="M6.5 19h11" />
      <rect x="2" y="7" width="4" height="10" rx="1" />
      <rect x="18" y="7" width="4" height="10" rx="1" />
      <path d="M6 12h12" />
      <rect x="8" y="10" width="8" height="4" rx="1" />
    </g>

    {/* Trophy - Detailed */}
    <g transform="translate(100, 180) scale(1.2)">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M12 17a5 5 0 0 0 5-5V4H7v8a5 5 0 0 0 5 5Z" />
      <path d="M17 6h2a3 3 0 0 1 0 6h-2" />
      <path d="M7 6H5a3 3 0 0 0 0 6h2" />
      <path d="M10 4l1 3 1-3" />
    </g>

    {/* Sneaker/Shoe - Detailed */}
    <g transform="translate(180, 180) scale(1.1)">
      <path d="M2 14v-2c0-3 2-5 5-6h1c2 0 4 1 5 3l3 2c2 1 4 1 4 4v3c0 2-2 3-4 3H6c-3 0-4-2-4-5Z" />
      <path d="M6 12h3" />
      <path d="M7 15h3" />
      <path d="M8 18h3" />
      <path d="M16 11l-2-3" />
      <path d="M2 17h20" strokeDasharray="2 2" />
    </g>

    {/* Medal - Detailed */}
    <g transform="translate(260, 180) scale(1.2)">
      <circle cx="12" cy="16" r="6" />
      <path d="M12 10l-4-8" />
      <path d="M12 10l4-8" />
      <path d="M12 16l1-2 2-1-2-1-1-2-1 2-2 1 2 1 1 2Z" />
    </g>

    {/* ROW 4 */}
    {/* Baseball Cap - Detailed */}
    <g transform="translate(60, 260) scale(1.1)">
      <path d="M2 14h20" />
      <path d="M22 14c0-5-4-9-10-9S2 9 2 14" />
      <path d="M12 5v9" />
      <path d="M7 6.5l3 7.5" />
      <path d="M17 6.5l-3 7.5" />
      <path d="M16 14h6v2a2 2 0 0 1-2 2h-4" />
    </g>

    {/* Bicycle - Detailed */}
    <g transform="translate(140, 260) scale(1.0)">
      <circle cx="5" cy="17" r="4" />
      <circle cx="19" cy="17" r="4" />
      <path d="M5 17h3l3-6h5l3 6" />
      <path d="M11 11l-2-6h4" />
      <path d="M14 11h-3" />
    </g>

    {/* Water Bottle - Detailed */}
    <g transform="translate(220, 260) scale(1.0)">
      <path d="M7 6h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6Z" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M7 10h10" />
      <path d="M7 15h10" />
      <path d="M12 10v10" />
    </g>

    {/* Heart/Health - Detailed */}
    <g transform="translate(300, 260) scale(1.1)">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      <path d="M6 9h3" />
      <path d="M15 9h3" />
      <path d="M12 6v3" />
      <path d="M12 15l2-2" />
    </g>
  </g>
)
