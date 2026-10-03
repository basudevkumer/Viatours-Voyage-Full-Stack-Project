import allImages from "@/components/helper/imageProvider";
import { FiCompass, FiShield, FiUsers, FiHeadphones } from "react-icons/fi";

// TODO(api): Destination starting prices and tour counts below are computed/mock data pending API integration.
// TODO(content): editorial review of regional climates, visa tips, and seasonal suggestions.

const { trendingDestinations, popularThings } = allImages;

export const regions = [
  { id: "all", label: "All Regions", count: 16 },
  { id: "Europe", label: "Europe", count: 6, description: "Historic capitals, Mediterranean coasts, and alpine panoramas." },
  { id: "Asia", label: "Asia", count: 5, description: "Equatorial rainforests, ancient temples, and vibrant night markets." },
  { id: "Middle East", label: "Middle East", count: 2, description: "Desert landscapes, futuristic skylines, and ancient trade routes." },
  { id: "Americas", label: "Americas", count: 1, description: "Iconic skylines, diverse cultures, and world-class arts." },
  { id: "Oceania", label: "Oceania", count: 1, description: "Sun-drenched harbour cities and rugged coastal walking trails." },
  { id: "Indian Ocean", label: "Indian Ocean", count: 1, description: "Turquoise lagoons, marine reserves, and serene overwater retreats." },
];

