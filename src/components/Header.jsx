import { useEffect, useState } from 'react';

const NAV = [
  { href: '#destinations', label: 'Destinations' },
  { href: '#how', label: 'Comment ça marche' },
  { href: '#pricing', label: 'Tarifs' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{ transition: 'background-color 250ms ease, border-color 250ms ease, backdrop-filter 250ms ease' }}
      className={`fixed inset-x-0 top-0 z-50 ${
        scrolled ? 'bg-ivory/85 backdrop-blur-md border-b border-navy/10' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="group flex items-center gap-2.5" style={{ transition: 'opacity 150ms ease' }}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-ivory shadow-soft">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path d="M3 17 Q 12 4 21 17" stroke="#F2C6D1" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx="12" cy="11" r="1.4" fill="#D9594C" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="h-serif text-base sm:text-lg">Travel Pro Asia</span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted">Korea · Japan</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-navy/80 transition-colors hover:text-navy"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a href="#builder" className="btn-primary !px-5 !py-2.5 !text-xs">
            Créer mon voyage
          </a>
        </div>

        {/* Hamburger — crossfade icons with scale press feedback */}
        <button
          aria-label={open ? 'Fermer le menu' : 'Menu'}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full border border-navy/15 bg-white/80 md:hidden"
          style={{ transition: 'transform 100ms ease-out' }}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative flex h-5 w-5 items-center justify-center">
            {/* Hamburger bars */}
            <svg
              viewBox="0 0 24 24"
              className="absolute h-5 w-5"
              aria-hidden="true"
              style={{
                opacity: open ? 0 : 1,
                transform: open ? 'scale(0.75) rotate(-90deg)' : 'scale(1) rotate(0deg)',
                transition: 'opacity 160ms ease, transform 160ms cubic-bezier(0.23,1,0.32,1)',
              }}
            >
              <path d="M4 7h16" stroke="#0F1B3D" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12h16" stroke="#0F1B3D" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 17h16" stroke="#0F1B3D" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {/* Close X — appears 60ms after hamburger fades out */}
            <svg
              viewBox="0 0 24 24"
              className="absolute h-5 w-5"
              aria-hidden="true"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.75) rotate(90deg)',
                transition: 'opacity 160ms ease 60ms, transform 160ms cubic-bezier(0.23,1,0.32,1) 60ms',
              }}
            >
              <path d="M6 6l12 12M18 6L6 18" stroke="#0F1B3D" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile menu — grid-rows trick for smooth open/close without JS measurement */}
      <div
        aria-hidden={!open}
        className="md:hidden overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          opacity: open ? 1 : 0,
          transition: open
            ? 'grid-template-rows 220ms cubic-bezier(0.23,1,0.32,1), opacity 180ms ease'
            : 'grid-template-rows 160ms cubic-bezier(0.23,1,0.32,1), opacity 120ms ease',
        }}
      >
        <div className="min-h-0 border-t border-navy/10 bg-ivory/95 backdrop-blur-md">
          <nav className="container-x flex flex-col py-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                tabIndex={open ? 0 : -1}
                className="py-3 text-sm font-medium text-navy/80"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#builder"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 !w-full !py-3"
            >
              Créer mon voyage
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
