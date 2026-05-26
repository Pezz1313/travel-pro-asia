import { FloatingSakura, KoreaBadge, JapanBadge, Ornament } from './Decorations.jsx';
import HeroVisual from './HeroVisual.jsx';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div className="absolute inset-0 bg-bojagi opacity-50" aria-hidden="true" />
      <FloatingSakura />

      <div className="container-x relative grid items-center gap-12 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-28">
        <div className="relative animate-fade-in-up">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <KoreaBadge />
            <JapanBadge />
            <span className="pill !border-gold/30 !bg-gold/10 !text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
              Itinéraires IA premium
            </span>
          </div>

          <h1 className="h-serif text-[2.2rem] leading-[1.08] sm:text-5xl lg:text-[3.8rem]">
            Le voyage <em className="not-italic text-coral">de vos rêves</em>
            <br />
            en Corée &amp; au Japon,
            <br />
            <span className="text-navy/80">imaginé en quelques secondes.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            Décrivez votre voyage idéal. Notre IA construit un itinéraire personnalisé,
            jour par jour, avec transport, food, cafés et conseils locaux — pensé pour
            la Corée du Sud et le Japon.
          </p>

          {/* Launch offer pastille — discrete but visible right above the CTAs */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-coral/10 px-3.5 py-1.5 text-xs font-semibold text-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse-soft" />
              Offre de lancement : 4,99 €
              <span className="ml-1 font-medium text-coral/70 line-through decoration-coral/60">au lieu de 15,99 €</span>
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#builder" className="btn-primary">
              Créer mon itinéraire
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#destinations" className="btn-ghost">Voir les destinations</a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              4 villes phares
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sakura-deep" />
              Conseils locaux
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Sur-mesure jour par jour
            </span>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sakura/30 via-transparent to-gold/10 blur-2xl" />
          <div className="relative rounded-[2rem] border border-navy/10 bg-white/40 p-3 shadow-premium backdrop-blur">
            <HeroVisual className="h-full w-full rounded-3xl" />
          </div>

          <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-navy/10 bg-white/95 px-4 py-3 shadow-card backdrop-blur sm:flex sm:items-center sm:gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-coral/15 text-coral">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.6" fill="none" />
                <circle cx="12" cy="10" r="2.5" fill="currentColor" />
              </svg>
            </span>
            <div className="text-xs">
              <div className="font-semibold text-navy">Séoul → Kyoto</div>
              <div className="text-muted">Itinéraire en 12 secondes</div>
            </div>
          </div>
        </div>
      </div>

      <Ornament className="pb-8 opacity-70" />
    </section>
  );
}
