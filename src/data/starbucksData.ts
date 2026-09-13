import { CoffeeDrink } from '../types';

export const coffeeDrinks: CoffeeDrink[] = [
  // --- NON-COFFEE CHOCOLATES & STEAMERS ---
  {
    id: 'signature_hot_chocolate',
    name: 'Classic Signature Hot Chocolate',
    category: 'espresso',
    shortDesc: 'Steamed milk with rich bittersweet mocha sauce and vanilla syrup, topped with sweetened whipped cream and chocolate drizzle.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 5,
      milkiness: 5,
      caffeineStrength: 1, // Trace caffeine from cocoa beans
    },
    layers: [
      'Mocha Chocolate Drizzle Spiral',
      'Whipped Cream Swirl',
      'Warm Steamed Whole Milk (Silky microfoam)',
      'Bittersweet Mocha Sauce + Vanilla Syrup'
    ],
    basePrice: 4.45,
    howToOrderTemplate: 'Can I please get a [Size] Hot Chocolate with whipped cream and mocha drizzle?',
    proTip: 'Want extra luxury? Ask the barista to make it with Oat Milk or half-and-half (Breve) for an ultra-velvety hot chocolate!',
    calorieRange: '230 - 450 kcal',
    recommendedCup: 'hot_paper_sleeve',
    recommendedStraw: 'Sip Lid (No Straw) + Cardboard Sleeve'
  },
  {
    id: 'white_hot_chocolate',
    name: 'White Chocolate Hot Cocoa',
    category: 'espresso',
    shortDesc: 'A traditional hot chocolate made with sweet, buttery white chocolate mocha sauce and steamed milk, finished with whipped cream.',
    tasteProfile: {
      bitterness: 0,
      sweetness: 5,
      milkiness: 5,
      caffeineStrength: 0, // 100% Caffeine Free!
    },
    layers: [
      'Fluffy Whipped Cream',
      'Warm Steamed Milk',
      'Sweet White Chocolate Mocha Sauce (4 pumps)'
    ],
    basePrice: 4.65,
    howToOrderTemplate: 'Could I please get a [Size] White Hot Chocolate with whipped cream, please?',
    proTip: '100% caffeine-free! Perfect warm comfort drink for late evenings or cold rainy days.',
    calorieRange: '260 - 520 kcal',
    recommendedCup: 'hot_paper_sleeve',
    recommendedStraw: 'Sip Lid (No Straw) + Cardboard Sleeve'
  },
  {
    id: 'caffe_mocha',
    name: 'Caffè Mocha (Chocolate Espresso)',
    category: 'espresso',
    shortDesc: 'Rich, full-bodied espresso combined with bittersweet chocolate mocha sauce and steamed milk, topped with whipped cream.',
    tasteProfile: {
      bitterness: 3,
      sweetness: 4,
      milkiness: 4,
      caffeineStrength: 3,
    },
    layers: [
      'Whipped Cream Swirl',
      'Steamed Milk',
      'Fresh Espresso Shots (2 shots)',
      'Rich Mocha Chocolate Sauce'
    ],
    basePrice: 5.25,
    howToOrderTemplate: 'Can I have a [Size] Caffè Mocha with [MilkType] and whipped cream, please?',
    proTip: 'The perfect bridge between coffee and hot chocolate! You get rich cocoa sweetness with bold espresso energy.',
    calorieRange: '200 - 400 kcal',
    recommendedCup: 'hot_paper_sleeve',
    recommendedStraw: 'Sip Lid + Cardboard Sleeve'
  },
  {
    id: 'white_chocolate_mocha',
    name: 'Iced White Chocolate Mocha',
    category: 'espresso',
    shortDesc: 'Starbucks signature espresso meets white chocolate sauce, milk and ice, topped with sweetened whipped cream.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 5,
      milkiness: 4,
      caffeineStrength: 3,
    },
    layers: [
      'Whipped Cream Swirl',
      'Espresso Shots Layered with Milk & Ice',
      'Sweet White Chocolate Mocha Sauce at bottom'
    ],
    basePrice: 5.65,
    howToOrderTemplate: 'Could I get a [Size] Iced White Chocolate Mocha with Vanilla Sweet Cold Foam and extra caramel drizzle?',
    proTip: 'The #1 viral Starbucks drink! Adding sweet cold foam and caramel drizzle makes it taste like liquid dessert.',
    calorieRange: '300 - 500 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },

  // --- ESPRESSO CLASSICS ---
  {
    id: 'caramel_macchiato',
    name: 'Iced Caramel Macchiato',
    category: 'espresso',
    shortDesc: 'Vanilla syrup, cold milk, and ice, marked with rich espresso shots and crosshatch buttery caramel drizzle.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 4,
      milkiness: 4,
      caffeineStrength: 3,
    },
    layers: [
      'Caramel Drizzle on top (Crosshatch pattern)',
      'Espresso Shots poured on top (Layered crema)',
      'Crisp Ice Cubes & Cold Milk',
      'Vanilla Syrup (3 pumps at bottom)'
    ],
    basePrice: 5.75,
    howToOrderTemplate: 'Can I please get a [Size] Iced Caramel Macchiato with [MilkType] and [ExtraOptions]?',
    proTip: 'Macchiato means "marked" in Italian! If you do not stir it, you taste bold coffee first and sweet vanilla milk at the bottom.',
    calorieRange: '180 - 300 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },
  {
    id: 'caffe_latte',
    name: 'Hot Caffè Latte with Cup Sleeve',
    category: 'espresso',
    shortDesc: 'Dark, rich espresso balanced with steamed milk and a light silky layer of microfoam.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 2,
      milkiness: 5,
      caffeineStrength: 3,
    },
    layers: [
      'Light Velvety Microfoam (1 cm)',
      'Warm Steamed Milk (Majority)',
      'Rich Fresh Espresso (2 shots)'
    ],
    basePrice: 4.95,
    howToOrderTemplate: 'Could I have a [Size] Hot Latte with [MilkType], please?',
    proTip: 'Want a sweeter twist? Ask for 2 pumps of Vanilla or Hazelnut syrup!',
    calorieRange: '150 - 250 kcal',
    recommendedCup: 'hot_paper_sleeve',
    recommendedStraw: 'Sip Lid (No Straw) + Cardboard Sleeve'
  },
  {
    id: 'cappuccino',
    name: 'Classic Foamy Cappuccino',
    category: 'espresso',
    shortDesc: 'Equal parts bold espresso, steamed milk, and a thick, velvety cloud of airy foam.',
    tasteProfile: {
      bitterness: 3,
      sweetness: 2,
      milkiness: 3,
      caffeineStrength: 3,
    },
    layers: [
      'Thick, Airy Foam (Top 1/3)',
      'Steamed Milk (Middle 1/3)',
      'Bold Espresso (Bottom 1/3)'
    ],
    basePrice: 4.95,
    howToOrderTemplate: 'Hi! Can I get a [Size] Cappuccino, [Wet / Dry], please?',
    proTip: 'Ordering "Dry" means extra fluffy foam; ordering "Wet" means more liquid milk and less foam.',
    calorieRange: '100 - 180 kcal',
    recommendedCup: 'ceramic_dinein_mug',
    recommendedStraw: 'Ceramic Dine-In Mug Rim (Sip directly)'
  },
  {
    id: 'flat_white',
    name: 'Signature Flat White',
    category: 'espresso',
    shortDesc: 'Smooth Ristretto espresso shots combined with perfectly steamed whole milk to create a velvety microfoam dot.',
    tasteProfile: {
      bitterness: 3,
      sweetness: 2,
      milkiness: 4,
      caffeineStrength: 4,
    },
    layers: [
      'Steamed Whole Milk Dot (Iconic barista signature)',
      'Velvety Microfoam',
      'Ristretto Espresso Shots (Sweeter, more intense extraction)'
    ],
    basePrice: 5.35,
    howToOrderTemplate: 'Can I get a [Size] Flat White with Oat Milk, please?',
    proTip: 'Ristretto means shorter water pull—giving a richer, less bitter and sweeter espresso flavor!',
    calorieRange: '170 - 290 kcal',
    recommendedCup: 'ceramic_dinein_mug',
    recommendedStraw: 'Ceramic Dine-In Mug'
  },
  {
    id: 'caffe_americano',
    name: 'Caffè Americano',
    category: 'espresso',
    shortDesc: 'Espresso shots topped with hot water create a light layer of crema. Crisp, bold, zero sugar.',
    tasteProfile: {
      bitterness: 4,
      sweetness: 0,
      milkiness: 0,
      caffeineStrength: 4,
    },
    layers: [
      'Delicate Crema on top',
      'Filtered Hot Water (Majority)',
      'Espresso Shots (2-4 shots)'
    ],
    basePrice: 4.15,
    howToOrderTemplate: 'Could I get a [Size] Americano with a splash of oat milk on the side?',
    proTip: 'Want drip coffee strength with pure espresso depth? Americano is 0 calories with bold flavor.',
    calorieRange: '5 - 15 kcal',
    recommendedCup: 'hot_paper_sleeve',
    recommendedStraw: 'Sip Lid + Sleeve'
  },
  {
    id: 'shaken_espresso',
    name: 'Iced Brown Sugar Oatmilk Shaken Espresso',
    category: 'espresso',
    shortDesc: 'Blonde Espresso, brown sugar, and cinnamon shaken with ice and topped with creamy oat milk.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 4,
      milkiness: 3,
      caffeineStrength: 4,
    },
    layers: [
      'Creamy Oatmilk Float',
      'Shaken Frothy Espresso with Brown Sugar & Cinnamon',
      'Ice Cubes'
    ],
    basePrice: 5.95,
    howToOrderTemplate: 'Hi! Can I please get a [Size] Iced Brown Sugar Oatmilk Shaken Espresso?',
    proTip: 'Shaking espresso with ice aerates the coffee, making it naturally foamy and extra refreshing.',
    calorieRange: '120 - 190 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },

  // --- COLD BREW & ICED COFFEES ---
  {
    id: 'sweet_cream_cold_brew',
    name: 'Vanilla Sweet Cream Cold Brew',
    category: 'iced',
    shortDesc: 'Slow-steeped custom Cold Brew coffee accented with vanilla and topped with a delicate float of house-made sweet cream.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 3,
      milkiness: 3,
      caffeineStrength: 5,
    },
    layers: [
      'Vanilla Sweet Cream Cascading Float',
      'Ice Cubes',
      'Slow-Steeped 20-Hour Cold Brew Coffee',
      'Vanilla Syrup (2 pumps)'
    ],
    basePrice: 5.45,
    howToOrderTemplate: 'Could I get a [Size] Vanilla Sweet Cream Cold Brew, please?',
    proTip: 'Uses a Nitro Strawless Sip Lid so you get the sweet cream float and cold brew in the same delicious sip!',
    calorieRange: '110 - 200 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Nitro Strawless Sip Lid (No Straw)'
  },
  {
    id: 'salted_caramel_cold_brew',
    name: 'Salted Caramel Cream Cold Brew',
    category: 'iced',
    shortDesc: 'Super-smooth cold brew sweetened with caramel syrup and crowned with savory salted caramel cold foam.',
    tasteProfile: {
      bitterness: 2,
      sweetness: 4,
      milkiness: 3,
      caffeineStrength: 5,
    },
    layers: [
      'Salted Caramel Cold Foam Float (Thick & velvety)',
      'Ice Cubes',
      '20-Hour Cold Brew Coffee',
      'Caramel Syrup (2 pumps)'
    ],
    basePrice: 5.65,
    howToOrderTemplate: 'Can I get a [Size] Salted Caramel Cream Cold Brew, please?',
    proTip: 'The sweet and salty contrast makes the smooth cold brew coffee notes shine!',
    calorieRange: '160 - 240 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Nitro Strawless Sip Lid'
  },

  // --- TEAS & REFRESHERS ---
  {
    id: 'chai_tea_latte',
    name: 'Spiced Iced Chai Tea Latte',
    category: 'tea_refreshers',
    shortDesc: 'Black tea infused with cinnamon, clove, cardamom, and other warming spices, combined with milk and ice.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 5,
      milkiness: 4,
      caffeineStrength: 2,
    },
    layers: [
      'Cold Milk Float',
      'Ice Cubes',
      'Spiced Black Tea Chai Concentrate (4 pumps)'
    ],
    basePrice: 5.15,
    howToOrderTemplate: 'Could I get a [Size] Iced Chai Latte with Oat Milk and 1 shot of espresso (Dirty Chai)?',
    proTip: 'Adding 1 espresso shot to a Chai Latte is called a "Dirty Chai" — the ultimate warming energy boost!',
    calorieRange: '180 - 280 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },
  {
    id: 'matcha_latte',
    name: 'Iced Matcha Tea Latte',
    category: 'tea_refreshers',
    shortDesc: 'Smooth and creamy matcha sweetened lightly and served with cold milk over ice.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 4,
      milkiness: 5,
      caffeineStrength: 2,
    },
    layers: [
      'Matcha Foam Float',
      'Cold Milk & Ice',
      'Vibrant Green Japanese Matcha Powder'
    ],
    basePrice: 5.25,
    howToOrderTemplate: 'Can I please get a [Size] Iced Matcha Latte with Oat Milk and 2 pumps of Vanilla?',
    proTip: 'Pairs wonderfully with oat milk for a super silky, nutty flavor profile!',
    calorieRange: '190 - 290 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },
  {
    id: 'strawberry_refresher',
    name: 'Strawberry Açaí Refresher (Pink Drink Base)',
    category: 'tea_refreshers',
    shortDesc: 'Sweet strawberry flavors accented with passion fruit, açaí notes, and real freeze-dried strawberry slices.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 4,
      milkiness: 1,
      caffeineStrength: 2,
    },
    layers: [
      'Real Freeze-Dried Strawberry Slices',
      'Crisp Ice',
      'Strawberry Açaí Juice Base + Green Coffee Extract',
      'Water, Lemonade, or Coconut Milk (Pink Drink!)'
    ],
    basePrice: 5.25,
    howToOrderTemplate: 'Can I get a [Size] Strawberry Açaí Refresher with Coconut Milk (The Pink Drink), please?',
    proTip: 'Substituting water with Coconut Milk turns this into the world-famous "Pink Drink"!',
    calorieRange: '90 - 140 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },
  {
    id: 'dragon_drink',
    name: 'Dragon Drink (Mango Dragonfruit with Coconut Milk)',
    category: 'tea_refreshers',
    shortDesc: 'Tropical mango and dragonfruit flavors shaken with creamy coconut milk and real diced dragonfruit pieces.',
    tasteProfile: {
      bitterness: 0,
      sweetness: 5,
      milkiness: 3,
      caffeineStrength: 2,
    },
    layers: [
      'Diced Magenta Dragonfruit Pieces',
      'Creamy Coconut Milk',
      'Mango Dragonfruit Juice & Ice'
    ],
    basePrice: 5.45,
    howToOrderTemplate: 'Hi! Can I get a [Size] Dragon Drink with light ice, please?',
    proTip: 'Vibrant bright magenta color and super refreshing tropical taste on sunny afternoons.',
    calorieRange: '100 - 150 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Classic Green Straw'
  },

  // --- FRAPPUCCINOS (BLENDED ICE) ---
  {
    id: 'caramel_frappuccino',
    name: 'Caramel Blended Frappuccino',
    category: 'frappuccino',
    shortDesc: 'Coffee blended with caramel syrup, milk, and ice, crowned with whipped cream and buttery caramel drizzle.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 5,
      milkiness: 4,
      caffeineStrength: 2,
    },
    layers: [
      'Spiral Caramel Sauce Drizzle',
      'Whipped Cream Swirl',
      'Blended Coffee, Caramel, Milk & Crushed Ice base'
    ],
    basePrice: 5.95,
    howToOrderTemplate: 'Could I get a [Size] Caramel Frappuccino with whipped cream, please?',
    proTip: 'Frappuccinos are blended ice treats. You can ask for "Light" base for fewer calories or non-dairy whipped cream.',
    calorieRange: '280 - 450 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Wide Green Straw'
  },
  {
    id: 'mocha_cookie_crumble',
    name: 'Mocha Cookie Crumble Frappuccino',
    category: 'frappuccino',
    shortDesc: 'Frappuccino roast coffee, mocha sauce, and Frappuccino chips blended with milk and ice, layered over whipped cream and chocolate cookie crumble.',
    tasteProfile: {
      bitterness: 1,
      sweetness: 5,
      milkiness: 5,
      caffeineStrength: 2,
    },
    layers: [
      'Oreo Cookie Crumble Topping',
      'Mocha Drizzle on top',
      'Whipped Cream Swirl',
      'Blended Mocha, Coffee & Chocolate Chips',
      'Whipped Cream & Cookie Crumble bottom layer'
    ],
    basePrice: 6.25,
    howToOrderTemplate: 'Can I please get a [Size] Mocha Cookie Crumble Frappuccino?',
    proTip: 'Tastes exactly like liquid chocolate cookies and cream milkshake!',
    calorieRange: '350 - 580 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Wide Green Straw'
  },
  {
    id: 'double_chocolate_chip_creme',
    name: 'Double Chocolaty Chip Crème Frappuccino',
    category: 'frappuccino',
    shortDesc: 'Rich mocha-flavored sauce and chocolaty chips blended with milk and ice, topped with whipped cream and mocha drizzle.',
    tasteProfile: {
      bitterness: 0,
      sweetness: 5,
      milkiness: 5,
      caffeineStrength: 0, // 100% Caffeine Free!
    },
    layers: [
      'Mocha Drizzle',
      'Whipped Cream Swirl',
      'Blended Chocolate Chips, Milk & Sweet Cream (No Coffee)'
    ],
    basePrice: 5.95,
    howToOrderTemplate: 'Could I get a [Size] Double Chocolaty Chip Creme Frappuccino for a non-coffee treat?',
    proTip: '100% Coffee-free crème base. Kid-friendly and ultra decadent chocolate milkshake.',
    calorieRange: '290 - 480 kcal',
    recommendedCup: 'iced_clear_plastic',
    recommendedStraw: 'Wide Green Straw'
  }
];

