import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { createClient } from '@supabase/supabase-js';
import { weddingData } from '../config/weddingData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

async function submitRSVP({ name, attending, peopleCount }) {
  if (supabase) {
    const { error } = await supabase.from('rsvps').insert([
      {
        name,
        attending,
        people_count: attending ? peopleCount : 0,
      },
    ]);
    if (error) throw error;
  } else {
    await new Promise((res) => setTimeout(res, 800));
  }
}

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (attending === null) {
      setError('Please let us know if you are attending.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await submitRSVP({ name: name.trim(), attending, peopleCount });
      setSubmitted(true);
      if (attending) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 6000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const successTitle = attending
    ? "We can't wait to see you!"
    : "We'll miss you!";

  const successMessage = attending
    ? `Thank you, ${name}! Your attendance is confirmed. See you on the ${weddingData.dates.rsvpDeadlineSummary}! \u{1F389}`
    : `Thank you, ${name}. We understand and appreciate you letting us know. \u{1F49B}`;

  return (
    <section className="scroll-section flex items-center justify-center bg-[#F5F4F0] px-6 py-8 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            colors={['#6B8E6B', '#B8913A', '#D4AF68', '#F8F7F4', '#4A6A4A']}
            numberOfPieces={180}
            recycle={false}
            gravity={0.25}
          />
        </div>
      )}

      <div className="w-full max-w-sm mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">
            Kindly Reply
          </p>
          <h2 className="font-cormorant text-3xl font-semibold text-[#2C2C2C]">RSVP</h2>
          <p className="font-cormorant italic text-base text-[#7A7060] mt-1">
            We would love to know you will be there
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass-card floral-border rounded-[20px] px-6 py-7 relative"
        >
          <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[#B8913A] border-opacity-35 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t border-r border-[#B8913A] border-opacity-35 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b border-l border-[#B8913A] border-opacity-35 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[#B8913A] border-opacity-35 rounded-br-lg" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center py-6"
              >
                <div className="text-5xl mb-4">{attending ? '🌸' : '💌'}</div>
                <h3 className="font-cormorant font-semibold text-2xl text-[#2C2C2C] mb-2">
                  {successTitle}
                </h3>
                <p className="font-inter text-sm text-[#7A7060] leading-relaxed">
                  {attending
                    ? `Your attendance is confirmed. See you on the ${weddingData.dates.rsvpDeadlineSummary}!`
                    : 'We understand and appreciate you letting us know.'}
                </p>
                <p className="font-inter text-sm text-[#7A7060] mt-1">
                  — Thank you, <strong>{name}</strong>
                </p>
                <div className="mt-5 pt-4 border-t border-[rgba(107,142,107,0.15)]">
                  <p className="font-cormorant italic text-sm text-[#B8913A]">
                    With love, {weddingData.couple.groom} {weddingData.couple.ampersand} {weddingData.couple.bride}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#7A7060] block mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="wedding-input"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#7A7060] block mb-2">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    {[
                      { value: true, label: 'Joyfully Accept', icon: <Check size={28} strokeWidth={1.5} /> },
                      { value: false, label: 'Regretfully Decline', icon: <X size={28} strokeWidth={1.5} /> },
                    ].map((opt) => {
                      const isSelected = attending === opt.value;
                      const activeColor = opt.value ? '#6B8E6B' : '#C17A7A';
                      
                      return (
                        <button
                          key={String(opt.value)}
                          type="button"
                          onClick={() => setAttending(opt.value)}
                          className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl border transition-all duration-300 relative overflow-hidden"
                          style={{
                            background: isSelected ? activeColor : 'rgba(250, 248, 242, 0.5)',
                            borderColor: isSelected ? activeColor : 'rgba(107,142,107,0.2)',
                            color: isSelected ? 'white' : '#7A7060',
                            transform: isSelected ? 'scale(0.98)' : 'scale(1)',
                            boxShadow: isSelected ? `0 4px 15px ${activeColor}40` : 'none'
                          }}
                        >
                          {/* Circle Icon holder */}
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{ 
                              background: isSelected ? 'white' : 'transparent',
                              color: isSelected ? activeColor : '#7A7060',
                              border: isSelected ? 'none' : '1px solid rgba(107,142,107,0.2)'
                            }}
                          >
                            {opt.icon}
                          </div>
                          
                          <span className={`font-inter text-[11px] uppercase tracking-widest ${isSelected ? 'font-medium' : 'font-normal'}`}>
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence>
                  {attending === true && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#7A7060] block mb-2">
                        Number of Guests (including you)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPeopleCount((c) => Math.max(1, c - 1))}
                          className="w-10 h-10 rounded-full border border-[rgba(107,142,107,0.3)] bg-[#FAF8F2] text-[#6B8E6B] text-xl font-light flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="font-cormorant text-3xl text-[#2C2C2C] min-w-[2rem] text-center">
                          {peopleCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPeopleCount((c) => Math.min(10, c + 1))}
                          className="w-10 h-10 rounded-full border border-[rgba(107,142,107,0.3)] bg-[#FAF8F2] text-[#6B8E6B] text-xl font-light flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && (
                  <p className="font-inter text-sm text-red-500 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full mt-1"
                  style={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Submitting...' : 'Confirm RSVP'}
                </button>

                {!supabase && (
                  <p className="font-inter text-[10px] text-center text-[#7A7060] opacity-60 mt-1">
                    Demo mode — connect Supabase via .env to save responses
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={inView ? { opacity: 1 } : {}}
           transition={{ delay: 0.5, duration: 0.6 }}
           className="text-center mt-6 flex flex-col items-center gap-1"
        >
          <p className="font-cormorant italic text-sm text-[#7A7060] mb-2">
            Made with love for {weddingData.couple.groom} {weddingData.couple.ampersand} {weddingData.couple.bride}
          </p>
          <div className="group relative inline-block">
            <p className="font-inter text-[9px] uppercase tracking-[0.25em] text-[#8C7A5C] opacity-80 cursor-pointer">
              Crafted by <a href="mailto:jishnupg2005@gmail.com" className="font-semibold text-[#B8913A] hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>Jishnu P G</a>
            </p>
            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none z-[100] w-[180px]">
               <div className="bg-[#FAF8F2] border border-[rgba(184,145,58,0.3)] rounded-lg px-3 py-2 shadow-xl">
                 <p className="text-[#4A6A4A] text-[9.5px] font-semibold font-inter uppercase tracking-widest text-center">Full Stack Developer</p>
                 <p className="text-[#7A7060] text-[8.5px] font-inter text-center mt-1 lowercase tracking-widest">Click to Hire via Email</p>
               </div>
               {/* Tooltip arrow */}
               <div className="w-2.5 h-2.5 bg-[#FAF8F2] border-r border-b border-[rgba(184,145,58,0.3)] transform rotate-45 absolute -bottom-[5px] left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
          <p className="font-inter text-[6.5px] uppercase tracking-[0.25em] text-[#7A7060] opacity-40 mt-1">
            Powered by React & Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
