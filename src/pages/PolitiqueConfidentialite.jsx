import LegalLayout, { LegalSection, LegalList, LegalEmail } from '../components/LegalLayout.jsx';

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout eyebrow="Vos données" title="Politique de confidentialité">
      <LegalSection title="Données que nous collectons">
        <p>
          Lorsque vous utilisez Travel Pro Asia, nous pouvons collecter les informations
          suivantes, uniquement lorsque vous nous les transmettez vous-même via les
          formulaires du site :
        </p>
        <LegalList
          items={[
            'Nom',
            'Adresse e-mail',
            'Destination souhaitée',
            'Dates du voyage',
            'Nombre de voyageurs',
            'Budget approximatif',
            'Préférences de voyage (villes, centres d’intérêt, style)',
            'Demande libre et préférences importantes',
            'Demandes spéciales (allergies, occasions, accessibilité…)',
          ]}
        />
      </LegalSection>

      <LegalSection title="Pourquoi nous les collectons">
        <p>Ces informations sont utilisées exclusivement pour :</p>
        <LegalList
          items={[
            'Préparer votre itinéraire personnalisé',
            'Vous contacter au sujet de votre commande',
            'Gérer votre commande et son suivi',
            'Vous envoyer votre itinéraire complet en PDF',
            'Répondre à vos questions',
          ]}
        />
        <p>
          Aucune donnée n’est revendue à des tiers à des fins commerciales ou
          publicitaires.
        </p>
      </LegalSection>

      <LegalSection title="Services tiers utilisés">
        <p>
          Pour faire fonctionner le service, nous utilisons les prestataires suivants, qui
          disposent de leurs propres politiques de confidentialité :
        </p>
        <LegalList
          items={[
            'Formspree — réception et stockage sécurisé des formulaires envoyés depuis le site (formspree.io)',
            'Payhip / Stripe — traitement sécurisé des paiements (payhip.com)',
            'Vercel — hébergement du site (vercel.com)',
          ]}
        />
        <p>
          Nous vous invitons à consulter leurs politiques respectives pour comprendre
          comment ils traitent les données à leur niveau.
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Vos informations sont conservées le temps nécessaire à la préparation de votre
          itinéraire et au suivi de la commande. Au-delà, elles peuvent être supprimées
          sur simple demande de votre part.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément à la réglementation en vigueur, vous disposez d’un droit
          d’<strong className="font-semibold text-navy">accès</strong>, de{' '}
          <strong className="font-semibold text-navy">rectification</strong> et de{' '}
          <strong className="font-semibold text-navy">suppression</strong> des données qui
          vous concernent.
        </p>
        <p>
          Pour toute demande concernant vos données personnelles, vous pouvez nous
          contacter à : <LegalEmail />.
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          Le site Travel Pro Asia n’utilise pas de cookies de suivi publicitaire. Seuls
          des éléments techniques nécessaires à l’affichage du site peuvent être utilisés
          par notre hébergeur Vercel.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