export const starbucksSizes = [
  {
    name: 'Short',
    volumeOz: '8 oz',
    volumeMl: '240 ml',
    shotsHot: 1,
    pumpsSyrup: 2,
    caffeineMg: '75 mg',
    description: 'The secret mini cup! Only available for hot drinks. Great for a quick espresso fix.',
  },
  {
    name: 'Tall',
    volumeOz: '12 oz',
    volumeMl: '355 ml',
    shotsHot: 1,
    pumpsSyrup: 3,
    caffeineMg: '75 mg',
    description: 'Starbucks "Small". Good for mild coffee and refreshing teas.',
  },
  {
    name: 'Grande',
    volumeOz: '16 oz',
    volumeMl: '473 ml',
    shotsHot: 2,
    pumpsSyrup: 4,
    caffeineMg: '150 mg',
    description: 'The world standard "Medium" (16 oz). Most recipes are formulated around this size.',
  },
  {
    name: 'Venti (Hot: 20oz / Iced: 24oz)',
    volumeOz: '20-24 oz',
    volumeMl: '591-710 ml',
    shotsHot: 2,
    pumpsSyrup: 5,
    caffeineMg: '150-225 mg',
    description: 'The "Large" size! Note: Iced Venti is 24 oz (larger than 20 oz Hot Venti) to allow for ice.',
  },
  {
    name: 'Trenta',
    volumeOz: '31 oz',
    volumeMl: '916 ml',
    shotsHot: 0,
    pumpsSyrup: 7,
    caffeineMg: '90-195 mg',
    description: 'The giant 31 oz cup! Only available for Iced Teas, Refreshers, and Cold Brew. No hot drinks or espresso lattes.',
  },
];

