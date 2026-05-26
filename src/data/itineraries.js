// Travel Pro Asia — free preview itinerary generator (front-end only, no AI call).
//
// The generator now has THREE responsibilities:
//   1. Pick a country pool (Korea / Japan / both) from prompt + options.
//   2. Slice that pool to the EXACT number of days the user chose (5/7/10/14).
//      All text fields (title, summary, budget, day-by-day, stats) derive from
//      that single `days` value — no more contradictions between "7 jours"
//      in the title and "10 jours" in the summary.
//   3. Lightly personalise the result from the user's free-text request:
//      detect "jour 2 off / tranquille", "pas de temples", "cafés / shopping /
//      K-pop" and adapt the items accordingly. The full personalisation is
//      done later, in the paid PDF.

// ---------- Country detection ----------

const KOREA_WORDS = ['corée', 'coree', 'séoul', 'seoul', 'busan', 'jeju', 'korea', 'corean', 'gangnam', 'hongdae', 'itaewon'];
const JAPAN_WORDS = ['japon', 'japan', 'tokyo', 'kyoto', 'osaka', 'okinawa', 'nara', 'hokkaido', 'shibuya', 'shinjuku', 'asakusa', 'hakone'];

function detectCountry(text) {
  const t = (text || '').toLowerCase();
  const k = KOREA_WORDS.some((w) => t.includes(w));
  const j = JAPAN_WORDS.some((w) => t.includes(w));
  if (k && j) return 'both';
  if (k) return 'korea';
  if (j) return 'japan';
  return null;
}

function detectDays(text) {
  const t = (text || '').toLowerCase();
  const dayMatch = t.match(/(\d{1,2})\s*(jour|jours|day|days|nuit|nuits|night|nights)/);
  if (dayMatch) return parseInt(dayMatch[1], 10);
  const weekMatch = t.match(/(\d{1,2})\s*(semaine|semaines|week|weeks)/);
  if (weekMatch) return parseInt(weekMatch[1], 10) * 7;
  return null;
}

// ---------- Public API ----------

export function generateDemoItinerary(prompt, options = {}) {
  const detectedCountry =
    options.country && options.country !== 'auto'
      ? options.country
      : detectCountry(prompt) || 'both';

  const detectedDays = options.duration || detectDays(prompt) || 7;

  let base;
  if (detectedCountry === 'korea') base = koreaItinerary(detectedDays);
  else if (detectedCountry === 'japan') base = japanItinerary(detectedDays);
  else base = combinedItinerary(detectedDays);

  return personalizeItinerary(base, prompt);
}

// ---------- Country pools (14 day blocks each) ----------
// Ordered so that ANY prefix of length N is a coherent N-day trip.

