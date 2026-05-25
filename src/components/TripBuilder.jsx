import { useState } from 'react';

const SUGGESTIONS = [
  '10 jours Corée du Sud + Japon en couple',
  '1 semaine à Tokyo et Kyoto, foodie + design',
  '7 jours en Corée, cafés, K-pop et palais',
  '5 jours à Tokyo, première fois, budget moyen',
  '2 semaines Corée + Japon, immersion culturelle',
];

const COUNTRIES = [
  { id: 'auto', label: 'Les deux', emoji: '🇰🇷🇯🇵' },
  { id: 'korea', label: 'Corée du Sud', emoji: '🇰🇷' },
  { id: 'japan', label: 'Japon', emoji: '🇯🇵' },
];

const DURATIONS = [5, 7, 10, 14];

const BUDGETS = [
  { id: 'eco', label: 'Routard' },
  { id: 'mid', label: 'Confort' },
  { id: 'premium', label: 'Premium' },
];

export default function TripBuilder({ onGenerate, loading }) {
  const [prompt, setPrompt] = useState('');
  const [country, setCountry] = useState('auto');
  const [duration, setDuration] = useState(7);
  const [budget, setBudget] = useState('mid');

  const submit = (e) => {
    e?.preventDefault?.();
    if (loading) return;
    const text =
      prompt.trim() ||
      `${duration} jours ${country === 'korea' ? 'en Corée du Sud' : country === 'japan' ? 'au Japon' : 'en Corée + Japon'}, niveau ${budget}.`;
    onGenerate(text, { country, duration, budget });
  };

  return (
    <section id="builder" className="relative scroll-mt-24">
      <div className="container-x">
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sakura/30 via-white/0 to-gold/20 opacity-70 blur-2xl" aria-hidden="true" />

          <form
            onSubmit={submit}
            className="relative rounded-[2rem] border border-navy/10 bg-white/95 p-6 shadow-premium backdrop-blur sm:p-10"
          >
            <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="label-muted">Votre demande de voyage</div>
                <h2 className="h-serif mt-1 text-2xl sm:text-3xl">
                  Racontez-nous votre voyage idéal.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="h-2 w-2 rounded-full bg-coral animate-pulse-soft" />
                IA prête
              </div>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex : 10 jours en couple, Tokyo + Kyoto + Séoul, on aime les cafés design, la street food et les vieux temples. Budget confort."
                rows={5}
                className="w-full resize-none rounded-2xl border border-navy/10 bg-ivory/60 p-5 text-base text-navy outline-none transition-all placeholder:text-muted/80 focus:border-navy/30 focus:bg-white focus:shadow-soft"
              />
              <div className="pointer-events-none absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.18em] text-muted">
                {prompt.length}/500
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="self-center text-[11px] uppercase tracking-[0.18em] text-muted">Suggestions :</span>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setPrompt(s)}
                  className="btn-chip"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <div className="label-muted mb-2">Pays</div>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCountry(c.id)}
                      className={`btn-chip ${country === c.id ? '!border-navy !bg-navy !text-ivory' : ''}`}
                    >
                      <span aria-hidden>{c.emoji}</span>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="label-muted mb-2">Durée</div>
                <div className="flex flex-wrap gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`btn-chip ${duration === d ? '!border-navy !bg-navy !text-ivory' : ''}`}
                    >
                      {d} jours
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="label-muted mb-2">Budget</div>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudget(b.id)}
                      className={`btn-chip ${budget === b.id ? '!border-navy !bg-navy !text-ivory' : ''}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted">
                Démo : aucun paiement, aucun compte, aucune API IA réelle. L’itinéraire affiché est un exemple représentatif.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary !px-8 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
                    Construction en cours…
                  </>
                ) : (
                  <>
                    Générer mon itinéraire
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
