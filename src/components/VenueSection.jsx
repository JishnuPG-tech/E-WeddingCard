import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, CalendarPlus } from 'lucide-react';
import { weddingData } from '../config/weddingData';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="18" width="18">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const GOOGLE_MAPS_URL = weddingData.venue.links.googleMapsDirect;
const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(weddingData.strings.whatsappShareText)}`;

const ActionButton = ({ href, onClick, icon, label, primary = false, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  const Component = onClick ? motion.button : motion.a;
  
  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={primary ? 'btn-primary flex items-center gap-2 justify-center w-full' : 'btn-secondary w-full'}
      style={{ textDecoration: 'none' }}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </Component>
  );
};

export default function VenueSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [showCalendarOpts, setShowCalendarOpts] = useState(false);

  // Close calendar menu if clicked outside or anywhere else
  React.useEffect(() => {
    const handleClick = () => setShowCalendarOpts(false);
    if (showCalendarOpts) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showCalendarOpts]);

  const downloadICS = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//${weddingData.couple.groom}And${weddingData.couple.bride}Wedding//EN
BEGIN:VEVENT
UID:${new Date().toISOString()}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${weddingData.dates.icsFormat.dateStart}
DTEND:${weddingData.dates.icsFormat.dateEnd}
SUMMARY:Wedding of ${weddingData.couple.groom} & ${weddingData.couple.bride}
DESCRIPTION:Please join us for our marriage ceremony.
LOCATION:${weddingData.venue.singleLineAddress}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([fileContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `${weddingData.couple.groom}_${weddingData.couple.bride}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarOpts(false);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Wedding of ${weddingData.couple.groom} & ${weddingData.couple.bride}`)}&dates=${weddingData.dates.icsFormat.dateStart}/${weddingData.dates.icsFormat.dateEnd}&details=${encodeURIComponent('Please join us for our marriage ceremony.')}&location=${encodeURIComponent(weddingData.venue.singleLineAddress)}`;

  return (
    <section className="scroll-section flex items-center justify-center bg-transparent px-6 py-8">
      <div className="w-full max-w-sm mx-auto z-10 relative" ref={ref}>
        {/* Venue card */}
        <div className="glass-card overflow-hidden pt-10 pb-6 px-1 w-full mx-auto relative z-10 rounded-3xl mt-4">
          
          {/* Heading moved inside Arch */}
          <div className="text-center mb-6 relative z-10 mt-2">
            <p className="font-inter text-[10px] uppercase tracking-[0.35em] text-[#6B8E6B] mb-2">Location</p>
            <h2 className="font-cormorant text-3xl font-semibold text-[#1F2937]">Venue</h2>
          </div>
          
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-[calc(100%-2rem)] h-[240px] mx-auto relative overflow-hidden rounded-2xl border border-black/5 shadow-sm"
          >
            <iframe
              title="Venue Map"
              src={weddingData.venue.links.googleMapsEmbed}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen=""
            />
          </motion.div>

          <div className="px-6 py-5">
            {/* Venue name & address */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center mb-5"
            >
              <h3 className="font-cormorant font-semibold text-xl text-[#1F2937] mb-1">{weddingData.venue.name}</h3>
              <p className="font-inter text-sm text-[#718096]">
                {weddingData.venue.addressEn[0]}<br />
                {weddingData.venue.addressEn[1]}
              </p>
            </motion.div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <ActionButton
                href={GOOGLE_MAPS_URL}
                icon={<MapPin size={18} strokeWidth={2} />}
                label="Open in Google Maps"
                primary={true}
                delay={0.25}
              />
              <div className="grid grid-cols-2 gap-3 relative">
                
                {/* Calendar Options Modal */}
                <AnimatePresence>
                  {showCalendarOpts && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-0 w-[180px] mb-2 bg-white/95 backdrop-blur-md border border-black/5 rounded-lg shadow-xl overflow-hidden z-20 flex flex-col pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a 
                        href={googleCalendarUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={() => setShowCalendarOpts(false)}
                        className="p-3 text-sm text-center text-[#1F2937] border-b border-black/5 hover:bg-black/5 transition border-t-0 font-inter"
                      >
                        Google Calendar
                      </a>
                      <button 
                        onClick={downloadICS} 
                        className="p-3 text-sm text-center text-[#1F2937] hover:bg-black/5 transition bg-transparent border-0 font-inter cursor-pointer"
                      >
                        Apple / Outlook
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={(e) => { e.stopPropagation(); setShowCalendarOpts(!showCalendarOpts); }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.32, duration: 0.55 }}
                  className="btn-secondary flex items-center justify-center gap-2"
                  style={{ fontSize: 13 }}
                >
                  <span className="text-[#6B8E6B] opacity-80"><CalendarPlus size={16} strokeWidth={2} /></span>
                  <span>Add Calendar</span>
                </motion.button>
                <motion.a
                  href={WHATSAPP_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.38, duration: 0.55 }}
                  className="btn-secondary flex items-center justify-center gap-2"
                  style={{ textDecoration: 'none', fontSize: 13 }}
                >
                  <span className="text-[#25D366]"><WhatsAppIcon /></span>
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