const KOREA_POOL = [
  {
    city: 'Séoul',
    title: 'Arrivée & Bukchon Hanok',
    items: [
      'Arrivée à Incheon. AREX Express jusqu’à Seoul Station, puis taxi.',
      'Check-in à Myeongdong, Hongdae ou Jongno selon votre style.',
      'Promenade dans Bukchon Hanok Village au coucher du soleil.',
      'Dîner Korean BBQ à Mapo Galmaegi (porc grillé local).',
    ],
  },
  {
    city: 'Séoul',
    title: 'Palais & Insadong',
    items: [
      'Gyeongbokgung à l’ouverture (assistez à la relève de la garde).',
      'Café traditionnel à Insadong + boutique de papier hanji.',
      'Lunch : bibimbap chez Gogung.',
      'Soir : Cheonggyecheon stream + N Seoul Tower au coucher du soleil.',
    ],
  },
  {
    city: 'Séoul',
    title: 'Seongsu, Hongdae & Han River',
    items: [
      'Matin : cafés design de Seongsu (le « Brooklyn de Séoul »).',
      'Midi : tteokbokki à Sindang ou Gwangjang Market.',
      'Après-midi : Hongdae shopping + perfo de rue.',
      'Soir : pique-nique chimaek (poulet frit + bière) au Han River Park.',
    ],
  },
  {
    city: 'Séoul → Busan',
    title: 'KTX & arrivée à Busan',
    items: [
      'Matin libre : marché Namdaemun ou Dongdaemun Design Plaza.',
      'KTX Séoul → Busan (≈ 2h40, réservez à l’avance).',
      'Check-in à Haeundae ou Seomyeon.',
      'Soir : poisson frais au Jagalchi Market.',
    ],
  },
  {
    city: 'Busan',
    title: 'Gamcheon & plage de Haeundae',
    items: [
      'Matin : Gamcheon Culture Village (le « Santorin coréen »).',
      'Midi : milmyeon (nouilles froides typiques de Busan).',
      'Après-midi : plage de Haeundae ou Songdo Skywalk.',
      'Soir : Gwangalli Beach + pont illuminé.',
    ],
  },
  {
    city: 'Busan',
    title: 'Temples & marchés',
    items: [
      'Tôt : Haedong Yonggungsa, temple face à la mer.',
      'Marché de Jagalchi pour le déjeuner sashimi.',
      'Après-midi libre : cafés à Jeonpo Cafe Street.',
      'Soir : Beomeosa ou rooftop à Seomyeon.',
    ],
  },
  {
    city: 'Busan → Séoul',
    title: 'KTX retour & dernier soir',
    items: [
      'Matin tranquille à Busan, brunch face à la mer.',
      'KTX retour Séoul en début d’après-midi.',
      'Dernière soirée : Gangnam, K-pop shop ou rooftop à Itaewon.',
    ],
  },
  {
    city: 'Séoul → Jeju',
    title: 'Vol intérieur & côte est',
    items: [
      'Vol Séoul (Gimpo) → Jeju (≈ 1h, low cost).',
      'Location de voiture ou taxi pour rejoindre la côte est.',
      'Sentier Olle 1 + lever de soleil sur Seongsan Ilchulbong.',
      'Dîner haemul-pajeon (galette aux fruits de mer) en bord de mer.',
    ],
  },
  {
    city: 'Jeju',
    title: 'Hallasan ou plages du sud',
    items: [
      'Au choix : randonnée Hallasan (volcan central) ou plages de Hyeopjae.',
      'Café-vue océan dans le sud-ouest (ex : Antéprima Coffee).',
      'Visite des grottes de lave Manjanggul.',
      'Soir : barbecue coréen au noir d’encre (poulpe).',
    ],
  },
  {
    city: 'Jeju → Séoul',
    title: 'Vol retour & cafés',
    items: [
      'Matinée chill : sentier côtier ou marché Dongmun.',
      'Vol retour vers Séoul en milieu de journée.',
      'Après-midi cafés à Yeonnam-dong ou Mangwon.',
      'Soir : street food à Gwangjang Market.',
    ],
  },
  {
    city: 'Séoul',
    title: 'DMZ Tour',
    items: [
      'Tour guidé DMZ (zone démilitarisée, demi-journée).',
      'Lunch tardif à Itaewon ou Hannam.',
      'Après-midi : musée de la guerre ou shopping Common Ground.',
      'Soir : Korean BBQ premium à Mapo.',
    ],
  },
  {
    city: 'Suwon',
    title: 'Hwaseong & village folklorique',
    items: [
      'Train depuis Séoul (≈ 1h).',
      'Forteresse Hwaseong (UNESCO) + balade sur les remparts.',
      'Village folklorique coréen près de Suwon.',
      'Retour Séoul en soirée pour un dîner tranquille.',
    ],
  },
  {
    city: 'Gyeongju',
    title: 'Culture millénaire',
    items: [
      'KTX Séoul → Gyeongju (≈ 2h).',
      'Bulguksa et Seokguram (temples UNESCO).',
      'Tumuli du parc royal Daereungwon.',
      'Soir : ruelles d’Hwangnidan-gil, cafés et boutiques.',
    ],
  },
  {
    city: 'Séoul',
    title: 'Dernier shopping & vol retour',
    items: [
      'Brunch à Yeonnam-dong.',
      'Skincare à Olive Young, K-pop merch.',
      'AREX vers l’aéroport, vol retour.',
    ],
  },
];

