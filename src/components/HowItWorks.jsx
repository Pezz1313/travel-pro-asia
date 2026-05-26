const STEPS = [
  {
    n: '01',
    title: 'Décrivez votre voyage',
    text: 'Pays, durée, budget, style, intérêts. Un texte libre suffit — notre IA comprend votre intention.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M4 5h16v12H7l-3 3V5z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'L’IA construit votre itinéraire',
    text: 'Jour par jour, avec transport, food, cafés, conseils locaux et erreurs à éviter — adapté à votre rythme.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Vous voyagez sereinement',
    text: 'Vous récupérez un plan clair, prêt à suivre — ou à adapter en route. Pensé pour les vrais voyageurs.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="10" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section relative scroll-mt-24">
      {/* Full-width alternating cream background */}
      <div className="pointer-events-none absolute inset-0 bg-cream/50" aria-hidden="true" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Comment ça marche</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Trois étapes, douze secondes.
          </h2>
          <p className="mt-4 text-base text-muted">
            Sans inscription, directement depuis votre navigateur. Tout se passe ici, en quelques clics.
          </p>
        </div>

        {/* Step cards with a subtle connector on desktop */}
        <div className="relative mt-14">
          {/* Connector line between step icons — desktop only */}
          <div
            aria-hidden="true"
            className="absolute hidden h-px md:block"
            style={{
              top: '52px',
              left: 'calc(100% / 3 / 2)',
              right: 'calc(100% / 3 / 2)',
              background: 'linear-gradient(90deg, transparent, rgba(15,27,61,0.18) 15%, rgba(15,27,61,0.18) 85%, transparent)',
            }}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <article key={s.n} className="card card-hover relative overflow-hidden p-7">
                {/* Large decorative watermark number */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -bottom-4 select-none font-serif font-bold leading-none text-navy/[0.045]"
                  style={{ fontSize: '7rem' }}
                >
                  {s.n}
                </div>

                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-sakura/20 blur-2xl" aria-hidden="true" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl font-medium text-navy/10">{s.n}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-ivory shadow-soft">
                      {s.icon}
                    </span>
                  </div>
                  <h3 className="h-serif mt-5 text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy/75">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