export const destinationsData = [
  {
    id: "paris",
    slug: "paris",
    name: "Paris",
    city: "Paris",
    country: "France",
    region: "Europe",
    tagline: "Art, architecture, and timeless culinary romance along the Seine",
    image: trendingDestinations[0].image,
    bestMonths: ["Apr", "May", "Jun", "Sep", "Oct"],
    travelStyles: ["Culture", "City break", "Food", "Luxury"],
    featured: true,
    startingPrice: 42,
    toursCount: 6,
    overview:
      "Paris is a city of layered history, celebrated art galleries, and vibrant cafe culture. From quiet morning strolls through the Latin Quarter to sunset cruises past Notre-Dame, our Parisian itineraries highlight both iconic monuments and neighborhood secrets.",
    highlights: [
      "Louvre Museum & Musee d'Orsay masterworks",
      "Montmartre bohemian alleys & Sacre-Coeur panorama",
      "Seine twilight catamaran cruise with local wine",
      "Historic Le Marais bakeries, bistros & courtyards",
    ],
    goodToKnow: {
      currency: "EUR (€)",
      language: "French (English widely understood)",
      idealStay: "4–6 days",
      climate: "Temperate maritime with warm summers and mild winters",
    },
    faqs: [
      {
        question: "When is the best time to visit Paris for fewer crowds?",
        answer: "Late April to May and September to October offer pleasant mild weather with fewer tourist queues compared to peak July and August.",
      },
      {
        question: "Are walking tours in Paris suitable for all fitness levels?",
        answer: "Yes, our city walks are gently paced with multiple cafe and photo stops. Comfortable walking shoes are recommended on historic cobblestones.",
      },
      {
        question: "Do tour packages include skip-the-line museum tickets?",
        answer: "Most guided museum tours include reserved timed-entry access to bypass main public ticket queues.",
      },
    ],
  },
  {
    id: "singapore",
    slug: "singapore",
    name: "Singapore",
    city: "Singapore",
    country: "Singapore",
    region: "Asia",
    tagline: "Futuristic garden cities, world-class hawker gastronomy, and cultural heritage",
    image: trendingDestinations[1].image,
    bestMonths: ["Jan", "Feb", "Jul", "Aug", "Nov"],
    travelStyles: ["City break", "Food", "Family", "Culture"],
    featured: false,
    startingPrice: 149,
    toursCount: 4,
    overview:
      "Singapore effortlessly bridges lush equatorial nature with ultramodern design. Wander beneath the colossal Supertrees of Gardens by the Bay, sample Michelin-starred street fare in historic Chinatown, and experience vibrant multicultural enclaves.",
    highlights: [
      "Gardens by the Bay & Cloud Forest biodome",
      "Chinatown & Little India heritage culinary safaris",
      "Marina Bay waterfront night light show",
      "Peranakan shophouse heritage walks in Joo Chiat",
    ],
    goodToKnow: {
      currency: "SGD (S$)",
      language: "English, Mandarin, Malay, Tamil",
      idealStay: "3–4 days",
      climate: "Tropical rainforest climate, warm and humid year-round",
    },
    faqs: [
      {
        question: "Is Singapore easy to get around for families?",
        answer: "Extremely easy. Singapore's MRT subway system is clean, air-conditioned, and connects seamlessly to all major attractions.",
      },
      {
        question: "What is the dress code for religious temples?",
        answer: "Visitors should cover shoulders and knees when entering Buddhist, Hindu, and Muslim religious sites. Removable wraps are often provided.",
      },
    ],
  },
  {
    id: "rome",
    slug: "rome",
    name: "Rome",
    city: "Rome",
    country: "Italy",
    region: "Europe",
    tagline: "Two millennia of living history, ancient ruins, and sunlit piazzas",
    image: trendingDestinations[2].image,
    bestMonths: ["Mar", "Apr", "May", "Oct", "Nov"],
    travelStyles: ["Culture", "Food", "History", "Family"],
    featured: true,
    startingPrice: 220,
    toursCount: 5,
    overview:
      "Rome is an open-air museum where ancient marble temples stand beside bustling espresso bars. Walk in the footsteps of gladiators at the Colosseum, marvel at the Vatican Museums, and savor classic Roman pastas in quiet Trastevere trattorias.",
    highlights: [
      "Colosseum underground & Roman Forum private access",
      "Vatican Museums, Sistine Chapel & St. Peter's Basilica",
      "Trastevere evening food and wine discovery",
      "Pantheon, Trevi Fountain & Piazza Navona walking loop",
    ],
    goodToKnow: {
      currency: "EUR (€)",
      language: "Italian (English common in hotels & venues)",
      idealStay: "4–5 days",
      climate: "Mediterranean with hot summers and mild, wet winters",
    },
    faqs: [
      {
        question: "How far in advance should I reserve Vatican tours?",
        answer: "We strongly advise booking at least 3 to 4 weeks in advance due to strict daily entry quotas established by Vatican authorities.",
      },
      {
        question: "Is drinking fountain water safe in Rome?",
        answer: "Yes, the historic 'nasoni' public fountains throughout Rome provide clean, ice-cold mountain spring water suitable for refilling bottles.",
      },
    ],
  },
  {
    id: "bangkok",
    slug: "bangkok",
    name: "Bangkok",
    city: "Bangkok",
    country: "Thailand",
    region: "Asia",
    tagline: "Golden riverfront temples, neon night markets, and aromatic street kitchens",
    image: trendingDestinations[3].image,
    bestMonths: ["Nov", "Dec", "Jan", "Feb"],
    travelStyles: ["Culture", "Food", "City break", "Adventure"],
    featured: false,
    startingPrice: 99,
    toursCount: 4,
    overview:
      "Bangkok electrifies the senses with golden spires rising along the Chao Phraya River and vibrant night bazaars. Discover hidden canal communities by wooden longtail boat and taste authentic Thai curries curated by local culinary guides.",
    highlights: [
      "Grand Palace, Emerald Buddha & Wat Arun",
      "Chao Phraya private longtail boat canal voyage",
      "Chatuchak weekend artisan market guided walk",
      "Yaowarat Chinatown street food evening safari",
    ],
    goodToKnow: {
      currency: "THB (฿)",
      language: "Thai (basic English widely understood)",
      idealStay: "3–4 days",
      climate: "Tropical monsoon climate; coolest and driest from November to February",
    },
    faqs: [
      {
        question: "What is the best way to avoid Bangkok traffic?",
        answer: "River ferries along the Chao Phraya River and the elevated BTS Skytrain offer scenic, air-conditioned alternatives to city road traffic.",
      },
    ],
  },
  {
    id: "bali",
    slug: "bali",
    name: "Bali",
    city: "Bali",
    country: "Indonesia",
    region: "Asia",
    tagline: "Emerald volcanic terraces, spiritual sea temples, and serene coastal surf",
    image: trendingDestinations[4].image,
    bestMonths: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    travelStyles: ["Beach", "Nature", "Culture", "Adventure", "Wellness"],
    featured: true,
    startingPrice: 259,
    toursCount: 7,
    overview:
      "Bali enchants with its deeply rooted Hindu ceremonies, misty volcanic peaks, and idyllic coastal beaches. Trek through the terraced rice paddies of Ubud, visit cliffside sunset temples in Uluwatu, and experience genuine Balinese warmth.",
    highlights: [
      "Tegallalang terraced rice paddies & Ubud artisan villages",
      "Uluwatu dramatic sea cliff temple & Kecak fire dance",
      "Mount Batur sunrise crater hike with thermal springs",
      "Nusa Penida coastal islands speedboat day trip",
    ],
    goodToKnow: {
      currency: "IDR (Rp)",
      language: "Indonesian, Balinese (English common)",
      idealStay: "7–10 days",
      climate: "Tropical with dry season from April to October",
    },
    faqs: [
      {
        question: "Can I combine culture with beach time in Bali?",
        answer: "Yes, our itineraries usually spend 3–4 days in cultural Ubud followed by 3–4 days on coastal southern beaches (Seminyak, Uluwatu, or Sanur).",
      },
      {
        question: "Are private drivers included in Bali tour packages?",
        answer: "Yes, all multi-day Bali experiences include private air-conditioned transport and licensed native drivers.",
      },
    ],
  },
  {
    id: "phuket",
    slug: "phuket",
    name: "Phuket",
    city: "Phuket",
    country: "Thailand",
    region: "Asia",
    tagline: "Turquoise Andaman bays, limestone sea karsts, and vibrant Sino-Portuguese streets",
    image: trendingDestinations[5].image,
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    travelStyles: ["Beach", "Adventure", "Nature", "Family"],
    featured: false,
    startingPrice: 76,
    toursCount: 5,
    overview:
      "Phuket serves as the gateway to Thailand's dramatic Andaman coastline. Charter traditional wooden boats to Phi Phi's secluded lagoons, snorkel vibrant coral formations, and explore the historic pastel shophouses of Old Phuket Town.",
    highlights: [
      "Phang Nga Bay sea kayaking through limestone caves",
      "Phi Phi Islands & Maya Bay early-bird catamaran tour",
      "Old Phuket Town Sino-Portuguese architecture & food walk",
      "Big Buddha marble monument hilltop viewpoint",
    ],
    goodToKnow: {
      currency: "THB (฿)",
      language: "Thai (English common in resorts)",
      idealStay: "4–6 days",
      climate: "Tropical maritime with calm seas November to April",
    },
    faqs: [
      {
        question: "Are island boat tours safe for non-swimmers?",
        answer: "Yes. Coast Guard certified life vests are provided for all guests, and crew members assist in shallow lagoon swim spots.",
      },
    ],
  },
  {
    id: "tokyo",
    slug: "tokyo",
    name: "Tokyo",
    city: "Tokyo",
    country: "Japan",
    region: "Asia",
    tagline: "Electric neon crossroads, serene Shinto shrines, and unparalleled culinary craft",
    image: trendingDestinations[6].image,
    bestMonths: ["Mar", "Apr", "May", "Oct", "Nov"],
    travelStyles: ["Culture", "City break", "Food", "Luxury"],
    featured: true,
    startingPrice: 310,
    toursCount: 6,
    overview:
      "Tokyo is a masterclass in contrasts, where futuristic Shibuya crossings exist minutes away from tranquil cedar-lined Meiji Shrine paths. Delve into morning seafood auctions, explore hidden Yanaka alleys, and enjoy day journeys to Mount Fuji.",
    highlights: [
      "Shibuya Crossing, Harajuku & Meiji Shrine cultural loop",
      "Mount Fuji 5th Station & Lake Kawaguchi day excursion",
      "Tsukiji outer market street food & sushi workshop",
      "Historic Asakusa Senso-ji temple and river cruise",
    ],
    goodToKnow: {
      currency: "JPY (¥)",
      language: "Japanese (signage in English throughout transit)",
      idealStay: "5–7 days",
      climate: "Four distinct seasons; cherry blossoms in spring, vibrant foliage in autumn",
    },
    faqs: [
      {
        question: "When is the cherry blossom (sakura) season in Tokyo?",
        answer: "Typically from late March to early April. We recommend booking spring tours 2 to 3 months ahead.",
      },
      {
        question: "Do guides assist with dietary restrictions in Japan?",
        answer: "Yes, our culinary guides can pre-arrange vegetarian, halal, or allergy-friendly alternatives where available.",
      },
    ],
  },
  {
    id: "cappadocia",
    slug: "cappadocia",
    name: "Cappadocia",
    city: "Cappadocia",
    country: "Turkey",
    region: "Middle East",
    tagline: "Surreal fairy chimneys, dawn hot air balloon flights, and ancient cave dwellings",
    image: trendingDestinations[7].image,
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    travelStyles: ["Adventure", "Culture", "Nature", "Luxury"],
    featured: true,
    startingPrice: 68,
    toursCount: 5,
    overview:
      "Cappadocia presents a lunar landscape shaped by volcanic ash and centuries of erosion. Rise with the dawn breeze inside a hot air balloon over Love Valley, sleep inside historic boutique cave suites, and discover subterranean Byzantine cities.",
    highlights: [
      "Sunrise hot air balloon flight over Rose & Love Valleys",
      "Derinkuyu multi-level underground city exploration",
      "Goreme Open Air Museum rock-cut fresco churches",
      "Pigeon Valley sunset hike and local pottery workshop",
    ],
    goodToKnow: {
      currency: "TRY (₺) / EUR (€)",
      language: "Turkish (English common)",
      idealStay: "3–4 days",
      climate: "Continental with crisp dry mornings and warm sunny afternoons",
    },
    faqs: [
      {
        question: "What happens if hot air balloon flights are cancelled due to wind?",
        answer: "Civil Aviation controls daily flight permits for safety. If wind cancels your flight, operators automatically reschedule to the next morning or issue a full refund.",
      },
    ],
  },
  {
    id: "dubai",
    slug: "dubai",
    name: "Dubai",
    city: "Dubai",
    country: "UAE",
    region: "Middle East",
    tagline: "Record-breaking architectural feats, golden desert safaris, and Arabian hospitality",
    image: trendingDestinations[8].image,
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    travelStyles: ["Luxury", "City break", "Adventure", "Family"],
    featured: false,
    startingPrice: 84,
    toursCount: 4,
    overview:
      "Dubai rises dramatically from the Arabian sands as a global metropolis of luxury and architectural spectacle. Experience desert dunes under starlight, marvel at the Burj Khalifa's skyline vistas, and explore historic spice and gold souks.",
    highlights: [
      "Burj Khalifa observation deck & Dubai Fountain show",
      "Red dune 4x4 desert safari with Bedouin camp dinner",
      "Dubai Creek traditional abra wooden boat crossing",
      "Dubai Marina luxury catamaran sunset cruise",
    ],
    goodToKnow: {
      currency: "AED (AED)",
      language: "Arabic (English is the business language)",
      idealStay: "4–5 days",
      climate: "Desert climate; mild and pleasant between November and March",
    },
    faqs: [
      {
        question: "Is Dubai family-friendly?",
        answer: "Yes, Dubai boasts state-of-the-art waterparks, theme attractions, calm family beaches, and exceptionally safe public spaces.",
      },
    ],
  },
  {
    id: "barcelona",
    slug: "barcelona",
    name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    region: "Europe",
    tagline: "Gaudi's whimsical architecture, lively Mediterranean beaches, and tapas culture",
    image: trendingDestinations[9].image,
    bestMonths: ["May", "Jun", "Sep", "Oct"],
    travelStyles: ["Culture", "Beach", "Food", "City break"],
    featured: false,
    startingPrice: 48,
    toursCount: 5,
    overview:
      "Barcelona harmonizes seaside relaxation with architectural genius. Marvel at Antoni Gaudi's towering Sagrada Familia and Park Guell, wander the medieval stone alleys of the Gothic Quarter, and share late-night tapas in El Born.",
    highlights: [
      "Sagrada Familia fast-track basilica architecture tour",
      "Park Guell mosaic gardens & panoramic city view",
      "Gothic Quarter & El Born evening tapas crawl",
      "Montjuic cable car & Olympic stadium viewpoint",
    ],
    goodToKnow: {
      currency: "EUR (€)",
      language: "Spanish, Catalan",
      idealStay: "4–5 days",
      climate: "Mediterranean with sunny summers and mild, clear winters",
    },
    faqs: [
      {
        question: "Can I walk to the beach from the city center in Barcelona?",
        answer: "Yes, Barceloneta Beach is roughly a 20-minute pleasant walk through the Gothic Quarter from Las Ramblas.",
      },
    ],
  },
  {
    id: "london",
    slug: "london",
    name: "London",
    city: "London",
    country: "UK",
    region: "Europe",
    tagline: "Royal palaces, world-class West End theater, and historic Thames riverfronts",
    image: trendingDestinations[10].image,
    bestMonths: ["May", "Jun", "Jul", "Aug", "Sep"],
    travelStyles: ["Culture", "City break", "History", "Family"],
    featured: false,
    startingPrice: 39,
    toursCount: 6,
    overview:
      "London is a dynamic cultural capital steeped in millennia of royal history and literary lore. Walk alongside the Thames to Shakespeare's Globe, discover royal secrets at the Tower of London, and explore leafy parks and historic pubs.",
    highlights: [
      "Tower of London & Crown Jewels private morning entry",
      "Westminster Abbey & Houses of Parliament walk",
      "Borough Market culinary tour & Thames pathway",
      "Cotswolds villages & Oxford day excursion",
    ],
    goodToKnow: {
      currency: "GBP (£)",
      language: "English",
      idealStay: "4–6 days",
      climate: "Temperate oceanic with warm summers and cool, overcast winters",
    },
    faqs: [
      {
        question: "Are museums free in London?",
        answer: "Permanent collections at major museums (British Museum, Natural History, Tate Modern) are free, though special exhibitions require tickets.",
      },
    ],
  },
  {
    id: "new-york",
    slug: "new-york",
    name: "New York",
    city: "New York",
    country: "USA",
    region: "Americas",
    tagline: "Iconic Manhattan skylines, Broadway stages, and vibrant neighborhood enclaves",
    image: trendingDestinations[11].image,
    bestMonths: ["Apr", "May", "Sep", "Oct", "Dec"],
    travelStyles: ["City break", "Culture", "Food", "Luxury"],
    featured: false,
    startingPrice: 195,
    toursCount: 5,
    overview:
      "New York pulses with unmistakable urban energy. From morning strolls along Central Park's winding paths to sunset panoramas from Top of the Rock and intimate jazz clubs in Greenwich Village, the city offers boundless discovery.",
    highlights: [
      "Statue of Liberty & Ellis Island ferry crossing",
      "Central Park bike & guided architecture tour",
      "High Line elevated park & Chelsea Market food walk",
      "Brooklyn Bridge pedestrian crossing & DUMBO skyline view",
    ],
    goodToKnow: {
      currency: "USD ($)",
      language: "English",
      idealStay: "4–6 days",
      climate: "Humid continental with hot summers and snowy holiday winters",
    },
    faqs: [
      {
        question: "Is the subway the fastest way to get around NYC?",
        answer: "Yes, the 24/7 New York City subway is by far the fastest and most cost-effective way to travel between Manhattan and outer boroughs.",
      },
    ],
  },
  {
    id: "sydney",
    slug: "sydney",
    name: "Sydney",
    city: "Sydney",
    country: "Australia",
    region: "Oceania",
    tagline: "Sun-drenched harbour sails, golden Bondi surf, and rugged coastal cliffs",
    image: trendingDestinations[12].image,
    bestMonths: ["Sep", "Oct", "Nov", "Feb", "Mar", "Apr"],
    travelStyles: ["Beach", "Nature", "City break", "Adventure"],
    featured: false,
    startingPrice: 185,
    toursCount: 4,
    overview:
      "Sydney embraces the sea with natural harbour panoramas and celebrated ocean beaches. Climb the Sydney Harbour Bridge, explore the world-renowned Opera House, and coastal trek from Bondi to Coogee past sandstone ocean baths.",
    highlights: [
      "Sydney Opera House insider architectural tour",
      "Harbour Bridge summit climb experience",
      "Bondi to Bronte dramatic coastal cliff walk",
      "Blue Mountains National Park & Three Sisters day trip",
    ],
    goodToKnow: {
      currency: "AUD (A$)",
      language: "English",
      idealStay: "5–7 days",
      climate: "Sunny Mediterranean-style climate with warm summers and mild winters",
    },
    faqs: [
      {
        question: "When is summer in Sydney?",
        answer: "Southern Hemisphere summer spans December through February, offering prime beach weather and vibrant outdoor harbour events.",
      },
    ],
  },
  {
    id: "istanbul",
    slug: "istanbul",
    name: "Istanbul",
    city: "Istanbul",
    country: "Turkey",
    region: "Europe",
    tagline: "Where continents meet: Ottoman minarets, Bosphorus waterways, and rich spices",
    image: trendingDestinations[13].image,
    bestMonths: ["Apr", "May", "Sep", "Oct"],
    travelStyles: ["Culture", "Food", "History", "City break"],
    featured: false,
    startingPrice: 155,
    toursCount: 5,
    overview:
      "Istanbul straddles Europe and Asia across the glittering Bosphorus strait. Lose yourself in the vaulted labyrinths of the Grand Bazaar, stand beneath Hagia Sophia's celestial dome, and cross between continents by ferry at golden hour.",
    highlights: [
      "Hagia Sophia & Sultanahmet Blue Mosque exploration",
      "Bosphorus strait sunset boat cruise with audio guide",
      "Grand Bazaar & Spice Market artisan shopping tour",
      "Topkapi Palace sultan quarters & imperial treasury",
    ],
    goodToKnow: {
      currency: "TRY (₺)",
      language: "Turkish",
      idealStay: "4–5 days",
      climate: "Transitional Mediterranean with warm sunny springs and crisp autumns",
    },
    faqs: [
      {
        question: "Do I need a head covering for mosques in Istanbul?",
        answer: "Yes, women should cover their heads, shoulders, and knees before entering active mosques. Headscarves are lent free of charge at mosque entrances.",
      },
    ],
  },
  {
    id: "maldives",
    slug: "maldives",
    name: "Maldives",
    city: "Maldives",
    country: "Maldives",
    region: "Indian Ocean",
    tagline: "Pristine overwater villas, untouched coral reefs, and luminous blue lagoons",
    image: trendingDestinations[14].image,
    bestMonths: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
    travelStyles: ["Beach", "Luxury", "Nature", "Adventure"],
    featured: true,
    startingPrice: 92,
    toursCount: 5,
    overview:
      "The Maldives represents the pinnacle of barefoot island tranquility. Suspended over crystal lagoons, experience private overwater villas, snorkel beside gentle manta rays and sea turtles, and witness glowing bioluminescent night tides.",
    highlights: [
      "House reef snorkeling with sea turtles & rays",
      "Sunset dolphin cruise by traditional wooden Dhoni",
      "Private uninhabited sandbank picnic lunch",
      "Overwater spa & twilight stargazing session",
    ],
    goodToKnow: {
      currency: "MVR (Rf) / USD ($)",
      language: "Dhivehi (English spoken across all resorts)",
      idealStay: "5–7 days",
      climate: "Equatorial tropical with endless warmth and balmy water",
    },
    faqs: [
      {
        question: "How do resort transfers work from Male Airport?",
        answer: "Depending on distance, transfers are operated by speedboats for nearby North/South Male atolls, or scenic seaplanes for outer atolls.",
      },
    ],
  },
  {
    id: "santorini",
    slug: "santorini",
    name: "Santorini",
    city: "Santorini",
    country: "Greece",
    region: "Europe",
    tagline: "Whitewashed caldera villages, cobalt-blue domes, and dramatic Aegean sunsets",
    image: trendingDestinations[15].image,
    bestMonths: ["Apr", "May", "Jun", "Sep", "Oct"],
    travelStyles: ["Beach", "Culture", "Food", "Luxury"],
    featured: true,
    startingPrice: 55,
    toursCount: 6,
    overview:
      "Santorini clings to volcanic cliffs towering hundreds of meters above the azure Aegean Sea. Hike the breathtaking rim from Fira to Oia, taste crisp Assyrtiko wines nurtured by volcanic soil, and sail into the caldera at twilight.",
    highlights: [
      "Oia cliffside sunset walk & blue-domed church vistas",
      "Caldera catamaran sailing cruise with hot springs swim",
      "Volcanic vineyard wine tasting & local meze pairing",
      "Akrotiri prehistoric Minoan ruins archaeological tour",
    ],
    goodToKnow: {
      currency: "EUR (€)",
      language: "Greek (English widely spoken)",
      idealStay: "3–5 days",
      climate: "Mediterranean arid climate with steady sea breezes",
    },
    faqs: [
      {
        question: "What is the best way to get between Fira and Oia?",
        answer: "You can hike the scenic 10km coastal caldera trail in about 3 hours, or take a direct 20-minute local bus or taxi.",
      },
    ],
  },
];

