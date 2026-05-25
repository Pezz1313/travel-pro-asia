import { Ornament } from './Decorations.jsx';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-navy/10 bg-ivory/60 backdrop-blur">
      <div className="container-x py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-ivory">
                <svg viewBox="0 0 24 24" className="h-5 w-5">
                  <path d="M3 17 Q 12 4 21 17" stroke="#F2C6D1" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                  <circle cx="12" cy="11" r="1.4" fill="#D9594C" />
                </svg>
              </span>
              <div className="leading-tight">
                <div className="h-serif text-base">Travel Pro Asia</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted">Korea · Japan</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Des itinéraires sur-mesure pour la Corée du Sud et le Japon,
              construits par IA, pensés pour les vrais voyageurs.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Social href="#" label="Instagram" />
              <Social href="#" label="TikTok" />
              <Social href="#" label="YouTube" />
            </div>
          </div>

          <FooterCol
            title="Produit"
            links={[
              ['Comment ça marche', '#how'],
              ['Destinations', '#destinations'],
              ['Tarifs', '#pricing'],
              ['FAQ', '#faq'],
            ]}
          />
          <FooterCol
            title="Pays"
            links={[
              ['Corée du Sud', '#destinations'],
              ['Japon', '#destinations'],
              ['Voyages combinés', '#builder'],
              ['Conseils locaux', '#how'],
            ]}
          />
          <FooterCol
            title="Légal"
            links={[
              ['Mentions légales', '#'],
              ['Confidentialité', '#'],
              ['CGV', '#'],
            ]}
          />
        </div>

        <Ornament className="my-10 opacity-60" />

        <div className="rounded-2xl border border-navy/10 bg-white/70 p-5 text-xs leading-relaxed text-muted sm:p-6">
          <strong className="font-semibold text-navy">Avertissement :</strong>{' '}
          Les informations de voyage peuvent changer. Vérifiez les horaires, prix,
          transports et conditions d’entrée avant toute réservation.
        </div>

        {/* Contact line — discrete, with mailto */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-navy/60" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
            <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
          </svg>
          <span>Contact :</span>
          <a
            href="mailto:travelproasia.contact@gmail.com"
            className="text-navy/85 transition-colors hover:text-navy hover:underline"
          >
            travelproasia.contact@gmail.com
          </a>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Travel Pro Asia. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span>Itinéraires sur-mesure pour la Corée et le Japon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="label-muted">{title}</div>
      <ul className="mt-4 space-y-2">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-navy/80 transition-colors hover:text-navy">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Social({ href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 bg-white/80 text-navy/70 transition-colors hover:border-navy/30 hover:text-navy"
    >
      <span className="text-[10px] font-semibold tracking-wider">{label.slice(0, 2).toUpperCase()}</span>
    </a>
  );
}
