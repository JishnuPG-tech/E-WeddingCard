import React, { useEffect, useState } from 'react';
import Envelope from './components/Envelope';
import HeroCover from './components/HeroCover';
import InsideDetails from './components/InsideDetails';
import VenueSection from './components/VenueSection';
import RSVPForm from './components/RSVPForm';
import MusicWidget from './components/MusicWidget';
import AdminDashboard from './components/AdminDashboard';

function FloatingLeaf({ style, className }) {
  return (
    <div className={`fixed pointer-events-none z-0 ${className}`} style={style}>
      <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path
          d="M30 95 C30 95 3 60 3 35 C3 15 15 3 30 3 C45 3 57 15 57 35 C57 60 30 95 30 95Z"
          fill="#6B8E6B"
          fillOpacity="0.12"
        />
        <path d="M30 95 L30 3" stroke="#6B8E6B" strokeWidth="0.6" strokeOpacity="0.2"/>
      </svg>
    </div>
  );
}

export default function App() {
  // Simple manual routing for the admin dashboard
  if (window.location.pathname === '/admin') {
    return <AdminDashboard />;
  }

  const [loaderDone, setLoaderDone] = useState(false);

  // Parse ?guest=Name from URL
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('guest') || '';

  // Developer Easter Egg Signature
  useEffect(() => {
    console.log(
      "%c✨ Premium E-Wedding Card Engine ✨\n\n%cArchitected & Developed by: Jishnu P G\n\uD83D\uDCE7 Email: jishnupg2005@gmail.com\n\uD83D\uDCBB GitHub: https://github.com/JishnuPG-tech\n\n%cPowered by React, Tailwind v4, and Framer Motion.",
      "color: #B8913A; font-size: 16px; font-weight: bold; font-family: serif;",
      "color: #4A6A4A; font-size: 12px; font-family: monospace; line-height: 1.6;",
      "color: #7A7060; font-size: 10px; font-style: italic;"
    );
  }, []);

  // Loader/Envelope state removes the forced timeout, relying on Envelope button click
  // so we don't auto-dissolve the loader until they "open" it.
  
  return (
    <div className="relative w-full bg-[#F8F7F4]">
      {/* Envelope Landing Gate */}
      {!loaderDone && <Envelope onOpen={() => setLoaderDone(true)} />}

      {/* Background floating leaves (fixed, decorative) */}
      <FloatingLeaf
        className="float-leaf"
        style={{ top: '10%', left: '-20px', width: 80, height: 110, opacity: 0.6 }}
      />
      <FloatingLeaf
        className="float-leaf-delay"
        style={{ top: '15%', right: '-18px', width: 65, height: 90, opacity: 0.5, transform: 'scaleX(-1)' }}
      />
      <FloatingLeaf
        className="float-leaf"
        style={{ top: '55%', left: '-15px', width: 55, height: 80, opacity: 0.4, transform: 'rotate(20deg)' }}
      />
      <FloatingLeaf
        className="float-leaf-delay"
        style={{ top: '60%', right: '-15px', width: 55, height: 80, opacity: 0.4, transform: 'rotate(-20deg) scaleX(-1)' }}
      />

      {/* Scroll snap container with all sections */}
      <div className="scroll-container">
        <HeroCover guestName={guestName} />
        <InsideDetails guestName={guestName} />
        <VenueSection />
        <RSVPForm />
      </div>

      {/* Floating music widget */}
      {loaderDone && <MusicWidget />}
    </div>
  );
}