// Months metadata for "Where to go by month"
export const monthGuide = [
  { id: "Jan", label: "January", destinations: ["phuket", "bangkok", "maldives", "singapore", "dubai"] },
  { id: "Feb", label: "February", destinations: ["maldives", "dubai", "phuket", "sydney", "singapore"] },
  { id: "Mar", label: "March", destinations: ["tokyo", "rome", "cappadocia", "dubai", "sydney"] },
  { id: "Apr", label: "April", destinations: ["tokyo", "paris", "rome", "cappadocia", "santorini"] },
  { id: "May", label: "May", destinations: ["paris", "santorini", "bali", "barcelona", "london"] },
  { id: "Jun", label: "June", destinations: ["bali", "santorini", "barcelona", "london", "paris"] },
  { id: "Jul", label: "July", destinations: ["bali", "london", "singapore", "new-york", "sydney"] },
  { id: "Aug", label: "August", destinations: ["bali", "singapore", "london", "new-york", "santorini"] },
  { id: "Sep", label: "September", destinations: ["rome", "paris", "santorini", "barcelona", "cappadocia"] },
  { id: "Oct", label: "October", destinations: ["tokyo", "rome", "cappadocia", "santorini", "new-york"] },
  { id: "Nov", label: "November", destinations: ["bangkok", "phuket", "dubai", "maldives", "singapore"] },
  { id: "Dec", label: "December", destinations: ["dubai", "phuket", "bangkok", "maldives", "new-york"] },
];

