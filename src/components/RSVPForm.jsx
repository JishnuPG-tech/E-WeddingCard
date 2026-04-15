import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { supabase } from '../config/supabase';
import { weddingData } from '../config/weddingData';

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
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }

    // Name length validation
    if (trimmedName.length < 3) {
      setError('Your name is too short. Please enter your full name.');
      return;
    }

    // Name character validation (letters, spaces, and basic punctuation only)
    if (!/^[a-zA-Z\s.,'-]+$/.test(trimmedName)) {
      setError('Your name contains invalid characters. Please use only letters.');
      return;
    }

    if (attending === null) {
      setError('Please select whether you will attend.');
      return;
    }

    if (attending === true && (peopleCount < 1 || peopleCount > 5)) {
      setError('You can only RSVP for a maximum of 5 guests online. Please contact us for larger parties.');
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
    <section className="scroll-section flex items-center justify-center bg-transparent px-6 py-8 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            colors={['#D4AF37', '#F2EBE0', '#0F2E23', '#226D4D', '#E5D5BA']}
            numberOfPieces={180}
            recycle={false}
            gravity={0.25}
          />
        </div>
      )}

      <div className="w-full max-w-sm mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass-card pt-[40px] pb-10 px-6 relative z-10 rounded-3xl mt-4"
        >

          {/* Heading moved inside Arch */}
          <div className="text-center mb-8 relative z-10">
            <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">
              Kindly Reply
            </p>
            <h2 className="font-cormorant text-3xl font-semibold text-[#1F2937]">RSVP</h2>
            <p className="font-cormorant italic text-base text-[#718096] mt-1">
              We would love to know you will be there
            </p>
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center py-6"
              >
                <div className="text-5xl mb-4">{attending ? '✨' : '💌'}</div>
                <h3 className="font-cormorant font-semibold text-2xl text-[#1F2937] mb-2">
                  {successTitle}
                </h3>
                <p className="font-inter text-sm text-[#718096] leading-relaxed">
                  {attending
                    ? `Your attendance is confirmed. See you on the ${weddingData.dates.rsvpDeadlineSummary}!`
                    : 'We understand and appreciate you letting us know.'}
                </p>
                <p className="font-inter text-sm text-[#718096] mt-1">
                  — Thank you, <strong className="text-[#4A5D4E]">{name}</strong>
                </p>
                <div className="mt-5 pt-4 border-t border-black/5">
                  <p className="font-cormorant italic text-sm text-[#6B8E6B]">
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
                  <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#718096] block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error.includes('name')) setError('');
                    }}
                    className={`wedding-input transition-colors duration-300 ${error && error.includes('name') ? 'border-[#C17A7A] focus:border-[#C17A7A] bg-[#fcf0f0]' : ''}`}
                    maxLength={50}
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#718096] block mb-2 font-medium">
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
                          className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-white/50"
                          style={{
                            background: isSelected ? activeColor : 'rgba(255, 255, 255, 0.6)',
                            borderColor: isSelected ? activeColor : 'rgba(0,0,0,0.06)',
                            color: isSelected ? '#FFFFFF' : '#4A5D4E',
                            transform: isSelected ? 'scale(0.98)' : 'scale(1)',
                            boxShadow: isSelected ? `0 4px 15px ${activeColor}40` : '0 2px 8px rgba(0,0,0,0.02)'
                          }}
                        >
                          {/* Circle Icon holder */}
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                            style={{ 
                              background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(107, 142, 107, 0.1)',
                              color: isSelected ? '#FFFFFF' : activeColor,
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
                      <label className="font-inter text-[11px] uppercase tracking-[0.2em] text-[#718096] block mb-2 font-medium">
                        Number of Guests (including you)
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPeopleCount((c) => Math.max(1, c - 1))}
                          className="w-10 h-10 rounded-full border border-black/10 bg-white/60 hover:bg-white text-[#4A5D4E] text-xl font-light flex items-center justify-center transition-colors shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-cormorant text-3xl text-[#1F2937] min-w-[2rem] text-center">
                          {peopleCount}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPeopleCount((c) => Math.min(5, c + 1))}
                          className="w-10 h-10 rounded-full border border-black/10 bg-white/60 hover:bg-white text-[#4A5D4E] text-xl font-light flex items-center justify-center transition-colors shadow-sm"
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
           className="mt-8 flex flex-col items-center justify-center w-full"
        >
          {/* Subtle gold divider */}
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#6B8E6B] to-transparent opacity-30 mb-5" />

          <p className="font-cormorant italic text-sm text-[#718096] mb-4 text-center">
            Made with love for {weddingData.couple.groom} {weddingData.couple.ampersand} {weddingData.couple.bride}
          </p>

          <a 
            href="mailto:jishnupg2005@gmail.com"
            className="group flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl border border-transparent hover:border-black/5 hover:bg-white/40 transition-all duration-400"
            style={{ textDecoration: 'none' }}
          >
            <p className="font-inter text-[9.5px] uppercase tracking-[0.25em] text-[#718096] opacity-80">
              Crafted by <span className="font-semibold text-[#6B8E6B] tracking-[0.1em] group-hover:text-[#4A5D4E] transition-colors">Jishnu P G</span>
            </p>
            <p className="font-inter text-[8.5px] lowercase tracking-[0.15em] text-[#a0aec0] opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              jishnupg2005@gmail.com
            </p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
