export const weddingData = {
  couple: {
    groom: "Anand",
    bride: "Meera",
    ampersand: "&",
    initials: "A&M"
  },
  
  dates: {
    // JavaScript parsable ISO format (used for countdown & ICS file)
    preciseDateIso: "2026-05-20T10:30:00+05:30",
    
    // UI strings for the calendar view
    calendar: {
      dayOfWeek: "Wednesday",
      dayNumber: "20",
      month: "May",
      year: "2026",
    },

    // UI strings for text sections
    headerDisplay: "May 20 · 2026",
    rsvpDeadlineSummary: "20th", // e.g. "See you on the 20th!"
    
    // For ICS Generator specifically
    icsFormat: {
      dateStart: "20260520T050000Z",
      dateEnd:   "20260520T160000Z"
    }
  },

  events: {
    ceremony: {
      titleEn: "Muhurtham Time",
      titleMl: "മുഹൂർത്തം",
      timeText: "10:30 AM to 11:15 AM"
    },
    reception: {
      titleEn: "Reception",
      titleMl: "സൽക്കാരം",
      timeText: "6:00 PM onwards"
    }
  },

  venue: {
    name: "Kalyana Mandapam",
    addressEn: [
      "12/45 Temple Road, Thrissur",
      "Kerala — 680 001"
    ],
    // Used in ICS and sharing
    singleLineAddress: "Kalyana Mandapam, Thrissur, Kerala",
    links: {
      googleMapsEmbed: "https://maps.google.com/maps?q=Thrissur,Kerala&output=embed&zoom=13",
      googleMapsDirect: "https://maps.google.com/?q=Kalyana+Mandapam+Thrissur+Kerala",
    }
  },

  hosts: [
    "Mr. & Mrs. Krishnan Nair",
    "Mr. & Mrs. Suresh Menon"
  ],

  strings: {
    inviteSecondaryEn: "Together with their families, we joyfully invite you to celebrate the marriage of",
    invitePrimaryMl: "വിവാഹ ക്ഷണം",
    envelopeSmallTitle: "വിവാഹ ക്ഷണം",
    whatsappShareText: "You're invited to the wedding of Anand & Meera! 📍 Kalyana Mandapam, Thrissur 📅 20th May 2026"
  }
};