export const travelStylePicks = [
  {
    id: "beach",
    title: "Beach & Coastal",
    subtitle: "Turquoise lagoons and sun-warmed island sands",
    destinations: ["Bali", "Santorini", "Maldives", "Phuket"],
    image: trendingDestinations[14].image,
    toursHref: "/tours?category=Beach+Escapes",
  },
  {
    id: "culture",
    title: "Culture & Heritage",
    subtitle: "Ancient temples, world-class museums, and living traditions",
    destinations: ["Rome", "Kyoto", "Paris", "Istanbul"],
    image: trendingDestinations[2].image,
    toursHref: "/tours?category=Cultural",
  },
  {
    id: "adventure",
    title: "Adventure & Outdoors",
    subtitle: "Active volcano ascents, canyon treks, and open horizons",
    destinations: ["Cappadocia", "Sydney", "Bali", "Phuket"],
    image: trendingDestinations[7].image,
    toursHref: "/tours?category=Adventure",
  },
  {
    id: "city",
    title: "Iconic City Breaks",
    subtitle: "Gastronomic hotspots, legendary skylines, and historic streets",
    destinations: ["New York", "London", "Tokyo", "Singapore"],
    image: trendingDestinations[11].image,
    toursHref: "/tours?category=City+Breaks",
  },
  {
    id: "luxury",
    title: "Luxury & Private Escapes",
    subtitle: "Secluded overwater villas and bespoke private guides",
    destinations: ["Maldives", "Dubai", "Santorini", "Paris"],
    image: trendingDestinations[15].image,
    toursHref: "/tours?category=Luxury",
  },
  {
    id: "nature",
    title: "Nature & Wildlife",
    subtitle: "Marine reserves, misty cloud forests, and national parks",
    destinations: ["Bali", "Sydney", "Maldives", "Cappadocia"],
    image: trendingDestinations[12].image,
    toursHref: "/tours?category=Nature",
  },
];

