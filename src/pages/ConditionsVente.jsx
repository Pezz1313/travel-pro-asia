import LegalLayout, { LegalSection, LegalEmail } from '../components/LegalLayout.jsx';

export default function ConditionsVente() {
  return (
    <LegalLayout eyebrow="Vente & livraison" title="Conditions générales de vente">
      <LegalSection title="1. Objet">
        <p>
          Travel Pro Asia propose un itinéraire de voyage personnalisé, livré au format
          PDF, pour la Corée du Sud et/ou le Japon. Le contenu est préparé spécifiquement
          pour chaque client à partir des informations transmises via le formulaire
          (durée, dates, villes, budget, préférences, demande libre).
        </p>
      </LegalSection>

      <LegalSection title="2. Prix">
        <p>
          Le tarif normal est de <strong className="font-semibold text-navy">15,99 €</strong>{' '}
          par itinéraire. Dans le cadre de l’offre de lancement, le prix appliqué est de{' '}
          <strong className="font-semibold text-navy">4,99 €</strong> (quatre euros et
          quatre-vingt-dix-neuf centimes), TTC.
        </p>
        <p>
          Le prix affiché au moment de la commande fait foi. L’offre de lancement est
          limitée dans le temps et peut être retirée à tout moment.
        </p>
      </LegalSection>

      <LegalSection title="3. Paiement">
        <p>
          Le paiement s’effectue en ligne, de manière sécurisée, via la plateforme{' '}
          <strong className="font-semibold text-navy">Payhip</strong>. Les moyens de
          paiement acceptés sont ceux proposés par Payhip (carte bancaire et autres
          options selon disponibilité).
        </p>
        <p>
          Travel Pro Asia n’a pas accès à vos données bancaires : elles sont traitées
          directement et exclusivement par Payhip et son prestataire de paiement.
        </p>
      </LegalSection>

      <LegalSection title="4. Préparation et livraison">
        <p>
          Une fois votre paiement confirmé et l’ensemble des informations nécessaires
          reçues, votre itinéraire personnalisé est préparé puis envoyé par e-mail au
          format PDF.
        </p>
        <p>
          <strong className="font-semibold text-navy">Délai indicatif de livraison :</strong>{' '}
          24 à 72 heures à compter de la réception des informations complètes et de la
          confirmation du paiement.
        </p>
      </LegalSection>

      <LegalSection title="5. Nature du contenu">
        <p>
          L’itinéraire est un contenu numérique personnalisé, préparé spécifiquement pour
          vous selon les informations que vous avez transmises. Il s’agit donc d’un
          produit unique, non standardisé.
        </p>
      </LegalSection>

      <LegalSection title="6. Responsabilité du client">
        <p>
          Les prix, horaires, transports, conditions d’entrée, exigences de visa,
          réservations, ouvertures et disponibilités sont susceptibles d’évoluer à tout
          moment.
        </p>
        <p>
          Le client est seul responsable de la vérification de ces éléments avant son
          départ, auprès des sources officielles (ambassades, opérateurs, sites des
          établissements).
        </p>
      </LegalSection>

      <LegalSection title="7. Limites du service">
        <p>
          Travel Pro Asia ne procède à <strong className="font-semibold text-navy">aucune
          réservation</strong> à la place du client : ni vols, ni hôtels, ni restaurants,
          ni activités.
        </p>
        <p>
          L’itinéraire fourni a vocation à guider et inspirer le client, qui reste libre
          de l’adapter selon ses contraintes, ses coups de cœur et ses imprévus sur place.
        </p>
      </LegalSection>

      <LegalSection title="8. Service client et réclamations">
        <p>
          Pour toute question, demande de modification, réclamation ou suivi de commande,
          vous pouvez nous écrire à : <LegalEmail />.
        </p>
        <p>
          Nous nous engageons à vous répondre dans les meilleurs délais et à trouver, le
          cas échéant, une solution adaptée à votre situation.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
