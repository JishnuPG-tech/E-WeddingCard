import React, { useEffect, useState } from 'react';
import Envelope from './components/Envelope';
import HeroCover from './components/HeroCover';
import InsideDetails from './components/InsideDetails';
import VenueSection from './components/VenueSection';
import RSVPForm from './components/RSVPForm';
import MusicWidget from './components/MusicWidget';
import AdminDashboard from './components/AdminDashboard';

function FloatingGeometric({ style, className }) {
  return (
    <div className={`fixed pointer-events-none z-0 ${className}`} style={style}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path
          d="M50 5 L60 30 L85 20 L75 45 L100 50 L75 55 L85 80 L60 70 L50 95 L40 70 L15 80 L25 55 L0 50 L25 45 L15 20 L40 30 Z"
          stroke="#6B8E6B" strokeWidth="1" strokeOpacity="0.4" fill="rgba(107, 142, 107, 0.05)"
        />
        <path
          d="M50 15 L55 35 L75 40 L60 50 L75 60 L55 65 L50 85 L45 65 L25 60 L40 50 L25 40 L45 35 Z"
          stroke="#6B8E6B" strokeWidth="0.5" strokeOpacity="0.3" fill="transparent"
        />
      </svg>
    </div>
  );
}

function FloatingCrescent({ style, className }) {
  return (
    <div className={`fixed pointer-events-none z-0 ${className}`} style={style}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <path d="M50 10 A40 40 0 1 1 10 50 A30 30 0 1 0 50 10 Z" fill="rgba(212, 175, 55, 0.15)" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" />
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
    <div className="relative w-full bg-[#F5F4F0]">
      {/* Envelope Landing Gate */}
      {!loaderDone && <Envelope onOpen={() => setLoaderDone(true)} />}

      {/* Background scattered mini animations */}
      {[
        { type: 'star', top: '5%', left: '10%', size: 25, delay: '0s', duration: '12s', rotate: 0 },
        { type: 'crescent', top: '12%', right: '15%', size: 30, delay: '1s', duration: '14s', rotate: -15 },
        { type: 'star', top: '25%', left: '20%', size: 18, delay: '2s', duration: '10s', rotate: 45 },
        { type: 'star', top: '18%', right: '35%', size: 22, delay: '0.5s', duration: '11s', rotate: 20 },
        { type: 'crescent', top: '40%', left: '8%', size: 35, delay: '3s', duration: '15s', rotate: 160 },
        { type: 'star', top: '45%', right: '12%', size: 20, delay: '1.5s', duration: '13s', rotate: -25 },
        { type: 'star', top: '55%', left: '25%', size: 15, delay: '4s', duration: '9s', rotate: 10 },
        { type: 'crescent', top: '65%', right: '22%', size: 28, delay: '2.5s', duration: '16s', rotate: 45 },
        { type: 'star', top: '75%', left: '15%', size: 24, delay: '1s', duration: '11s', rotate: -30 },
        { type: 'star', top: '85%', right: '10%', size: 16, delay: '3.5s', duration: '10s', rotate: 15 },
        { type: 'crescent', top: '88%', left: '35%', size: 22, delay: '2s', duration: '13s', rotate: -120 },
        { type: 'star', top: '95%', right: '40%', size: 20, delay: '0s', duration: '14s', rotate: 90 },
      ].map((el, i) => {
        const style = {
          top: el.top,
          left: el.left,
          right: el.right,
          bottom: el.bottom,
          width: el.size,
          height: el.size,
          transform: `rotate(${el.rotate}deg)`,
          animationDuration: el.duration,
          animationDelay: el.delay,
          opacity: 0.5,
        };
        const className = i % 2 === 0 ? "float-slow pulse-glow" : "drift-slow";
        
        if (el.type === 'crescent') {
          return <FloatingCrescent key={i} className={className} style={style} />;
        }
        return <FloatingGeometric key={i} className={className} style={style} />;
      })}

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
