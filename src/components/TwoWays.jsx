import { HanokRoof, Torii } from './Decorations.jsx';

export default function TwoWays() {
  return (
    <section className="section relative scroll-mt-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="label-muted">Deux façons de voyager</span>
          <h2 className="h-serif mt-3 text-3xl sm:text-5xl">
            Deux pays, deux univers.
          </h2>
          <p className="mt-4 text-base text-muted">
            Choisissez votre style — ou les deux. Nos itinéraires s’adaptent à votre rythme, vos passions et votre budget.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <WayCard
            country="🇰🇷 Corée du Sud"
            title="Moderne &amp; traditionnelle"
            description="Entre palais Joseon et néons de Gangnam, hanok et cafés design de Seongsu — la Corée joue les contrastes avec élégance."
            bullets={[
              'Palais royaux et villages hanok',
              'Cafés design de Seongsu & Yeonnam',
              'K-pop, K-drama, K-beauty',
              'Plages de Busan, Jeju en option',
              'Food : BBQ, bibimbap, street food',
            ]}
            accent="sakura"
            visual={<HanokRoof className="h-20 w-full" />}
          />
          <WayCard
            country="🇯🇵 Japon"
            title="Urbain &amp; culturel"
            description="Tokyo électrique, Kyoto sereine. Du teamLab aux temples millénaires, le Japon offre l’un des contrastes les plus saisissants du monde."
            bullets={[
              'Tokyo : design, anime, gastronomie',
              'Kyoto : temples, bambouseraies, geishas',
              'Shinkansen et ponctualité légendaire',
              'Cafés indépendants & cérémonie du thé',
              'Food : sushi, ramen, kaiseki, wagashi',
            ]}
            accent="coral"
            visual={<Torii className="mx-auto h-24" />}
          />
        </div>
      </div>
    </section>
  );
}

function WayCard({ country, title, description, bullets, accent, visual }) {
  const halo =
    accent === 'sakura'
      ? 'from-sakura/35 via-transparent to-gold/15'
      : 'from-coral/20 via-transparent to-gold/15';
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-white/90 p-8 shadow-card backdrop-blur sm:p-10">
      <div className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${halo} blur-3xl`} />
      <div className="relative grid gap-6 sm:grid-cols-[1fr_120px]">
        <div>
          <span className="pill">{country}</span>
          <h3 className="h-serif mt-4 text-2xl sm:text-3xl" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="mt-3 text-sm text-navy/80 sm:text-base">{description}</p>
          <ul className="mt-5 space-y-2 text-sm text-navy/80">
            {bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent === 'sakura' ? 'bg-sakura-deep' : 'bg-coral'}`} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-end justify-end opacity-90 sm:flex">
          <div className="opacity-80">{visual}</div>
        </div>
      </div>
    </article>
  );
}
