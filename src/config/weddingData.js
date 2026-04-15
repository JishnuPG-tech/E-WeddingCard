export const weddingData = {
  couple: {
    groom: "Fahad",
    bride: "Ayesha",
    ampersand: "&",
    initials: "F&A"
  },
  
  dates: {
    // JavaScript parsable ISO format (used for countdown & ICS file)
    preciseDateIso: "2026-11-15T10:30:00+05:30",
    
    // UI strings for the calendar view
    calendar: {
      dayOfWeek: "Sunday",
      dayNumber: "15",
      month: "Nov",
      year: "2026",
    },

    // UI strings for text sections
    headerDisplay: "Nov 15 · 2026",
    rsvpDeadlineSummary: "15th", // e.g. "See you on the 15th!"
    
    // For ICS Generator specifically
    icsFormat: {
      dateStart: "20261115T050000Z",
      dateEnd:   "20261115T160000Z"
    }
  },

  events: {
    ceremony: {
      titleEn: "Nikah Ceremony",
      titleMl: "നിക്കாஹ்",
      timeText: "10:30 AM to 11:30 AM"
    },
    reception: {
      titleEn: "Walima Reception",
      titleMl: "വലീമ സൽക്കാരം",
      timeText: "6:00 PM onwards"
    }
  },

  venue: {
    name: "Al-Hambra Convention Center",
    addressEn: [
      "124 Gateway Avenue, Kochi",
      "Kerala — 682 011"
    ],
    // Used in ICS and sharing
    singleLineAddress: "Al-Hambra Convention Center, Kochi, Kerala",
    links: {
      googleMapsEmbed: "https://maps.google.com/maps?q=Kochi,Kerala&output=embed&zoom=13",
      googleMapsDirect: "https://maps.google.com/?q=Kochi+Kerala",
    }
  },

  hosts: [
    "Mr. & Mrs. Abdul Rahman",
    "Mr. & Mrs. Salim Khan"
  ],

  strings: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    inviteSecondaryEn: "In the name of Allah, the Most Gracious, the Most Merciful. We joyfully invite you to celebrate the marriage of",
    invitePrimaryMl: "വിവാഹ ക്ഷണം",
    envelopeSmallTitle: "BISMILLAH",
    whatsappShareText: "You are affectionately invited to the Nikah of Fahad & Ayesha! 📍 Al-Hambra Convention Center, Kochi 📅 15th Nov 2026"
  }
};