const JAPAN_POOL = [
  {
    city: 'Tokyo',
    title: 'Arrivée & Shibuya',
    items: [
      'Arrivée à Haneda ou Narita. Train Limousine ou Narita Express.',
      'Check-in à Shibuya ou Shinjuku.',
      'Coucher du soleil sur Shibuya Crossing depuis Shibuya Sky.',
      'Dîner ramen à Ichiran ou izakaya à Omoide Yokocho.',
    ],
  },
  {
    city: 'Tokyo',
    title: 'Asakusa, Ueno & Akihabara',
    items: [
      'Tôt : Senso-ji à Asakusa (lumière magnifique avant 8h).',
      'Tempura à Daikokuya.',
      'Musée d’Ueno + parc.',
      'Soir : Akihabara (anime, électronique, gaming arcades).',
    ],
  },
  {
    city: 'Tokyo → Kyoto',
    title: 'Shinkansen & Gion',
    items: [
      'Petit-déj sushi au Tsukiji Outer Market.',
      'Shinkansen Tokyo → Kyoto (≈ 2h15).',
      'Installation près de Gion.',
      'Promenade à Pontocho au crépuscule.',
    ],
  },
  {
    city: 'Kyoto',
    title: 'Fushimi Inari & Kiyomizu',
    items: [
      'Fushimi Inari à 6h30 (avant la foule, pour les torii vides).',
      'Nishiki Market pour le déjeuner.',
      'Kiyomizu-dera + ruelles de Sannenzaka.',
      'Geisha hunting discret à Gion en fin de journée.',
    ],
  },
  {
    city: 'Kyoto',
    title: 'Pavillon d’or & Arashiyama',
    items: [
      'Kinkaku-ji (Pavillon d’or) tôt le matin.',
      'Bambouseraie d’Arashiyama et temple Tenryu-ji.',
      'Tofu végétarien chez Shoraian.',
      'Soir tranquille à Gion, matcha + wagashi.',
    ],
  },
  {
    city: 'Kyoto → Osaka',
    title: 'Dotonbori & street food',
    items: [
      'Train Kyoto → Osaka (≈ 30 min).',
      'Quartier de Dotonbori, takoyaki et okonomiyaki.',
      'Château d’Osaka et son parc.',
      'Soir : néons de Namba, bars perchés.',
    ],
  },
  {
    city: 'Osaka',
    title: 'Universal Studios ou musée',
    items: [
      'Journée Universal Studios Japan (réservez vos billets).',
      'Alternative : Musée national d’art ou Aquarium Kaiyukan.',
      'Soir : ramen à Ichiran ou Kushikatsu à Shinsekai.',
    ],
  },
  {
    city: 'Osaka → Hakone',
    title: 'Onsen & Mont Fuji',
    items: [
      'Shinkansen Osaka → Odawara, puis ligne Hakone Tozan.',
      'Check-in ryokan traditionnel avec onsen privatif.',
      'Téléphérique du mont Komagatake, vue sur le Fuji.',
      'Dîner kaiseki au ryokan.',
    ],
  },
  {
    city: 'Hakone → Tokyo',
    title: 'Retour & dernier shopping',
    items: [
      'Matinée onsen au ryokan.',
      'Train vers Tokyo (≈ 1h30).',
      'Après-midi : Harajuku, Takeshita-dori, Omotesando.',
      'Soir : teamLab Planets (réservez vos billets).',
    ],
  },
  {
    city: 'Tokyo',
    title: 'Tsukiji, Ginza & dernier soir',
    items: [
      'Petit-déj sushi à Tsukiji Outer Market.',
      'Shopping de luxe à Ginza ou Marunouchi.',
      'Café à %Arabica ou Blue Bottle.',
      'Soir : yakitori à Omoide Yokocho.',
    ],
  },
  {
    city: 'Tokyo → Hiroshima',
    title: 'Mémoriaux',
    items: [
      'Shinkansen Tokyo → Hiroshima (≈ 4h).',
      'Parc et musée du mémorial de la paix.',
      'Dôme de Genbaku.',
      'Soir : okonomiyaki version Hiroshima.',
    ],
  },
  {
    city: 'Hiroshima → Miyajima',
    title: 'Île sacrée & torii flottant',
    items: [
      'Ferry pour l’île de Miyajima.',
      'Sanctuaire d’Itsukushima et son célèbre torii dans l’eau.',
      'Randonnée légère sur le mont Misen ou téléphérique.',
      'Retour Hiroshima en soirée.',
    ],
  },
  {
    city: 'Hiroshima → Tokyo',
    title: 'Shinkansen retour & flânerie',
    items: [
      'Shinkansen retour Tokyo.',
      'Après-midi cafés à Daikanyama ou Naka-Meguro.',
      'Soir : sushi-bar omakase de quartier.',
    ],
  },
  {
    city: 'Tokyo',
    title: 'Dernier jour & vol retour',
    items: [
      'Matinée libre : Ueno parc ou Sumida River.',
      'Souvenirs à Don Quijote ou Tokyo Station.',
      'Train pour l’aéroport, vol retour.',
    ],
  },
];

