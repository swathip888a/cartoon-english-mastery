import { StarbucksFoodItem, CondimentItem } from '../types';

export const STARBUCKS_FOOD_ITEMS: StarbucksFoodItem[] = [
  // --- BAKERY PASTRIES ---
  {
    id: 'butter_croissant',
    name: 'Butter Croissant',
    category: 'bakery',
    shortDesc: 'Flaky, buttery layers baked golden crisp on the outside and warm soft inside.',
    price: 3.75,
    calories: 260,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Could I get a Butter Croissant, warmed up please?',
    baristaQuestion: 'Would you like that warmed up in the oven?',
    proTip: 'Always say "Yes, please warm it up!" The butter melts into the flaky layers for 10x better flavor.',
    pairsWellWith: 'Caffè Latte or Pike Place Hot Coffee'
  },
  {
    id: 'chocolate_croissant',
    name: 'Chocolate Croissant (Pain au Chocolat)',
    category: 'bakery',
    shortDesc: 'Flaky pastry filled with two batons of rich semi-sweet dark chocolate.',
    price: 4.25,
    calories: 300,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Can I have one chocolate croissant warmed up, please?',
    baristaQuestion: 'Do you want the chocolate croissant heated?',
    proTip: 'When warmed, the chocolate center becomes deliciously gooey and molten.',
    pairsWellWith: 'Caramel Macchiato or Cappuccino'
  },
  {
    id: 'blueberry_muffin',
    name: 'Blueberry Muffin with Sugar Streusel',
    category: 'bakery',
    shortDesc: 'Moist, fluffy muffin packed with juicy plump blueberries and dusted with crunchy sugar streusel crystals.',
    price: 3.95,
    calories: 330,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Could I get a Blueberry Muffin warmed up, please?',
    baristaQuestion: 'Would you like your muffin warmed up?',
    proTip: 'Warming releases the aroma of fresh blueberries and makes the cake super moist.',
    pairsWellWith: 'Hot Caffè Latte or Americano'
  },
  {
    id: 'everything_bagel',
    name: 'Everything Bagel with Cream Cheese',
    category: 'bakery',
    shortDesc: 'Chewy New York style bagel topped with sesame seeds, poppy seeds, dried onion, and sea salt.',
    price: 4.10,
    calories: 290,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Could I get a toasted Everything Bagel with plain cream cheese?',
    baristaQuestion: 'Would you like plain or plant-based avocado spread for your bagel?',
    proTip: 'Say "double toasted" if you like a super crispy crunch on your bagel crust!',
    pairsWellWith: 'Iced Matcha Tea Latte'
  },
  {
    id: 'glazed_doughnut',
    name: 'Old-Fashioned Glazed Doughnut',
    category: 'bakery',
    shortDesc: 'Classic dense cake doughnut dipped in sweet vanilla glaze with crisp golden ridges.',
    price: 3.25,
    calories: 480,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Can I add an Old-Fashioned Glazed Doughnut, please?',
    baristaQuestion: 'Just the doughnut as is from the case?',
    proTip: 'Dipping the doughnut into hot black coffee or an Americano is pure heaven!',
    pairsWellWith: 'Hot Caffè Americano'
  },

  // --- CAKE POPS & SWEETS ---
  {
    id: 'birthday_cake_pop',
    name: 'Birthday Cake Pop',
    category: 'snacks_sweets',
    shortDesc: 'Vanilla cake mixed with buttercream icing, dipped in a pink chocolaty shell with white sprinkles.',
    price: 2.95,
    calories: 170,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'May I also add one Birthday Cake Pop, please?',
    baristaQuestion: 'Just one cake pop today?',
    proTip: 'Cake pops are served cold on a stick straight from the pastry display. Never ask to warm a cake pop!',
    pairsWellWith: 'Iced Strawberry Açaí Refresher'
  },
  {
    id: 'chocolate_cake_pop',
    name: 'Chocolate Cake Pop',
    category: 'snacks_sweets',
    shortDesc: 'Rich chocolate cake dipped in a dark milk chocolaty coating topped with chocolate sprinkles.',
    price: 2.95,
    calories: 160,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Could I get a Chocolate Cake Pop, please?',
    baristaQuestion: 'One chocolate cake pop, anything else?',
    proTip: 'Dense, fudge-like chocolate texture on a lollipop stick. Kids and sweet-tooths love it!',
    pairsWellWith: 'Classic Signature Hot Chocolate'
  },
  {
    id: 'cookies_cream_cake_pop',
    name: 'Cookies & Cream Cake Pop',
    category: 'snacks_sweets',
    shortDesc: 'Oreo chocolate cookie crumbles mixed with vanilla buttercream in a white chocolaty shell.',
    price: 3.25,
    calories: 170,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'I would like one Cookies and Cream cake pop, please.',
    baristaQuestion: 'Coming right up from the pastry case!',
    proTip: 'A fan-favorite seasonal cake pop with real crunchy cookie specks.',
    pairsWellWith: 'Vanilla Sweet Cream Cold Brew'
  },
  {
    id: 'chocolate_chip_cookie',
    name: 'Warm Chocolate Chunk Cookie',
    category: 'snacks_sweets',
    shortDesc: 'Loaded with rich semi-sweet chocolate chunks and a touch of sea salt, baked golden brown.',
    price: 3.65,
    calories: 370,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Can I get a Chocolate Chunk Cookie warmed up, please?',
    baristaQuestion: 'Warming your chocolate chunk cookie for you!',
    proTip: 'Warming it melts the giant chocolate chunks into molten pockets of chocolate.',
    pairsWellWith: 'Hot Caffè Latte or Cappuccino'
  },
  {
    id: 'double_chocolate_brownie',
    name: 'Double Chocolate Fudge Brownie',
    category: 'snacks_sweets',
    shortDesc: 'Ultra-rich chewy chocolate fudge brownie studded with chunks of dark and milk chocolate.',
    price: 3.95,
    calories: 410,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian'],
    howToOrderPhrasing: 'Could I please get the Double Chocolate Brownie heated up?',
    baristaQuestion: 'Heated up in the oven for 30 seconds?',
    proTip: 'Pair with an iced cold brew to cut through the decadent dense fudge sweetness.',
    pairsWellWith: 'Salted Caramel Cream Cold Brew'
  },
  {
    id: 'marshmallow_dream_bar',
    name: 'Marshmallow Dream Bar (Rice Crispy)',
    category: 'snacks_sweets',
    shortDesc: 'Crispy puffed rice cereal bound with gooey melted marshmallows and pure vanilla.',
    price: 3.45,
    calories: 230,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Gluten-Free', 'Vegetarian'],
    howToOrderPhrasing: 'Can I get a Marshmallow Dream Bar, please?',
    baristaQuestion: 'Just one Marshmallow Dream bar from the grab-and-go rack?',
    proTip: 'Certified Gluten-Free! Individually wrapped so it is easy to take in your bag for later.',
    pairsWellWith: 'Iced Chai Tea Latte'
  },

  // --- HOT BREAKFAST SANDWICHES & PANINIS ---
  {
    id: 'bacon_gouda_sandwich',
    name: 'Bacon, Gouda & Egg Breakfast Sandwich',
    category: 'sandwiches',
    shortDesc: 'Crispy applewood-smoked bacon, melted aged Gouda cheese, and a parmesan egg frittata on an artisan roll.',
    price: 5.95,
    calories: 360,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['High Protein (19g)'],
    howToOrderPhrasing: 'Could I order the Bacon, Gouda and Egg sandwich, warmed up?',
    baristaQuestion: 'Warming up the Bacon & Gouda for you right now!',
    proTip: 'Hot breakfast sandwiches are stored chilled and toasted in a high-speed oven in 45 seconds.',
    pairsWellWith: 'Vanilla Sweet Cream Cold Brew'
  },
  {
    id: 'tomato_mozzarella_panini',
    name: 'Tomato & Mozzarella Focaccia Panini',
    category: 'sandwiches',
    shortDesc: 'Roasted tomatoes, fresh melted mozzarella cheese, spinach, and basil pesto on toasted herb focaccia.',
    price: 6.95,
    calories: 390,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Vegetarian', 'High Protein (18g)'],
    howToOrderPhrasing: 'Can I get the Tomato and Mozzarella Panini toasted, please?',
    baristaQuestion: 'Toasting the Tomato & Mozzarella panini for lunch!',
    proTip: 'The #1 best vegetarian warm lunch option at Starbucks! The herb pesto and melted mozzarella are fantastic.',
    pairsWellWith: 'Iced Shaken Espresso or Pink Drink'
  },
  {
    id: 'egg_white_bites',
    name: 'Egg White & Roasted Red Pepper Sous Vide Bites',
    category: 'sandwiches',
    shortDesc: 'Cage-free egg whites cooked sous-vide with Monterey Jack cheese, spinach, and fire-roasted red peppers.',
    price: 5.45,
    calories: 170,
    warmingSupported: true,
    defaultWarmed: true,
    dietary: ['Gluten-Free', 'High Protein (12g)', 'Low Calorie'],
    howToOrderPhrasing: 'I would like the Egg White and Roasted Red Pepper egg bites, please.',
    baristaQuestion: 'Would you like a packet of sriracha or avocado spread on the side?',
    proTip: 'Ask for a packet of Sriracha or avocado spread at the counter to elevate the flavor.',
    pairsWellWith: 'Iced Americano or Blonde Roast Coffee'
  },

  // --- PROTEIN BOXES ---
  {
    id: 'cheese_fruit_protein_box',
    name: 'Cheese & Fruit Protein Box',
    category: 'protein_boxes',
    shortDesc: 'Brie, Gouda, and Cheddar cheeses paired with crisp apples, grapes, olive oil multigrain crackers.',
    price: 6.75,
    calories: 470,
    warmingSupported: false,
    defaultWarmed: false,
    dietary: ['Vegetarian', 'High Protein (20g)'],
    howToOrderPhrasing: 'Can I grab the Cheese and Fruit protein box from the fresh case?',
    baristaQuestion: 'Just the cheese and fruit box from the grab & go case?',
    proTip: 'Served cold with crackers in a sealed lunch container. Great on-the-go travel meal!',
    pairsWellWith: 'Iced Passion Tango Herbal Tea'
  }
];

