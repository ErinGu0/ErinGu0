import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BubbleCursor() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 60;

    const handleMouseMove = (e) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      // Create multiple bubbles for more dramatic effect
      const newBubbles = Array.from({ length: 2 }, (_, i) => ({
        id: now + i,
        x: e.clientX + (Math.random() - 0.5) * 40,
        y: e.clientY + (Math.random() - 0.5) * 40,
        size: Math.random() * 16 + 8,
        hue: 180 + Math.random() * 40, // Cyan to teal range
        hasSparkle: Math.random() > 0.6,
      }));

      setBubbles(prev => [...prev.slice(-20), ...newBubbles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setBubbles(prev => prev.filter(b => Date.now() - b.id < 2500));
    }, 400);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute"
            style={{
              left: bubble.x,
              top: bubble.y,
            }}
            initial={{ scale: 0, opacity: 0.9, y: 0 }}
            animate={{ scale: 1, opacity: 0, y: -80 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Main bubble */}
            <div
              className="rounded-full"
              style={{
                width: bubble.size,
                height: bubble.size,
                background: `radial-gradient(circle at 30% 30%, 
                  rgba(255,255,255,0.9), 
                  hsla(${bubble.hue}, 80%, 70%, 0.5) 40%,
                  hsla(${bubble.hue}, 90%, 60%, 0.2) 70%,
                  transparent)`,
                boxShadow: `
                  inset 0 0 ${bubble.size/3}px rgba(255,255,255,0.5),
                  0 0 ${bubble.size/2}px hsla(${bubble.hue}, 80%, 70%, 0.4),
                  0 0 ${bubble.size}px hsla(${bubble.hue}, 70%, 60%, 0.2)
                `,
              }}
            />
            {/* Sparkle effect */}
            {bubble.hasSparkle && (
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: [0, 1.2, 0], rotate: 180 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                    fill="rgba(255,255,255,0.9)"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}