const COMBINED_POOL = [
  {
    city: 'Séoul',
    title: 'Arrivée & Bukchon',
    items: [
      'Vol → Incheon. AREX vers Seoul Station.',
      'Check-in à Myeongdong ou Hongdae.',
      'Hanok Village de Bukchon au coucher du soleil.',
      'Korean BBQ pour fêter l’arrivée.',
    ],
  },
  {
    city: 'Séoul',
    title: 'Palais & cafés',
    items: [
      'Gyeongbokgung + relève de la garde.',
      'Café à Insadong, papier hanji.',
      'Cheonggyecheon stream et N Seoul Tower.',
    ],
  },
  {
    city: 'Séoul → Tokyo',
    title: 'Vol intra-Asie & Shibuya',
    items: [
      'Brunch à Yeonnam-dong puis vol Séoul → Tokyo (≈ 2h30).',
      'Check-in à Shibuya ou Shinjuku.',
      'Shibuya Crossing au coucher du soleil.',
      'Dîner ramen à Ichiran ou izakaya à Omoide Yokocho.',
    ],
  },
  {
    city: 'Tokyo',
    title: 'Asakusa & Akihabara',
    items: [
      'Senso-ji à l’ouverture.',
      'Tempura à Daikokuya.',
      'Akihabara en soirée (anime, gaming, électronique).',
    ],
  },
  {
    city: 'Tokyo',
    title: 'Harajuku & teamLab',
    items: [
      'Meiji Jingu + Takeshita-dori.',
      'Cafés d’Omotesando (%Arabica, Blue Bottle).',
      'teamLab Planets en soirée (réservez à l’avance).',
    ],
  },
  {
    city: 'Tokyo → Kyoto',
    title: 'Shinkansen & Gion',
    items: [
      'Sushi au Tsukiji Outer Market.',
      'Shinkansen Tokyo → Kyoto (2h15).',
      'Promenade à Pontocho et Gion au crépuscule.',
    ],
  },
  {
    city: 'Kyoto',
    title: 'Fushimi Inari & Arashiyama',
    items: [
      'Fushimi Inari à 6h30 (avant la foule).',
      'Arashiyama bambouseraie l’après-midi.',
      'Kaiseki léger en soirée.',
    ],
  },
  {
    city: 'Kyoto',
    title: 'Pavillon d’or & matcha',
    items: [
      'Kinkaku-ji (Pavillon d’or).',
      'Matcha + wagashi dans une maison de thé.',
      'Soir : Pontocho, ruelles éclairées.',
    ],
  },
  {
    city: 'Kyoto → Osaka',
    title: 'Dotonbori & street food',
    items: [
      'Train Kyoto → Osaka (≈ 30 min).',
      'Dotonbori : takoyaki, okonomiyaki, néons.',
      'Château d’Osaka.',
      'Soir : bars de Namba.',
    ],
  },
  {
    city: 'Osaka → Hakone',
    title: 'Onsen & Mont Fuji',
    items: [
      'Shinkansen Osaka → Odawara, puis ligne Hakone Tozan.',
      'Ryokan traditionnel avec onsen privatif.',
      'Téléphérique du mont Komagatake, vue sur le Fuji.',
    ],
  },
  {
    city: 'Hakone → Tokyo',
    title: 'Retour Tokyo & Ginza',
    items: [
      'Matinée onsen au ryokan.',
      'Train vers Tokyo (≈ 1h30).',
      'Shopping Ginza ou Omotesando.',
      'Dernier dîner sushi premium.',
    ],
  },
  {
    city: 'Tokyo → Séoul',
    title: 'Vol retour Séoul',
    items: [
      'Vol Tokyo → Séoul (≈ 2h30).',
      'Café et flânerie à Mangwon-dong.',
      'Dîner Korean BBQ.',
    ],
  },
  {
    city: 'Séoul → Busan',
    title: 'KTX & Jagalchi',
    items: [
      'KTX vers Busan (2h40).',
      'Jagalchi Market pour le poisson frais.',
      'Gwangalli Beach illuminée le soir.',
    ],
  },
  {
    city: 'Busan → Séoul',
    title: 'Gamcheon & vol retour',
    items: [
      'Matin : Gamcheon Culture Village.',
      'KTX retour Séoul en début d’après-midi.',
      'Dernier shopping, AREX vers l’aéroport.',
    ],
  },
];

