import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Sparkles } from 'lucide-react';

const awards = [
  "France-Anne Sweeney Making a Difference Award",
  "Jim and Cindy Colvin Award for Women in Computer Science",
  "Women of Waterloo County Scholarship",
  "Finalist in Fusion Case Competition Challenge",
  "Finalist in AgeTech Innovation Challenge"
];

export default function AwardsWave() {
  return (
    <div className="relative py-8">
      {/* Background sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles className="w-3 h-3 text-[#5EEAFF]/40" />
          </motion.div>
        ))}
      </div>

      {/* Awards grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto relative z-10">
        {awards.map((award, index) => (
          <motion.div
            key={award}
            initial={{ opacity: 0, scale: 0, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
            }}
            className="group relative"
          >
            {/* Glow effect */}
            <motion.div 
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#5EEAFF]/30 via-[#88C5CC]/20 to-[#5EEAFF]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Main card */}
            <div 
              className="relative px-5 py-4 rounded-2xl backdrop-blur-md border border-white/20 group-hover:border-[#5EEAFF]/50 transition-all duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(94,234,255,0.08) 0%, rgba(136,197,204,0.04) 50%, rgba(94,234,255,0.08) 100%)',
              }}
            >
              {/* Inner sparkle effects */}
              <div className="absolute top-1 right-2">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 text-[#5EEAFF]/60 fill-[#5EEAFF]/30" />
                </motion.div>
              </div>
              
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
              
              {/* Content */}
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#5EEAFF]/20 to-[#5EEAFF]/5 border border-[#5EEAFF]/30 flex-shrink-0">
                  <Award className="w-4 h-4 text-[#5EEAFF]" />
                </div>
                <p className="text-white/90 text-sm md:text-base font-medium">
                  {award}
                </p>
              </div>
              
              {/* Bottom shine line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5EEAFF]/40 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}