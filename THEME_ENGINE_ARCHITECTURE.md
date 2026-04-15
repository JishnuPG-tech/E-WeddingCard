# Premium E-Wedding Card Engine - Architecture & Design System

This document serves as the supreme memory buffer and foundational knowledge base for this project. 
**Note to future AI Assistants:** Read this document BEFORE writing any code. It contains the exact technical stack, stylistic rules, and architectural map needed to instantly swap out this "Kerala Hindu" theme for the upcoming "Islamic Royal" or "Christian Elegant" themes.

---

## 1. Core Technical Architecture
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v4)
- **Animations:** `framer-motion` (Extensively used for cinematic scrolling and floating elements)
- **Icons:** `lucide-react` (Strictly used for a sleek, modern UI. Do NOT use emojis for important actions).
- **Backend/Database:** Supabase (`src/config/supabase.js`) handling the `rsvps` table.
- **Routing:** Manual routing in `App.jsx`. `react-router-dom` is DELIBERATELY omitted to keep the bundle size minimal. Vercel SPA routing is successfully handled via `vercel.json`.

## 2. The Multi-Theme Philosophy (Data Decoupling)
The entire application UI contains **zero hardcoded content**.
ALL names, dates, quotes, string translations, and event details must exclusively be served from:
`src/config/weddingData.js`

To create a new theme (like Islamic or Christian), you only need to swap out `weddingData.js` strings, the background colors in `App.jsx`, and font selections in `index.css`. The underlying Framer Motion engine remains untouched.

## 3. The "Glassmorphism & Luxury" Design Rules
When building new themes for this engine, adhere strictly to these UI constraints to maintain its "Expensive Agency" feel:
- **No Harsh Colors:** Never use primary `#FF0000` or `#00FF00`. All backgrounds must be beautifully muted (e.g. `#F8F7F4` off-white).
- **Premium Borders:** Use `border-[rgba(184,145,58,0.3)]` (soft gold opacity borders) to simulate glass.
- **Subtle Drop Shadows:** Avoid heavy `shadow-lg`; heavily utilize soft glowing box-shadows or Framer Motion pulsing (`boxShadow: ['0px 0px 0px ...', '...']`).
- **Typography:** 
    - *Body text:* `font-inter` (Keep tracking wide: `tracking-[0.2em]`, heavily uppercase for labels).
    - *Headers:* `font-cormorant` for a high-end serif luxury look. 

## 4. Admin Dashboard System
- **Path:** `/admin` (Manually routed in `App.jsx`).
- **Security:** Hardcoded PIN authentication (`Jishnu2005` in `src/components/AdminDashboard.jsx`).
- **Data Flow:** Uses `supabaseClient` to fetch, sort, and display attendees. Includes UI headcount cap constraints (Max 5 via `RSVPForm`).

## 5. Future Concept Templates

### A. The "Royal Palace" Theme (Maximalist Hindu Dark Mode)
A concept to act as the heavy, rich counterpart to the current minimal Kerala theme.
- **Color Palette:** Deep Maroon/Crimson (`#4A0E17`) fading to Indigo. Heavy Antique Gold Foil accents (`#D4AF37`) and text.
- **Entry Animation:** Replace the sliding paper envelope with two massive, intricately carved heavy Palace Doors (Jharokha Indian arches) that slide apart horizontally to reveal the dark invitation inside.
- **UI Elements:** Subtle flickering clay Diya lamps at the footer. Instead of modern confetti, a cascading Framer Motion waterfall of falling orange Marigold petals.
- **Typography:** Heavy ornate Sanksrit-display fonts for headers, paired with elegant scripts.

### B. Building Islamic or Christian Themes
When the user requests to build the **Islamic** or **Christian** themes, follow this exact workflow:
1. Create a git branch (e.g., `git checkout -b theme-islamic`).
2. Update the `weddingData.js` strings to feature Arabic/Biblical quotes.
3. Update `index.css` root variables (Change the gold `#B8913A` to Emerald `#044A3A` or Champagne `#F2EBE0`).
4. Replace the "Lotus" SVG in `HeroCover.jsx` with a Crescent/Star or Cross SVG.
5. Deploy.

---
*Created by Jishnu P G. Powered by React, Tailwind v4, and Framer Motion.*
