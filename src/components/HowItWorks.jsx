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
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Comment ça marche</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Trois étapes, douze secondes.
          </h2>
          <p className="mt-4 text-base text-muted">
            Aucun compte, aucun téléchargement. Tout se passe ici, en quelques clics.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <article key={s.n} className="card card-hover relative overflow-hidden p-7">
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-sakura/15 blur-2xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-serif text-navy/15">{s.n}</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-ivory">
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
    </section>
  );
}
