import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

// Small lotus accent
const LotusMini = () => (
  <svg viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-7 mx-auto">
    <path d="M30 35 C25 25 10 20 5 10 C15 12 25 18 30 25 C35 18 45 12 55 10 C50 20 35 25 30 35Z" fill="#B8913A" fillOpacity="0.6"/>
    <path d="M30 35 C28 22 18 15 15 5 C22 10 28 20 30 30 C32 20 38 10 45 5 C42 15 32 22 30 35Z" fill="#B8913A" fillOpacity="0.4"/>
    <path d="M30 35 V5" stroke="#B8913A" strokeWidth="0.8" strokeOpacity="0.5"/>
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
    <section className="scroll-section relative flex items-center justify-center overflow-hidden bg-[#F8F7F4]">
      {/* Background decorative leaves */}
      <div className="float-leaf absolute -top-4 -left-6 opacity-40 pointer-events-none" style={{ width: 100 }}>
        <LeafSvg />
      </div>
      <div className="float-leaf-delay absolute -top-2 -right-8 opacity-30 pointer-events-none scale-x-[-1]" style={{ width: 80 }}>
        <LeafSvg />
      </div>
      <div className="float-leaf absolute -bottom-8 -left-4 opacity-25 pointer-events-none rotate-180" style={{ width: 90 }}>
        <LeafSvg />
      </div>
      <div className="float-leaf-delay absolute -bottom-6 -right-6 opacity-25 pointer-events-none rotate-180 scale-x-[-1]" style={{ width: 70 }}>
        <LeafSvg />
      </div>

      {/* Main card */}
      <div className="w-full max-w-sm mx-auto px-6 py-12 text-center z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card floral-border rounded-[20px] px-8 py-10 relative"
        >
          {/* Corner flourishes */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t border-l border-[#B8913A] border-opacity-40 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t border-r border-[#B8913A] border-opacity-40 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b border-l border-[#B8913A] border-opacity-40 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b border-r border-[#B8913A] border-opacity-40 rounded-br-lg" />

          {/* Small invitation label */}
          <motion.p
            variants={itemVariants}
            className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#7A7060] mb-4"
          >
            Wedding Invitation
          </motion.p>

          {/* Lotus accent */}
          <motion.div variants={itemVariants} className="mb-4">
            <LotusMini />
          </motion.div>

          {/* Guest personalization */}
          {guestName && (
            <motion.p
              variants={itemVariants}
              className="font-inter text-sm text-[#7A7060] mb-3"
            >
              Dear <span className="font-medium text-[#4A6A4A]">{guestName}</span>,
            </motion.p>
          )}

          {/* Invite line */}
          <motion.p variants={itemVariants} className="font-cormorant text-[15px] italic text-[#7A7060] mb-5 leading-relaxed">
            Together with their families, we joyfully invite you to celebrate the marriage of
          </motion.p>

          {/* Couple names */}
          <motion.h1 variants={itemVariants} className="font-cormorant font-bold text-5xl leading-tight mb-2 gold-shimmer">
            Anand
          </motion.h1>
          <motion.p variants={itemVariants} className="font-cormorant italic text-lg text-[#B8913A] mb-2">&amp;</motion.p>
          <motion.h1 variants={itemVariants} className="font-cormorant font-bold text-5xl leading-tight mb-6 gold-shimmer">
            Meera
          </motion.h1>

          {/* Date teaser */}
          <motion.div variants={itemVariants}>
            <div className="ornamental-divider text-[#B8913A] text-xs mb-4">
              <span>✦</span>
            </div>
            <p className="font-inter text-[12px] uppercase tracking-[0.25em] text-[#7A7060]">
              May 22 · 2025
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
          <p className="font-inter text-[11px] uppercase tracking-[0.25em] text-[#7A7060]">Swipe up to open</p>
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
