import { useEffect, useRef, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoqlble';
const PAYHIP_CHECKOUT_URL = 'https://payhip.com/order?link=zKURA';

const DESTINATIONS = [
  { id: 'korea', emoji: '🇰🇷', label: 'Corée du Sud' },
  { id: 'japan', emoji: '🇯🇵', label: 'Japon' },
  { id: 'both', emoji: '🇰🇷🇯🇵', label: 'Corée + Japon' },
];

const DURATIONS = [
  'Moins de 7 jours',
  '7 à 10 jours',
  '10 à 14 jours',
  'Plus de 14 jours',
];

const BUDGETS = [
  'Moins de 1 500 €',
  '1 500 – 2 500 €',
  '2 500 – 4 000 €',
  'Plus de 4 000 €',
];

const INTERESTS = [
  'Food & street food',
  'Cafés & design',
  'Culture & temples',
  'Shopping',
  'Photo spots',
  'Nature',
  'Nightlife',
  'K-pop / J-pop',
  'Bien-être & onsen',
  'Famille',
];

const LEVELS = [
  { id: 'budget', label: 'Petit budget', hint: 'Auberges, transport local, food de rue' },
  { id: 'comfort', label: 'Confort', hint: 'Hôtels 3–4★, mix street food + restos' },
  { id: 'luxury', label: 'Luxe', hint: 'Hôtels 4–5★, kaiseki, expériences privées' },
];

const EMPTY_FORM = {
  firstName: '',
  email: '',
  destination: '',
  dates: '',
  duration: '',
  budget: '',
  interests: [],
  level: '',
  notes: '',
};

export default function PremiumForm({ itinerary, originalPrompt = '' }) {
  const [expanded, setExpanded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const formRef = useRef(null);
  const confirmRef = useRef(null);

  // Pre-fill destination + duration from the generated itinerary so the user
  // doesn't have to re-enter what they already told us.
  useEffect(() => {
    if (!itinerary) return;
    const destinationFromId = {
      'korea-7': 'korea',
      'japan-7': 'japan',
      'combined-10': 'both',
    }[itinerary.id] || '';

    const dayCount = itinerary.days?.length || 0;
    const durationFromDays =
      dayCount < 7 ? DURATIONS[0]
      : dayCount <= 10 ? DURATIONS[1]
      : dayCount <= 14 ? DURATIONS[2]
      : DURATIONS[3];

    setForm((prev) => ({
      ...prev,
      destination: prev.destination || destinationFromId,
      duration: prev.duration || durationFromDays,
    }));
  }, [itinerary]);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: typeof e === 'string' ? e : e.target.value }));

  const toggleInterest = (interest) =>
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter((i) => i !== interest)
        : [...f.interests, interest],
    }));

  const handleExpand = () => {
    setExpanded(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    const payload = buildPayload(form, itinerary, originalPrompt);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.errors?.map((err) => err.message).filter(Boolean).join(' · ') ||
          `Erreur ${res.status} — réessayez dans un instant.`;
        throw new Error(msg);
      }

      setSubmitted(true);
      requestAnimationFrame(() => {
        confirmRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch (err) {
      // Network errors land here too.
      const message =
        err?.message ||
        'Impossible d’envoyer votre demande pour le moment. Vérifiez votre connexion et réessayez.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setExpanded(false);
    setError(null);
    setForm(EMPTY_FORM);
  };

  if (!itinerary) return null;

  return (
    <section id="premium" className="scroll-mt-24 pb-12 pt-2">
      <div className="container-x">
        {!expanded ? (
          <CTACard onClick={handleExpand} />
        ) : !submitted ? (
          <div ref={formRef}>
            <FormCard
              form={form}
              update={update}
              toggleInterest={toggleInterest}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          </div>
        ) : (
          <div ref={confirmRef}>
            <ConfirmationCard form={form} onReset={handleReset} />
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- CTA ----------
function CTACard({ onClick }) {
  return (
    <div className="reveal relative overflow-hidden rounded-[2rem] border border-navy/15 bg-white/95 p-8 shadow-premium backdrop-blur sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sakura/40 via-transparent to-coral/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-gold/15 via-transparent to-transparent blur-3xl" aria-hidden="true" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="pill !border-coral/30 !bg-coral/10 !text-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse-soft" />
              Étape suivante
            </span>
            <span className="pill !bg-white/80">Aperçu démo terminé</span>
          </div>

          <h3 className="h-serif mt-4 text-3xl sm:text-4xl">
            Recevez votre itinéraire <em className="not-italic text-coral">complet et personnalisé</em>.
          </h3>

          <p className="mt-3 max-w-xl text-base text-navy/80">
            On affine votre voyage avec vos vraies dates, votre niveau et vos centres d’intérêt —
            puis on vous envoie un plan détaillé prêt à suivre, jour par jour.
          </p>

          <ul className="mt-5 grid gap-2 text-sm text-navy/85 sm:grid-cols-2">
            {[
              'Personnalisé sur vos dates & budget',
              'Conseils locaux + photo spots',
              'Format clair, imprimable, partageable',
              'Paiement unique, pas d’abonnement',
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-coral/15 text-coral">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-coral/25 bg-gradient-to-br from-coral/5 via-white/40 to-sakura/15 p-6">
          {/* Launch offer badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-coral">
            <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse-soft" />
            Offre de lancement
          </span>

          {/* Strikethrough former price */}
          <div className="mt-3 flex items-center gap-2 text-sm text-muted">
            <span>Prix normal</span>
            <span className="line-through decoration-coral/60 decoration-2 underline-offset-2">15,99 €</span>
          </div>

          {/* Big launch price */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="h-serif text-5xl font-semibold text-navy">4,99</span>
            <span className="text-xl text-navy/70">€</span>
          </div>

          <p className="mt-2 text-xs font-semibold text-coral">
            Prix bêta limité pour les premiers utilisateurs
          </p>
          <p className="mt-1 text-xs text-muted">
            Profite du tarif de lancement avant l’activation du prix final.
          </p>

          <button
            type="button"
            onClick={onClick}
            className="btn-primary mt-5 w-full !py-4 !text-base"
          >
            Recevoir mon itinéraire complet — 4,99 €
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p className="mt-3 text-center text-[11px] text-muted">
            Version test : aucun paiement n’est encore demandé.
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- FORM ----------
function FormCard({ form, update, toggleInterest, onSubmit, submitting, error }) {
  return (
    <form
      onSubmit={onSubmit}
      className="reveal relative overflow-hidden rounded-[2rem] border border-navy/15 bg-white/95 p-6 shadow-premium backdrop-blur sm:p-10"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-sakura/30 via-transparent to-gold/10 blur-3xl" aria-hidden="true" />

      <div className="relative">
        {/* Launch offer reminder banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-coral/25 bg-gradient-to-r from-coral/10 via-sakura/10 to-transparent px-4 py-3 text-sm">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-coral animate-pulse-soft" />
          <span className="text-navy/85">
            <strong className="font-semibold text-coral">Tu profites de l’offre de lancement :</strong>{' '}
            4,99 € au lieu de{' '}
            <span className="line-through decoration-coral/60">15,99 €</span>.
          </span>
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="label-muted">Demande premium</div>
            <h3 className="h-serif mt-1 text-2xl sm:text-3xl">
              Affinons votre itinéraire ensemble.
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Quelques détails et on vous prépare un plan vraiment sur-mesure.
              Tous les champs marqués <span className="text-coral">*</span> sont requis.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Prénom" required>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={update('firstName')}
              placeholder="Marie"
              className={inputClass}
              autoComplete="given-name"
            />
          </Field>

          <Field label="Email" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="marie@email.com"
              className={inputClass}
              autoComplete="email"
            />
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Destination" required>
            <div className="flex flex-wrap gap-2">
              {DESTINATIONS.map((d) => (
                <Chip
                  key={d.id}
                  active={form.destination === d.id}
                  onClick={() => update('destination')(d.id)}
                >
                  <span aria-hidden>{d.emoji}</span>
                  {d.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Dates approximatives" hint="Mois ou saison">
            <input
              type="text"
              value={form.dates}
              onChange={update('dates')}
              placeholder="Ex : avril 2026, automne…"
              className={inputClass}
            />
          </Field>

          <Field label="Durée du voyage">
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <Chip key={d} active={form.duration === d} onClick={() => update('duration')(d)}>
                  {d}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Budget approximatif" hint="Hors vol international">
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <Chip key={b} active={form.budget === b} onClick={() => update('budget')(b)}>
                  {b}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Centres d’intérêt" hint="Sélectionnez tout ce qui vous parle">
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map((i) => (
                <Chip
                  key={i}
                  active={form.interests.includes(i)}
                  onClick={() => toggleInterest(i)}
                >
                  {i}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Niveau de voyage">
            <div className="grid gap-2 sm:grid-cols-3">
              {LEVELS.map((l) => {
                const active = form.level === l.id;
                return (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => update('level')(l.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      active
                        ? 'border-navy bg-navy text-ivory shadow-soft'
                        : 'border-navy/15 bg-white/70 text-navy hover:border-navy/30 hover:bg-white'
                    }`}
                  >
                    <div className="text-sm font-semibold">{l.label}</div>
                    <div className={`mt-1 text-xs ${active ? 'text-ivory/75' : 'text-muted'}`}>
                      {l.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Field label="Ajoutez des détails importants" hint="Allergies, accessibilité, occasions spéciales…">
            <textarea
              rows={4}
              value={form.notes}
              onChange={update('notes')}
              placeholder="Ex : voyage de noces, allergique aux fruits de mer, préfère éviter les longs trajets en avion…"
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 rounded-2xl border border-coral/30 bg-coral/5 px-4 py-3 text-sm text-coral"
          >
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral/20">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M12 8v5M12 16.5v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">L’envoi a échoué</div>
              <div className="text-coral/90">{error}</div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            Version test : le paiement sécurisé sera ajouté à l’étape suivante.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary !px-8 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
                Envoi en cours…
              </>
            ) : (
              <>
                Envoyer ma demande premium
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 12l16-8-6 16-2-6-8-2z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

// ---------- CONFIRMATION ----------
function ConfirmationCard({ form, onReset }) {
  return (
    <div className="reveal relative overflow-hidden rounded-[2rem] border border-navy/15 bg-white/95 p-8 text-center shadow-premium backdrop-blur sm:p-12">
      <div className="pointer-events-none absolute -inset-2 bg-gradient-to-br from-sakura/30 via-transparent to-coral/15 opacity-70 blur-2xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-2xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-coral/15 text-coral">
          <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
            <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="h-serif mt-6 text-3xl sm:text-4xl">Demande reçue.</h3>
        <p className="mt-3 text-base text-navy/80">
          {form.firstName ? `${form.firstName}, votre demande est bien enregistrée. ` : 'Votre demande est bien enregistrée. '}
          Pour recevoir votre itinéraire personnalisé complet, dernière étape :
          finalisez le paiement sécurisé.
        </p>

        {form.email && (
          <p className="mt-2 text-xs text-muted">
            Votre itinéraire sera envoyé à <span className="font-medium text-navy">{form.email}</span> après confirmation du paiement.
          </p>
        )}

        {/* ---- Payment block (Payhip) ---- */}
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-coral/25 bg-gradient-to-br from-coral/5 via-white/40 to-sakura/15 p-6 text-left">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-coral/30 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-coral">
              <span className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse-soft" />
              Dernière étape
            </span>
            <div className="flex items-baseline gap-1.5 text-sm text-muted">
              <span className="line-through decoration-coral/60 decoration-2 underline-offset-2">15,99 €</span>
              <span className="text-navy">→</span>
              <span className="h-serif text-2xl font-semibold text-navy">4,99 €</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-navy/85">
            Réglez votre <strong className="font-semibold">Pass voyageur</strong> au tarif de lancement.
            Vous recevrez votre itinéraire personnalisé complet dès la confirmation du paiement.
          </p>

          <a
            href={PAYHIP_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full !py-4 !text-base"
          >
            Payer mon itinéraire — 4,99 €
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M14 5h5v5M19 5L10 14M5 5h5M5 5v14h14v-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
            <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden="true">
              <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" fill="none" />
            </svg>
            Paiement sécurisé via Payhip · ouvre dans un nouvel onglet
          </p>
        </div>

        {form.interests.length > 0 || form.destination || form.duration || form.dates || form.budget || form.level ? (
          <div className="mx-auto mt-8 grid max-w-md gap-2 text-left text-xs text-muted">
            {form.destination && <SummaryLine label="Destination" value={destinationLabel(form.destination)} />}
            {form.duration && <SummaryLine label="Durée" value={form.duration} />}
            {form.dates && <SummaryLine label="Dates" value={form.dates} />}
            {form.budget && <SummaryLine label="Budget" value={form.budget} />}
            {form.level && <SummaryLine label="Niveau" value={levelLabel(form.level)} />}
            {form.interests.length > 0 && (
              <SummaryLine label="Intérêts" value={form.interests.join(' · ')} />
            )}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={onReset} className="btn-ghost">
            Modifier ma demande
          </button>
          <a href="#top" className="btn-ghost">
            Retour en haut
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------- UI primitives ----------
const inputClass =
  'w-full rounded-2xl border border-navy/15 bg-ivory/60 px-4 py-3 text-sm text-navy outline-none transition-all placeholder:text-muted/70 focus:border-navy/40 focus:bg-white focus:shadow-soft';

function Field({ label, hint, required, children }) {
  return (
    <label className="block">
      <span className="flex items-baseline gap-2">
        <span className="label-muted">
          {label}
          {required && <span className="text-coral"> *</span>}
        </span>
        {hint && <span className="text-[10px] text-muted/80">— {hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-chip ${active ? '!border-navy !bg-navy !text-ivory' : ''}`}
    >
      {children}
    </button>
  );
}

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-navy/10 bg-ivory/60 px-3 py-2">
      <span className="label-muted">{label}</span>
      <span className="text-right text-navy/80">{value}</span>
    </div>
  );
}

function destinationLabel(id) {
  return DESTINATIONS.find((d) => d.id === id)?.label || id || '';
}
function levelLabel(id) {
  return LEVELS.find((l) => l.id === id)?.label || id || '';
}

// Build the Formspree payload. Keys are sent in clear French so the email
// received in Formspree's inbox is readable as-is, without any extra mapping.
function buildPayload(form, itinerary, originalPrompt) {
  const destination = destinationLabel(form.destination);
  const subjectName = form.firstName ? form.firstName : 'Anonyme';
  const subjectDest = destination || 'Corée / Japon';

  return {
    // Formspree special fields
    _subject: `Travel Pro Asia — Nouvelle demande premium · ${subjectName} · ${subjectDest}`,
    _replyto: form.email || '',

    // User-entered fields
    prenom: form.firstName,
    email: form.email,
    destination,
    dates_approximatives: form.dates,
    duree_voyage: form.duration,
    budget_approximatif: form.budget,
    centres_interet: form.interests.join(', '),
    niveau_voyage: levelLabel(form.level),
    details_importants: form.notes,

    // Context from the demo step
    demande_originale: originalPrompt || '',
    itineraire_titre: itinerary?.title || '',
    itineraire_resume: itinerary?.summary || '',
    itineraire_complet: itinerary ? formatItinerary(itinerary) : '',
  };
}

// Render the generated itinerary as a readable plain-text block so it lands
// nicely formatted inside the Formspree email notification.
function formatItinerary(it) {
  const lines = [];
  lines.push(it.title);
  lines.push('');
  lines.push('— Résumé —');
  lines.push(it.summary);
  lines.push('');
  lines.push('— Programme jour par jour —');
  (it.days || []).forEach((d) => {
    lines.push(`J${d.day} · ${d.city} · ${d.title}`);
    (d.items || []).forEach((item) => lines.push(`  - ${item}`));
    lines.push('');
  });
  if (it.transport?.length) {
    lines.push('— Transport —');
    it.transport.forEach((t) => lines.push(`  - ${t}`));
    lines.push('');
  }
  if (it.food?.length) {
    lines.push('— Food & cafés —');
    it.food.forEach((f) => lines.push(`  - ${f}`));
    lines.push('');
  }
  if (it.budget) {
    lines.push('— Budget —');
    lines.push(`Total estimé : ${it.budget.total} ${it.budget.currency} (≈ ${it.budget.perDay} / jour)`);
    (it.budget.breakdown || []).forEach((b) => lines.push(`  - ${b.label} : ${b.value}`));
    lines.push('');
  }
  if (it.tips?.length) {
    lines.push('— Conseils pratiques —');
    it.tips.forEach((t) => lines.push(`  - ${t}`));
    lines.push('');
  }
  if (it.mistakes?.length) {
    lines.push('— Erreurs à éviter —');
    it.mistakes.forEach((m) => lines.push(`  - ${m}`));
    lines.push('');
  }
  if (it.upgrades?.length) {
    lines.push('— Options à upgrader —');
    it.upgrades.forEach((u) => lines.push(`  - ${u}`));
  }
  return lines.join('\n');
}
