import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Using a royalty-free Kerala instrumental from a CDN
// You can replace this with your own audio file in /public
const AUDIO_SRC = '/music.m4a';

export default function MusicWidget() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.3;

    const tryPlay = () => {
      audio.play().then(() => setStarted(true)).catch(() => {
        // Autoplay blocked, user will trigger manually
      });
    };

    tryPlay();
    document.addEventListener('click', () => {
      if (!started) tryPlay();
    }, { once: true });
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!started) {
      audio.play().then(() => setStarted(true)).catch(() => {});
    }

    const newMuted = !muted;
    audio.muted = newMuted;
    setMuted(newMuted);
  };

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 4, duration: 0.6 }}
      className="fixed bottom-6 right-4 z-40 flex items-center gap-2"
    >
      <audio ref={audioRef} src={AUDIO_SRC} preload="none" />

      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(107,142,107,0.2)',
        }}
        aria-label={muted ? 'Unmute music' : 'Mute music'}
      >
        {muted ? (
          /* Muted icon */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A7060" strokeWidth="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/>
          </svg>
        ) : (
          /* Playing icon - animated bars */
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B8E6B" strokeWidth="1.8">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
          </svg>
        )}
      </button>

      {!started && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-inter text-[#7A7060] bg-white/80 backdrop-blur px-2 py-1 rounded-full border border-[rgba(107,142,107,0.2)] shadow-sm"
        >
          Tap to play music
        </motion.span>
      )}
    </motion.div>
  );
}
