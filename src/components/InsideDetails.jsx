import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { weddingData } from '../config/weddingData';

const WEDDING_DATE = new Date(weddingData.dates.preciseDateIso);

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const DetailRow = ({ label, value, delay = 0 }) => {
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
      <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#6B8E6B] mb-1">{label}</p>
      <p className="font-cormorant text-2xl font-medium text-[#1F2937] leading-tight">{value}</p>
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
      className="flex items-center justify-center my-3 relative"
    >
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="relative z-10 px-3 flex flex-row gap-1 opacity-60">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#6B8E6B]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#6B8E6B]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#6B8E6B]" />
      </div>
    </motion.div>
  );
};

const MinimalCountdown = () => {
  const [time, setTime] = useState(getTimeLeft());
  const isPast = WEDDING_DATE <= new Date();

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (isPast) return null;

  return (
    <div className="flex justify-center gap-4 mt-6 mb-2">
      {Object.entries(time).map(([label, value]) => (
        <div key={label} className="text-center flex flex-col items-center">
          <span className="font-cormorant text-2xl text-[#1F2937] leading-none mb-1">{String(value).padStart(2, '0')}</span>
          <span className="font-inter text-[8px] uppercase tracking-[0.2em] text-[#718096]">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function InsideDetails({ guestName }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="scroll-section flex items-center justify-center bg-transparent px-6 py-8 overflow-hidden">
      <div className="w-full max-w-sm mx-auto z-10 relative" ref={titleRef}>
        {/* Card */}
        <div className="glass-card relative z-10 pt-[40px] pb-10 px-6 rounded-3xl mt-4">

          {/* Section heading moved inside Arch */}
          <div className="text-center mb-8 relative z-10">
            <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">The Details</p>
            <h2 className="font-cormorant text-3xl font-semibold text-[#1F2937]">Ceremony &amp; Reception</h2>
          </div>

          {/* Calendar Block Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center border border-black/5 rounded-2xl p-5 mb-6 bg-white/40 shadow-sm"
          >
            <div className="flex items-center justify-center gap-6 text-[#1F2937]">
              <div className="text-right border-r border-black/10 pr-5">
                <p className="font-inter text-[10px] uppercase tracking-widest text-[#718096]">{weddingData.dates.calendar.dayOfWeek}</p>
              </div>
              <div className="text-center -mt-2">
                <span className="font-cormorant font-light text-6xl leading-none text-[#4A5D4E]">{weddingData.dates.calendar.dayNumber}</span>
              </div>
              <div className="text-left border-l border-black/10 pl-5">
                <p className="font-cormorant font-bold text-lg leading-tight">{weddingData.dates.calendar.month}</p>
                <p className="font-inter text-[10px] tracking-widest text-[#718096]">{weddingData.dates.calendar.year}</p>
              </div>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-black/5">
              <MinimalCountdown />
            </div>
          </motion.div>

          <MuralDivider delay={0.15} />
          <DetailRow label={
            <div className="flex flex-col items-center">
              <span>{weddingData.events.ceremony.titleEn}</span>
              <span className="font-malayalam text-[13px] text-[#6B8E6B] tracking-normal mt-0.5 capitalize">{weddingData.events.ceremony.titleMl}</span>
            </div>
          } value={weddingData.events.ceremony.timeText} delay={0.2} />
          <MuralDivider delay={0.25} />
          <DetailRow label={
            <div className="flex flex-col items-center">
              <span>{weddingData.events.reception.titleEn}</span>
              <span className="font-malayalam text-[13px] text-[#6B8E6B] tracking-normal mt-0.5 capitalize">{weddingData.events.reception.titleMl}</span>
            </div>
          } value={weddingData.events.reception.timeText} delay={0.3} />
          <MuralDivider delay={0.35} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center py-4"
          >
             <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#6B8E6B] mb-1">Venue</p>
             <p className="font-cormorant text-2xl font-medium text-[#1F2937] leading-tight mb-2">{weddingData.venue.name}</p>
             <p className="font-inter text-[12px] text-[#718096] leading-relaxed">
              {weddingData.venue.addressEn[0]}<br />{weddingData.venue.addressEn[1]}
            </p>
          </motion.div>

          <MuralDivider delay={0.5} />

          {/* Hosted by */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-center pt-3"
          >
            <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#718096] mb-2">Hosted by</p>
            <p className="font-cormorant italic text-[15px] text-[#4A5D4E] leading-relaxed font-semibold">
              {weddingData.hosts[0]}
              <br />
              {weddingData.hosts.length > 1 && (
                <>
                  <span className="text-[#6B8E6B] my-1 inline-block opacity-40 text-[10px]">✦</span>
                  <br />
                  {weddingData.hosts[1]}
                </>
              )}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