// ---------- Helpers ----------

function sliceDays(pool, days) {
  const n = Math.max(1, Math.min(days, pool.length));
  return pool.slice(0, n).map((block, i) => ({ ...block, day: i + 1 }));
}

function fmtEUR(n) {
  // French thousands separator (non-breaking space).
  return n.toLocaleString('fr-FR');
}

function scaleBudget({ lowPerDay, highPerDay, breakdown }, days) {
  const low = lowPerDay * days;
  const high = highPerDay * days;
  return {
    currency: '€',
    total: `${fmtEUR(low)} – ${fmtEUR(high)}`,
    perDay: `${lowPerDay} – ${highPerDay}`,
    breakdown,
  };
}

// Dynamic summaries — duration ALWAYS comes from the chosen `days`.
function koreaSummary(days) {
  return `${days} jours pour découvrir l’âme de la Corée : palais royaux et hanok à Séoul, plages et café culture à Busan, sans oublier les ruelles design de Seongsu. Rythme équilibré, transport en KTX, food coréenne incontournable.`;
}
function japanSummary(days) {
  return `${days} jours pour vivre l’essence du Japon : la modernité électrique de Tokyo et la douceur intemporelle de Kyoto, prolongée par Osaka et Hakone si la durée le permet. Shinkansen, food, design et photo spots.`;
}
function combinedSummary(days) {
  return `${days} jours pour explorer le meilleur des deux pays : Séoul moderne et traditionnelle, modernité électrique de Tokyo, douceur intemporelle de Kyoto. Vol intra-Asie + Shinkansen, sans temps mort.`;
}

// ---------- Itinerary builders ----------

const KOREA_PROFILE = [
  'Couple ou voyage solo, première fois en Corée',
  'Budget moyen, confort + une vraie expérience locale',
  'Intérêts : sightseeing, food, cafés, shopping, photos',
  'Rythme modéré (pas plus de 2 activités majeures / jour)',
];
const KOREA_TRANSPORT = [
  'KTX Séoul ↔ Busan : à réserver via Korail (≈ 60 €/trajet)',
  'À Séoul : carte T-money pour métro/bus (recharge facile)',
  'Taxis Kakao T fiables, paiement par appli',
  'AREX Express depuis Incheon : 9 €, ≈ 45 min',
];
const KOREA_FOOD = [
  'Korean BBQ : Mapo Galmaegi, Maple Tree House',
  'Bibimbap : Gogung, Jeonju Jungang Hoegwan',
  'Street food : Gwangjang Market (mayak gimbap, bindaetteok)',
  'Cafés à Seongsu : Onion, Center Coffee, LCDC Seoul',
  'Poisson Busan : Jagalchi Market',
  'Chimaek : BHC, Kyochon Chicken',
];
const KOREA_BUDGET_BREAKDOWN = [
  { label: 'Hôtel 3–4★', value: '80–130 € / nuit' },
  { label: 'Food', value: '25–40 € / jour' },
  { label: 'Transport intérieur', value: '~ 180 € (KTX + métro)' },
  { label: 'Activités', value: '~ 60 € total' },
];
const KOREA_TIPS = [
  'Téléchargez Naver Map ou KakaoMap (Google Maps est très limité en Corée).',
  'Achetez une eSIM ou louez un Wi-Fi pocket dès l’aéroport.',
  'Évitez les taxis non Kakao la nuit dans Itaewon.',
  'Réservez Gyeongbokgung tôt le matin pour éviter la foule.',
];
const KOREA_MISTAKES = [
  'Ne pas tenter de tout faire en un seul jour : Séoul est immense.',
  'Ne pas insister pour payer en cash partout : la Corée est ultra-cashless.',
  'Ne pas oublier que les hanoks ferment tôt (avant 18h en hiver).',
];
const KOREA_UPGRADES = [
  'Excursion Jeju Island (vol intérieur, 1h)',
  'DMZ Tour (zone démilitarisée) depuis Séoul',
  'Atelier hanbok + shooting photo au palais',
];

