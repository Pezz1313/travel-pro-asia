// Large hero illustration: a single SVG combining Korean + Japanese motifs.
// Mountains, sun, hanok rooflines, torii, sakura branch, soft clouds.

export default function HeroVisual({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sky: cool mauve at top → warm ivory at bottom — more atmospheric */}
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C8B0CC" />
          <stop offset="35%" stopColor="#E4D0E8" />
          <stop offset="70%" stopColor="#F0E6F0" />
          <stop offset="100%" stopColor="#FCE9EE" />
        </linearGradient>
        <linearGradient id="mountFar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E2A52" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#1E2A52" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="mountNear" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0F1B3D" />
          <stop offset="100%" stopColor="#060C1F" />
        </linearGradient>
        {/* Sun: warmer, more visible glow */}
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#D9594C" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#D9594C" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#D9594C" stopOpacity="0" />
        </radialGradient>
        {/* Atmospheric haze layer */}
        <radialGradient id="haze" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0%" stopColor="#F2C6D1" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#F2C6D1" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky wash */}
      <rect width="600" height="600" rx="32" fill="url(#sky)" />

      {/* Atmospheric haze overlay */}
      <rect width="600" height="600" rx="32" fill="url(#haze)" />

      {/* Outer faint frame */}
      <rect x="0.5" y="0.5" width="599" height="599" rx="32" fill="none" stroke="#0F1B3D" strokeOpacity="0.08" />

      {/* Sun aura — bigger, warmer */}
      <circle cx="430" cy="175" r="190" fill="url(#sun)" />
      {/* Sun disc — slightly larger */}
      <circle cx="430" cy="175" r="66" fill="#D9594C" opacity="0.92" />
      {/* Sun inner highlight */}
      <circle cx="418" cy="163" r="20" fill="#F2C6D1" opacity="0.35" />

      {/* Distant clouds (woodblock style) */}
      <g opacity="0.5" fill="#FAF7F2">
        <path d="M70 150 q 20 -16 44 -8 q 16 -22 44 -14 q 12 -6 26 4 q 14 -6 24 6 l -138 0 z" />
        <path d="M310 100 q 16 -12 34 -6 q 14 -16 36 -10 l -70 0 z" />
        <path d="M40 240 q 24 -14 50 -4 q 18 -16 40 -6 l -90 0 z" />
      </g>

      {/* Far mountains (Korean ridge inspiration) */}
      <path
        d="M0 380 L 60 320 L 110 350 L 170 290 L 220 330 L 280 280 L 340 320 L 410 270 L 470 320 L 540 290 L 600 340 L 600 600 L 0 600 Z"
        fill="url(#mountFar)"
      />

      {/* Near mountains (Fuji-inspired peak) */}
      <path
        d="M0 470 Q 80 410, 130 440 Q 170 380, 230 420 L 280 360 L 330 420 Q 380 380, 430 420 Q 490 360, 540 410 Q 580 390, 600 430 L 600 600 L 0 600 Z"
        fill="url(#mountNear)"
      />

      {/* Snow on the central peak */}
      <path d="M260 372 L 280 360 L 300 380 L 290 388 L 282 380 L 274 388 Z" fill="#FAF7F2" opacity="0.95" />

      {/* Torii gate, foreground left */}
      <g transform="translate(70 430)">
        <path d="M0 8 L 80 8 L 84 0 L -4 0 L 0 8 Z" fill="#D9594C" />
        <rect x="6" y="18" width="68" height="4" fill="#D9594C" />
        <rect x="14" y="8" width="4" height="120" fill="#D9594C" />
        <rect x="62" y="8" width="4" height="120" fill="#D9594C" />
        <rect x="38" y="22" width="3" height="106" fill="#D9594C" />
      </g>

      {/* Hanok roof silhouette, right */}
      <g transform="translate(360 470)" opacity="0.95">
        <path
          d="M0 50 Q 12 38, 28 42 L 60 26 Q 100 8, 140 26 L 172 42 Q 188 38, 200 50 L 200 58 L 0 58 Z"
          fill="#FAF7F2"
        />
        <path
          d="M0 50 Q 12 38, 28 42 L 60 26 Q 100 8, 140 26 L 172 42 Q 188 38, 200 50"
          stroke="#0F1B3D"
          strokeWidth="1.2"
          fill="none"
          opacity="0.45"
        />
        <line x1="60" y1="26" x2="140" y2="26" stroke="#0F1B3D" strokeWidth="1" opacity="0.3" />
        <rect x="32" y="58" width="136" height="60" fill="#FAF7F2" opacity="0.9" />
        <rect x="40" y="64" width="20" height="50" fill="#0F1B3D" opacity="0.12" />
        <rect x="90" y="64" width="20" height="50" fill="#0F1B3D" opacity="0.12" />
        <rect x="140" y="64" width="20" height="50" fill="#0F1B3D" opacity="0.12" />
      </g>

      {/* Sakura branch, top-left */}
      <g transform="translate(40 60)">
        <path
          d="M0 80 Q 40 60, 80 70 Q 130 80, 170 60"
          stroke="#0F1B3D"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        {[
          { cx: 32, cy: 70 },
          { cx: 60, cy: 64 },
          { cx: 88, cy: 70 },
          { cx: 118, cy: 76 },
          { cx: 146, cy: 66 },
          { cx: 170, cy: 60 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.cx} ${p.cy})`}>
            {[0, 72, 144, 216, 288].map((deg, j) => (
              <ellipse
                key={j}
                rx="3"
                ry="6"
                cx="0"
                cy="-5"
                fill={i % 2 ? '#F2C6D1' : '#E5879D'}
                opacity="0.95"
                transform={`rotate(${deg})`}
              />
            ))}
            <circle r="1.5" fill="#B89456" />
          </g>
        ))}
      </g>

      {/* Subtle "ground" line */}
      <line x1="0" y1="595" x2="600" y2="595" stroke="#0F1B3D" strokeOpacity="0.1" />

      {/* Discreet ornament — wave (Han River / Seto inland sea hint) */}
      <g transform="translate(0 540)" opacity="0.35">
        <path
          d="M0 10 q 30 -12 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0"
          stroke="#FAF7F2"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M0 22 q 30 -12 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0 t 60 0"
          stroke="#FAF7F2"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
