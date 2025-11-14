// Game scenes and content
const gameScenes = {
    start: {
        id: "start",
        character: "Narrator",
        text: "It's 11:30 PM. You're on the last bus home after a long day. The bus is nearly empty - just you, the driver, and a few scattered passengers. The city lights blur past the window as you settle in for the 30-minute ride.",
        choices: [
            { text: "Put on headphones and zone out", next: "headphones" },
            { text: "Look around at the other passengers", next: "observe" }
        ]
    },

    headphones: {
        id: "headphones",
        character: "Narrator",
        text: "You put on your headphones and close your eyes. The music drowns out the world. After a few minutes, you feel a tap on your shoulder.",
        choices: [
            { text: "Ignore it and keep eyes closed", next: "ignore_tap" },
            { text: "Open your eyes and see who it is", next: "see_tap" }
        ]
    },

    observe: {
        id: "observe",
        character: "Narrator", 
        text: "You scan the bus. An elderly man sleeps in the front. A student studies under dim light. A woman nervously checks her phone every few seconds. She keeps glancing at you.",
        choices: [
            { text: "Smile politely and look away", next: "smile_away" },
            { text: "Maintain eye contact, see if she needs something", next: "eye_contact" }
        ]
    },

    ignore_tap: {
        id: "ignore_tap",
        character: "Narrator",
        text: "You pretend not to notice the tap. It comes again, more insistent. The bus hits a bump and your phone slips, landing near the woman who was watching you earlier.",
        choices: [
            { text: "Quickly grab your phone and put headphones back on", next: "grab_phone" },
            { text: "Ask the woman if she was trying to get your attention", next: "ask_woman" }
        ]
    },

    see_tap: {
        id: "see_tap", 
        character: "Woman",
        text: "It's the woman from across the aisle. She looks worried. 'Excuse me,' she whispers, 'I think you dropped this.' She holds up your wallet.",
        choices: [
            { text: "Thank her quickly and put it away", next: "quick_thanks", stats: { practicality: 1 } },
            { text: "Thank her warmly and strike up conversation", next: "warm_thanks", stats: { kindness: 1 } }
        ]
    },

    smile_away: {
        id: "smile_away",
        character: "Narrator",
        text: "You offer a brief smile and look out the window. A few stops later, the woman gathers her things and moves to sit across from you.",
        choices: [
            { text: "Pretend to be asleep", next: "pretend_sleep" },
            { text: "Acknowledge her and see what she wants", next: "acknowledge_her" }
        ]
    },

    eye_contact: {
        id: "eye_contact",
        character: "Woman",
        text: "She takes your eye contact as an invitation. 'I'm sorry to bother you,' she says, moving closer. 'My phone died and I'm worried I'll miss my stop. Could you tell me when we reach Maple Street?'",
        choices: [
            { text: "'Sure, no problem' - then mind your own business", next: "simple_help", stats: { practicality: 1 } },
            { text: "'Of course. Are you okay? You seem stressed.'", next: "concerned_help", stats: { kindness: 1 } }
        ]
    },

    // Branch 1: Headphones -> See tap -> Quick thanks
    quick_thanks: {
        id: "quick_thanks",
        character: "Narrator",
        text: "You take the wallet with a quick 'thanks' and put your headphones back on. The woman looks like she wants to say more, but returns to her seat. The rest of the ride is quiet.",
        choices: [
            { text: "Get off at your stop", next: "ending_solitary" }
        ]
    },

    // Branch 1: Headphones -> See tap -> Warm thanks  
    warm_thanks: {
        id: "warm_thanks",
        character: "You",
        text: "'Thank you so much! I didn't even realize I dropped it.' She smiles. 'I'm Alex, by the way.' You learn she's a nurse coming off a double shift.",
        choices: [
            { text: "Offer to walk her home since it's late", next: "walk_home" },
            { text: "Have a nice chat but say goodbye at your stop", next: "friendly_chat" }
        ]
    },

    // Branch 2: Observe -> Eye contact -> Simple help
    simple_help: {
        id: "simple_help", 
        character: "Narrator",
        text: "You agree to help but keep to yourself. When Maple Street approaches, you tap her shoulder. 'This is your stop.' She thanks you and gets off. You notice she left a small bag behind.",
        choices: [
            { text: "Call after her - the bus doors are closing", next: "call_after" },
            { text: "It's just a bag, she'll manage", next: "ignore_bag" }
        ]
    },

    // Branch 2: Observe -> Eye contact -> Concerned help
    concerned_help: {
        id: "concerned_help",
        character: "Alex",
        text: "'It's been a rough day,' she admits. 'Double shift at the hospital, and now my ride bailed.' You talk for the rest of the ride. She's interesting and kind.",
        choices: [
            { text: "Offer her a ride home in your car (you drove to the bus station)", next: "offer_ride" },
            { text: "Exchange numbers to meet for coffee sometime", next: "exchange_numbers" }
        ]
    },

    // Ending paths
    ending_solitary: {
        id: "ending_solitary",
        character: "Narrator",
        text: "END OF JOURNEY",
        ending: "solitary"
    },

    walk_home: {
        id: "walk_home",
        character: "Narrator", 
        text: "END OF JOURNEY",
        ending: "connection"
    },

    friendly_chat: {
        id: "friendly_chat",
        character: "Narrator",
        text: "END OF JOURNEY", 
        ending: "friendly"
    },

    call_after: {
        id: "call_after",
        character: "Narrator",
        text: "END OF JOURNEY",
        ending: "helpful"
    },

    ignore_bag: {
        id: "ignore_bag", 
        character: "Narrator",
        text: "END OF JOURNEY",
        ending: "indifferent"
    },

    offer_ride: {
        id: "offer_ride",
        character: "Narrator",
        text: "END OF JOURNEY", 
        ending: "generous"
    },

    exchange_numbers: {
        id: "exchange_numbers",
        character: "Narrator",
        text: "END OF JOURNEY",
        ending: "new_friendship"
    }
};

