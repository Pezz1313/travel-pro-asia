import LegalLayout, { LegalSection, LegalEmail } from '../components/LegalLayout.jsx';

export default function MentionsLegales() {
  return (
    <LegalLayout eyebrow="Informations légales" title="Mentions légales">
      <LegalSection title="Éditeur du site">
        <p>
          <strong className="font-semibold text-navy">Travel Pro Asia</strong>
        </p>
        <p>
          Site internet :{' '}
          <a
            href="https://travel-pro-asia.vercel.app/"
            className="font-medium text-navy underline decoration-coral/60 decoration-2 underline-offset-2 hover:decoration-coral"
          >
            https://travel-pro-asia.vercel.app/
          </a>
        </p>
        <p>
          Email de contact : <LegalEmail />
        </p>
        <p className="text-sm text-muted">
          Informations légales complémentaires (forme juridique, SIRET, adresse postale)
          à compléter ultérieurement selon l’évolution du service.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <strong className="font-semibold text-navy">Vercel Inc.</strong>,
          440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.
        </p>
        <p>
          Site web :{' '}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-navy underline decoration-coral/60 decoration-2 underline-offset-2 hover:decoration-coral"
          >
            https://vercel.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Objet du site">
        <p>
          Travel Pro Asia propose la création d’itinéraires de voyage personnalisés pour la
          Corée du Sud et le Japon. Ces itinéraires sont conçus à partir des informations
          fournies par le client et envoyés au format PDF par e-mail.
        </p>
      </LegalSection>

      <LegalSection title="Nature du service">
        <p>
          Travel Pro Asia propose des <strong className="font-semibold text-navy">suggestions
          personnalisées de voyage</strong>. Le service ne se substitue pas à une agence de
          voyage agréée et n’assure ni la réservation, ni la garantie des prix, horaires,
          disponibilités ou conditions d’accès auprès des prestataires (vols, hôtels,
          restaurants, activités).
        </p>
        <p>
          Le client reste seul responsable de la vérification de ces éléments avant son
          départ, auprès des sources officielles.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L’ensemble du contenu présent sur ce site (textes, identité visuelle,
          illustrations, structure) est la propriété de Travel Pro Asia. Toute reproduction,
          intégrale ou partielle, est interdite sans accord préalable écrit.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative à ces mentions légales, vous pouvez nous écrire à :{' '}
          <LegalEmail />.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
