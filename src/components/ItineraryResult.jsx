import { Ornament } from './Decorations.jsx';

export default function ItineraryResult({ itinerary, loading }) {
  if (!loading && !itinerary) return null;

  return (
    <section id="result" className="scroll-mt-24 pb-8 pt-8">
      <div className="container-x">
        {loading ? <LoadingState /> : <Result itinerary={itinerary} />}
      </div>
    </section>
  );
}

function LoadingState() {
  const steps = [
    'Analyse de votre demande…',
    'Sélection des villes et du rythme…',
    'Construction du planning jour par jour…',
    'Recommandations food, cafés et transport…',
    'Finalisation des conseils locaux…',
  ];
  return (
    <div className="reveal mx-auto max-w-3xl rounded-3xl border border-navy/10 bg-white/85 p-8 shadow-card backdrop-blur sm:p-10">
      <div className="flex items-center gap-3">
        <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-coral" />
        <span className="label-muted">Votre itinéraire se construit</span>
      </div>
      <h3 className="h-serif mt-3 text-2xl">L’IA imagine votre voyage…</h3>
      <ul className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3 text-sm text-navy/80">
            <span
              className="h-1.5 w-1.5 rounded-full bg-navy/30"
              style={{ animation: `pulseSoft 1.4s ease-in-out ${i * 0.18}s infinite` }}
            />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-coral via-sakura-deep to-gold" />
      </div>
    </div>
  );
}

function Result({ itinerary }) {
  const accentBg =
    itinerary.accent === 'coral'
      ? 'from-coral/15 via-transparent to-gold/10'
      : itinerary.accent === 'sakura'
      ? 'from-sakura/30 via-transparent to-gold/10'
      : 'from-sakura/25 via-transparent to-coral/10';

  return (
    <div className="reveal space-y-6">
      {/* Header card */}
      <div className={`relative overflow-hidden rounded-3xl border border-navy/10 bg-white/95 p-7 shadow-card backdrop-blur sm:p-10`}>
        <div className={`pointer-events-none absolute -inset-2 bg-gradient-to-br ${accentBg} opacity-80 blur-2xl`} />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="pill">
              <span aria-hidden>{itinerary.flagEmoji}</span>
              Itinéraire personnalisé
            </span>
            <span className="pill !border-coral/30 !bg-coral/10 !text-coral">Aperçu gratuit</span>
          </div>
          <h3 className="h-serif mt-4 text-3xl sm:text-4xl">{itinerary.title}</h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy/80">
            {itinerary.summary}
          </p>

          {itinerary.personalNote && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-coral/25 bg-coral/5 px-4 py-3 text-sm text-navy/85">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral animate-pulse-soft" />
              <span>
                <strong className="font-semibold text-coral">D’après votre demande :</strong>{' '}
                {itinerary.personalNote.replace(/^Aperçu adapté à votre demande\s*:\s*/, '')}
              </span>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Stat label="Villes" value={[...new Set(itinerary.days.flatMap((d) => d.city.split(' → ')))].length} />
            <Stat label="Jours" value={itinerary.days.length} />
            <Stat label="Budget estimé" value={`${itinerary.budget.total} ${itinerary.budget.currency}`} />
          </div>
        </div>
      </div>

      {/* Day by day */}
      <div className="reveal reveal-delay-1">
        <SectionTitle eyebrow="Programme" title="Jour par jour" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {itinerary.days.map((d) => (
            <article
              key={d.day}
              className="card card-hover p-6"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-semibold text-ivory">
                  J{d.day}
                </span>
                <span className="pill !py-1 !text-[10px]">{d.city}</span>
              </div>
              <h4 className="h-serif mt-4 text-xl">{d.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-navy/80">
                {d.items.map((it, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-coral" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* Transport + Food */}
      <div className="reveal reveal-delay-2 grid gap-4 md:grid-cols-2">
        <PanelList
          title="Transport"
          eyebrow="Déplacements"
          items={itinerary.transport}
          icon={
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <rect x="4" y="3" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <circle cx="9" cy="14" r="1.2" fill="currentColor" />
              <circle cx="15" cy="14" r="1.2" fill="currentColor" />
              <path d="M8 21l-2 2M16 21l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          }
        />
        <PanelList
          title="Food & cafés"
          eyebrow="À goûter absolument"
          items={itinerary.food}
          icon={
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M4 12c0-4 4-8 8-8s8 4 8 8H4z" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M4 12h16v3a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-3z" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M9 4v-2M12 4v-2M15 4v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      {/* Budget */}
      <div className="reveal reveal-delay-3 rounded-3xl border border-navy/10 bg-white/85 p-7 shadow-soft backdrop-blur sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="label-muted">Budget</div>
            <h4 className="h-serif mt-1 text-2xl">Estimation par personne</h4>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-navy">{itinerary.budget.total} {itinerary.budget.currency}</div>
            <div className="text-xs text-muted">≈ {itinerary.budget.perDay} {itinerary.budget.currency} / jour</div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {itinerary.budget.breakdown.map((b) => (
            <div key={b.label} className="flex items-center justify-between rounded-xl border border-navy/10 bg-ivory/60 px-4 py-3">
              <span className="text-sm text-navy/80">{b.label}</span>
              <span className="text-sm font-medium text-navy">{b.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips + mistakes + upgrades */}
      <div className="reveal reveal-delay-4 grid gap-4 md:grid-cols-3">
        <SmallPanel
          tone="gold"
          title="Conseils pratiques"
          items={itinerary.tips}
        />
        <SmallPanel
          tone="coral"
          title="Erreurs à éviter"
          items={itinerary.mistakes}
        />
        <SmallPanel
          tone="sakura"
          title="Options à upgrader"
          items={itinerary.upgrades}
        />
      </div>

      <Ornament className="pt-6 opacity-70" />

      <p className="mx-auto max-w-2xl text-center text-xs text-muted">
        Cet aperçu vous donne un premier fil conducteur pour votre voyage. La version complète,
        détaillée et personnalisée, vous est envoyée en PDF après validation et paiement.
        Les horaires, prix et disponibilités peuvent évoluer — vérifiez avant toute réservation.
      </p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-ivory/60 px-4 py-3">
      <div className="label-muted">{label}</div>
      <div className="mt-1 text-xl font-semibold text-navy">{value}</div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mt-4 flex items-end justify-between gap-4">
      <div>
        <div className="label-muted">{eyebrow}</div>
        <h3 className="h-serif mt-1 text-2xl sm:text-3xl">{title}</h3>
      </div>
    </div>
  );
}

function PanelList({ title, eyebrow, items, icon }) {
  return (
    <div className="card p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-navy text-ivory">{icon}</span>
        <div>
          <div className="label-muted">{eyebrow}</div>
          <div className="h-serif text-xl">{title}</div>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-navy/80">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-coral" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SmallPanel({ tone, title, items }) {
  const toneClass =
    tone === 'gold'
      ? 'border-gold/30 bg-gold/5'
      : tone === 'coral'
      ? 'border-coral/30 bg-coral/5'
      : 'border-sakura-deep/30 bg-sakura/10';
  return (
    <div className={`rounded-3xl border ${toneClass} p-6`}>
      <h4 className="h-serif text-lg">{title}</h4>
      <ul className="mt-3 space-y-2 text-sm text-navy/80">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy/40" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
