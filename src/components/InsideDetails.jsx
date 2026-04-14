import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const DetailRow = ({ label, value, icon, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className="text-center py-4"
    >
      <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#B8913A] mb-1">{label}</p>
      <p className="font-cormorant text-2xl font-medium text-[#2C2C2C] leading-tight">{value}</p>
    </motion.div>
  );
};

const MuralDivider = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={inView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className="flex items-center gap-3 my-1"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(107,142,107,0.3)] to-transparent" />
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
        <circle cx="12" cy="8" r="3" fill="#B8913A" fillOpacity="0.5"/>
        <circle cx="4" cy="8" r="1.5" fill="#6B8E6B" fillOpacity="0.4"/>
        <circle cx="20" cy="8" r="1.5" fill="#6B8E6B" fillOpacity="0.4"/>
      </svg>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(107,142,107,0.3)] to-transparent" />
    </motion.div>
  );
};

export default function InsideDetails({ guestName }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="scroll-section flex items-center justify-center bg-[#F8F7F4] px-6 py-8 overflow-hidden">
      <div className="w-full max-w-sm mx-auto">
        {/* Section heading */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 18 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-6"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">The Details</p>
          <h2 className="font-cormorant text-3xl font-semibold text-[#2C2C2C]">Ceremony &amp; Reception</h2>
        </motion.div>

        {/* Card */}
        <div className="glass-card floral-border rounded-[20px] px-6 py-6 relative">
          {/* Corner flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#B8913A] border-opacity-35 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#B8913A] border-opacity-35 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#B8913A] border-opacity-35 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#B8913A] border-opacity-35 rounded-br-lg" />

          {guestName && (
            <DetailRow label="Invited Guest" value={`Dear ${guestName}`} delay={0} />
          )}

          <MuralDivider delay={0.05} />

          <DetailRow label="Date" value="Thursday, 22nd May 2025" delay={0.1} />

          <MuralDivider delay={0.15} />

          <DetailRow label="Muhurtham Time" value="10:30 AM to 11:15 AM" delay={0.2} />

          <MuralDivider delay={0.25} />

          <DetailRow label="Reception" value="6:00 PM onwards" delay={0.3} />

          <MuralDivider delay={0.35} />

          <DetailRow label="Venue" value="Kalyana Mandapam" delay={0.4} />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="font-inter text-sm text-center text-[#7A7060] mt-1"
          >
            12/45 Temple Road, Thrissur
            <br />
            Kerala — 680 001
          </motion.p>

          <MuralDivider delay={0.5} />

          {/* Hosted by */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-center pt-2"
          >
            <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#7A7060] mb-2">Hosted by</p>
            <p className="font-cormorant italic text-base text-[#4A6A4A] leading-relaxed">
              Mr. &amp; Mrs. Krishnan Nair
              <br />
              <span className="text-[#7A7060]">&amp;</span>
              <br />
              Mr. &amp; Mrs. Suresh Menon
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