export const milkOptions = [
  { id: 'oat', name: 'Oat Milk (Barista Blend)', note: 'Naturally sweet, super creamy, foams wonderfully without dairy.' },
  { id: 'almond', name: 'Almond Milk', note: 'Low calorie, nutty flavor, lighter body.' },
  { id: 'soy', name: 'Vanilla Soy Milk', note: 'Classic plant milk with dense, rich foam.' },
  { id: 'coconut', name: 'Coconut Milk', note: 'Tropical sweetness, base for the famous Pink Drink and Dragon Drink.' },
  { id: 'whole', name: 'Whole Milk (Standard)', note: 'Rich, full dairy mouthfeel. Standard for Flat Whites.' },
  { id: 'nonfat', name: 'Non-Fat / Skim Milk', note: 'Zero fat, light and watery coffee texture.' },
];

export const roastOptions = [
  { id: 'blonde', name: 'Blonde Espresso Roast', note: 'Light roast, sweeter citrus notes, smoother finish, slightly higher caffeine.' },
  { id: 'signature', name: 'Signature Dark Roast', note: 'Bold, roasty, cocoa notes. The classic robust Starbucks espresso.' },
  { id: 'decaf', name: 'Decaf Espresso', note: '99% caffeine removed using Swiss Water / carbon dioxide process, full espresso flavor.' },
];

