// Demo itinerary generator — front-end only, no AI call.
// Picks one of three rich French itineraries based on keywords in the prompt
// + optional explicit options (country, duration). Used for the V1 demo.

const KOREA_WORDS = ['corée', 'coree', 'séoul', 'seoul', 'busan', 'jeju', 'korea', 'corean', 'gangnam', 'hongdae', 'itaewon'];
const JAPAN_WORDS = ['japon', 'japan', 'tokyo', 'kyoto', 'osaka', 'okinawa', 'nara', 'hokkaido', 'shibuya', 'shinjuku', 'asakusa'];

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

export function generateDemoItinerary(prompt, options = {}) {
  const detectedCountry = options.country && options.country !== 'auto' ? options.country : detectCountry(prompt);
  const detectedDays = options.duration || detectDays(prompt);

  let base;
  if (detectedCountry === 'korea') base = koreaItinerary(detectedDays || 7);
  else if (detectedCountry === 'japan') base = japanItinerary(detectedDays || 7);
  else base = combinedItinerary(detectedDays || 10);

  return base;
}

// ---------- KOREA ----------
function koreaItinerary(days = 7) {
  return {
    id: 'korea-7',
    title: `Corée du Sud sur-mesure — ${days} jours`,
    flagEmoji: '🇰🇷',
    accent: 'sakura',
    summary:
      "Une semaine pour découvrir l'âme de la Corée : palais royaux et hanok à Séoul, plages et café culture à Busan, sans oublier les ruelles design de Seongsu. Rythme équilibré, transport en KTX, food coréenne incontournable.",
    profile: [
      'Couple ou voyage solo, première fois en Corée',
      'Budget moyen, confort + une vraie expérience locale',
      'Intérêts : sightseeing, food, cafés, shopping, photos',
      'Pace : modéré (pas plus de 2 activités majeures / jour)',
    ],
    days: [
      {
        day: 1,
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
        day: 2,
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
        day: 3,
        city: 'Séoul',
        title: 'Seongsu, Hongdae, Han River',
        items: [
          'Matin : cafés design de Seongsu (le « Brooklyn de Séoul »).',
          'Midi : tteokbokki à Sindang ou Gwangjang Market.',
          'Après-midi : Hongdae shopping + perfo de rue.',
          'Soir : pique-nique chimaek (poulet frit + bière) au Han River Park.',
        ],
      },
      {
        day: 4,
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
        day: 5,
        city: 'Busan',
        title: 'Gamcheon & plage',
        items: [
          'Matin : Gamcheon Culture Village (le « Santorin coréen »).',
          'Midi : milmyeon (nouilles froides de Busan).',
          'Après-midi : plage de Haeundae ou Songdo Skywalk.',
          'Soir : Gwangalli Beach + pont illuminé.',
        ],
      },
      {
        day: 6,
        city: 'Busan',
        title: 'Temples & retour Séoul',
        items: [
          'Tôt : Haedong Yonggungsa, temple face à la mer.',
          'KTX retour Séoul en début d’après-midi.',
          'Soir libre : Gangnam, K-pop shop ou rooftop à Itaewon.',
        ],
      },
      {
        day: 7,
        city: 'Séoul',
        title: 'Shopping & retour',
        items: [
          'Brunch à Yeonnam-dong.',
          'Dernier shopping : skincare à Olive Young, K-pop merch.',
          'AREX vers l’aéroport, vol retour.',
        ],
      },
    ],
    transport: [
      'KTX Séoul ↔ Busan : à réserver via Korail (≈ 60 €/trajet)',
      'À Séoul : carte T-money pour métro/bus (recharge facile)',
      'Taxis Kakao T fiables, paiement par appli',
      'AREX Express depuis Incheon : 9 €, ≈ 45 min',
    ],
    food: [
      'Korean BBQ : Mapo Galmaegi, Maple Tree House',
      'Bibimbap : Gogung, Jeonju Jungang Hoegwan',
      'Street food : Gwangjang Market (mayak gimbap, bindaetteok)',
      'Cafés à Seongsu : Onion, Center Coffee, LCDC Seoul',
      'Poisson Busan : Jagalchi Market',
      'Chimaek : BHC, Kyochon Chicken',
    ],
    budget: {
      currency: '€',
      total: '1 200 – 1 700',
      perDay: '170 – 240',
      breakdown: [
        { label: 'Hôtel 3–4★', value: '80–130 € / nuit' },
        { label: 'Food', value: '25–40 € / jour' },
        { label: 'Transport intérieur', value: '180 € (KTX + métro)' },
        { label: 'Activités', value: '60 € total' },
      ],
    },
    tips: [
      'Téléchargez Naver Map ou KakaoMap (Google Maps est très limité en Corée).',
      'Achetez une eSIM ou louez un Wi-Fi pocket dès l’aéroport.',
      'Évitez les taxis non Kakao la nuit dans Itaewon.',
      'Réservez Gyeongbokgung tôt le matin pour éviter la foule.',
    ],
    mistakes: [
      'Ne pas tenter de tout faire en un seul jour : Séoul est immense.',
      'Ne pas insister pour payer en cash partout : la Corée est ultra-cashless.',
      'Ne pas oublier que les hanoks ferment tôt (avant 18h en hiver).',
    ],
    upgrades: [
      'Excursion Jeju Island (vol intérieur, 1h)',
      'DMZ Tour (zone démilitarisée) depuis Séoul',
      'Atelier hanbok + shooting photo au palais',
    ],
  };
}

