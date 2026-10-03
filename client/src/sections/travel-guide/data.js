import allImages from "@/components/helper/imageProvider";

// TODO(api): Replace in-memory guide data with apiRequest('/guides') when API is ready.
// TODO(content): Editorial review of guide body drafts, recommendations, and localized transit instructions.

const { trendingDestinations, banner } = allImages;

// Images corresponding to destinations from imageProvider
const ParisImg = trendingDestinations[0].image;
const SingaporeImg = trendingDestinations[1].image;
const RomeImg = trendingDestinations[2].image;
const BangkokImg = trendingDestinations[3].image;
const BaliImg = trendingDestinations[4].image;
const PhuketImg = trendingDestinations[5].image;
const TokyoImg = trendingDestinations[6].image;
const CappadociaImg = trendingDestinations[7].image;
const DubaiImg = trendingDestinations[8].image;
const BarcelonaImg = trendingDestinations[9].image;
const LondonImg = trendingDestinations[10].image;
const NewYorkImg = trendingDestinations[11].image;
const SydneyImg = trendingDestinations[12].image;
const IstanbulImg = trendingDestinations[13].image;
const MaldivesImg = trendingDestinations[14].image;
const SantoriniImg = trendingDestinations[15].image;

export const GUIDE_CATEGORIES = [
  "Destination guides",
  "Food & culture",
  "Beach & islands",
  "Adventure",
  "City breaks",
  "Luxury & wellness",
  "Planning tips",
];

const DEFAULT_AUTHOR = {
  name: "Viatours Editorial Team",
  role: "Destination Specialists",
};