function koreaItinerary(days) {
  return {
    id: `korea-${days}`,
    title: `Corée du Sud sur-mesure — ${days} jours`,
    flagEmoji: '🇰🇷',
    accent: 'sakura',
    durationDays: days,
    summary: koreaSummary(days),
    profile: KOREA_PROFILE,
    days: sliceDays(KOREA_POOL, days),
    transport: KOREA_TRANSPORT,
    food: KOREA_FOOD,
    budget: scaleBudget({ lowPerDay: 170, highPerDay: 240, breakdown: KOREA_BUDGET_BREAKDOWN }, days),
    tips: KOREA_TIPS,
    mistakes: KOREA_MISTAKES,
    upgrades: KOREA_UPGRADES,
  };
}

const JAPAN_PROFILE = [
  'Couple ou solo, 25–40 ans, première fois au Japon',
  'Budget moyen / confort',
  'Intérêts : culture, food, design, cafés, photo spots',
  'Rythme modéré, marche quotidienne ~15 000 pas',
];
const JAPAN_TRANSPORT = [
  'JR Pass 7 jours : ~340 € (rentable si Tokyo↔Kyoto A/R)',
  'Suica ou Pasmo pour métros/bus (rechargeable)',
  'Shinkansen Tokyo–Kyoto seul : ~95 € l’aller',
  'Marche quotidienne : prévoir bonnes chaussures',
];
const JAPAN_FOOD = [
  'Sushi : Tsukiji Outer Market, Sushi Dai',
  'Ramen : Ichiran, Afuri, Mensho Tokyo',
  'Tempura : Daikokuya, Tsunahachi',
  'Cafés : %Arabica, Blue Bottle, Streamer',
  'Wagashi : Toraya, Kanshundo',
  'Yakitori : Omoide Yokocho, Nonbei Yokocho',
];
const JAPAN_BUDGET_BREAKDOWN = [
  { label: 'Hôtel 3–4★', value: '90–150 € / nuit' },
  { label: 'Food', value: '30–50 € / jour' },
  { label: 'Transport', value: '~ 250–340 € (Shinkansen ou JR Pass)' },
  { label: 'Activités', value: '~ 80 € total' },
];
const JAPAN_TIPS = [
  'Réservez teamLab Planets et le Shinkansen 1 mois avant.',
  'Retirez du cash à 7-Eleven ou Family Mart (les ATM classiques refusent souvent les cartes étrangères).',
  'Pas de pourboire au Japon, c’est mal vu.',
  'Chaussures faciles à retirer : nombreux temples demandent de se déchausser.',
];
const JAPAN_MISTAKES = [
  'Aller à Fushimi Inari pour le coucher du soleil : c’est bondé, allez-y à 6h30.',
  'Manger en marchant : très mal vu en dehors des zones de street food.',
  'Réserver un hôtel trop loin du métro : Tokyo est immense.',
];
const JAPAN_UPGRADES = [
  'Excursion Nara depuis Kyoto (cerfs sacrés, 1 jour)',
  'Hakone : onsen avec vue Mont Fuji',
  'Tournoi de sumo si en saison (jan / mai / sept)',
];

