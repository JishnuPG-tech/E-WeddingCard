import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Kalyana+Mandapam+Thrissur+Kerala';
const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent("You're invited to the wedding of Anand & Meera! 📍 Kalyana Mandapam, Thrissur 📅 22nd May 2025")}`;
const CALENDAR_URL = `https://www.google.com/calendar/render?action=TEMPLATE&text=Wedding+of+Anand+%26+Meera&dates=20250522T050000Z/20250522T160000Z&details=Kalyana+Mandapam,+Thrissur,+Kerala&location=Thrissur,+Kerala`;

const ActionButton = ({ href, icon, label, primary = false, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={primary ? 'btn-primary flex items-center gap-2 justify-center w-full' : 'btn-secondary w-full'}
      style={{ textDecoration: 'none' }}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </motion.a>
  );
};

export default function VenueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="scroll-section flex items-center justify-center bg-[#F8F7F4] px-6 py-8">
      <div className="w-full max-w-sm mx-auto">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">Location</p>
          <h2 className="font-cormorant text-3xl font-semibold text-[#2C2C2C]">Venue</h2>
        </motion.div>

        {/* Venue card */}
        <div className="glass-card floral-border rounded-[20px] overflow-hidden">
          {/* Map embed placeholder with green overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-full relative overflow-hidden"
            style={{ height: 160 }}
          >
            <iframe
              title="Venue Map"
              src="https://maps.google.com/maps?q=Thrissur,Kerala&output=embed&zoom=13"
              className="w-full h-full border-0 pointer-events-none"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[#6B8E6B] opacity-10 pointer-events-none" />
          </motion.div>

          <div className="px-6 py-5">
            {/* Venue name & address */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-5"
            >
              <h3 className="font-cormorant font-semibold text-xl text-[#2C2C2C] mb-1">Kalyana Mandapam</h3>
              <p className="font-inter text-sm text-[#7A7060]">
                12/45 Temple Road, Thrissur<br />
                Kerala — 680 001
              </p>
            </motion.div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <ActionButton
                href={GOOGLE_MAPS_URL}
                icon="📍"
                label="Open in Google Maps"
                primary={true}
                delay={0.25}
              />
              <div className="grid grid-cols-2 gap-3">
                <motion.a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.32, duration: 0.55 }}
                  className="btn-secondary"
                  style={{ textDecoration: 'none', fontSize: 13 }}
                >
                  <span>📅</span>
                  <span>Add to Calendar</span>
                </motion.a>
                <motion.a
                  href={WHATSAPP_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38, duration: 0.55 }}
                  className="btn-secondary"
                  style={{ textDecoration: 'none', fontSize: 13 }}
                >
                  <span>💚</span>
                  <span>Share</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
