import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';

// Floating decorative leaf SVG
const LeafSvg = ({ className }) => (
  <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M40 110 C40 110 5 70 5 40 C5 18 20 5 40 5 C60 5 75 18 75 40 C75 70 40 110 40 110Z"
      fill="#6B8E6B"
      fillOpacity="0.18"
    />
    <path d="M40 110 L40 5" stroke="#6B8E6B" strokeWidth="0.8" strokeOpacity="0.3"/>
  </svg>
);

// Elegant Islamic Lantern accent
const LanternMini = () => (
  <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-12 mx-auto">
    <path d="M30 0 L30 15" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.8"/>
    <path d="M25 15 L35 15 L38 25 L22 25 Z" fill="#D4AF37" fillOpacity="0.8"/>
    <path d="M22 25 L38 25 L40 55 L20 55 Z" fill="transparent" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.6"/>
    <path d="M25 25 L35 25 L32 55 L28 55 Z" fill="#D4AF37" fillOpacity="0.1"/>
    <path d="M15 55 L45 55 L35 65 L25 65 Z" fill="#D4AF37" fillOpacity="0.8"/>
    <path d="M28 65 L28 75 M32 65 L32 75 M30 65 L30 78" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.5"/>
    {/* Inner glow / candle */}
    <circle cx="30" cy="45" r="3" fill="#FFE8A1" fillOpacity="0.9">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function HeroCover({ guestName }) {
  return (
    <section className="scroll-section relative flex items-center justify-center overflow-hidden bg-transparent">

      {/* Main card */}
      <div className="w-full max-w-sm mx-auto px-6 py-8 text-center z-10 relative mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-panel relative z-10 pt-[50px] pb-10 px-6 flex flex-col items-center mt-6"
        >
          {/* Inner glass border to make it look incredibly premium */}
          <div className="absolute inset-[8px] rounded-[22px] border border-white/40 opacity-50 pointer-events-none" />

          {/* Small invitation label / Guest personalization badge */}
          {guestName ? (
            <motion.div variants={itemVariants} className="flex justify-center mb-5">
              <motion.div 
                animate={{ boxShadow: ['0px 0px 0px rgba(212,175,55,0)', '0px 4px 20px rgba(212,175,55,0.4)', '0px 0px 0px rgba(212,175,55,0)'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block relative rounded-full px-7 py-3 bg-white/70 backdrop-blur-md border border-white/50 overflow-hidden shadow-sm"
              >
                {/* Premium Glass Light Sweep */}
                <motion.div 
                   animate={{ x: ['-200%', '250%'] }}
                   transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                   className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 z-0"
                />
                
                <p className="relative z-10 font-inter text-[9px] uppercase tracking-[0.25em] text-[#4A5D4E] leading-relaxed">
                  Exclusive Invitation For
                  <span className="font-semibold text-[#6B8E6B] tracking-[0.2em] text-[11px] mt-0.5 block drop-shadow-sm">{guestName}</span>
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="flex justify-center mb-5">
              <div className="inline-block border border-[rgba(212,175,55,0.3)] shadow-sm rounded-full px-5 py-1.5 bg-[rgba(212,175,55,0.05)] backdrop-blur-sm">
                <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#D5C0A0]">
                  Wedding Invitation
                </p>
              </div>
            </motion.div>
          )}

          {/* Invite line with Arabic Bismillah Calligraphy */}
          <motion.div variants={itemVariants} className="mb-6 mt-2">
            <h2 className="font-amiri text-3xl font-normal text-[#1F2937] mb-4 drop-shadow-sm tracking-wider">
              {weddingData.strings.bismillahArabic}
            </h2>
            <p className="font-cormorant text-[14px] italic text-[#4A5D4E] leading-relaxed max-w-[240px] mx-auto opacity-90">
              {weddingData.strings.inviteSecondaryEn}
            </p>
          </motion.div>

          {/* Couple names */}
          <motion.h1 variants={itemVariants} className="font-playfair italic text-[3.5rem] leading-[0.8] tracking-[-0.02em] mb-2 gold-shimmer drop-shadow-md">
            {weddingData.couple.groom}
          </motion.h1>
          <motion.p variants={itemVariants} className="font-cormorant text-2xl text-[#6B8E6B] mb-2">{weddingData.couple.ampersand}</motion.p>
          <motion.h1 variants={itemVariants} className="font-playfair italic text-[3.5rem] leading-[0.8] tracking-[-0.02em] mb-8 gold-shimmer drop-shadow-md">
            {weddingData.couple.bride}
          </motion.h1>

          {/* Lantern accent moved to bottom center */}
          <motion.div variants={itemVariants} className="mb-4">
            <LanternMini />
          </motion.div>

          {/* Date teaser */}
          <motion.div variants={itemVariants}>
            <div className="ornamental-divider text-[#D4AF37] text-xs mb-4">
              <span>✦</span>
            </div>
            <p className="font-inter text-[12px] uppercase tracking-[0.25em] text-[#D5C0A0]">
              {weddingData.dates.headerDisplay}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#4A5D4E] opacity-80">Swipe up to open</p>
          <div className="scroll-indicator text-[#6B8E6B]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
