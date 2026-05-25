import { Ornament } from './Decorations.jsx';

const DESTINATIONS = [
  {
    name: 'Séoul',
    country: '🇰🇷',
    countryLabel: 'Corée du Sud',
    tagline: 'Palais royaux & cafés design',
    vibe: ['Bukchon Hanok', 'Seongsu', 'Han River', 'K-pop'],
    color: 'sakura',
    visual: 'seoul',
  },
  {
    name: 'Busan',
    country: '🇰🇷',
    countryLabel: 'Corée du Sud',
    tagline: 'Plages, marchés et villages perchés',
    vibe: ['Gamcheon', 'Haeundae', 'Jagalchi', 'Yonggungsa'],
    color: 'coral',
    visual: 'busan',
  },
  {
    name: 'Tokyo',
    country: '🇯🇵',
    countryLabel: 'Japon',
    tagline: 'Néons, design et culture pop',
    vibe: ['Shibuya', 'Asakusa', 'teamLab', 'Akihabara'],
    color: 'coral',
    visual: 'tokyo',
  },
  {
    name: 'Kyoto',
    country: '🇯🇵',
    countryLabel: 'Japon',
    tagline: 'Temples, bambou et geishas',
    vibe: ['Fushimi Inari', 'Gion', 'Arashiyama', 'Kinkaku-ji'],
    color: 'sakura',
    visual: 'kyoto',
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="section scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Destinations phares</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Quatre villes, deux pays,<br className="hidden sm:block" /> une infinité de souvenirs.
          </h2>
          <p className="mt-4 text-base text-muted">
            Nos itinéraires couvrent les villes les plus iconiques de Corée du Sud et du Japon — et tout ce qu’il y a entre.
          </p>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ name, country, countryLabel, tagline, vibe, color, visual }) {
  const accent =
    color === 'sakura'
      ? { halo: 'from-sakura/40 to-transparent', dot: 'bg-sakura-deep', ring: 'border-sakura-deep/30' }
      : { halo: 'from-coral/30 to-transparent', dot: 'bg-coral', ring: 'border-coral/30' };

  return (
    <article className="card card-hover group relative overflow-hidden p-0">
      <div className="relative h-44 overflow-hidden rounded-t-3xl bg-gradient-to-br from-navy via-navy-soft to-navy-dark">
        <div className={`absolute inset-0 bg-gradient-to-br ${accent.halo} opacity-70`} />
        <CityIllustration variant={visual} />
        <span className="absolute left-4 top-4 pill !bg-white/85">
          <span aria-hidden>{country}</span>
          <span>{countryLabel}</span>
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted">{tagline}</span>
        </div>
        <h3 className="h-serif mt-1 text-2xl">{name}</h3>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {vibe.map((v) => (
            <span key={v} className={`rounded-full border ${accent.ring} bg-white/70 px-2.5 py-1 text-[11px] text-navy/80`}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function CityIllustration({ variant }) {
  // Subtle SVG silhouette per city. No external images.
  switch (variant) {
    case 'seoul':
      return (
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M0 150 L 60 110 L 90 130 L 130 90 L 170 130 L 210 105 L 260 130 L 320 100 L 320 180 L 0 180 Z" fill="#FAF7F2" opacity="0.07" />
          {/* N Seoul Tower */}
          <g transform="translate(220 30)">
            <rect x="-2" y="0" width="4" height="80" fill="#FAF7F2" opacity="0.6" />
            <polygon points="-12,0 12,0 0,-30" fill="#FAF7F2" opacity="0.7" />
            <circle cx="0" cy="20" r="6" fill="#F2C6D1" opacity="0.85" />
          </g>
          {/* Hanok rooflines */}
          <g transform="translate(20 110)" opacity="0.9">
            <path d="M0 30 Q 8 22, 18 24 L 38 14 Q 60 4, 82 14 L 102 24 Q 112 22, 120 30 L 120 34 L 0 34 Z" fill="#FAF7F2" opacity="0.6" />
          </g>
          <g transform="translate(150 120)" opacity="0.9">
            <path d="M0 24 Q 8 18, 18 20 L 38 10 Q 60 0, 82 10 L 102 20 Q 112 18, 120 24 L 120 30 L 0 30 Z" fill="#FAF7F2" opacity="0.6" />
          </g>
        </svg>
      );
    case 'busan':
      return (
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Sea waves */}
          <path d="M0 120 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke="#FAF7F2" strokeOpacity="0.4" fill="none" />
          <path d="M0 132 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke="#FAF7F2" strokeOpacity="0.3" fill="none" />
          <path d="M0 144 q 20 -10 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0" stroke="#FAF7F2" strokeOpacity="0.25" fill="none" />
          {/* Colorful village blocks (Gamcheon) */}
          <g opacity="0.55">
            {[...Array(10)].map((_, i) => (
              <rect key={i} x={20 + i * 28} y={70 - (i % 3) * 8} width="22" height="42" fill="#FAF7F2" opacity={0.3 + (i % 4) * 0.12} />
            ))}
          </g>
          {/* Sun */}
          <circle cx="260" cy="40" r="20" fill="#D9594C" opacity="0.55" />
        </svg>
      );
    case 'tokyo':
      return (
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Skyline */}
          <g opacity="0.6">
            {[...Array(14)].map((_, i) => {
              const h = 30 + ((i * 37) % 80);
              return <rect key={i} x={i * 24} y={180 - h} width="20" height={h} fill="#FAF7F2" opacity={0.25 + (i % 3) * 0.1} />;
            })}
          </g>
          {/* Tokyo Tower */}
          <g transform="translate(220 20)">
            <polygon points="-22,140 22,140 16,40 -16,40" fill="none" stroke="#D9594C" strokeWidth="1.5" opacity="0.85" />
            <line x1="-16" y1="80" x2="16" y2="80" stroke="#D9594C" strokeWidth="1" opacity="0.7" />
            <line x1="-12" y1="60" x2="12" y2="60" stroke="#D9594C" strokeWidth="1" opacity="0.7" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="#D9594C" strokeWidth="1.5" opacity="0.8" />
          </g>
          {/* Neon dots */}
          <circle cx="60" cy="60" r="3" fill="#F2C6D1" opacity="0.8" />
          <circle cx="120" cy="80" r="2.5" fill="#D9594C" opacity="0.7" />
          <circle cx="40" cy="100" r="2" fill="#B89456" opacity="0.6" />
        </svg>
      );
    case 'kyoto':
      return (
        <svg viewBox="0 0 320 180" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Torii row */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const x = 40 + i * 42;
            const opacity = 0.4 + (i % 2) * 0.2;
            return (
              <g key={i} transform={`translate(${x} 60)`} opacity={opacity}>
                <path d="M-12 0 L 12 0 L 14 -4 L -14 -4 L -12 0 Z" fill="#D9594C" />
                <rect x="-8" y="6" width="16" height="2" fill="#D9594C" />
                <rect x="-9" y="0" width="2" height="80" fill="#D9594C" />
                <rect x="7" y="0" width="2" height="80" fill="#D9594C" />
              </g>
            );
          })}
          {/* Bamboo lines */}
          <g opacity="0.4">
            {[...Array(7)].map((_, i) => (
              <line key={i} x1={i * 48} y1="180" x2={i * 48} y2="100" stroke="#FAF7F2" strokeWidth="1" />
            ))}
          </g>
        </svg>
      );
    default:
      return null;
  }
}