export const guides = [
  {
    id: "1",
    slug: "kenya-vs-tanzania-safari",
    title: "Kenya vs Tanzania Safari: Choosing the Better African Wildlife Corridor",
    excerpt:
      "Comparing seasonal wildlife migrations, national park permits, travel pacing, and bush lodge styles across East Africa's iconic savannas.",
    // TODO(content): needs authentic wildlife safari cover photo; using neutral branded landscape fallback to avoid unrelated imagery
    coverImage: banner,
    coverImageAlt: "Viatours African safari journey planning landscape",
    category: "Adventure",
    tags: ["Safari", "Wildlife", "East Africa", "Adventure Planning"],
    destination: { name: "East Africa", slug: "africa-safari" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-02-14",
    updatedAt: "2026-08-20",
    featured: true,
    editorsPick: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "overview",
        text: "The Core Differences: Landscape, Crowds, and Transit",
      },
      {
        type: "paragraph",
        text: "Both Kenya and Tanzania share the Greater Serengeti-Mara ecosystem, home to the world's most dramatic terrestrial mammal migration. However, your on-the-ground experience varies significantly depending on park management styles, internal logistics, and seasonal river crossings.",
      },
      {
        type: "callout",
        title: "Key Takeaway",
        text: "Kenya's Masai Mara offers denser game viewing and shorter road transfers from Nairobi, while Tanzania's northern circuit delivers vast wilderness expanses like the Ngorongoro Crater with stricter vehicle limits.",
      },
      {
        type: "heading",
        level: 2,
        id: "migration-timing",
        text: "Understanding the Migration Timing by Season",
      },
      {
        type: "paragraph",
        text: "The Great Migration is a continuous year-round loop rather than a single event. Where the herds gather depends on rainfall patterns across the plains:",
      },
      {
        type: "list",
        items: [
          "January to March: Southern Serengeti (Ndutu) for calving season and predator activity.",
          "April to June: Western corridor and Grumeti River crossing during the long rains.",
          "July to October: Mara River crossings between northern Serengeti and Kenya's Masai Mara.",
          "November to December: Return south across the eastern plains into Tanzania.",
        ],
      },
      {
        type: "quote",
        text: "The secret to an unforgettable safari is matching your travel month with the correct eco-zone rather than simply picking a country first.",
        cite: "Viatours Field Operations",
      },
      {
        type: "cta",
        title: "Planning a bespoke wildlife expedition?",
        text: "Our coordinators arrange private game drives, camp permits, and bush flights tailored to your preferred season.",
        actionLabel: "Plan an East Africa trip",
      },
      {
        type: "heading",
        level: 2,
        id: "budget-and-permits",
        text: "Permits, Concessions, and Group Styles",
      },
      {
        type: "paragraph",
        text: "Tanzania generally carries higher daily conservation and crater vehicle descent tariffs, meaning equal-tier itineraries in Tanzania often price 15% to 25% higher than equivalent Kenyan departures. Conversely, Kenya has developed private community conservancies where night game drives and off-road tracking are permitted.",
      },
    ],
  },
  {
    id: "2",
    slug: "hidden-gems-paris",
    title: "Top 10 Hidden Gems in Paris for Curious Travelers",
    excerpt:
      "Quiet courtyards in the Marais, glass-roofed 19th-century passages, and historic bakeries away from congested tourist corridors.",
    coverImage: ParisImg,
    coverImageAlt: "Scenic historic street corner in Paris",
    category: "City breaks",
    tags: ["Paris", "France", "City Walk", "Culture"],
    destination: { name: "Paris", slug: "paris" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-03-02",
    featured: false,
    editorsPick: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "covered-passages",
        text: "Passage des Panoramas and Galerie Vivienne",
      },
      {
        type: "paragraph",
        text: "Built in the early 19th century, Paris's covered passages offered sheltered shopping long before department stores existed. Mosaic tile floors, antique philatelists, and artisan tea rooms remain tucked beneath intricate iron-and-glass skylights.",
      },
      {
        type: "heading",
        level: 2,
        id: "latin-quarter-ruins",
        text: "Roman Paris: Arènes de Lutèce",
      },
      {
        type: "paragraph",
        text: "Few visitors realize that 1st-century Roman amphitheater ruins survive right in the 5th arrondissement. Today, local neighborhood residents play pétanque where gladiators once assembled.",
      },
      {
        type: "callout",
        title: "Neighborhood Tip",
        text: "Visit in the late afternoon with fresh pastries from Rue Mouffetard for a peaceful pause between museum visits.",
      },
      {
        type: "cta",
        title: "Want to explore Paris with a native historian?",
        text: "Join small-group walking tours and skip-the-line museum experiences led by accredited local guides.",
        actionLabel: "Browse Paris experiences",
      },
    ],
  },
  {
    id: "3",
    slug: "cappadocia-hot-air-balloon-guide",
    title: "Hot Air Balloon Rides in Cappadocia: Everything You Need to Know",
    excerpt:
      "Flight safety standards, basket capacities, sunrise wind patterns, and cancellation insurance policies explained clearly.",
    coverImage: CappadociaImg,
    coverImageAlt: "Hot air balloons rising over the fairy chimneys of Cappadocia",
    category: "Adventure",
    tags: ["Cappadocia", "Turkey", "Hot Air Balloon", "Sunrise"],
    destination: { name: "Cappadocia", slug: "cappadocia" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-01-20",
    updatedAt: "2026-06-15",
    featured: true,
    editorsPick: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "weather-and-civil-aviation",
        text: "How the Turkish Civil Aviation Authority Regulates Flights",
      },
      {
        type: "paragraph",
        text: "Passenger safety in Göreme is strictly monitored. The State Meteorological Service and Civil Aviation Authority issue real-time flag alerts (green, yellow, red) every morning before dawn. If wind speed exceeds safety thresholds, all flights are grounded unconditionally.",
      },
      {
        type: "heading",
        level: 2,
        id: "contingency-days",
        text: "Always Allocate At Least 2 to 3 Mornings",
      },
      {
        type: "paragraph",
        text: "Because flights are weather-dependent, booking a single-night stay in Cappadocia creates an unnecessary risk of missed flights. Planning three mornings ensures you can reschedule smoothly if morning winds prevent takeoff.",
      },
      {
        type: "cta",
        title: "Booking Cappadocia excursions?",
        text: "Every Viatours balloon departure includes automatic priority rebooking or a 100% refund if weather halts flights.",
        actionLabel: "View Cappadocia tours",
      },
    ],
  },
  {
    id: "4",
    slug: "maldives-budget-travel-guide",
    title: "Maldives on a Realistic Budget: Island Living Without Resort Markups",
    excerpt:
      "How to base yourself on inhabited local islands, take public ferries, and book reef excursions at genuine rates.",
    coverImage: MaldivesImg,
    coverImageAlt: "Turquoise lagoon and palm trees in the Maldives",
    category: "Beach & islands",
    tags: ["Maldives", "Islands", "Budget Travel", "Marine Life"],
    destination: { name: "Maldives", slug: "maldives" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-04-10",
    featured: false,
    editorsPick: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "local-islands",
        text: "Guesthouses on Maafushi, Dhigurah, and Fulidhoo",
      },
      {
        type: "paragraph",
        text: "Following regulatory reforms in 2009, local islanders opened boutique guesthouses. Travelers can enjoy pristine white sand atolls and direct boat access to whale shark sanctuaries for a fraction of private island costs.",
      },
      {
        type: "heading",
        level: 2,
        id: "public-ferries",
        text: "Using the MTCC Ferry Network",
      },
      {
        type: "paragraph",
        text: "Instead of $400 seaplane transfers, public ferries between Malé and Kaafu Atoll cost less than $5 each way. While slower, they offer a relaxed look at regional island connectivity.",
      },
    ],
  },
  {
    id: "5",
    slug: "tokyo-street-food-guide",
    title: "Tokyo Street Food & Yokocho Alleys: Where Locals Gather",
    excerpt:
      "From standing ramen counters in Shinjuku to yakitori smoke beneath Yurakucho train tracks and Tsukiji outer stalls.",
    coverImage: TokyoImg,
    coverImageAlt: "Night street in Tokyo illuminated by lantern signs",
    category: "Food & culture",
    tags: ["Tokyo", "Japan", "Food Tour", "Culture"],
    destination: { name: "Tokyo", slug: "tokyo" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-03-18",
    featured: false,
    editorsPick: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "yokocho-etiquette",
        text: "Navigating Tiny Izakaya and Yokocho Alleys",
      },
      {
        type: "paragraph",
        text: "Tokyo's nightlife comes alive in narrow lantern-lit corridors called yokocho. With seating often limited to 6 or 8 stools per counter, ordering simple seasonal dishes and keeping noise respectful is the customary way to join in.",
      },
      {
        type: "heading",
        level: 2,
        id: "tsukiji-outer-market",
        text: "Tsukiji Outer Market Morning Tastings",
      },
      {
        type: "paragraph",
        text: "While wholesale seafood auctions relocated to Toyosu, Tsukiji's historic outer market remains packed with third-generation tamagoyaki egg omelet makers, dried bonito artisans, and fresh sea urchin vendors.",
      },
      {
        type: "cta",
        title: "Want a culinary guide in Tokyo?",
        text: "Join small-group evening food walks through Ebisu and Yanaka led by bilingual Japanese culinary hosts.",
        actionLabel: "See Tokyo food walks",
      },
    ],
  },
  {
    id: "6",
    slug: "bangkok-night-markets-guide",
    title: "Bangkok Night Markets: A Practical Street Food Guide",
    excerpt:
      "Navigating Jodd Fairs, Srinakarin Train Market, and Chinatown street vendors with real etiquette notes.",
    coverImage: BangkokImg,
    coverImageAlt: "Vibrant Bangkok street market bustling with food stalls",
    category: "Food & culture",
    tags: ["Bangkok", "Thailand", "Street Food", "Night Market"],
    destination: { name: "Bangkok", slug: "bangkok" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-02-28",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "chinatown-yaowarat",
        text: "Yaowarat Road: Bangkok's Culinary Artery",
      },
      {
        type: "paragraph",
        text: "As sunset approaches, Yaowarat's daytime commercial stalls transform into one of the world's most vibrant open-air kitchens. Charcoal-grilled squid, crispy pork belly soup, and toasted sweet buns draw loyal crowds nightly.",
      },
      {
        type: "heading",
        level: 2,
        id: "transit-tips",
        text: "Using the MRT and River Ferries to Beat Traffic",
      },
      {
        type: "paragraph",
        text: "Bangkok's evening road congestion is legendary. Relying on the MRT blue line to Wat Mangkon or the Chao Phraya Express Boat saves hours compared to road taxis.",
      },
    ],
  },
  {
    id: "7",
    slug: "walking-ancient-rome-guide",
    title: "Walking Ancient Rome: Connecting Monuments on Foot",
    excerpt:
      "A step-by-step route linking the Colosseum, Roman Forum, Aventine Keyhole, and Trastevere backstreets.",
    coverImage: RomeImg,
    coverImageAlt: "Ancient Roman ruins illuminated under morning light",
    category: "Destination guides",
    tags: ["Rome", "Italy", "Historic Walk", "Architecture"],
    destination: { name: "Rome", slug: "rome" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-04-05",
    featured: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "forum-to-capitoline",
        text: "From the Flavian Amphitheater to Capitoline Hill",
      },
      {
        type: "paragraph",
        text: "Rather than taking the bus between ruins, walking the pedestrianized Via dei Fori Imperiali and ascending the cordonata staircase designed by Michelangelo reveals how ancient, renaissance, and modern Rome overlap.",
      },
      {
        type: "heading",
        level: 2,
        id: "timing-and-reservations",
        text: "Booking Timed Slots for Colosseum Subterranean Areas",
      },
      {
        type: "paragraph",
        text: "Colosseum security restricts hourly visitor numbers. Booking verified entrance slots 30 days in advance is essential to avoid scalpers and unconfirmed voucher lines outside the gates.",
      },
      {
        type: "cta",
        title: "Heading to Italy this season?",
        text: "Explore multi-day Italian journeys featuring skip-the-line museum permits and licensed guide escorts.",
        actionLabel: "Explore Rome tours",
      },
    ],
  },
  {
    id: "8",
    slug: "bali-wellness-temples-guide",
    title: "Bali Yoga Retreats & Sacred Waterfalls: Mindful Pacing",
    excerpt:
      "Ubud wellness sanctuaries, sacred purification springs at Tirta Empul, and respectful temple dressing customs.",
    coverImage: BaliImg,
    coverImageAlt: "Lush green rice terraces and palm trees in Bali",
    category: "Luxury & wellness",
    tags: ["Bali", "Indonesia", "Wellness", "Temples"],
    destination: { name: "Bali", slug: "bali" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-03-24",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "temple-etiquette",
        text: "Sarongs and Balinese Temple Customs",
      },
      {
        type: "paragraph",
        text: "Every visitor entering a Hindu temple complex in Bali is required to wear a sarong and sash. Most heritage sites provide these at the ticket kiosk, but bringing your own shows appreciation for local ritual standards.",
      },
      {
        type: "heading",
        level: 2,
        id: "quiet-waterfalls",
        text: "Exploring Northern Cascades Beyond the Crowds",
      },
      {
        type: "paragraph",
        text: "While southern waterfalls near Ubud see steady bus tours, northern valleys around Munduk offer serene morning trails through clove and coffee plantations.",
      },
    ],
  },
  {
    id: "9",
    slug: "london-winter-travel-guide",
    title: "London in Winter: Why the Cold Season Is a Smart Choice",
    excerpt:
      "Free museum galleries, quieter West End theater districts, illuminated Thames walks, and cozy historic pubs.",
    coverImage: LondonImg,
    coverImageAlt: "London bridge skyline along the River Thames",
    category: "City breaks",
    tags: ["London", "UK", "Winter Travel", "Museums"],
    destination: { name: "London", slug: "london" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-01-15",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "quiet-museums",
        text: "World-Class Permanent Collections with No Admission Fees",
      },
      {
        type: "paragraph",
        text: "The British Museum, Victoria and Albert Museum, and Tate Modern maintain free permanent admission. Visiting on mid-week winter mornings allows unhurried inspection of masterworks that are swarmed in summer.",
      },
      {
        type: "heading",
        level: 2,
        id: "west-end-tickets",
        text: "Same-Day Theatre Access",
      },
      {
        type: "paragraph",
        text: "Winter seat availability for premier drama and musicals in the West End is significantly broader, with central box offices offering same-day discounts without long queues.",
      },
    ],
  },
  {
    id: "10",
    slug: "dubai-luxury-desert-guide",
    title: "Dubai's Most Luxurious Hotels and Desert Escapes",
    excerpt:
      "Private desert reserve glamping, sunset dhow charters, and high-floor rooftop architecture across modern Dubai.",
    coverImage: DubaiImg,
    coverImageAlt: "Modern architecture and marina in Dubai",
    category: "Luxury & wellness",
    tags: ["Dubai", "UAE", "Luxury", "Desert Safari"],
    destination: { name: "Dubai", slug: "dubai" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-05-01",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "desert-conservation-reserves",
        text: "Staying Inside the Dubai Desert Conservation Reserve",
      },
      {
        type: "paragraph",
        text: "Far beyond standard dune-bashing tours, protected reserves like DDCR limit vehicle permits to preserve indigenous Arabian oryx populations and fragile desert flora.",
      },
      {
        type: "heading",
        level: 2,
        id: "architectural-panoramas",
        text: "High-Altitude Viewpoints and Marina Dining",
      },
      {
        type: "paragraph",
        text: "Pre-booking observation lounge access during golden hour pairs dramatic Persian Gulf sunset vistas with city skyline illumination.",
      },
    ],
  },
  {
    id: "11",
    slug: "singapore-48-hours-itinerary",
    title: "Singapore in 48 Hours: The Curated Stopover Itinerary",
    excerpt:
      "Maximizing a 2-day layover across Marina Bay, Chinatown heritage hawker centres, and the Cloud Forest biodome.",
    coverImage: SingaporeImg,
    coverImageAlt: "Singapore city skyline illuminated at Marina Bay",
    category: "City breaks",
    tags: ["Singapore", "City Break", "Itinerary", "Food"],
    destination: { name: "Singapore", slug: "singapore" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-02-05",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "day-one-heritage",
        text: "Day One: Hawker Culture and Historic Shophouses",
      },
      {
        type: "paragraph",
        text: "Start at Maxwell Food Centre or Chinatown Complex for Michelin-recognized chicken rice and laksa, followed by a walk through the conserved Peranakan shophouses along Katong.",
      },
      {
        type: "heading",
        level: 2,
        id: "day-two-biodomes",
        text: "Day Two: Gardens by the Bay and Marina Bay Walk",
      },
      {
        type: "paragraph",
        text: "Experience the climate-controlled Cloud Forest early before tour groups arrive. Finish your stopover with the evening Supertree Grove sound and light show.",
      },
    ],
  },
  {
    id: "12",
    slug: "istanbul-grand-bazaar-guide",
    title: "Istanbul's Grand Bazaar: Shopping Etiquette and Hidden Courtyards",
    excerpt:
      "Finding artisan copper workshops, secret han courtyards, and bargaining with respect in the world's oldest covered market.",
    coverImage: IstanbulImg,
    coverImageAlt: "Ornate archways and lanterns inside the Grand Bazaar in Istanbul",
    category: "Food & culture",
    tags: ["Istanbul", "Turkey", "Culture", "Shopping"],
    destination: { name: "Istanbul", slug: "istanbul" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-03-12",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "the-secret-hans",
        text: "Stepping into Historic Caravanserais (Hans)",
      },
      {
        type: "paragraph",
        text: "Just off the crowded main corridors of the Grand Bazaar lie centuries-old stone courtyards like Zincirli Han. Here, silversmiths and carpet restorers continue ancient tradecraft away from storefront hawkers.",
      },
      {
        type: "heading",
        level: 2,
        id: "bargaining-customs",
        text: "Bargaining as a Social Conversation",
      },
      {
        type: "paragraph",
        text: "In Turkish merchant culture, price negotiation is accompanied by hot tea (çay) and courteous conversation. Approaching the transaction with humor and goodwill yields far better experiences than aggressive haggling.",
      },
    ],
  },
  {
    id: "13",
    slug: "gaudi-barcelona-architecture-walk",
    title: "Gaudi's Barcelona: A Self-Guided Architecture Walk",
    excerpt:
      "Connecting Casa Batllo, Casa Mila, Sagrada Familia, and Park Guell with optimal transit and ticket timing advice.",
    coverImage: BarcelonaImg,
    coverImageAlt: "Distinctive Gaudi architectural facade in Barcelona",
    category: "Destination guides",
    tags: ["Barcelona", "Spain", "Architecture", "Art"],
    destination: { name: "Barcelona", slug: "barcelona" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-04-18",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "passeig-de-gracia",
        text: "The Block of Discord along Passeig de Gràcia",
      },
      {
        type: "paragraph",
        text: "Antoni Gaudí's Casa Batlló stands alongside masterpieces by Domènech i Montaner and Puig i Cadafalch, showcasing competing modernist expressions on a single avenue.",
      },
      {
        type: "heading",
        level: 2,
        id: "sagrada-familia-timing",
        text: "Catching the Stained-Glass Light in Sagrada Família",
      },
      {
        type: "paragraph",
        text: "The basilica's eastern nave windows glow in cool blues and greens during morning hours, while western exposures bathe the pillars in warm orange and red as evening approaches.",
      },
    ],
  },
  {
    id: "14",
    slug: "phuket-island-hopping-guide",
    title: "Phuket Island Hopping: Secret Bays Beyond Patong",
    excerpt:
      "Chartering longtail boats to secluded Phang Nga sea caves, Coral Island reef spots, and quiet northern Andaman beaches.",
    coverImage: PhuketImg,
    coverImageAlt: "Limestone karsts and turquoise waters in Phuket",
    category: "Beach & islands",
    tags: ["Phuket", "Thailand", "Islands", "Beaches"],
    destination: { name: "Phuket", slug: "phuket" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-02-19",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "phang-nga-sea-caves",
        text: "Tidal Kayaking in Phang Nga Bay Karsts",
      },
      {
        type: "paragraph",
        text: "Limestone sea caves (hongs) are accessible only during specific low-tide windows when small inflatable canoes can squeeze through tunnel openings into hidden lagoons.",
      },
      {
        type: "heading",
        level: 2,
        id: "quiet-beaches",
        text: "Mai Khao and Nai Yang Marine National Park",
      },
      {
        type: "paragraph",
        text: "For tranquil coastal strolls with zero jet-ski noise, Phuket's protected northern coastline preserves natural casuarina pine tree borders and turtle nesting habitats.",
      },
    ],
  },
  {
    id: "15",
    slug: "new-york-neighborhoods-local-guide",
    title: "New York Like a Local: Outer Borough Neighborhoods",
    excerpt:
      "Brownstones in Brooklyn, food stalls in Jackson Heights, and ferry routes that skip the Midtown tourist crowds.",
    coverImage: NewYorkImg,
    coverImageAlt: "New York street scene and brownstone buildings",
    category: "City breaks",
    tags: ["New York", "USA", "City Break", "Culture"],
    destination: { name: "New York", slug: "new-york" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-03-30",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "queens-culinary-corridors",
        text: "Global Food Corridors of Queens",
      },
      {
        type: "paragraph",
        text: "Taking the 7 train into Jackson Heights and Elmhurst leads to unmatched regional culinary hubs, from Himalayan momo stalls to Colombian bakeries and Thai street bistros.",
      },
      {
        type: "heading",
        level: 2,
        id: "nyc-ferry",
        text: "Cruising the East River for $4",
      },
      {
        type: "paragraph",
        text: "The NYC Ferry system connects Wall Street to DUMBO, Williamsburg, and Astoria with open-top river breezes at a fraction of tourist boat tour rates.",
      },
    ],
  },
  {
    id: "16",
    slug: "sydney-bridge-climb-guide",
    title: "Sydney Harbour Bridge Climb: What to Expect Before Booking",
    excerpt:
      "Physical requirements, day vs twilight departures, safety gear protocols, and panoramic harbor viewpoints.",
    coverImage: SydneyImg,
    coverImageAlt: "Sydney Harbour Bridge and coastal blue water",
    category: "Adventure",
    tags: ["Sydney", "Australia", "Adventure", "Harbour"],
    destination: { name: "Sydney", slug: "sydney" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-05-14",
    featured: false,
    body: [
      {
        type: "heading",
        level: 2,
        id: "twilight-vs-day",
        text: "Choosing Between Daytime and Twilight Climbs",
      },
      {
        type: "paragraph",
        text: "Daytime climbs offer crystalline visibility across the Blue Mountains on clear mornings, while twilight departures provide dramatic sunset light transitioning into city nightscapes.",
      },
      {
        type: "heading",
        level: 2,
        id: "safety-and-gear",
        text: "Breathalyzer and Safety Harness Regulations",
      },
      {
        type: "paragraph",
        text: "Every climber must pass a mandatory zero-tolerance alcohol breath test and wear an integrated slider harness tethered to the static safety line for the duration of the ascent.",
      },
    ],
  },
  {
    id: "17",
    slug: "santorini-island-caldera-guide",
    title: "Santorini Island Guide: Sunset Viewpoints and Caldera Villages",
    excerpt:
      "The clifftop path between Fira and Oia, quiet Akrotiri lighthouse sunsets, and local Assyrtiko winery stops.",
    coverImage: SantoriniImg,
    coverImageAlt: "Whitewashed buildings and blue domes in Santorini",
    category: "Beach & islands",
    tags: ["Santorini", "Greece", "Islands", "Sunsets"],
    destination: { name: "Santorini", slug: "santorini" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-04-22",
    featured: true,
    editorsPick: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "fira-to-oia-hike",
        text: "The 10-Kilometer Caldera Rim Hike",
      },
      {
        type: "paragraph",
        text: "Walking the natural volcanic ridge from Fira through Imerovigli to Oia offers uninterrupted Aegean vistas. Starting before 8:00 AM avoids midday sun exposure along the unshaded trail.",
      },
      {
        type: "heading",
        level: 2,
        id: "assyrtiko-wine",
        text: "Basket Vines and Volcanic Wine Terroir",
      },
      {
        type: "paragraph",
        text: "Santorini's strong Aegean winds require grapevines to be woven into ground-hugging ring nests (kouloura). The resulting dry Assyrtiko white wines boast crisp mineral salinity found nowhere else.",
      },
      {
        type: "cta",
        title: "Planning a Greek island getaway?",
        text: "Discover small-group sailing trips and boutique Aegean villa stays organized by local destination specialists.",
        actionLabel: "View Santorini trips",
      },
    ],
  },
  {
    id: "18",
    slug: "how-to-plan-tours-and-experiences",
    title: "How to Balance Guided Excursions with Spontaneous Travel Days",
    excerpt:
      "A practical travel framework for combining structured multi-day tours with self-paced local experiences to avoid itinerary burnout.",
    coverImage: banner,
    coverImageAlt: "Traveler overlooking a scenic mountain valley",
    category: "Planning tips",
    tags: ["Travel Tips", "Itinerary Planning", "Slow Travel"],
    destination: { name: "Global", slug: "global" },
    author: DEFAULT_AUTHOR,
    publishedAt: "2026-06-01",
    featured: false,
    editorsPick: true,
    body: [
      {
        type: "heading",
        level: 2,
        id: "the-two-day-rule",
        text: "The 2-on-1-off Rule for Pacing Trips",
      },
      {
        type: "paragraph",
        text: "A common mistake travelers make is stacking 12-hour guided excursions back-to-back. Scheduling one completely open morning every three days provides vital recovery time for laundry, leisurely cafe meals, or spontaneous discoveries.",
      },
      {
        type: "heading",
        level: 2,
        id: "arrival-day-guidance",
        text: "Why Light Walking Tours Beat Hotel Naps on Arrival Day",
      },
      {
        type: "paragraph",
        text: "To conquer jet lag efficiently, booking a relaxed 2-hour food crawl or gentle neighborhood stroll keeps your body moving in natural sunlight until local bedtime.",
      },
      {
        type: "cta",
        title: "Need expert advice assembling your itinerary?",
        text: "Our coordinators will review your travel wish list and synchronize pacing with zero obligation.",
        actionLabel: "Get a free suggestion",
      },
    ],
  },
];

export const guideFaqs = [
  [
    "How often are Viatours travel guides updated?",
    "Our editorial team and on-the-ground coordinators review regional transit notes, seasonal closures, and safety guidelines quarterly. All published advice is checked against current operational standards.",
  ],
  [
    "Can Viatours customize a tour based on one of these articles?",
    "Yes. Every guide is connected to our regional planning team. If an article inspires you, use the 'Plan this trip' button on the article page to request a tailored quote including those specific activities.",
  ],
  [
    "How do you select your local guide recommendations?",
    "We only recommend activities, transport lines, and routes that our verified local hosts or internal team members have physically vetted for quality, pacing, and fair local employment.",
  ],
  [
    "Can local guides or travel writers contribute to Viatours Voyage?",
    "We welcome submissions from accredited guides, certified regional operators, and published travel writers. Use our 'Contribute a guide' form below to pitch your local story.",
  ],
];
