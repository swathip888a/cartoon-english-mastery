import { ClothingItem } from '../types';

export interface FabricInfo {
  id: string;
  name: string;
  emoji: string;
  pronunciation: string;
  definition: string;
  characteristics: string[];
  bestUsedFor: string;
  howToWash: string;
}

export interface ColorShadeInfo {
  id: string;
  name: string;
  hex: string;
  category: string;
  meaning: string;
  stylingTip: string;
  pairsWellWith: string[];
}

export interface BrandCompanyInfo {
  id: string;
  name: string;
  logoEmoji: string;
  country: string;
  founded: string;
  pronunciation: string;
  famousFor: string;
  priceTier: '$' | '$$' | '$$$' | '$$$$';
  tomboyStreetwearVibe: string;
  keyProducts: string[];
}

export interface ShoeAnatomyInfo {
  id: string;
  name: string;
  emoji: string;
  pronunciation: string;
  definition: string;
  keyParts: { part: string; meaning: string }[];
  careGuide: string;
}

// 100% Tomboy & Menswear Streetwear Collection
export const CLOTHING_ITEMS: ClothingItem[] = [
  {
    id: 'heavyweight_hoodie',
    name: 'Heavyweight Boxy Skate Hoodie (450 GSM)',
    category: 'tops',
    price: 52.00,
    originalPrice: 65.00,
    discountTag: '20% OFF TODAY',
    colors: ['Charcoal Black', 'Heather Grey', 'Olive Drab', 'Washed Indigo'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '🧥',
    material: '100% Heavyweight French Terry Cotton (Thick, structured, warm, and zero-shrink)',
    careInstructions: 'Machine wash cold inside-out, hang dry to keep boxy shape.',
    howToAskInStore: 'Excuse me, do you have this boxy skate hoodie in a size Large?'
  },
  {
    id: 'oversized_boxy_tee',
    name: 'Vintage Drop-Shoulder Graphic Tee',
    category: 'tops',
    price: 28.00,
    originalPrice: 35.00,
    discountTag: 'BUY 1 GET 1 50% OFF',
    colors: ['Matte Black', 'Vintage Off-White', 'Army Green', 'Navy Blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '👕',
    material: '100% Combed Heavy Cotton (240 GSM breathable jersey fabric)',
    careInstructions: 'Machine wash cold, do not iron directly on the graphic print.',
    howToAskInStore: 'Could you please check if you have this drop-shoulder tee in stock in Medium?'
  },
  {
    id: 'heavyweight_flannel',
    name: 'Timber Heavy Cotton Flannel Overshirt',
    category: 'tops',
    price: 46.00,
    originalPrice: 58.00,
    colors: ['Red & Black Buffalo Plaid', 'Green & Navy Tartan', 'Grey Monochrome Plaid'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '👔',
    material: '100% Brushed Cotton Flannel (Ultra soft, cozy, durable workwear texture)',
    careInstructions: 'Machine wash gentle cycle, low tumble dry.',
    howToAskInStore: 'Is this flannel overshirt meant to be worn buttoned or unbuttoned over a white tee?'
  },
  {
    id: 'tactical_cargo_pants',
    name: 'Relaxed Fit 6-Pocket Tactical Cargo Pants',
    category: 'bottoms',
    price: 54.00,
    originalPrice: 68.00,
    discountTag: 'POPULAR PICK',
    colors: ['Tactical Khaki', 'Military Olive Green', 'Stealth Black', 'Desert Camo'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '👖',
    material: '100% Cotton Ripstop (Tear-resistant weave with reinforced knee panels)',
    careInstructions: 'Machine wash cold with like colors, air dry recommended.',
    howToAskInStore: 'Can I try these cargo pants on in size 32 waist in the fitting room?'
  },
  {
    id: 'baggy_skate_denim',
    name: 'Loose Baggy 90s Skater Denim Jeans',
    category: 'bottoms',
    price: 60.00,
    originalPrice: 75.00,
    colors: ['Washed Light Blue', 'Classic Dark Indigo', 'Fade Black'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '👖',
    material: '100% Rigid Heavyweight Cotton Denim (Non-stretch authentic vintage feel)',
    careInstructions: 'Wash inside-out every 4-5 wears to preserve indigo dye.',
    howToAskInStore: 'Do these skater jeans fit true to size or should I size up for a looser fit?'
  },
  {
    id: 'canvas_workwear_jacket',
    name: 'Carhartt-Style Canvas Utility Work Jacket',
    category: 'outerwear',
    price: 89.00,
    originalPrice: 110.00,
    discountTag: 'BESTSELLER',
    colors: ['Carhartt Brown / Tan', 'Onyx Black', 'Moss Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    imageEmoji: '🧥',
    material: 'Heavy Duck Cotton Canvas Shell with Quilted Flannel Interior Lining',
    careInstructions: 'Spot clean or gentle cold wash. Becomes softer with every year of wear.',
    howToAskInStore: 'Where can I find the heavy canvas work jackets?'
  },
  {
    id: 'varsity_bomber_jacket',
    name: 'Retro Collegiate Oversized Bomber Jacket',
    category: 'outerwear',
    price: 82.00,
    originalPrice: 95.00,
    colors: ['Forest Green & Cream', 'Black & White', 'Navy & Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    imageEmoji: '🧥',
    material: 'Wool Blend Body with Faux Leather Contrast Sleeves & Ribbed Cuffs',
    careInstructions: 'Dry clean only to maintain leather sleeve quality.',
    howToAskInStore: 'Excuse me, could I try this varsity bomber on to see how the shoulders fit?'
  },
  {
    id: 'high_top_skate_sneakers',
    name: 'Retro High-Top Street Skate Sneakers',
    category: 'shoes',
    price: 85.00,
    originalPrice: 85.00,
    colors: ['Black & White Contrast', 'University Red & White', 'Olive & Gum Sole'],
    sizes: ['S', 'M', 'L', 'XL'],
    imageEmoji: '👟',
    material: 'Full-Grain Leather Upper, Padded Collar, and Vulcanized Rubber Waffle Outsole',
    careInstructions: 'Wipe with sneaker cleaning foam and soft bristle brush.',
    howToAskInStore: 'Could you please check if you have US Men size 8 in these high-top sneakers?'
  },
  {
    id: 'canvas_crossbody_messenger',
    name: 'Heavy Duty Tactical Messenger Crossbody Bag',
    category: 'accessories',
    price: 32.00,
    originalPrice: 40.00,
    discountTag: '20% OFF',
    colors: ['Matte Black', 'Army Olive', 'Khaki Sand'],
    sizes: ['M'],
    imageEmoji: '🎒',
    material: '1000D Cordura Water-Resistant Ballistic Nylon with Metal Quick-Release Buckle',
    careInstructions: 'Wipe clean with a damp microfiber towel.',
    howToAskInStore: 'Does this crossbody bag fit a 14-inch laptop and water bottle?'
  }
];

// Comprehensive Fabrics Guide with plain dictionary meanings
export const FABRIC_DICTIONARY: FabricInfo[] = [
  {
    id: 'cotton',
    name: '100% Combed Cotton',
    emoji: '🌱',
    pronunciation: 'KAH-tuhn',
    definition: 'A natural plant fiber spun into soft, breathable yarn. "Combed" means short prickling fibers were removed for ultra-smooth comfort.',
    characteristics: ['Super soft against skin', 'Highly breathable and moisture absorbing', 'Great for daily t-shirts and hoodies', 'Durable and washable'],
    bestUsedFor: 'T-shirts, casual shirts, underwear, everyday hoodies',
    howToWash: 'Machine wash in cold water to prevent shrinking; dry on medium or hang dry.'
  },
  {
    id: 'french_terry',
    name: 'French Terry Fleece',
    emoji: '🧶',
    pronunciation: 'FRENCH TAIR-ee FLEES',
    definition: 'A premium knit fabric that is smooth on the outside with soft absorbent yarn loops on the inside.',
    characteristics: ['Medium to heavyweight', 'Breathable yet cozy warm', 'Holds crisp boxy silhouette', 'Does not pill easily'],
    bestUsedFor: 'High-end streetwear hoodies, oversized crewneck sweatshirts, sweatpants',
    howToWash: 'Wash inside-out in cold water; avoid high heat drying.'
  },
  {
    id: 'denim',
    name: 'Raw & Washed Denim',
    emoji: '👖',
    pronunciation: 'DEN-ihm',
    definition: 'A sturdy cotton twill fabric where the blue warp threads cross over white weft threads, creating the classic textured jeans look.',
    characteristics: ['Extremely tough and rip-resistant', 'Molds to your body shape over time', 'Iconic fading with wear', 'Timeless streetwear staple'],
    bestUsedFor: 'Baggy skater jeans, trucker jackets, denim overshirts',
    howToWash: 'Wash inside out with cold water every 4-5 wears to preserve deep indigo color.'
  },
  {
    id: 'corduroy',
    name: 'Corduroy (Wales)',
    emoji: '🧥',
    pronunciation: 'KOR-duh-roy',
    definition: 'A thick, durable textile with raised parallel vertical ridges called "wales". Wide-wale is chunky; fine-wale is subtle.',
    characteristics: ['Rich vintage aesthetic', 'Warm and velvety to touch', 'Very sturdy structure', 'Great for fall/winter streetwear'],
    bestUsedFor: 'Overshirts, carpenter pants, bucket hats, collar accents',
    howToWash: 'Turn inside out before washing to prevent velvet ridges from getting crushed.'
  },
  {
    id: 'ripstop',
    name: 'Ripstop Nylon & Canvas',
    emoji: '🛡️',
    pronunciation: 'RIP-stop NY-lon',
    definition: 'A special reinforced woven fabric with thick interlocking grid threads that stop small tears from spreading or ripping further.',
    characteristics: ['Lightweight yet indestructible', 'Water-resistant and windproof', 'Military & outdoor gear grade', 'Tactical tomboy aesthetic'],
    bestUsedFor: 'Tactical cargo pants, windbreaker jackets, crossbody utility bags',
    howToWash: 'Machine wash cold; hang dry; avoid bleach.'
  },
  {
    id: 'linen',
    name: 'Pure Natural Linen',
    emoji: '🌾',
    pronunciation: 'LIH-nuhn',
    definition: 'An ancient natural fabric made from flax plant fibers. It feels crisp, cool, and allows maximum breeze to pass through.',
    characteristics: ['Best fabric for hot summer weather', 'Dries twice as fast as cotton', 'Naturally wrinkles (gives effortless relaxed vibe)', 'Gets softer with every wash'],
    bestUsedFor: 'Summer button-down shirts, loose beach trousers',
    howToWash: 'Gentle wash with cold water; shake out wrinkles while damp and hang to dry.'
  }
];

// Color & Shades Guide with Meanings
export const COLOR_SHADES_GUIDE: ColorShadeInfo[] = [
  {
    id: 'charcoal',
    name: 'Charcoal Black / Anthracite',
    hex: '#27272a',
    category: 'Neutrals',
    meaning: 'A deep, smokey off-black shade resembling burnt wood or graphite. Softer and more modern than harsh pitch black.',
    stylingTip: 'The ultimate tomboy staple. Pairs effortlessly with washed blue denim or white tees.',
    pairsWellWith: ['Crisp White', 'Washed Denim Blue', 'Heather Grey', 'Olive Drab']
  },
  {
    id: 'heather_grey',
    name: 'Heather Grey',
    hex: '#94a3b8',
    category: 'Neutrals',
    meaning: 'Grey fabric created by blending dark and light cotton fibers together, giving a subtle speckled, textured athletic look.',
    stylingTip: 'Classic gym and streetwear shade for boxy crewnecks and sweatpants.',
    pairsWellWith: ['Matte Black', 'Navy Blue', 'Burgundy', 'Forest Green']
  },
  {
    id: 'olive_drab',
    name: 'Olive Drab / Military Green',
    hex: '#4d5b40',
    category: 'Earth Tones',
    meaning: 'A muted, brownish-green shade originally used on military uniforms for tactical camouflage in wilderness.',
    stylingTip: 'Instant utilitarian/tomboy edge. Looks amazing on cargo pants and canvas jackets.',
    pairsWellWith: ['Khaki / Sand', 'Black', 'White', 'Carhartt Brown']
  },
  {
    id: 'navy_blue',
    name: 'Classic Navy Blue',
    hex: '#1e293b',
    category: 'Core Classics',
    meaning: 'A dark, rich shade of blue originally worn by officers in the British Royal Navy. Formal yet relaxed.',
    stylingTip: 'A versatile alternative to black that looks clean with beige chinos or white sneakers.',
    pairsWellWith: ['Beige / Tan', 'Heather Grey', 'Mustard Yellow', 'White']
  },
  {
    id: 'carhartt_brown',
    name: 'Carhartt Brown / Duck Canvas Tan',
    hex: '#92400e',
    category: 'Workwear',
    meaning: 'A warm, rugged golden-brown hue famous for heavy-duty construction and skate workwear jackets.',
    stylingTip: 'Wear as an outer layer over a black or grey hoodie for a timeless workwear look.',
    pairsWellWith: ['Black', 'Dark Indigo Denim', 'Off-White', 'Olive Green']
  }
];

// Top Streetwear & Tomboy Clothing Brands with Meanings & Pronunciations
export const BRAND_COMPANIES: BrandCompanyInfo[] = [
  {
    id: 'nike',
    name: 'Nike',
    logoEmoji: '✔️',
    country: 'United States (Oregon)',
    founded: '1964',
    pronunciation: 'NY-kee (rhymes with "spiky")',
    famousFor: 'Air Jordan 1s, Air Force 1 sneakers, Dri-FIT athletic fleece, and iconic Swoosh logo.',
    priceTier: '$$',
    tomboyStreetwearVibe: 'Athletic dominance, iconic retro basketball silhouettes, clean monochrome tracks.',
    keyProducts: ['Air Force 1 Low', 'Club Fleece Hoodies', 'Dunk Low Retro Sneakers', 'Tech Fleece Joggers']
  },
  {
    id: 'carhartt_wip',
    name: 'Carhartt & Carhartt WIP',
    logoEmoji: '🔨',
    country: 'United States / Europe',
    founded: '1889 (WIP launched 1994)',
    pronunciation: 'KAR-hart (WIP = "Work In Progress")',
    famousFor: 'Indestructible duck canvas Detroit jackets, double-knee carpenter work pants, and warm knit beanies.',
    priceTier: '$$$',
    tomboyStreetwearVibe: 'Authentic heavy-duty workwear meets underground skater culture.',
    keyProducts: ['Detroit Canvas Jacket', 'Double Knee Pants', 'Watch Beanie', 'Pocket Work Tee']
  },
  {
    id: 'uniqlo',
    name: 'Uniqlo (Fast Retailing)',
    logoEmoji: '🔴',
    country: 'Japan (Yamaguchi / Tokyo)',
    founded: '1984',
    pronunciation: 'YOU-nee-klo',
    famousFor: 'AIRism cooling undershirts, HEATTECH thermal layers, and affordable heavy oversized boxy tees.',
    priceTier: '$',
    tomboyStreetwearVibe: 'Minimalist Japanese basics, clean silhouettes, durable fabrics at fair prices.',
    keyProducts: ['AIRism Oversized Cotton Tee', 'Utility Cargo Trousers', 'Round Mini Shoulder Bag', 'HEATTECH Crewneck']
  },
  {
    id: 'levis',
    name: "Levi's (Levi Strauss & Co.)",
    logoEmoji: '👖',
    country: 'United States (San Francisco)',
    founded: '1853',
    pronunciation: 'LEE-vize',
    famousFor: 'Inventing blue denim jeans with copper rivets in 1873. The famous 501 Straight and 550 Baggy fits.',
    priceTier: '$$',
    tomboyStreetwearVibe: 'Classic vintage Americana denim that never goes out of style.',
    keyProducts: ["501 Original Fit Jeans", "550 90s Relaxed Jeans", "Trucker Denim Jacket", "Western Shirt"]
  },
  {
    id: 'vans',
    name: 'Vans (Off The Wall)',
    logoEmoji: '🛹',
    country: 'United States (California)',
    founded: '1966',
    pronunciation: 'VANZ',
    famousFor: 'Waffle rubber skate soles, canvas slip-on sneakers, and Old Skool side stripe shoes.',
    priceTier: '$',
    tomboyStreetwearVibe: 'The quintessential California skateboard and punk rock vibe.',
    keyProducts: ['Old Skool Skate Shoes', 'Checkerboard Slip-Ons', 'Sk8-Hi High Tops', 'Classic Graphic Tees']
  },
  {
    id: 'new_balance',
    name: 'New Balance',
    logoEmoji: '👟',
    country: 'United States (Boston)',
    founded: '1906',
    pronunciation: 'NOO BAL-uhns',
    famousFor: 'Ultra-cushioned dad sneakers, ENCAP midsole support, and premium grey suede lifestyle shoes.',
    priceTier: '$$$',
    tomboyStreetwearVibe: 'Comfortable retro chunky aesthetic popular with stylish streetwear dressers worldwide.',
    keyProducts: ['New Balance 550s', 'New Balance 990v5 (Made in USA)', '2002R Protection Pack', '574 Core']
  }
];

// Shoe Anatomy & Sneakers Guide
export const SHOE_ANATOMY_GUIDE: ShoeAnatomyInfo[] = [
  {
    id: 'upper',
    name: 'Shoe Upper (Leather / Suede / Canvas)',
    emoji: '👟',
    pronunciation: 'UP-per',
    definition: 'The entire top part of the shoe that covers your foot. Can be made of leather, canvas, mesh, or suede.',
    keyParts: [
      { part: 'Toe Box', meaning: 'The front chamber covering your toes. Wide toe boxes give maximum comfort.' },
      { part: 'Eyelets & Laces', meaning: 'The small reinforced holes where shoelaces are threaded to tighten the fit.' },
      { part: 'Padded Tongue', meaning: 'The cushioned flap underneath the laces protecting the top arch of your foot.' },
      { part: 'Heel Collar', meaning: 'The soft padded ring around your ankle preventing blisters.' }
    ],
    careGuide: 'Use water-repellent spray on suede; wipe leather with damp cloth; canvas can be hand-washed.'
  },
  {
    id: 'sole',
    name: 'Sole Unit (Outsole + Midsole + Insole)',
    emoji: '👞',
    pronunciation: 'SOHL YOO-nit',
    definition: 'The complete bottom foundation of the shoe that contacts the ground and absorbs walking impact.',
    keyParts: [
      { part: 'Outsole', meaning: 'The hard rubber bottom with tread patterns (like waffle or herringbone) for anti-slip grip.' },
      { part: 'Midsole', meaning: 'The foam layer (EVA or Air cushioning) sandwiched in between that absorbs walking shock.' },
      { part: 'Insole (Sockliner)', meaning: 'The removable soft foam bed that your foot directly rests on inside the shoe.' }
    ],
    careGuide: 'Clean white rubber midsoles with a magic eraser sponge or toothbrush with mild dish soap.'
  }
];

// Interactive Store Dialogues
export interface StoreDialogueStep {
  id: string;
  associatePrompt: string;
  situation: string;
  options: { text: string; tip: string; isNatural: boolean }[];
}

export const SHOPPING_STORE_DIALOGUE: StoreDialogueStep[] = [
  {
    id: 'greeting_help',
    associatePrompt: 'Hi! Welcome in to Chic Bloom Menswear & Streetwear. Looking for anything specific or just browsing?',
    situation: 'Store Associate greets you upon walking in',
    options: [
      { text: "Thanks! I'm just browsing through the hoodies and cargos, but I'll let you know!", tip: 'Natural, friendly way to look around comfortably without pressure.', isNatural: true },
      { text: "Yes please, could you show me where the heavyweight boxy tees are located?", tip: 'Direct and polite when you have a specific item in mind.', isNatural: true },
      { text: "Don't talk to me.", tip: 'Rude! Always say "I am just looking around, thank you!"', isNatural: false }
    ]
  },
  {
    id: 'fitting_room',
    associatePrompt: 'How many items do you have with you today? We have changing room #3 open right down the hall.',
    situation: 'Entering the fitting / changing rooms',
    options: [
      { text: "I have 2 hoodies and 1 pair of cargos, so 3 items total. Thanks!", tip: 'Store associates count items and give you a numbered hanger or door sign.', isNatural: true },
      { text: "Could you please bring me a size Large in this jacket if the Medium feels too tight?", tip: 'Associates are happy to grab alternate sizes while you try items on.', isNatural: true }
    ]
  },
  {
    id: 'checkout_register',
    associatePrompt: 'Did you find everything okay today? Would you like a printed receipt or e-receipt sent to your email?',
    situation: 'At the checkout cash register',
    options: [
      { text: "Everything was great! A printed receipt in the bag is perfect, please. Can I tap to pay with Apple Pay / Card?", tip: 'Smooth standard polite checkout phrasing.', isNatural: true },
      { text: "Could I please get a gift receipt with the prices hidden just in case?", tip: 'Gift receipts allow size exchanges without showing the price.', isNatural: true }
    ]
  }
];
