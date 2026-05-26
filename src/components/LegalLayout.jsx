import { useEffect } from 'react';
import Footer from './Footer.jsx';
import FallingDecorations from './FallingDecorations.jsx';
import { Ornament } from './Decorations.jsx';
import { RouteLink } from '../lib/router.jsx';

// Shared shell for the 3 legal pages. Slim header (no marketing nav), large
// reading zone, full site Footer reused as-is.
export default function LegalLayout({ eyebrow = 'Légal', title, children }) {
  // Update tab title for legal pages
  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — Travel Pro Asia`;
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="relative min-h-screen">
      <FallingDecorations />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Slim header */}
        <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory/85 backdrop-blur-md">
          <div className="container-x flex h-16 items-center justify-between sm:h-20">
            <RouteLink to="/" className="group flex items-center gap-2.5">
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
            </RouteLink>

            <RouteLink to="/" className="btn-ghost !py-2 !text-xs">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Retour à l’accueil
            </RouteLink>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 pt-12 pb-20 sm:pt-16 sm:pb-28">
          <div className="container-x">
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <span className="label-muted">{eyebrow}</span>
                <h1 className="h-serif mt-3 text-4xl sm:text-5xl">{title}</h1>
                <Ornament className="mt-6 opacity-80" />
              </div>

              <article className="mt-12 space-y-10 text-base leading-relaxed text-navy/80">
                {children}
              </article>

              <div className="mt-14 flex justify-center">
                <RouteLink to="/" className="btn-ghost">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Retour à l’accueil
                </RouteLink>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

// Lightweight section + list primitives used by the 3 legal pages.

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="h-serif text-2xl text-navy sm:text-3xl">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalEmail({ children = 'travelproasia.contact@gmail.com' }) {
  return (
    <a
      href={`mailto:${children}`}
      className="font-medium text-navy underline decoration-coral/60 decoration-2 underline-offset-2 transition-colors hover:decoration-coral"
    >
      {children}
    </a>
  );
}