export const CONDIMENT_BAR_ITEMS: CondimentItem[] = [
  {
    id: 'white_sugar',
    name: 'White Cane Sugar (Classic)',
    color: '#ffffff',
    packetColor: 'White Packet with Blue logo',
    sweetnessDesc: 'Direct, standard clean sweetness (4g sugar / 15 kcal per packet)',
    category: 'sugar',
    bestUsedFor: 'Standard hot coffees and lattes'
  },
  {
    id: 'sugar_in_the_raw',
    name: 'Sugar in the Raw (Turbinado Brown)',
    color: '#d97706',
    packetColor: 'Golden Brown Kraft Paper Packet',
    sweetnessDesc: 'Unrefined natural golden crystals with rich molasses caramel notes',
    category: 'sugar',
    bestUsedFor: 'Hot Cappuccinos, Flat Whites, and Americanos'
  },
  {
    id: 'splenda',
    name: 'Splenda (Sucralose)',
    color: '#facc15',
    packetColor: 'Bright Yellow Packet',
    sweetnessDesc: '0 Calories. 1 packet tastes equal to 2 teaspoons of sugar',
    category: 'sugar',
    bestUsedFor: 'Low calorie, diabetic friendly sweetness'
  },
  {
    id: 'stevia',
    name: 'Stevia in the Raw (Plant Based)',
    color: '#22c55e',
    packetColor: 'Green Leaf Packet',
    sweetnessDesc: '0 Calories. 100% natural extract from the Stevia plant',
    category: 'sugar',
    bestUsedFor: 'Keto, low-carb, and natural sweetener fans'
  },
  {
    id: 'equal',
    name: 'Equal (Aspartame)',
    color: '#3b82f6',
    packetColor: 'Cyan Blue Packet',
    sweetnessDesc: '0 Calories. Fast dissolving in iced coffee',
    category: 'sugar',
    bestUsedFor: 'Quickly sweetening cold iced drinks'
  },
  {
    id: 'straw_green',
    name: 'Classic Starbucks Green Straw',
    color: '#00704A',
    packetColor: 'Paper Wrapped Green Straw',
    sweetnessDesc: 'Standard width straw for iced coffees, refreshers, and iced teas',
    category: 'straw',
    bestUsedFor: 'Iced Caramel Macchiatos, Iced Lattes, and Iced Teas'
  },
  {
    id: 'straw_wide',
    name: 'Wide Frappuccino Straw',
    color: '#00704A',
    packetColor: 'Wide Paper Wrapped Straw',
    sweetnessDesc: 'Extra wide diameter preventing thick blended ice from clogging',
    category: 'straw',
    bestUsedFor: 'Caramel & Mocha Blended Frappuccinos'
  },
  {
    id: 'splash_stick',
    name: 'Green Splash Stick (Drink Stopper)',
    color: '#00704A',
    packetColor: 'Plastic Siren Plug',
    sweetnessDesc: 'Plugs into hot lid sip hole to stop hot liquid from sloshing out while walking or driving',
    category: 'sleeve_accessory',
    bestUsedFor: 'All hot to-go paper cups'
  },
  {
    id: 'cardboard_sleeve',
    name: 'Embossed Cardboard Cup Sleeve (Clutch)',
    color: '#78350f',
    packetColor: 'Corrugated Brown Cardboard Sleeve',
    sweetnessDesc: 'Insulates your hands from burning against single-wall paper cups',
    category: 'sleeve_accessory',
    bestUsedFor: 'Hot Lattes, Hot Chocolates, and Americanos'
  }
];

