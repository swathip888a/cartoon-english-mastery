import { StoryQuest } from '../types';

export const storyQuests: StoryQuest[] = [
  {
    id: 'quest_starbucks_trial',
    title: 'Episode 1: The Grand Starbucks Counter Trial',
    category: 'starbucks',
    description: 'Enter the bustling Tokyo Shibuya Starbucks with Sakura-senpai and order your first signature custom beverage under pressure!',
    mentorId: 'sakura',
    xpReward: 150,
    badgeUnlock: 'starbucks_barista_whisperer',
    steps: [
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: '“Yahoo, Swathi! Look at this massive queue. The barista is staring right at us. Don’t panic! Remember our golden formula: Temperature, Size, Customizations, Drink Name!”',
        expression: 'proud',
      },
      {
        speakerId: 'barista',
        speakerName: 'Barista Ren',
        text: '“Welcome to Starbucks! What can I get started for you today?”',
        expression: 'happy',
        choices: [
          {
            text: '“Uhh... coffee. Medium. With some milk and sugar?”',
            isCorrect: false,
            feedback: 'Sakura: "Wait! That is too vague! They will ask you 5 follow-up questions. Be specific!"',
            xpReward: 20,
            nextStepIndex: 2,
          },
          {
            text: '“Hi! Can I please get a Grande Iced Blonde Vanilla Latte with oat milk?”',
            isCorrect: true,
            feedback: 'Sakura: "SUGOI! Perfect order sequence! The barista will adore you for this clarity!"',
            xpReward: 80,
            nextStepIndex: 3,
          },
          {
            text: '“Give me the strongest caramel thing you have.”',
            isCorrect: false,
            feedback: 'Sakura: "A bit risky! Let’s specify the exact drink name like an Iced Caramel Macchiato!"',
            xpReward: 30,
            nextStepIndex: 2,
          },
        ],
      },
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: '“Let’s refine it! Say: ‘Could I get a Grande Iced Blonde Vanilla Latte with Oat Milk, please?’ Notice how crisp and confident that sounds!”',
        expression: 'thinking',
        choices: [
          {
            text: '“Could I please get a Grande Iced Blonde Vanilla Latte with Oat Milk?”',
            isCorrect: true,
            feedback: 'Sakura: "Spot on! That’s the way!"',
            xpReward: 50,
            nextStepIndex: 3,
          },
        ],
      },
      {
        speakerId: 'barista',
        speakerName: 'Barista Ren',
        text: '“Grande Iced Blonde Vanilla Latte with oat milk, coming right up! Can I get a name for the cup?”',
        expression: 'happy',
        choices: [
          {
            text: '“It’s Swathi, S-W-A-T-H-I! Thank you so much!”',
            isCorrect: true,
            feedback: 'Sakura: "Spelling out your name with a smile is pure pro behavior! Quest Complete!"',
            xpReward: 70,
            nextStepIndex: 4,
          },
        ],
      },
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: '“You nailed your first custom coffee order like a true international queen! Take this Barista Whisperer badge with pride! ☕✨”',
        expression: 'proud',
      },
    ],
  },
  {
    id: 'quest_airport_security',
    title: 'Episode 2: TSA Security Gate Speedrun',
    category: 'airport',
    description: 'Breeze through international airport security with Kenji-sensei without holding up the line or triggering alarms!',
    mentorId: 'kenji',
    xpReward: 200,
    badgeUnlock: 'tsa_speedrunner',
    steps: [
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: '“Listen up, Swathi! We are at the security checkpoint at Narita Airport. 30 people are behind us. What is your pre-screening protocol?”',
        expression: 'serious',
      },
      {
        speakerId: 'tsa_officer',
        speakerName: 'Officer Miller',
        text: '“Next in line, please. Boarding pass and passport out.”',
        expression: 'serious',
        choices: [
          {
            text: 'Keep full 500ml water bottle in hand and heavy metal belt on.',
            isCorrect: false,
            feedback: 'Kenji: "BZZZT! 500ml bottle is over the 100ml liquid limit and metal belt will set off the scanner!"',
            xpReward: 10,
            nextStepIndex: 2,
          },
          {
            text: 'Empty pockets into bag, take out laptop & 1-quart liquid bag, slip off jacket.',
            isCorrect: true,
            feedback: 'Kenji: "Flawless execution! You just saved 3 minutes and breezed through like an airline pilot!"',
            xpReward: 100,
            nextStepIndex: 3,
          },
        ],
      },
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: '“Remember: Drink or empty all water before security, and keep your laptop in a separate plastic bin if requested!”',
        expression: 'thinking',
        choices: [
          {
            text: '“Got it! Laptop in separate bin, liquids in zip pouch, stepping onto the scanner footprints!”',
            isCorrect: true,
            feedback: 'Kenji: "Much better! Let’s clear the gate!"',
            xpReward: 50,
            nextStepIndex: 3,
          },
        ],
      },
      {
        speakerId: 'tsa_officer',
        speakerName: 'Officer Miller',
        text: '“All clear. Have a safe flight to San Francisco, Ms. Swathi!”',
        expression: 'happy',
        choices: [
          {
            text: '“Thank you, officer! Have a great day!”',
            isCorrect: true,
            feedback: 'Kenji: "Polite, crisp, and cleared! You are now a certified TSA Speedrunner!"',
            xpReward: 100,
            nextStepIndex: 4,
          },
        ],
      },
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: '“Incredible focus, Swathi! You are ready to travel anywhere in the world without fear. ✈️🌟”',
        expression: 'proud',
      },
    ],
  },
  {
    id: 'quest_japanese_restroom',
    title: 'Episode 3: The Secret of the High-Tech Throne',
    category: 'restroom',
    description: 'Navigate a futuristic Japanese washlet toilet in Tokyo with Aoi-chan without pressing the dreaded Red Emergency button!',
    mentorId: 'aoi',
    xpReward: 180,
    badgeUnlock: 'sanctuary_guardian',
    steps: [
      {
        speakerId: 'aoi',
        speakerName: 'Aoi-chan',
        text: '“Swathi, you just entered a high-tech Japanese smart restroom in Shinjuku Station! The control panel has 10 flashing buttons. What do you do first to mask any sounds?”',
        expression: 'thinking',
        choices: [
          {
            text: 'Pull the bright red cord labeled "非常 (Emergency)".',
            isCorrect: false,
            feedback: 'Aoi: "NOOO! THAT IS THE EMERGENCY ALARM! It will summon station security and paramedic sirens!"',
            xpReward: 10,
            nextStepIndex: 2,
          },
          {
            text: 'Press the "音姫 (Otohime / Sound Privacy)" button.',
            isCorrect: true,
            feedback: 'Aoi: "Yatta! Otohime plays soothing gentle water flush sounds to give you total privacy!"',
            xpReward: 90,
            nextStepIndex: 3,
          },
        ],
      },
      {
        speakerId: 'aoi',
        speakerName: 'Aoi-chan',
        text: '“Phew, disaster averted! Remember: Red cords are ONLY for medical emergencies! Always look for ‘音’ (Sound) or ‘流す’ (Flush)!”',
        expression: 'surprised',
        choices: [
          {
            text: '“Understood! Pressing Otohime sound button now.”',
            isCorrect: true,
            feedback: 'Aoi: "Great recovery!"',
            xpReward: 40,
            nextStepIndex: 3,
          },
        ],
      },
      {
        speakerId: 'aoi',
        speakerName: 'Aoi-chan',
        text: '“Now when you are finished, how do you stop any active spray and flush?”',
        expression: 'happy',
        choices: [
          {
            text: 'Press the red "止 (STOP)" button, then press "大 (Full Flush)" or "小 (Eco Flush)".',
            isCorrect: true,
            feedback: 'Aoi: "PERFECT! ‘止’ stops all water sprays instantly, and ‘大/小’ flushes cleanly!"',
            xpReward: 90,
            nextStepIndex: 4,
          },
        ],
      },
      {
        speakerId: 'aoi',
        speakerName: 'Aoi-chan',
        text: '“Congratulations, Swathi! You have mastered the most sophisticated restroom technology in the world with zero panic! 🚻👑”',
        expression: 'proud',
      },
    ],
  },
];
