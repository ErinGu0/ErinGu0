import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Users, Code, Wrench, Sparkles } from 'lucide-react';

// Cinematic text dissolve with particle effects
const DissolveText = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 40, 
        filter: "blur(20px)",
        scale: 0.95
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1
      }}
      transition={{ 
        duration: 1.8, 
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom ease for smooth motion
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Awards Wave Component
const AwardsWave = () => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { title: 'France-Anne Sweeney Making a Difference Award', org: 'University of Waterloo' },
        { title: 'Jim and Cindy Colvin Award', org: 'Women in Computer Science' },
        { title: 'Women of Waterloo County Scholarship', org: 'Community Recognition' },
        { title: 'Technovation Best UI Award', org: 'Design Excellence' }
      ].map((award, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 + (i * 0.15), duration: 1.2 }}
          className="p-4 rounded-xl bg-white/3 border border-white/10 hover:border-[#5EEAFF]/20 transition-all"
        >
          <p className="text-[#5EEAFF] font-semibold text-sm mb-1">{award.title}</p>
          <p className="text-white/50 text-xs">{award.org}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

const leadership = [
  { role: 'PR Officer', org: 'Women in Mathematics', desc: 'Leading outreach initiatives to empower women in STEM fields' },
  { role: 'Co-organizer', org: 'Waterloo Dementia Youth Alliance', desc: 'Bridging generational gaps through dementia awareness programs' },
  { role: 'First Year Rep', org: 'Neuroscience Association', desc: 'Connecting students with research opportunities in neuroscience' },
  { role: 'VP Finance', org: 'Underwater Hockey Club', desc: 'Managing club budget and organizing competitive tournaments' },
  { role: 'Co-Founder', org: 'Hope for Hearing - Waterloo', desc: 'Fundraising for cochlear implant access and hearing research' },
  { role: '120+ Hours Volunteer', org: 'Alzheimer Society - Circle of Music', desc: 'Supporting individuals with dementia through music therapy sessions' }
];

const languages = ['Python', 'Java', 'JavaScript', 'C++', 'HTML', 'CSS', 'SQL', 'TypeScript', 'Ruby'];
const frameworks = ['React', 'Node.js', 'Firebase', 'Arduino', 'AWS', 'Tailwind CSS', 'Gemini API', 'ChatGPT API', 'PostgreSQL', 'Powershell', 'Linux', 'Windows'];

export default function EducationSection({ isVisible, phase }) {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    if (phase === 'education') {
      // Small delay before starting animations
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 z-40 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Gradient background matching aesthetic */}
          <div className="min-h-screen pt-32 pb-20 relative">
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              style={{
                background: 'linear-gradient(180deg, #0D6B82 0%, #0A5A6E 30%, #084858 60%, #063845 100%)'
              }}
            />
            
            {/* Ethereal floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 2 + Math.random() * 6,
                    height: 2 + Math.random() * 6,
                    background: `radial-gradient(circle, rgba(94,234,255,${0.15 + Math.random() * 0.2}) 0%, transparent 70%)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0.6, 0.3, 0],
                    scale: [0, 1, 1.2, 1, 0],
                    y: [0, -80 - Math.random() * 40, -160 - Math.random() * 60],
                  }}
                  transition={{
                    duration: 6 + Math.random() * 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
            
            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Title with reveal animation */}
              {showContent && (
                <>
                  <div className="text-center mb-20">
                    <DissolveText delay={0}>
                      <motion.p 
                        className="text-[#88C5CC] text-sm tracking-[0.3em] uppercase mb-6 font-light"
                        initial={{ letterSpacing: '0.1em', opacity: 0 }}
                        animate={{ letterSpacing: '0.3em', opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        Academic Journey
                      </motion.p>
                    </DissolveText>
                    
                    <DissolveText delay={0.3}>
                      <h2 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                        Education &{' '}
                        <span className="font-semibold bg-gradient-to-r from-white via-[#88C5CC] to-[#5EEAFF] bg-clip-text text-transparent">
                          Recognition
                        </span>
                      </h2>
                    </DissolveText>
                    
                    <DissolveText delay={0.5}>
                      <motion.div 
                        className="h-px bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: '8rem' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </DissolveText>
                  </div>
                  
                  {/* Education Card */}
                  <DissolveText delay={0.8} className="mb-20">
                    <motion.div 
                      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 max-w-3xl mx-auto hover:border-[#5EEAFF]/30 transition-all duration-700 group relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#5EEAFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      />
                      
                      <div className="flex items-start gap-5 mb-6 relative z-10">
                        <motion.div 
                          className="p-4 rounded-2xl bg-[#5EEAFF]/10 border border-[#5EEAFF]/20"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <GraduationCap className="w-8 h-8 text-[#5EEAFF]" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-2">University of Waterloo</h3>
                          <p className="text-[#5EEAFF] font-medium text-lg">Bachelor of Mathematics, Major in Computer Science</p>
                        </div>
                      </div>
                      
                      <div className="pl-2 relative z-10">
                        <p className="text-white/60 text-sm mb-3">Minor in Cognitive Science • Expected May 2030</p>
                        <p className="text-white/40 text-sm">Waterloo, ON</p>
                      </div>
                    </motion.div>
                  </DissolveText>
                  
                  {/* Awards */}
                  <div className="mb-20">
                    <DissolveText delay={1.2}>
                      <div className="flex items-center justify-center gap-3 mb-10">
                        <Sparkles className="w-5 h-5 text-[#5EEAFF]/60" />
                        <h3 className="text-xl font-light text-white/90 tracking-wide">Awards & Recognition</h3>
                        <Sparkles className="w-5 h-5 text-[#5EEAFF]/60" />
                      </div>
                    </DissolveText>
                    <DissolveText delay={1.5}>
                      <AwardsWave />
                    </DissolveText>
                  </div>
                  
                  {/* Technical Skills Grid */}
                  <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {/* Languages */}
                    <DissolveText delay={1.8}>
                      <motion.div 
                        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-[#5EEAFF]/20 transition-all duration-700"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-[#5EEAFF]/10 border border-[#5EEAFF]/20">
                            <Code className="w-5 h-5 text-[#5EEAFF]" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Languages</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {languages.map((lang, i) => (
                            <motion.span
                              key={lang}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.2 + (i * 0.08), duration: 0.6, type: "spring" }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-[#5EEAFF]/30 hover:text-[#5EEAFF] transition-all duration-300 cursor-default"
                            >
                              {lang}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </DissolveText>
                    
                    {/* Frameworks */}
                    <DissolveText delay={2.0}>
                      <motion.div 
                        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-[#F5E6D3]/20 transition-all duration-700"
                        whileHover={{ y: -5 }}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-3 rounded-xl bg-[#F5E6D3]/10 border border-[#F5E6D3]/20">
                            <Wrench className="w-5 h-5 text-[#F5E6D3]" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Tools & Frameworks</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {frameworks.map((framework, i) => (
                            <motion.span
                              key={framework}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 2.4 + (i * 0.06), duration: 0.6, type: "spring" }}
                              whileHover={{ scale: 1.1, y: -2 }}
                              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm hover:border-[#F5E6D3]/30 hover:text-[#F5E6D3] transition-all duration-300 cursor-default"
                            >
                              {framework}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    </DissolveText>
                  </div>
                  
                  {/* Leadership Grid */}
                  <DissolveText delay={2.2}>
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="p-3 rounded-xl bg-[#5EEAFF]/10 border border-[#5EEAFF]/20">
                          <Users className="w-5 h-5 text-[#5EEAFF]" />
                        </div>
                        <h3 className="text-lg font-medium text-white">Leadership & Community</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {leadership.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 2.6 + (i * 0.12), duration: 1.2 }}
                            whileHover={{ scale: 1.03, y: -3 }}
                            className="p-6 rounded-2xl bg-white/3 border border-white/5 hover:border-[#5EEAFF]/20 hover:bg-white/5 transition-all duration-500"
                          >
                            <p className="text-[#5EEAFF] font-semibold text-sm mb-2">{item.role}</p>
                            <p className="text-white/90 text-sm mb-3">{item.org}</p>
                            <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </DissolveText>
                  
                  {/* Scroll Hint */}
                  <DissolveText delay={4.5}>
                    <motion.div 
                      className="text-center mt-24 text-white/30 text-sm"
                      animate={{ 
                        y: [0, 8, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <p className="mb-3 tracking-wider">Continue exploring</p>
                      <motion.span 
                        className="text-[#5EEAFF]/50 text-lg inline-block"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        ↓
                      </motion.span>
                    </motion.div>
                  </DissolveText>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}