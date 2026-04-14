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
          <span className="font-cormorant text-2xl text-[#2C2C2C] leading-none mb-1">{String(value).padStart(2, '0')}</span>
          <span className="font-inter text-[8px] uppercase tracking-[0.2em] text-[#7A7060]">{label}</span>
        </div>
      ))}
    </div>
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
        <div className="glass-card floral-border rounded-[20px] px-6 py-8 relative">
          <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#B8913A] border-opacity-35 rounded-tl-[16px]" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#B8913A] border-opacity-35 rounded-tr-[16px]" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#B8913A] border-opacity-35 rounded-bl-[16px]" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#B8913A] border-opacity-35 rounded-br-[16px]" />

          {/* Calendar Block Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center border border-[rgba(107,142,107,0.2)] rounded-2xl p-5 mb-6 bg-[#FAF8F2]/60"
          >
            <div className="flex items-center justify-center gap-6 text-[#2C2C2C]">
              <div className="text-right border-r border-[rgba(107,142,107,0.3)] pr-5">
                <p className="font-inter text-[10px] uppercase tracking-widest text-[#7A7060]">{weddingData.dates.calendar.dayOfWeek}</p>
              </div>
              <div className="text-center -mt-2">
                <span className="font-cormorant font-light text-6xl leading-none text-[#4A6A4A]">{weddingData.dates.calendar.dayNumber}</span>
              </div>
              <div className="text-left border-l border-[rgba(107,142,107,0.3)] pl-5">
                <p className="font-cormorant font-semibold text-lg leading-tight">{weddingData.dates.calendar.month}</p>
                <p className="font-inter text-[10px] tracking-widest text-[#7A7060]">{weddingData.dates.calendar.year}</p>
              </div>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-[rgba(107,142,107,0.15)]">
              <MinimalCountdown />
            </div>
          </motion.div>

          <MuralDivider delay={0.15} />
          <DetailRow label={
            <div className="flex flex-col items-center">
              <span>{weddingData.events.ceremony.titleEn}</span>
              <span className="font-malayalam text-[13px] text-[#8BA88B] tracking-normal mt-0.5 capitalize">{weddingData.events.ceremony.titleMl}</span>
            </div>
          } value={weddingData.events.ceremony.timeText} delay={0.2} />
          <MuralDivider delay={0.25} />
          <DetailRow label={
            <div className="flex flex-col items-center">
              <span>{weddingData.events.reception.titleEn}</span>
              <span className="font-malayalam text-[13px] text-[#8BA88B] tracking-normal mt-0.5 capitalize">{weddingData.events.reception.titleMl}</span>
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
             <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[#B8913A] mb-1">Venue</p>
             <p className="font-cormorant text-2xl font-medium text-[#2C2C2C] leading-tight mb-2">{weddingData.venue.name}</p>
             <p className="font-inter text-[12px] text-[#7A7060] leading-relaxed">
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
            <p className="font-inter text-[9px] uppercase tracking-[0.3em] text-[#7A7060] mb-2">Hosted by</p>
            <p className="font-cormorant italic text-[15px] text-[#4A6A4A] leading-relaxed">
              {weddingData.hosts[0]}
              <br />
              {weddingData.hosts.length > 1 && (
                <>
                  <span className="text-[#B8913A] my-1 inline-block opacity-60">✦</span>
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
