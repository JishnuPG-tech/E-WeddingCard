import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const WEDDING_DATE = new Date('2025-05-22T10:30:00+05:30');

function pad(n) {
  return String(n).padStart(2, '0');
}

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

const CountUnit = ({ value, label }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
      setAnimKey(k => k + 1);
    }
  }, [value]);

  return (
    <div className="countdown-box flex flex-col items-center justify-center py-4 px-3 min-w-[70px]">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={animKey}
          initial={{ opacity: 0, y: -10, scale: 1.15 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="font-cormorant font-bold text-4xl leading-none text-[#2C2C2C]"
        >
          {pad(value)}
        </motion.span>
      </AnimatePresence>
      <span className="font-inter text-[9px] uppercase tracking-[0.2em] text-[#7A7060] mt-2">{label}</span>
    </div>
  );
};

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isPast = WEDDING_DATE <= new Date();

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="scroll-section flex items-center justify-center bg-[#F5F4F0] px-6 py-8">
      <div className="w-full max-w-sm mx-auto text-center">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">
            {isPast ? 'We are married!' : 'Counting down to'}
          </p>
          <h2 className="font-cormorant text-3xl font-semibold text-[#2C2C2C]">
            {isPast ? 'Thank you for celebrating!' : 'The Big Day'}
          </h2>
          <p className="font-cormorant italic text-base text-[#7A7060] mt-1">
            22nd May, 2025 · Thrissur, Kerala
          </p>
        </motion.div>

        {/* Timer grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-card floral-border rounded-[20px] p-6"
        >
          {isPast ? (
            <p className="font-cormorant text-2xl italic text-[#6B8E6B] py-4">
              ✦ Anand &amp; Meera ✦
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              <CountUnit value={time.days} label="Days" />
              <CountUnit value={time.hours} label="Hours" />
              <CountUnit value={time.minutes} label="Mins" />
              <CountUnit value={time.seconds} label="Secs" />
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-[rgba(107,142,107,0.15)]">
            <p className="font-cormorant italic text-sm text-[#7A7060]">
              "Two hearts, one journey — an eternity together."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