function japanItinerary(days) {
  return {
    id: `japan-${days}`,
    title: `Japon sur-mesure — ${days} jours`,
    flagEmoji: '🇯🇵',
    accent: 'coral',
    durationDays: days,
    summary: japanSummary(days),
    profile: JAPAN_PROFILE,
    days: sliceDays(JAPAN_POOL, days),
    transport: JAPAN_TRANSPORT,
    food: JAPAN_FOOD,
    budget: scaleBudget({ lowPerDay: 190, highPerDay: 260, breakdown: JAPAN_BUDGET_BREAKDOWN }, days),
    tips: JAPAN_TIPS,
    mistakes: JAPAN_MISTAKES,
    upgrades: JAPAN_UPGRADES,
  };
}

const COMBINED_PROFILE = [
  'Voyageurs curieux, première fois en Asie du Nord-Est',
  'Budget confort, recherche d’expériences authentiques',
  'Intérêts : culture, food, design, photo, shopping',
  'Rythme modéré, alternance ville/temples/nature',
];
const COMBINED_TRANSPORT = [
  'Vol intra-Asie Séoul ↔ Tokyo : ~120–180 € (Jeju Air, Peach, ZipAir)',
  'KTX Séoul–Busan : ~60 €',
  'Shinkansen Tokyo–Kyoto : ~95 € l’aller',
  'Cartes locales : T-money (Corée), Suica (Japon)',
];
const COMBINED_FOOD = [
  'Korean BBQ, bibimbap, chimaek, tteokbokki',
  'Sushi, ramen, tempura, wagashi, matcha',
  'Cafés Seongsu (Séoul) + Omotesando (Tokyo)',
  'Marchés : Gwangjang, Jagalchi, Tsukiji, Nishiki',
];
const COMBINED_BUDGET_BREAKDOWN = [
  { label: 'Hôtels 3–4★', value: '90–140 € / nuit' },
  { label: 'Vol intra-Asie', value: '120–180 € (Séoul ↔ Tokyo)' },
  { label: 'Transport sol', value: '~ 250–400 € (KTX + Shinkansen)' },
  { label: 'Food + activités', value: '50–80 € / jour' },
];
const COMBINED_TIPS = [
  'Réservez le vol Séoul ↔ Tokyo bien à l’avance (low cost).',
  'eSIM internationale ou changez de SIM entre les deux pays.',
  'Évitez Tokyo le 1er janvier (tout est fermé) ou Séoul à Chuseok.',
  'Pliez vos chaussures faciles pour les temples.',
];
const COMBINED_MISTAKES = [
  'Sous-estimer la marche : 15–20 km / jour en cumul.',
  'Vouloir caser Hiroshima en plus sur une trop courte durée.',
  'Oublier de réserver les Shinkansen et teamLab à l’avance.',
];
const COMBINED_UPGRADES = [
  '+2 jours Jeju Island (Corée) ou Hakone (Japon)',
  'Excursion Nara depuis Kyoto',
  'Atelier kimono ou hanbok pour shooting photo',
];

function combinedItinerary(days) {
  return {
    id: `combined-${days}`,
    title: `Corée + Japon — ${days} jours sur-mesure`,
    flagEmoji: '🇰🇷🇯🇵',
    accent: 'mixed',
    durationDays: days,
    summary: combinedSummary(days),
    profile: COMBINED_PROFILE,
    days: sliceDays(COMBINED_POOL, days),
    transport: COMBINED_TRANSPORT,
    food: COMBINED_FOOD,
    budget: scaleBudget({ lowPerDay: 220, highPerDay: 290, breakdown: COMBINED_BUDGET_BREAKDOWN }, days),
    tips: COMBINED_TIPS,
    mistakes: COMBINED_MISTAKES,
    upgrades: COMBINED_UPGRADES,
  };
}

// ---------- Personalisation from the free-text request ----------

const REST_KEYWORDS = ['off', 'tranquille', 'repos', 'détente', 'detente', 'chill', 'libre', 'relax', 'cool', 'pose', 'pause', 'calme'];