// Multiple endings based on player choices
const endings = {
    solitary: {
        title: "The Quiet Ride Home",
        description: "You kept to yourself and had an uneventful journey home. While you avoided any complications, you also missed an opportunity for human connection. Sometimes the safest path is also the loneliest.",
        image: "solitary",
        stats: "You prioritized personal space and convenience"
    },

    connection: {
        title: "An Unexpected Connection", 
        description: "Your kindness led to walking Alex home, where you discovered you live in the same neighborhood. What started as a lost wallet turned into plans for coffee next week. Sometimes the best connections happen when we least expect them.",
        image: "connection",
        stats: "You chose compassion over convenience"
    },

    friendly: {
        title: "A Friendly Encounter",
        description: "You had a pleasant conversation and parted ways with warm wishes. While you didn't form a deep connection, you made someone's difficult day a little brighter. Small kindnesses matter.",
        image: "friendly", 
        stats: "You balanced friendliness with boundaries"
    },

    helpful: {
        title: "The Good Samaritan",
        description: "You went out of your way to help a stranger, ensuring she didn't lose her belongings. Your quick thinking made a real difference in someone's night. Being observant and helpful creates ripples of positivity.",
        image: "helpful",
        stats: "You acted quickly to help others"
    },

    indifferent: {
        title: "Mind Your Own Business", 
        description: "You chose not to get involved with other passengers' problems. The ride was peaceful but uneventful. While you avoided potential complications, you also passed up chances to make a difference.",
        image: "indifferent",
        stats: "You prioritized your own comfort"
    },

    generous: {
        title: "Above and Beyond",
        description: "Your generosity in offering a ride home turned a stressful situation into a meaningful connection. Alex was incredibly grateful, and you made a new friend who lives nearby. Going the extra mile can change everything.",
        image: "generous",
        stats: "You showed exceptional kindness"
    },

    new_friendship: {
        title: "A New Beginning",
        description: "You exchanged numbers and made plans to meet again. What could have been just another bus ride turned into the start of a new friendship. Being open to others can bring wonderful surprises.",
        image: "friendship",
        stats: "You were open to new connections"
    }
};