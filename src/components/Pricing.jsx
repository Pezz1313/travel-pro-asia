const FEATURES = [
  'Itinéraire personnalisé jour par jour',
  'Corée du Sud, Japon ou les deux',
  'Transport, food, cafés, photo spots',
  'Conseils locaux et erreurs à éviter',
  'Estimation de budget détaillée',
  'Format facile à imprimer ou partager',
  'Aucun abonnement, paiement unique',
];

export default function Pricing() {
  return (
    <section id="pricing" className="section relative scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Tarif unique</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Un voyage sur-mesure pour le prix d’un café à Tokyo.
          </h2>
          <p className="mt-4 text-base text-muted">
            Un seul paiement, votre itinéraire à vie. Pas d’abonnement, pas de frais cachés.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-xl">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-sakura/35 via-transparent to-coral/15 blur-2xl" aria-hidden="true" />
            <article className="relative overflow-hidden rounded-[2rem] border border-navy/15 bg-white/95 p-8 shadow-premium backdrop-blur sm:p-10">
              <div className="absolute right-6 top-6 pill !border-gold/40 !bg-gold/10 !text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Recommandé
              </div>

              <div>
                <div className="label-muted">Itinéraire complet</div>
                <h3 className="h-serif mt-2 text-2xl">Pass voyageur</h3>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="h-serif text-6xl font-semibold text-navy">4,99</span>
                <span className="text-2xl text-navy/70">€</span>
                <span className="ml-2 text-sm text-muted">/ itinéraire</span>
              </div>
              <p className="mt-2 text-sm text-muted">Paiement unique. Aucun abonnement.</p>

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
                Créer mon itinéraire
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <p className="mt-4 text-center text-xs text-muted">
                Démo : aucun paiement réel sur cette V1.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
