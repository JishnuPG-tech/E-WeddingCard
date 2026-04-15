import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

export default function Envelope({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 2400); 
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F4F0] overflow-hidden"
      animate={{ 
         backgroundColor: isOpen ? 'rgba(245,244,240,0)' : '#F5F4F0',
         opacity: isOpen ? 0 : 1
      }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <motion.div 
        className="relative w-[320px] h-[220px]"
      >
        {/* Back of Envelope */}
        <motion.div 
          className="absolute inset-0 bg-[#E8E6E0] rounded-sm shadow-2xl"
          animate={{ y: isOpen ? 500 : 0, opacity: isOpen ? [1, 1, 1, 0] : 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeIn' }}
        ></motion.div>

        {/* The Invitation Card sliding up and scaling */}
        <motion.div 
          className="absolute inset-x-3 top-4 h-[200px] bg-white rounded-t-lg flex flex-col items-center justify-start pt-6 border border-black/5 z-10 shadow-sm"
          initial={{ y: 0, scale: 1 }}
          animate={{ 
            y: isOpen ? -180 : 0,
            scale: isOpen ? [1, 1, 1, 10] : 1, 
          }}
          transition={{ duration: 2.2, times: [0, 0.2, 0.6, 1], ease: "easeInOut" }}
        >
            <motion.div animate={{ opacity: isOpen ? 0 : 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
              <p className="font-inter text-[9px] tracking-[0.3em] uppercase text-[#6B8E6B] mb-2 font-medium text-center">{weddingData.strings.envelopeSmallTitle}</p>
              <p className="font-playfair italic text-[2.5rem] leading-[0.9] gold-shimmer text-center drop-shadow-sm">{weddingData.couple.groom} <br/><span className="text-[#6B8E6B] text-xl inline-block mt-1 mb-1 font-cormorant">{weddingData.couple.ampersand}</span><br/> {weddingData.couple.bride}</p>
            </motion.div>
        </motion.div>

        {/* Front Flaps Layer */}
        <motion.div 
          className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none z-20"
          animate={{ y: isOpen ? 500 : 0, opacity: isOpen ? [1, 1, 1, 0] : 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeIn' }}
        >
          {/* Left Flap */}
          <div 
            className="absolute bg-[#FDFDFB] border-r border-t border-black/5 shadow-[2px_2px_10px_rgba(0,0,0,0.02)]"
            style={{
              width: '240px', height: '240px',
              transform: 'rotate(45deg)',
              left: '-120px', top: '10px'
            }}
          />
          {/* Right Flap */}
          <div 
            className="absolute bg-[#FDFDFB] border-l border-t border-black/5 shadow-[-2px_2px_10px_rgba(0,0,0,0.02)]"
            style={{
              width: '240px', height: '240px',
              transform: 'rotate(45deg)',
              right: '-120px', top: '10px'
            }}
          />
          {/* Bottom Flap */}
          <div 
            className="absolute bg-[#FAF9F6] border-t border-black/5 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
            style={{
              width: '320px', height: '320px',
              transform: 'rotate(45deg)',
              left: '0px', top: '70px'
            }}
          />
        </motion.div>

        {/* Top Flap (Animated) */}
        <motion.div 
          className="absolute inset-x-0 top-0 h-[120px] origin-top z-30"
          initial={{ rotateX: 0, y: 0, opacity: 1 }}
          animate={{ 
            rotateX: isOpen ? -180 : 0,
            y: isOpen ? [0, 0, 500] : 0,
            opacity: isOpen ? [1, 1, 0] : 1
          }}
          transition={{ duration: 1.8, times: [0, 0.3, 1], ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* The Flap Triangle */}
          <div 
            className="absolute w-full h-[160px] bg-[#F5F4F0] border-b border-black/5 drop-shadow-sm origin-top flex items-end justify-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          >
          </div>

          {/* Wax Seal Button */}
          {!isOpen && (
            <button 
              onClick={handleOpen} 
              className="absolute z-10 bottom-[-24px] left-1/2 -ml-10 w-20 h-20 shadow-[0_4px_20px_rgba(107,142,107,0.2)] rounded-full flex items-center justify-center bg-white hover:scale-105 transition-transform cursor-pointer border border-[#6B8E6B]/30"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#6B8E6B]" fill="none">
                {/* 8-pointed star base */}
                <path d="M50 5 L60 30 L85 20 L75 45 L100 50 L75 55 L85 80 L60 70 L50 95 L40 70 L15 80 L25 55 L0 50 L25 45 L15 20 L40 30 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
                {/* Inner smaller star */}
                <path d="M50 15 L55 35 L75 40 L60 50 L75 60 L55 65 L50 85 L45 65 L25 60 L40 50 L25 40 L45 35 Z" fill="currentColor" fillOpacity="0.25" />
                {/* Center circle for initials */}
                <circle cx="50" cy="50" r="26" fill="#FAF9F6" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <span className="relative z-10 font-cormorant text-[18px] font-bold text-[#4A5D4E] tracking-wider opacity-90">{weddingData.couple.initials}</span>
            </button>
          )}
        </motion.div>
      </motion.div>
      
      {/* Instruction text */}
      {!isOpen && (
        <motion.p 
          className="absolute bottom-12 text-[#718096] font-inter text-[10px] tracking-[0.3em] uppercase pointer-events-none"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Tap the seal to open
        </motion.p>
      )}
    </motion.div>
  );
}