// ---------- JAPAN ----------
function japanItinerary(days = 7) {
  return {
    id: 'japan-7',
    title: `Japon sur-mesure — ${days} jours`,
    flagEmoji: '🇯🇵',
    accent: 'coral',
    summary:
      "Une semaine pour vivre l’essence du Japon : la modernité électrique de Tokyo et la douceur intemporelle de Kyoto. Shinkansen entre les deux. Rythme équilibré entre temples, food, design et photos.",
    profile: [
      'Couple ou solo, 25–40 ans, première fois au Japon',
      'Budget moyen / confort',
      'Intérêts : culture, food, design, cafés, photo spots',
      'Rythme modéré, marche quotidienne ~15 000 pas',
    ],
    days: [
      {
        day: 1,
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
        day: 2,
        city: 'Tokyo',
        title: 'Asakusa, Ueno, Akihabara',
        items: [
          'Tôt : Senso-ji à Asakusa (lumière magnifique avant 8h).',
          'Tempura à Daikokuya.',
          'Musée d’Ueno + parc.',
          'Soir : Akihabara (anime, électronique, gaming arcades).',
        ],
      },
      {
        day: 3,
        city: 'Tokyo',
        title: 'Harajuku, Meiji, teamLab',
        items: [
          'Sanctuaire Meiji puis Takeshita-dori (street food, mode).',
          'Café à %Arabica ou Blue Bottle Omotesando.',
          'Soir : teamLab Planets (réservez vos billets bien à l’avance).',
        ],
      },
      {
        day: 4,
        city: 'Tokyo → Kyoto',
        title: 'Shinkansen',
        items: [
          'Petit-déj sushi au Tsukiji Outer Market.',
          'Shinkansen Tokyo → Kyoto (≈ 2h15).',
          'Installation près de Gion.',
          'Promenade à Pontocho au crépuscule.',
        ],
      },
      {
        day: 5,
        city: 'Kyoto',
        title: 'Arashiyama',
        items: [
          'Tôt : Bambouseraie d’Arashiyama (avant 8h pour la magie).',
          'Tofu végétarien chez Shoraian.',
          'Temple Tenryu-ji + Monkey Park.',
          'Soir tranquille à Gion.',
        ],
      },
      {
        day: 6,
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
        day: 7,
        city: 'Kyoto',
        title: 'Pavillon d’or & retour',
        items: [
          'Kinkaku-ji ou Ginkaku-ji selon le temps.',
          'Matcha + wagashi dans une maison de thé.',
          'Shinkansen retour Tokyo, vol retour.',
        ],
      },
    ],
    transport: [
      'JR Pass 7 jours : ~340 € (rentable si Tokyo↔Kyoto A/R)',
      'Suica ou Pasmo pour métros/bus (rechargeable)',
      'Shinkansen Tokyo–Kyoto seul : ~95 € l’aller',
      'Marche quotidienne : prévoir bonnes chaussures',
    ],
    food: [
      'Sushi : Tsukiji Outer Market, Sushi Dai',
      'Ramen : Ichiran, Afuri, Mensho Tokyo',
      'Tempura : Daikokuya, Tsunahachi',
      'Cafés : %Arabica, Blue Bottle, Streamer',
      'Wagashi : Toraya, Kanshundo',
      'Yakitori : Omoide Yokocho, Nonbei Yokocho',
    ],
    budget: {
      currency: '€',
      total: '1 300 – 1 800',
      perDay: '190 – 260',
      breakdown: [
        { label: 'Hôtel 3–4★', value: '90–150 € / nuit' },
        { label: 'Food', value: '30–50 € / jour' },
        { label: 'Transport', value: '250–340 € (Shinkansen ou JR Pass)' },
        { label: 'Activités', value: '80 € total' },
      ],
    },
    tips: [
      'Réservez teamLab Planets et le Shinkansen 1 mois avant.',
      'Retirez du cash à 7-Eleven ou Family Mart (les ATM banques classiques refusent les cartes étrangères).',
      'Pas de pourboire au Japon, c’est mal vu.',
      'Chaussures faciles à retirer : nombreux temples demandent de se déchausser.',
    ],
    mistakes: [
      'Aller à Fushimi Inari pour le coucher du soleil : c’est bondé, allez-y à 6h30.',
      'Manger en marchant : très mal vu en dehors des zones de street food.',
      'Réserver un hôtel trop loin du métro : Tokyo est immense.',
    ],
    upgrades: [
      'Excursion Nara depuis Kyoto (cerfs sacrés, 1 jour)',
      'Hakone : onsen avec vue Mont Fuji',
      'Tournoi de sumo si en saison (jan / mai / sept)',
    ],
  };
}

