import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BubbleCursor() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 60;

    const spawnBubbles = (clientX, clientY) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      // Create multiple bubbles for more dramatic effect
      const newBubbles = Array.from({ length: 2 }, (_, i) => ({
        id: now + i,
        x: clientX + (Math.random() - 0.5) * 40,
        y: clientY + (Math.random() - 0.5) * 40,
        size: Math.random() * 20 + 10,
        hue: 175 + Math.random() * 65, // cyan through aqua-violet range
        drift: (Math.random() - 0.5) * 50,
        hasSparkle: Math.random() > 0.55,
      }));

      setBubbles(prev => [...prev.slice(-20), ...newBubbles]);
    };

    const handleMouseMove = (e) => spawnBubbles(e.clientX, e.clientY);
    // Touch devices have no mousemove stream - trail bubbles behind the
    // finger instead so mobile gets the same playful effect.
    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      spawnBubbles(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
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
            initial={{ scale: 0, opacity: 0.95, y: 0, x: 0 }}
            animate={{ scale: 1, opacity: 0, y: -90, x: bubble.drift }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.1, ease: "easeOut" }}
          >
            {/* Main bubble */}
            <div
              className="rounded-full"
              style={{
                width: bubble.size,
                height: bubble.size,
                background: `radial-gradient(circle at 30% 28%,
                  rgba(255,255,255,0.95),
                  hsla(${bubble.hue}, 90%, 72%, 0.65) 35%,
                  hsla(${bubble.hue}, 95%, 58%, 0.35) 65%,
                  transparent)`,
                border: `1px solid hsla(${bubble.hue}, 100%, 85%, 0.5)`,
                boxShadow: `
                  inset 0 0 ${bubble.size / 2.5}px rgba(255,255,255,0.6),
                  0 0 ${bubble.size * 0.7}px hsla(${bubble.hue}, 90%, 70%, 0.55),
                  0 0 ${bubble.size * 1.6}px hsla(${bubble.hue}, 85%, 60%, 0.3)
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