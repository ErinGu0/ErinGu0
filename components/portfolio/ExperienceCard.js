import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

// Experience card styled after the hero's water: a lagoon-glass gradient
// body, an animated foam crest running along the top edge, and a soft
// caustic glow drifting inside. Reveals are quick and light - a single
// fast rise per card, bullets following in a tight cascade.
export default function ExperienceCard({ experience, index }) {
  const baseDelay = index * 0.06;

  return (
    <div className="relative">
      {/* Timeline marker - a glowing bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, delay: baseDelay }}
        className="absolute left-0 top-1 -translate-x-[30px] hidden md:block"
      >
        <div className="relative w-4 h-4 rounded-full bg-gradient-to-br from-[#5EEAFF] to-[#88C5CC] shadow-[0_0_14px_rgba(94,234,255,0.6)]">
          <div className="absolute top-0.5 left-1 w-1.5 h-1 rounded-full bg-white/70" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: baseDelay, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[#5EEAFF]/15 bg-gradient-to-br from-[#0E5F73]/60 via-[#0A4B5C]/45 to-[#083D4C]/35 backdrop-blur-xl shadow-xl hover:border-[#5EEAFF]/40 hover:shadow-[0_8px_40px_rgba(94,234,255,0.12)] transition-all duration-300"
      >
        {/* animated foam crest along the top edge */}
        <svg className="absolute top-0 left-0 w-full" style={{ height: 12 }} viewBox="0 0 400 12" preserveAspectRatio="none">
          <motion.path
            fill="none"
            stroke="rgba(94,234,255,0.45)"
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ d: 'M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6 C350,2 380,8 400,6' }}
            animate={{
              d: [
                'M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6 C350,2 380,8 400,6',
                'M0,6 C50,10 100,2 150,6 C200,10 250,2 300,6 C350,10 380,4 400,6',
                'M0,6 C50,2 100,10 150,6 C200,2 250,10 300,6 C350,2 380,8 400,6',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ filter: 'blur(0.5px)' }}
          />
        </svg>

        {/* slow caustic glow drifting through the card */}
        <motion.div
          className="absolute -inset-1/3 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 20%, rgba(94,234,255,0.08) 0%, transparent 55%)' }}
          animate={{ x: ['-6%', '10%', '-6%'], y: ['-4%', '8%', '-4%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-white">{experience.title}</h3>
              <div className="flex items-center gap-2 text-[#5EEAFF] mt-1 font-medium">
                {experience.link ? (
                  <a href={experience.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                    {experience.company}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span>{experience.company}</span>
                )}
              </div>
            </div>

            <div className="flex flex-row md:flex-col flex-wrap items-start md:items-end gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5EEAFF]/10 border border-[#5EEAFF]/20 text-[#B8F1FA] text-xs whitespace-nowrap">
                <Calendar className="w-3.5 h-3.5" />
                {experience.period}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-white/60 text-xs whitespace-nowrap">
                <MapPin className="w-3.5 h-3.5" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Highlights - tight, quick cascade */}
          <ul className="space-y-2.5">
            {experience.highlights.map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: baseDelay + 0.12 + i * 0.05, ease: 'easeOut' }}
                className="text-sm text-white/75 leading-relaxed flex items-start gap-3"
              >
                <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#5EEAFF] to-[#88C5CC] shadow-[0_0_6px_rgba(94,234,255,0.5)] flex-shrink-0" />
                {highlight}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
