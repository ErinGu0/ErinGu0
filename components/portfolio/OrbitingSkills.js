import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Waves, Dna, Leaf, Users } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const traits = [
  { name: 'Advocate', color: '#88C5CC', icon: Megaphone },
  { name: 'Underwater Hockey Athlete', color: '#5EEAFF', icon: Waves },
  { name: 'Biology Enthusiast', color: '#7DD3A8', icon: Dna },
  { name: 'Matcha Connoisseur', color: '#98D4A0', icon: Leaf },
  { name: 'Community Leader', color: '#E8A87C', icon: Users },
];

const desktopPositions = [
  { x: -140, y: -60 },
  { x: 100, y: -80 },
  { x: -80, y: 40 },
  { x: 120, y: 30 },
  { x: -20, y: 100 },
];

// Each pill is left-anchored at the container's center point, so on a
// narrow phone the wide labels shoot off the right edge with the desktop
// offsets. These keep every pill inside a ~390px viewport (the widest
// pill, "Underwater Hockey Athlete", needs the most negative x).
const mobilePositions = [
  { x: 10, y: -85 },
  { x: -120, y: -38 },
  { x: -15, y: 8 },
  { x: -110, y: 52 },
  { x: -25, y: 96 },
];

export default function OrbitingSkills() {
  const isMobile = useIsMobile();
  const positions = isMobile ? mobilePositions : desktopPositions;

  return (
    <div className="relative w-[280px] h-[230px] md:w-[450px] md:h-[320px]">
      {traits.map((trait, i) => {
        const pos = positions[i];
        const duration = 5 + (i % 3);
        const delay = i * 0.4;
        const Icon = trait.icon;

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
              className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-xs md:text-base font-medium whitespace-nowrap backdrop-blur-md border border-white/25 shadow-lg cursor-default"
              style={{
                backgroundColor: `${trait.color}15`,
                color: trait.color,
                boxShadow: `0 4px 20px ${trait.color}25`
              }}
            >
              <Icon className="w-4 h-4 flex-shrink-0" style={{ color: trait.color }} />
              {trait.name}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