export const destinationValueProps = [
  {
    icon: FiCompass,
    title: "Handpicked local operators",
    description: "Every regional partner is verified for licensing, safety records, and authentic storytelling.",
  },
  {
    icon: FiShield,
    title: "Flexible cancellation terms",
    description: "Life happens. Enjoy refundable options and clear rescheduling policies on qualifying bookings.",
  },
  {
    icon: FiUsers,
    title: "Small groups or private pace",
    description: "Travel with like-minded companions or reserve a private escort tailored to your party.",
  },
  {
    icon: FiHeadphones,
    title: "24/7 destination support",
    description: "Direct WhatsApp and hotline access to our coordinators while you are on the ground.",
  },
];

export const destinationsGeneralFaqs = [
  {
    question: "How do I choose the right destination for my travel style?",
    answer: "Start with what matters most to you: cultural immersion, relaxation, high-energy adventure, or family pacing. Use our quick filter chips by travel style and season, or try our 3-question Destination Planner to receive personalized suggestions.",
  },
  {
    question: "What is the best way to plan a multi-city or regional trip?",
    answer: "Many travelers combine nearby destinations—such as Paris and Rome, or Bangkok and Phuket. Our custom trip coordinators can orchestrate inter-city transfers, high-speed rail, and synchronized hotel stays through our 'Plan My Trip' service.",
  },
  {
    question: "Are visa and passport guidelines provided before booking?",
    answer: "We outline general entry advisories and passport validity requirements for each destination. Because immigration laws change frequently, we always recommend verifying with your national foreign ministry or official embassy portal prior to travel.",
  },
  {
    question: "How are destination starting prices calculated?",
    answer: "Published starting prices reflect our lowest verified day tour or multi-day itinerary base rate in that destination. Inclusions and seasonal rates are always shown transparently with zero hidden fees.",
  },
  {
    question: "Can I book custom private group tours for a family reunion or corporate retreat?",
    answer: "Yes. Our dedicated groups team manages private coach transfers, boutique villa buyouts, and customized group itineraries for parties of 8 or more. Request a group quote via our group travel portal.",
  },
];

export const destinationStats = [
  { value: "16", label: "Vetted global destinations" },
  { value: "500+", label: "Handcrafted tour itineraries" },
  { value: "100%", label: "Verified native local guides" },
  { value: "24/7", label: "Human traveler care hotline" },
];