export interface CashierDialogueStep {
  stepIndex: number;
  baristaPrompt: string;
  sampleAnswers: { text: string; note: string }[];
}

export const STARBUCKS_CASHIER_FLOW: CashierDialogueStep[] = [
  {
    stepIndex: 0,
    baristaPrompt: 'Good morning! Welcome in. What can I get started for you today?',
    sampleAnswers: [
      { text: 'Hi! Can I please get a Grande Hot Chocolate with whipped cream?', note: 'Classic warm sweet drink' },
      { text: 'Could I get a Venti Iced Caramel Macchiato with oat milk, please?', note: 'Chilled layered espresso' },
      { text: 'Hi! Can I get a Grande Iced Brown Sugar Oatmilk Shaken Espresso?', note: 'Silky frothy blonde espresso' }
    ]
  },
  {
    stepIndex: 1,
    baristaPrompt: 'Would you like to add any food or breakfast sandwiches with that today?',
    sampleAnswers: [
      { text: 'Yes, could I please get a Chocolate Croissant, warmed up?', note: 'Flaky pastry with molten chocolate' },
      { text: 'Can I add a Warm Chocolate Chunk Cookie and a Birthday Cake Pop?', note: 'Delicious bakery snack' },
      { text: 'Just the drink for me today, thank you!', note: 'Drink only' }
    ]
  },
  {
    stepIndex: 2,
    baristaPrompt: 'Can I get a name for the cup?',
    sampleAnswers: [
      { text: 'My name is Swathi, S-W-A-T-H-I!', note: 'Spelling your name clearly' },
      { text: 'Swathi, please!', note: 'Friendly standard response' }
    ]
  },
  {
    stepIndex: 3,
    baristaPrompt: 'Your total is $9.20. Will you be paying with card, Apple Pay, or cash today?',
    sampleAnswers: [
      { text: 'Can I tap my contactless credit card on the screen?', note: 'Modern tap to pay' },
      { text: 'I will pay with cash, here is a ten dollar bill!', note: 'Cash payment with change' },
      { text: 'I am scanning my Starbucks Rewards App barcode on my phone!', note: 'Collecting stars' }
    ]
  }
];
