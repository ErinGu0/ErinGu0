import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function ExperienceCard({ experience, index }) {
  // Stagger delays for each card
  const baseDelay = index * 0.2;
  
  return (
    <div className="relative">
      {/* Timeline dot - dissolves in */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: baseDelay }}
        className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#88C5CC] -translate-x-[30px] hidden md:block shadow-lg shadow-[#88C5CC]/30" 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 1.2, 
          delay: baseDelay + 0.1,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="bg-gradient-to-br from-white/12 to-white/4 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 hover:border-[#88C5CC]/40 transition-colors duration-300 shadow-xl"
      >
        {/* Header - title and company dissolve in first */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: baseDelay + 0.3 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-white">{experience.title}</h3>
            <div className="flex items-center gap-2 text-[#88C5CC] mt-1">
              {experience.link ? (
                <a href={experience.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                  {experience.company}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span>{experience.company}</span>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: baseDelay + 0.4 }}
            className="flex flex-col items-start md:items-end gap-1 text-sm text-white/60"
          >
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
          </motion.div>
        </div>
        
        {/* Highlights - each bullet dissolves in sequentially */}
        <ul className="space-y-3">
          {experience.highlights.map((highlight, i) => {
            // Highlight specific keywords in different colors
            const highlightKeywords = (text) => {
              // Healthcare/medical terms
              const healthcareTerms = ['assistive-movement control', 'clinical advisors', 'patients', 'system reliability', 'usability'];
              // Tech terms
              const techTerms = ['machine-learning', 'Arduino C++', 'Python', 'electromyography', 'sensor systems', 'real-time'];
              
              let processedText = text;
              
              // Replace healthcare terms with colored spans
              healthcareTerms.forEach(term => {
                const regex = new RegExp(term, 'gi');
                processedText = processedText.replace(regex, `<span class="text-[#FF8A80] font-medium">${term}</span>`);
              });
              
              return processedText;
            };
            
            return (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -15, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.9, 
                  delay: baseDelay + 0.5 + (i * 0.1),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-sm text-white/70 leading-relaxed flex items-start gap-3"
              >
                <div className="w-1 h-1 rounded-full bg-[#F5E6D3] mt-2 flex-shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: highlightKeywords(highlight) }} />
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}