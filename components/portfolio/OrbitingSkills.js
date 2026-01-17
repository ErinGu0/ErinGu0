import React from 'react';
import { motion } from 'framer-motion';

const traits = [
  { name: 'Advocate', color: '#88C5CC' },
  { name: 'Underwater Hockey Athlete', color: '#5EEAFF' },
  { name: 'Biology Enthusiast', color: '#7DD3A8' },
  { name: 'Matcha Connoisseur', color: '#98D4A0' },
  { name: 'Community Leader', color: '#E8A87C' },
];

export default function OrbitingSkills() {
  const positions = [
    { x: -140, y: -60 },
    { x: 100, y: -80 },
    { x: -80, y: 40 },
    { x: 120, y: 30 },
    { x: -20, y: 100 },
  ];

  return (
    <div className="relative w-[350px] h-[280px] md:w-[450px] md:h-[320px]">
      {traits.map((trait, i) => {
        const pos = positions[i];
        const duration = 5 + (i % 3);
        const delay = i * 0.4;
        
        return (
          <motion.div
            key={trait.name}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              x: pos.x,
              y: pos.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [pos.y, pos.y - 12, pos.y, pos.y + 8, pos.y],
              x: [pos.x, pos.x + 6, pos.x, pos.x - 4, pos.x],
            }}
            transition={{ 
              opacity: { delay: delay, duration: 0.6 },
              scale: { delay: delay, duration: 0.6 },
              y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay },
              x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay: delay },
            }}
          >
            <div
              className="px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium whitespace-nowrap backdrop-blur-md border border-white/25 shadow-lg cursor-default"
              style={{ 
                backgroundColor: `${trait.color}15`,
                color: trait.color,
                boxShadow: `0 4px 20px ${trait.color}25`
              }}
            >
              {trait.name}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}