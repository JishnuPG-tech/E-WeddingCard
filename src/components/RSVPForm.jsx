import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Confetti from 'react-confetti';
import { createClient } from '@supabase/supabase-js';

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
    ? `Thank you, ${name}! Your attendance is confirmed. See you on the 22nd! \\u{1F389}`
    : `Thank you, ${name}. We understand and appreciate you letting us know. \\u{1F49B}`;

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
                    ? 'Your attendance is confirmed. See you on the 22nd!'
                    : 'We understand and appreciate you letting us know.'}
                </p>
                <p className="font-inter text-sm text-[#7A7060] mt-1">
                  — Thank you, <strong>{name}</strong>
                </p>
                <div className="mt-5 pt-4 border-t border-[rgba(107,142,107,0.15)]">
                  <p className="font-cormorant italic text-sm text-[#B8913A]">
                    With love, Anand &amp; Meera
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
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: true, label: 'Yes, I will!' },
                      { value: false, label: 'Regretfully no' },
                    ].map((opt) => (
                      <button
                        key={String(opt.value)}
                        type="button"
                        onClick={() => setAttending(opt.value)}
                        className="py-3 px-3 rounded-lg border text-sm font-inter transition-all duration-200 min-h-[48px]"
                        style={{
                          background:
                            attending === opt.value
                              ? opt.value
                                ? '#6B8E6B'
                                : '#C17A7A'
                              : '#FAF8F2',
                          color: attending === opt.value ? 'white' : '#7A7060',
                          borderColor:
                            attending === opt.value
                              ? opt.value
                                ? '#6B8E6B'
                                : '#C17A7A'
                              : 'rgba(107,142,107,0.2)',
                          fontWeight: attending === opt.value ? '500' : '400',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-cormorant italic text-sm text-center text-[#7A7060] mt-6"
        >
          Made with love for Anand &amp; Meera
        </motion.p>
      </div>
    </section>
  );
}
