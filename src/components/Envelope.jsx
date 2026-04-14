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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C2C2C] overflow-hidden"
      animate={{ 
         backgroundColor: isOpen ? 'rgba(44,44,44,0)' : '#2C2C2C',
         opacity: isOpen ? 0 : 1
      }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <motion.div 
        className="relative w-[320px] h-[220px]"
      >
        {/* Back of Envelope */}
        <motion.div 
          className="absolute inset-0 bg-[#E8E4D9] rounded-sm shadow-2xl"
          animate={{ y: isOpen ? 500 : 0, opacity: isOpen ? [1, 1, 1, 0] : 1 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeIn' }}
        ></motion.div>

        {/* The Invitation Card sliding up and scaling */}
        <motion.div 
          className="absolute inset-x-3 top-4 h-[200px] bg-[#F8F7F4] rounded-t-lg flex flex-col items-center justify-start pt-6 border border-[#B8913A]/20 z-10"
          initial={{ y: 0, scale: 1 }}
          animate={{ 
            y: isOpen ? -180 : 0,
            scale: isOpen ? [1, 1, 1, 10] : 1, 
          }}
          transition={{ duration: 2.2, times: [0, 0.2, 0.6, 1], ease: "easeInOut" }}
        >
            <motion.div animate={{ opacity: isOpen ? 0 : 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
              <p className="font-malayalam text-xs text-[#B8913A] mb-2 font-medium text-center">{weddingData.strings.envelopeSmallTitle}</p>
              <p className="font-cormorant italic text-3xl text-[#2C2C2C] text-center">{weddingData.couple.groom} <span className="text-[#B8913A] text-xl">{weddingData.couple.ampersand}</span> {weddingData.couple.bride}</p>
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
            className="absolute bg-[#F0EDE6] border-r border-t border-[rgba(0,0,0,0.03)]"
            style={{
              width: '240px', height: '240px',
              transform: 'rotate(45deg)',
              left: '-120px', top: '10px'
            }}
          />
          {/* Right Flap */}
          <div 
            className="absolute bg-[#F0EDE6] border-l border-t border-[rgba(0,0,0,0.03)]"
            style={{
              width: '240px', height: '240px',
              transform: 'rotate(45deg)',
              right: '-120px', top: '10px'
            }}
          />
          {/* Bottom Flap */}
          <div 
            className="absolute bg-[#F4F1EA] shadow-[0_-4px_10px_rgba(0,0,0,0.03)]"
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
            className="absolute w-full h-[160px] bg-[#EAE6DB] drop-shadow-md origin-top flex items-end justify-center"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          >
          </div>

          {/* Wax Seal Button */}
          {!isOpen && (
            <button 
              onClick={handleOpen} 
              className="absolute z-10 bottom-[-20px] left-1/2 -ml-8 w-16 h-16 rounded-full bg-gradient-to-br from-[#B8913A] to-[#8BA88B] shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center text-white font-cormorant italic text-2xl border-2 border-[#D4AF68]/40 hover:scale-105 transition-transform"
            >
              <span className="opacity-90">{weddingData.couple.initials}</span>
            </button>
          )}
        </motion.div>
      </motion.div>
      
      {/* Instruction text */}
      {!isOpen && (
        <motion.p 
          className="absolute bottom-12 text-[#FAF8F2]/60 font-inter text-[10px] tracking-[0.3em] uppercase pointer-events-none"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Tap the seal to open
        </motion.p>
      )}
    </motion.div>
  );
}