export interface CoffeeVocabEntry {
  id: string;
  term: string;
  emoji: string;
  pronunciation: string;
  meaning: string;
  exampleSentence: string;
  category: 'drink_types' | 'coffee_science' | 'customization' | 'accessories';
}

export const COFFEE_VOCABULARY_DICTIONARY: CoffeeVocabEntry[] = [
  {
    id: 'espresso',
    term: 'Espresso',
    emoji: '☕',
    pronunciation: 'eh-SPRESS-oh (Never say "expresso")',
    meaning: 'Concentrated coffee made by forcing hot, pressurized water through finely ground roasted coffee beans in 20-30 seconds.',
    exampleSentence: 'Can I get an extra shot of espresso in my vanilla latte?',
    category: 'drink_types'
  },
  {
    id: 'crema',
    term: 'Crema',
    emoji: '✨',
    pronunciation: 'KRAY-mah',
    meaning: 'The golden-brown aromatic foam layer that naturally sits on top of a freshly pulled shot of espresso. It shows the coffee is fresh and properly extracted.',
    exampleSentence: 'Look at the rich hazelnut crema on this freshly pulled espresso shot!',
    category: 'coffee_science'
  },
  {
    id: 'barista',
    term: 'Barista',
    emoji: '🧑‍🍳',
    pronunciation: 'bah-REES-tah',
    meaning: 'A person who is trained in the art of preparing and serving espresso-based coffee drinks in a coffee shop.',
    exampleSentence: 'The friendly barista asked if I wanted my croissant warmed up.',
    category: 'coffee_science'
  },
  {
    id: 'macchiato',
    term: 'Macchiato',
    emoji: '🥤',
    pronunciation: 'mah-kee-AH-toh',
    meaning: 'An Italian word meaning "marked" or "spotted". At Starbucks, it is milk marked with espresso and caramel poured over the top.',
    exampleSentence: 'I ordered an Iced Caramel Macchiato because I love the layered look.',
    category: 'drink_types'
  },
  {
    id: 'cold_brew',
    term: 'Cold Brew',
    emoji: '🧊',
    pronunciation: 'KOHLD BROO',
    meaning: 'Coffee grounds steeped in cold water for 12 to 24 hours (never brewed with heat), producing a super smooth, less acidic, highly caffeinated coffee.',
    exampleSentence: 'Cold brew has a naturally sweeter and smoother taste than iced coffee.',
    category: 'drink_types'
  },
  {
    id: 'cold_foam',
    term: 'Vanilla Sweet Cold Foam',
    emoji: '🥛',
    pronunciation: 'KOHLD FOHM',
    meaning: 'Frothed nonfat milk and heavy cream blended with vanilla syrup until it forms a velvety, thick cloud that floats on iced drinks.',
    exampleSentence: 'Can you please top my iced cold brew with vanilla sweet cold foam?',
    category: 'customization'
  },
  {
    id: 'microfoam',
    term: 'Microfoam (Velvety Steamed Milk)',
    emoji: '☕',
    pronunciation: 'MY-kroh-fohm',
    meaning: 'Finely textured steamed milk with tiny, microscopic air bubbles, giving hot lattes and flat whites a silky gloss texture.',
    exampleSentence: 'A great latte has glossy microfoam perfect for latte art.',
    category: 'coffee_science'
  },
  {
    id: 'decaf',
    term: 'Decaf (Decaffeinated)',
    emoji: '🌙',
    pronunciation: 'DEE-kaf',
    meaning: 'Coffee beans that have had 97% to 99% of caffeine removed while keeping the rich coffee flavor.',
    exampleSentence: 'I want a warm latte before bed, so I ordered decaf.',
    category: 'customization'
  },
  {
    id: 'splash_stick',
    term: 'Splash Stick (Stopper)',
    emoji: '🟢',
    pronunciation: 'SPLASH STIK',
    meaning: 'A small green plastic stopper inserted into the sip hole of a hot paper cup lid to prevent hot coffee from splashing out while walking or driving.',
    exampleSentence: 'I grabbed a green splash stick from the condiment bar so my coffee would not spill.',
    category: 'accessories'
  },
  {
    id: 'cup_sleeve',
    term: 'Cardboard Cup Sleeve (Clutch)',
    emoji: '📦',
    pronunciation: 'KUP SLEEV',
    meaning: 'A corrugated cardboard band placed around a single-walled hot paper cup to insulate your hand from burning.',
    exampleSentence: 'Make sure to put a sleeve on your extra-hot Americano cup!',
    category: 'accessories'
  },
  {
    id: 'americano',
    term: 'Caffè Americano',
    emoji: '☕',
    pronunciation: 'uh-mair-ih-KAH-noh',
    meaning: 'Espresso shots topped with hot water (or iced water), giving it a strength similar to drip coffee but with rich espresso flavor.',
    exampleSentence: 'An Americano has zero milk unless you ask for a splash on the side.',
    category: 'drink_types'
  }
];
