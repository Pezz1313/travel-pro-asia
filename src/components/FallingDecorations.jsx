import { SakuraPetal } from './Decorations.jsx';

// Decorative background layer: sakura petals + a few discreet food emojis
// drifting slowly down the viewport. Position fixed, pointer-events: none,
// hidden when user prefers reduced motion (handled in CSS).
//
// Element count is intentionally small (~14) to stay premium and uncluttered.
// Mobile CSS hides half of them via :nth-child to reduce density on small screens.

const ITEMS = [
  // -- Sakura petals (subtle, small, faster) --
  { type: 'sakura', left: 5,  delay: 0,  duration: 22, size: 16, color: '#F2C6D1' },
  { type: 'sakura', left: 18, delay: 5,  duration: 28, size: 12, color: '#E5879D' },
  { type: 'sakura', left: 30, delay: 11, duration: 26, size: 18, color: '#F2C6D1' },
  { type: 'sakura', left: 42, delay: 3,  duration: 30, size: 14, color: '#E5879D' },
  { type: 'sakura', left: 55, delay: 8,  duration: 24, size: 16, color: '#F2C6D1' },
  { type: 'sakura', left: 68, delay: 14, duration: 32, size: 12, color: '#E5879D' },
  { type: 'sakura', left: 80, delay: 1,  duration: 25, size: 18, color: '#F2C6D1' },
  { type: 'sakura', left: 92, delay: 9,  duration: 27, size: 14, color: '#E5879D' },
  { type: 'sakura', left: 60, delay: 18, duration: 29, size: 12, color: '#F2C6D1' },

  // -- Food / culinary touches (very rare, slightly larger, slower) --
  { type: 'food', left: 12, delay: 6,  duration: 36, size: 22, emoji: '🍣' },
  { type: 'food', left: 38, delay: 13, duration: 33, size: 20, emoji: '🍜' },
  { type: 'food', left: 58, delay: 4,  duration: 38, size: 22, emoji: '🍙' },
  { type: 'food', left: 75, delay: 16, duration: 34, size: 18, emoji: '🍡' },
  { type: 'food', left: 26, delay: 22, duration: 40, size: 20, emoji: '🍣' },
];

export default function FallingDecorations() {
  return (
    <div className="falling-decorations" aria-hidden="true">
      {ITEMS.map((item, i) => {
        const style = {
          left: `${item.left}%`,
          animationDelay: `${item.delay}s`,
          animationDuration: `${item.duration}s`,
          fontSize: `${item.size}px`,
          width: item.type === 'sakura' ? `${item.size}px` : undefined,
          height: item.type === 'sakura' ? `${item.size}px` : undefined,
        };

        return (
          <span key={i} className={`falling-item falling-${item.type}`} style={style}>
            {item.type === 'sakura' ? (
              <SakuraPetal className="h-full w-full" color={item.color} />
            ) : (
              <span aria-hidden>{item.emoji}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
