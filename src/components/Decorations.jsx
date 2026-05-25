// Reusable subtle Asian-inspired SVG decorations.
// Kept minimal, geometric and tinted with the brand palette.

export function SakuraPetal({ className = '', color = '#F2C6D1' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2 C 14 6, 14 10, 12 12 C 10 10, 10 6, 12 2 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M12 22 C 10 18, 10 14, 12 12 C 14 14, 14 18, 12 22 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M2 12 C 6 10, 10 10, 12 12 C 10 14, 6 14, 2 12 Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M22 12 C 18 14, 14 14, 12 12 C 14 10, 18 10, 22 12 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="12" cy="12" r="1.4" fill="#B89456" />
    </svg>
  );
}

export function FloatingSakura() {
  // A handful of slowly drifting petals — very subtle, decorative only.
  const petals = [
    { left: '8%', delay: '0s', size: 14, duration: '18s' },
    { left: '22%', delay: '4s', size: 10, duration: '22s' },
    { left: '74%', delay: '2s', size: 12, duration: '20s' },
    { left: '88%', delay: '7s', size: 16, duration: '24s' },
    { left: '52%', delay: '10s', size: 9, duration: '26s' },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <div
          key={i}
          className="sakura-petal animate-sakura-float"
          style={{
            left: p.left,
            top: '-5%',
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          <SakuraPetal className="h-full w-full" color={i % 2 ? '#F2C6D1' : '#E5879D'} />
        </div>
      ))}
    </div>
  );
}

export function HanokRoof({ className = '', color = '#0F1B3D' }) {
  // Iconic curved upturned-eave silhouette of a Korean hanok roof.
  return (
    <svg viewBox="0 0 200 60" className={className} aria-hidden="true">
      <path
        d="M2 50 Q 14 38, 28 42 L 60 26 Q 100 8, 140 26 L 172 42 Q 186 38, 198 50 L 198 56 L 2 56 Z"
        fill={color}
      />
      <line x1="60" y1="26" x2="140" y2="26" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

export function Torii({ className = '', color = '#D9594C' }) {
  // Minimal Japanese torii gate silhouette.
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <path d="M5 18 L 75 18 L 78 12 L 2 12 L 5 18 Z" fill={color} />
      <rect x="10" y="28" width="60" height="5" fill={color} />
      <rect x="18" y="18" width="5" height="78" fill={color} />
      <rect x="57" y="18" width="5" height="78" fill={color} />
      <rect x="38" y="33" width="4" height="63" fill={color} />
    </svg>
  );
}

export function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-px w-3 bg-gold/60" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function KoreaBadge({ className = '' }) {
  return (
    <span className={`pill ${className}`}>
      <span aria-hidden>🇰🇷</span>
      <span>Corée du Sud</span>
    </span>
  );
}

export function JapanBadge({ className = '' }) {
  return (
    <span className={`pill ${className}`}>
      <span aria-hidden>🇯🇵</span>
      <span>Japon</span>
    </span>
  );
}
