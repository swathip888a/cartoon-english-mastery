import { StoryQuest } from '../types';

export const DAILY_LIFE_EPISODES: StoryQuest[] = [
  {
    id: 'episode_1_shibuya_cafe',
    title: 'Episode 1: The First Morning at a Tokyo Cafe',
    category: 'starbucks',
    description: 'You wake up on your first day abroad and walk into a bustling cafe. Order your favorite drink, warm breakfast sandwich, and ask for the Wi-Fi password in natural English!',
    mentorId: 'sakura',
    xpReward: 80,
    badgeUnlock: '☕ Cafe Diplomat',
    steps: [
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: 'Good morning, Swathi! Look at this cute cafe on the corner. The smell of freshly ground roasted beans is heavenly! Ready to order your first breakfast on your own?',
        expression: 'happy'
      },
      {
        speakerId: 'barista',
        speakerName: 'Friendly Barista',
        text: 'Good morning! Welcome in. What can I get started for you today?',
        expression: 'happy',
        choices: [
          {
            text: 'Hi! Can I please get a Grande Iced Vanilla Latte with oat milk and a Butter Croissant?',
            isCorrect: true,
            feedback: 'Perfect! You stated size, temp, flavor, milk choice, and food in one polite sentence.',
            xpReward: 25,
            nextStepIndex: 2
          },
          {
            text: 'Give me coffee and bread.',
            isCorrect: false,
            feedback: 'Too blunt! In English cafes, always use "Can I please get..." or "Could I have..." to sound polite and pleasant.',
            xpReward: 10,
            nextStepIndex: 2
          }
        ]
      },
      {
        speakerId: 'barista',
        speakerName: 'Friendly Barista',
        text: 'Awesome choice! Would you like that Butter Croissant warmed up in the oven for you?',
        expression: 'thinking',
        choices: [
          {
            text: 'Yes, please warm it up! Thank you.',
            isCorrect: true,
            feedback: 'Spot on! A warmed croissant has crispy outer layers and soft melted butter inside.',
            xpReward: 20,
            nextStepIndex: 3
          },
          {
            text: 'No, cold is fine.',
            isCorrect: true,
            feedback: 'Clear and direct.',
            xpReward: 15,
            nextStepIndex: 3
          }
        ]
      },
      {
        speakerId: 'barista',
        speakerName: 'Friendly Barista',
        text: 'Got it! Your total is $8.45. How would you like to pay, and what name can I put on your cup?',
        expression: 'happy',
        choices: [
          {
            text: "I'll tap with Apple Pay, and the name is Swathi, S-W-A-T-H-I!",
            isCorrect: true,
            feedback: 'Excellent! Spelling out your name ensures the barista writes it correctly on your cup.',
            xpReward: 25,
            nextStepIndex: 4
          }
        ]
      },
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: 'You did it! Look, your iced latte has your name on it with a little smiley face! Now you can sit down and enjoy your warm croissant.',
        expression: 'proud'
      }
    ]
  },
  {
    id: 'episode_2_airport_departure',
    title: 'Episode 2: The Solo Flight & Airport Journey',
    category: 'airport',
    description: 'Arrive at the international terminal, check your luggage, pass through TSA security bins, and fill out your immigration arrival card before landing.',
    mentorId: 'kenji',
    xpReward: 90,
    badgeUnlock: '✈️ Sky Voyager',
    steps: [
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: 'We have arrived at Terminal 1! First step: let’s head to the check-in counter to drop our big suitcase on the scale.',
        expression: 'serious'
      },
      {
        speakerId: 'agent',
        speakerName: 'Airline Check-In Agent',
        text: 'Hello! Passports and booking reference, please. How many bags are you checking in today?',
        expression: 'happy',
        choices: [
          {
            text: 'Hello! Just this one suitcase to check, and one backpack for carry-on.',
            isCorrect: true,
            feedback: 'Perfect! Clear distinction between "checked bag" and "carry-on".',
            xpReward: 25,
            nextStepIndex: 2
          }
        ]
      },
      {
        speakerId: 'agent',
        speakerName: 'Airline Check-In Agent',
        text: 'Please place the suitcase on the scale... 21.4 kg, perfect! Would you prefer a Window or an Aisle seat for your 10-hour flight?',
        expression: 'thinking',
        choices: [
          {
            text: 'A Window seat near the front of the cabin, please!',
            isCorrect: true,
            feedback: 'Window seats let you lean your head against the wall to sleep and enjoy cloud views!',
            xpReward: 20,
            nextStepIndex: 3
          },
          {
            text: 'An Aisle seat, please, so I can stretch my legs easily.',
            isCorrect: true,
            feedback: 'Aisle seats give you direct access to the restroom without disturbing others.',
            xpReward: 20,
            nextStepIndex: 3
          }
        ]
      },
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: 'Now approaching TSA Security! Remember: Laptops come out into their own gray bin, liquids under 100ml in the clear bag, and take off your heavy coat!',
        expression: 'proud',
        choices: [
          {
            text: 'Got it! Laptop in the separate bin, jacket off, and phone in my backpack.',
            isCorrect: true,
            feedback: 'You sailed through the body scanner with zero beeps or delays!',
            xpReward: 30,
            nextStepIndex: 4
          }
        ]
      },
      {
        speakerId: 'kenji',
        speakerName: 'Kenji-sensei',
        text: 'Congratulations! You boarded on time, took your seat, and filled your customs declaration form. Welcome aboard!',
        expression: 'happy'
      }
    ]
  },
  {
    id: 'episode_3_subway_hotel',
    title: 'Episode 3: Subway Kiosk & Hotel Check-in',
    category: 'hotel',
    description: 'Land in the city, buy a subway ticket from the touchscreen machine, ride the train, and check into your hotel room.',
    mentorId: 'ren',
    xpReward: 85,
    badgeUnlock: '🏨 Master Guest',
    steps: [
      {
        speakerId: 'ren',
        speakerName: 'Ren-kun',
        text: 'We just walked out of the airport train station! There are automated ticket machines right in front of us. Let’s get tickets to Central Station.',
        expression: 'happy'
      },
      {
        speakerId: 'ren',
        speakerName: 'Ren-kun',
        text: 'Touch the screen: Language ➔ English ➔ Central Station ➔ 1 Adult Ticket. How do you want to pay?',
        expression: 'thinking',
        choices: [
          {
            text: 'I will insert a $10 bill into the cash slot and collect my change and ticket.',
            isCorrect: true,
            feedback: 'The ticket machine dispenses your magnetic ticket and coins in the tray.',
            xpReward: 25,
            nextStepIndex: 2
          }
        ]
      },
      {
        speakerId: 'receptionist',
        speakerName: 'Hotel Front Desk',
        text: 'Good evening! Welcome to Prince Grand Hotel. Checking in today?',
        expression: 'happy',
        choices: [
          {
            text: 'Yes, good evening! I have a reservation under the name Swathi Priya.',
            isCorrect: true,
            feedback: 'Clear, polite, and provides your reservation name immediately.',
            xpReward: 25,
            nextStepIndex: 3
          }
        ]
      },
      {
        speakerId: 'receptionist',
        speakerName: 'Hotel Front Desk',
        text: 'Found your reservation for 4 nights, Non-Smoking King Bed! Could I see your passport and a credit card for the incidental deposit?',
        expression: 'thinking',
        choices: [
          {
            text: 'Here is my passport and card. Also, could you tell me the Wi-Fi password and what time breakfast is served?',
            isCorrect: true,
            feedback: 'Asking for Wi-Fi and breakfast times right at check-in is what pro travelers do!',
            xpReward: 25,
            nextStepIndex: 4
          }
        ]
      },
      {
        speakerId: 'receptionist',
        speakerName: 'Hotel Front Desk',
        text: 'Breakfast is on the 2nd floor from 7:00 AM to 10:30 AM, and the Wi-Fi password is on your keycard holder. You are on the 14th floor, Room 1402. Enjoy your stay!',
        expression: 'happy'
      }
    ]
  },
  {
    id: 'episode_4_dining_tipping',
    title: 'Episode 4: Dinner at a Restaurant & Tipping Guide',
    category: 'dining',
    description: 'Dine out at a nice restaurant. Get seated, order appetizers and entrees, ask for no onions, request the check, and calculate tip.',
    mentorId: 'sakura',
    xpReward: 85,
    badgeUnlock: '🍽️ Gourmet Explorer',
    steps: [
      {
        speakerId: 'host',
        speakerName: 'Restaurant Host',
        text: 'Good evening! Welcome to The Rustic Table. Table for one or two tonight?',
        expression: 'happy',
        choices: [
          {
            text: 'Good evening! A table for one, please. Indoor seating is great.',
            isCorrect: true,
            feedback: 'Polite greeting and clear table size.',
            xpReward: 20,
            nextStepIndex: 1
          }
        ]
      },
      {
        speakerId: 'server',
        speakerName: 'Friendly Server',
        text: 'Hi, my name is Alex and I will be taking care of you tonight. Can I start you off with something to drink while you look at the menu?',
        expression: 'happy',
        choices: [
          {
            text: 'Could I get an iced water with lemon, please?',
            isCorrect: true,
            feedback: 'In US/UK restaurants, ice water is complimentary and standard.',
            xpReward: 20,
            nextStepIndex: 2
          }
        ]
      },
      {
        speakerId: 'server',
        speakerName: 'Friendly Server',
        text: 'Here is your ice water! Are you ready to order food or need a few more minutes?',
        expression: 'thinking',
        choices: [
          {
            text: 'I am ready! Could I have the grilled salmon, but with salad instead of fries, and dressing on the side please?',
            isCorrect: true,
            feedback: 'Customizing sides ("dressing on the side", "substitute salad") is completely normal in Western dining!',
            xpReward: 25,
            nextStepIndex: 3
          }
        ]
      },
      {
        speakerId: 'server',
        speakerName: 'Friendly Server',
        text: 'Salmon with side salad and dressing on the side, you got it! ... [After a delicious meal] ... How was everything?',
        expression: 'happy',
        choices: [
          {
            text: 'Everything was wonderful, thank you! Could we please have the bill whenever you have a chance?',
            isCorrect: true,
            feedback: 'Asking for the check/bill with "whenever you have a chance" is extremely polite.',
            xpReward: 20,
            nextStepIndex: 4
          }
        ]
      },
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: 'The bill is $30.00. In North America, a standard 18% good service tip is $5.40 (Total: $35.40). You handled the entire dining experience like a native!',
        expression: 'proud'
      }
    ]
  },
  {
    id: 'episode_5_clinic_pharmacy',
    title: 'Episode 5: Visiting a Pharmacy & Clinic When Sick',
    category: 'health',
    description: 'You wake up with a sore throat and fever abroad. Learn how to describe your symptoms accurately to a pharmacist and doctor.',
    mentorId: 'sakura',
    xpReward: 90,
    badgeUnlock: '💊 Health Guardian',
    steps: [
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: 'Oh no, you have a slight fever (38°C) and a sore throat. Don’t panic! We are going to the local pharmacy first to talk to the pharmacist.',
        expression: 'serious'
      },
      {
        speakerId: 'pharmacist',
        speakerName: 'Local Pharmacist',
        text: 'Hello! How can I help you today?',
        expression: 'happy',
        choices: [
          {
            text: 'Hi, I have had a severe sore throat, fever, and headache since yesterday. Could you recommend something for the pain and fever?',
            isCorrect: true,
            feedback: 'Describing exact symptoms and duration ("since yesterday") helps the pharmacist pick the exact medication.',
            xpReward: 25,
            nextStepIndex: 2
          }
        ]
      },
      {
        speakerId: 'pharmacist',
        speakerName: 'Local Pharmacist',
        text: 'I recommend this Ibuprofen for fever and pain, and throat lozenges with honey & lemon. Do you have any known drug allergies?',
        expression: 'thinking',
        choices: [
          {
            text: 'No known drug allergies. How often should I take the Ibuprofen?',
            isCorrect: true,
            feedback: 'Always ask dosage timing ("How often should I take this?").',
            xpReward: 25,
            nextStepIndex: 3
          }
        ]
      },
      {
        speakerId: 'pharmacist',
        speakerName: 'Local Pharmacist',
        text: 'Take 1 tablet every 6 to 8 hours with food or a full glass of water. Do not take on an empty stomach. Drink plenty of warm water!',
        expression: 'happy',
        choices: [
          {
            text: 'Understood. Thank you so much for your help!',
            isCorrect: true,
            feedback: 'Polite and grateful conclusion.',
            xpReward: 20,
            nextStepIndex: 4
          }
        ]
      },
      {
        speakerId: 'sakura',
        speakerName: 'Sakura-senpai',
        text: 'Great job! You took the medication with food, rested well, and your fever is completely gone. You now know how to handle any medical situation abroad!',
        expression: 'proud'
      }
    ]
  }
];