function detectRestDays(prompt) {
  if (!prompt) return [];
  const rest = new Set();
  // Split into rough sentences so we only match "rest" + "jour N" within the same clause.
  const sentences = prompt.split(/[.,;!?\n]/);
  for (const s of sentences) {
    const sl = s.toLowerCase();
    const hasRestKw = REST_KEYWORDS.some((w) => sl.includes(w));
    if (!hasRestKw) continue;
    const dayMatches = [...sl.matchAll(/(?:jour|day|j)\s*(\d+)/g)];
    for (const m of dayMatches) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= 30) rest.add(n);
    }
  }
  return [...rest];
}

function personalizeItinerary(itinerary, prompt) {
  if (!prompt) return { ...itinerary, originalRequest: '' };

  const lower = prompt.toLowerCase();

  // Preferences detected from the free-text request
  const restDays = detectRestDays(prompt);
  const avoidTemples = /(pas|moins|peu|sans|évit\w*)\s*(de\s+|d['’]\s*)?temple|trop\s+(de\s+)?temple|ras\s+le\s+bol\s+des\s+temple/i.test(lower);
  const wantsCafes = /caf[ée]|coffee|brunch/i.test(lower);
  const wantsShopping = /shopping|achat|magasin|boutique|mode/i.test(lower);
  const wantsKpop = /k[\s-]?pop|kpop|k[\s-]?drama|kdrama|idol/i.test(lower);
  const wantsNature = /nature|montagne|randonn[ée]|hike|plage|océan|ocean|parc national/i.test(lower);

  // Re-shape day items based on preferences
  const newDays = itinerary.days.map((d) => {
    // Full rest-day rewrite
    if (restDays.includes(d.day)) {
      return {
        ...d,
        title: `Journée libre à ${d.city}`,
        items: [
          'Matinée tranquille : grasse matinée ou brunch dans un café design.',
          'Promenade libre en bord de rivière, dans un parc ou un quartier vivant.',
          'Café spécialité + librairie indépendante ou flânerie en boutique.',
          'Dîner léger près de l’hôtel, soirée détente.',
        ],
      };
    }

    // Lighter touch on the other days
    let items = [...d.items];

    if (avoidTemples) {
      items = items.map((it) =>
        /temple|sanctuaire|pagode|inari|kinkaku|ginkaku|kiyomizu|senso-?ji|meiji|yonggungsa|tenryu|itsukushima|bulguksa/i.test(it)
          ? 'Alternative : café indépendant et flânerie dans un quartier vivant.'
          : it
      );
    }

    // Add at most one emphasis item per day to avoid bloating the preview
    const extras = [];
    if (wantsCafes && !items.some((i) => /caf[ée]|coffee|brunch/i.test(i))) {
      extras.push('Café spécialité dans un coffee shop design du quartier.');
    } else if (wantsShopping && !items.some((i) => /shopping|boutique|magasin/i.test(i))) {
      extras.push('Shopping : boutiques tendance et marques locales.');
    } else if (wantsKpop && d.city.includes('Séoul') && !items.some((i) => /k-?pop/i.test(i))) {
      extras.push('K-pop : passage par Line Friends, SM Town ou un cafe à thème idol.');
    } else if (wantsNature && !items.some((i) => /parc|nature|montagne|randonn[ée]|plage/i.test(i))) {
      extras.push('Touche nature : parc, sentier ou point de vue panoramique.');
    }

    return { ...d, items: [...items, ...extras] };
  });

  // Human-readable summary of what we adapted
  const noteParts = [];
  if (restDays.length > 0) {
    const labels = restDays.map((n) => `J${n}`).join(', ');
    noteParts.push(`journée${restDays.length > 1 ? 's' : ''} libre${restDays.length > 1 ? 's' : ''} ${labels}`);
  }
  if (avoidTemples) noteParts.push('moins de temples');
  if (wantsCafes) noteParts.push('accent cafés');
  if (wantsShopping) noteParts.push('accent shopping');
  if (wantsKpop) noteParts.push('accent K-pop');
  if (wantsNature) noteParts.push('plus de nature');

  const personalNote = noteParts.length > 0
    ? `Aperçu adapté à votre demande : ${noteParts.join(' · ')}.`
    : null;

  return {
    ...itinerary,
    days: newDays,
    personalNote,
    originalRequest: prompt,
  };
}
