import { useState } from 'react';

const FAQS = [
  {
    q: 'Comment fonctionne la génération d’itinéraire ?',
    a: "Vous décrivez votre voyage idéal — pays, durée, style, budget — et notre IA construit un plan complet jour par jour, avec transport, food, cafés, conseils locaux et erreurs à éviter. Sur cette V1, l’itinéraire affiché est une démo représentative.",
  },
  {
    q: 'Quels pays sont couverts ?',
    a: "Travel Pro Asia se concentre sur la Corée du Sud et le Japon : Séoul, Busan, Jeju d’un côté, Tokyo, Kyoto, Osaka, Okinawa de l’autre. Vous pouvez choisir l’un, l’autre, ou combiner les deux dans un même voyage.",
  },
  {
    q: 'Faut-il créer un compte ?',
    a: "Non. Aucun compte, aucun téléchargement, aucune installation. Vous décrivez votre voyage, vous obtenez votre itinéraire — c’est tout.",
  },
  {
    q: 'Les prix et horaires sont-ils garantis ?',
    a: "Non. Les informations de voyage évoluent constamment. Vérifiez toujours horaires, prix, transports et conditions d’entrée auprès des sources officielles avant de réserver.",
  },
  {
    q: 'Puis-je modifier mon itinéraire ?',
    a: "Bien sûr — c’est un guide, pas une prison. Suivez-le tel quel, ou adaptez-le selon votre rythme, la météo, vos coups de cœur sur place. C’est votre voyage.",
  },
  {
    q: 'Y a-t-il un abonnement ?',
    a: "Non. Paiement unique de 4,99 € par itinéraire. Aucun abonnement, aucun renouvellement automatique, aucun frais caché.",
  },
  {
    q: 'L’itinéraire est-il adapté aux familles / aux seniors ?',
    a: "Oui — il suffit de le préciser dans votre demande. L’IA adapte le rythme, les distances, les types d’activité et l’hébergement selon votre profil.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section scroll-mt-24">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="label-muted">FAQ</span>
            <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
              Tout ce que vous voulez savoir.
            </h2>
            <p className="mt-4 text-base text-muted">
              Vos questions, nos réponses. Si la vôtre n’est pas là, écrivez-nous —
              on aime parler de voyages.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border bg-white/85 backdrop-blur transition-all ${
                    isOpen ? 'border-navy/25 shadow-soft' : 'border-navy/10'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-medium text-navy">{f.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-navy/15 text-navy/70 transition-transform ${
                        isOpen ? 'rotate-45 bg-navy text-ivory' : ''
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="min-h-0">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-navy/80 sm:px-6 sm:pb-6">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