// ---------- KOREA + JAPAN ----------
function combinedItinerary(days = 10) {
  return {
    id: 'combined-10',
    title: `Corée + Japon — ${days} jours d'exception`,
    flagEmoji: '🇰🇷🇯🇵',
    accent: 'mixed',
    summary:
      "Le meilleur des deux pays en 10 jours : palais et café culture de Séoul, plages et marché de Busan, modernité électrique de Tokyo, douceur intemporelle de Kyoto. Vol intra-Asie + Shinkansen.",
    profile: [
      'Voyageurs curieux, première fois en Asie du Nord-Est',
      'Budget confort, recherche d’expériences authentiques',
      'Intérêts : culture, food, design, photo, shopping',
      'Rythme modéré, alternance ville/temples/nature',
    ],
    days: [
      {
        day: 1,
        city: 'Séoul',
        title: 'Arrivée & Bukchon',
        items: [
          'Vol → Incheon. AREX vers Seoul Station.',
          'Hanok Village de Bukchon au coucher du soleil.',
          'Korean BBQ pour fêter l’arrivée.',
        ],
      },
      {
        day: 2,
        city: 'Séoul',
        title: 'Palais & cafés',
        items: [
          'Gyeongbokgung + relève de la garde.',
          'Café à Insadong, papier hanji.',
          'Cheonggyecheon stream et N Seoul Tower.',
        ],
      },
      {
        day: 3,
        city: 'Séoul',
        title: 'Seongsu & Han River',
        items: [
          'Cafés design de Seongsu.',
          'Hongdae shopping + perfo de rue.',
          'Chimaek pique-nique au Han River.',
        ],
      },
      {
        day: 4,
        city: 'Séoul → Busan',
        title: 'KTX & Jagalchi',
        items: [
          'KTX vers Busan (2h40).',
          'Jagalchi Market pour le poisson frais.',
          'Gwangalli Beach illuminée le soir.',
        ],
      },
      {
        day: 5,
        city: 'Busan → Tokyo',
        title: 'Gamcheon + vol',
        items: [
          'Matin : Gamcheon Culture Village.',
          'Vol Busan (Gimhae) → Tokyo (≈ 2h15).',
          'Installation à Shibuya / Shinjuku.',
          'Shibuya Crossing au coucher du soleil.',
        ],
      },
      {
        day: 6,
        city: 'Tokyo',
        title: 'Asakusa & Akihabara',
        items: [
          'Senso-ji à l’ouverture.',
          'Tempura à Daikokuya.',
          'Akihabara en soirée.',
        ],
      },
      {
        day: 7,
        city: 'Tokyo',
        title: 'Harajuku & teamLab',
        items: [
          'Meiji Jingu + Takeshita-dori.',
          'Cafés d’Omotesando.',
          'teamLab Planets en soirée.',
        ],
      },
      {
        day: 8,
        city: 'Tokyo → Kyoto',
        title: 'Shinkansen & Gion',
        items: [
          'Sushi au Tsukiji Outer Market.',
          'Shinkansen Tokyo → Kyoto (2h15).',
          'Promenade à Pontocho et Gion au crépuscule.',
        ],
      },
      {
        day: 9,
        city: 'Kyoto',
        title: 'Fushimi Inari & Arashiyama',
        items: [
          'Fushimi Inari à 6h30.',
          'Arashiyama bambouseraie l’après-midi.',
          'Kaiseki léger en soirée.',
        ],
      },
      {
        day: 10,
        city: 'Kyoto',
        title: 'Kinkaku-ji & retour',
        items: [
          'Kinkaku-ji puis matcha & wagashi.',
          'Shinkansen vers Tokyo, vol retour.',
        ],
      },
    ],
    transport: [
      'Vol intra-Asie Busan → Tokyo : ~120 € (Jeju Air, Peach)',
      'KTX Séoul–Busan : ~60 €',
      'Shinkansen Tokyo–Kyoto A/R : ~190 €',
      'Cartes locales : T-money (Corée), Suica (Japon)',
    ],
    food: [
      'Korean BBQ, bibimbap, chimaek, tteokbokki',
      'Sushi, ramen, tempura, wagashi, matcha',
      'Cafés Seongsu (Séoul) + Omotesando (Tokyo)',
      'Marchés : Gwangjang, Jagalchi, Tsukiji, Nishiki',
    ],
    budget: {
      currency: '€',
      total: '2 200 – 2 900',
      perDay: '220 – 290',
      breakdown: [
        { label: 'Hôtels 3–4★ (10 nuits)', value: '900–1 400 €' },
        { label: 'Vol intra-Asie', value: '120–180 €' },
        { label: 'Transport sol', value: '350–450 €' },
        { label: 'Food + activités', value: '500–700 €' },
      ],
    },
    tips: [
      'Réservez le vol Busan → Tokyo bien à l’avance (low cost Jeju Air, Peach).',
      'eSIM internationale ou changer de SIM entre les deux pays.',
      'Évitez Tokyo le 1er janvier (tout est fermé) ou Séoul à Chuseok.',
      'Pliez vos chaussures faciles pour les temples.',
    ],
    mistakes: [
      'Sous-estimer la marche : 15–20 km / jour en cumul.',
      'Vouloir voir Osaka + Hiroshima en plus : 10 jours suffisent à peine pour 4 villes.',
      'Oublier de réserver les Shinkansen et teamLab à l’avance.',
    ],
    upgrades: [
      '+2 jours Jeju Island (Corée) ou Hakone (Japon)',
      'Excursion Nara depuis Kyoto',
      'Atelier kimono ou hanbok pour shooting photo',
    ],
  };
}
