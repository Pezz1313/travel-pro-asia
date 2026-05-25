const FEATURES = [
  'Itinéraire personnalisé selon tes envies',
  'Plan jour par jour',
  'Conseils transport, food, budget et erreurs à éviter',
  'Version complète envoyée après validation',
  'Paiement sécurisé bientôt disponible',
];

export default function Pricing() {
  return (
    <section id="pricing" className="section relative scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Offre de lancement</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Un voyage sur-mesure pour le prix d’un café à Tokyo.
          </h2>
          <p className="mt-4 text-base text-muted">
            Tarif réservé aux premiers voyageurs. Pas d’abonnement, pas de frais cachés.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-sakura/35 via-transparent to-coral/15 blur-2xl" aria-hidden="true" />

            <article className="relative overflow-hidden rounded-[2rem] border border-navy/15 bg-white/95 shadow-premium backdrop-blur">
              {/* Launch banner */}
              <div className="flex flex-col items-center gap-1 border-b border-navy/10 bg-gradient-to-r from-coral/10 via-sakura/15 to-gold/10 px-6 py-3 text-center sm:flex-row sm:justify-center sm:gap-3">
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-coral">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse-soft" />
                  Offre de lancement pour les premiers utilisateurs
                </span>
                <span className="hidden h-3 w-px bg-navy/15 sm:block" />
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Prix bêta limité
                </span>
              </div>

              <div className="p-8 sm:p-10">
                <div>
                  <div className="label-muted">Pass voyageur</div>
                  <h3 className="h-serif mt-2 text-2xl">Itinéraire complet</h3>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <span>Prix normal</span>
                    <span className="line-through decoration-coral/60 decoration-2 underline-offset-2">15,99 €</span>
                  </div>

                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="h-serif text-6xl font-semibold text-navy">4,99</span>
                    <span className="text-2xl text-navy/70">€</span>
                    <span className="ml-2 text-sm text-muted">/ itinéraire</span>
                  </div>

                  <p className="mt-3 rounded-2xl border border-coral/20 bg-coral/5 px-4 py-2.5 text-sm text-navy/85">
                    Profite du tarif de lancement avant l’activation du prix final.
                  </p>
                </div>

                <div className="my-7 divider-asia" />

                <ul className="space-y-3 text-sm text-navy/85">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-coral/15 text-coral">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                          <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a href="#builder" className="btn-primary mt-8 w-full !py-4 !text-base">
                  Recevoir mon itinéraire complet — 4,99 €
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>

                <p className="mt-4 text-center text-xs text-muted">
                  Version test : aucun paiement n’est encore demandé.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
