import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Deterministic PRNG (mulberry32) - keeps foam fleck layout identical
// between server and client render so React hydration never mismatches.
function seeded(seed) {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// The leading edge of the water: two from-the-top fills (deep water that
// stays fully opaque past the container seam, then a turquoise shallow
// tongue that only appears near its own edge) plus two foam RIBBONS -
// closed wavy bands hugging the waterline, blurred soft, exactly how the
// white foam stripe sits along a breaking wave seen from above. Filling
// foam from the top (the old approach) washed the whole zone out and left
// the body's bottom edge visible as a hard line.
const crestLayers = [
  {
    fill: 'url(#crestDeepG)',
    duration: 9,
    delay: 0,
    dA: 'M0,0 L0,168 C140,198 280,150 420,180 C560,208 700,158 840,186 C980,212 1120,162 1260,188 C1350,204 1400,178 1440,190 L1440,0 Z',
    dB: 'M0,0 L0,182 C140,152 280,202 420,168 C560,140 700,196 840,160 C980,132 1120,192 1260,158 C1350,140 1400,190 1440,168 L1440,0 Z',
  },
  {
    fill: 'url(#crestMidG)',
    duration: 7,
    delay: 0.4,
    dA: 'M0,0 L0,210 C130,238 270,192 410,222 C550,250 690,200 830,228 C970,254 1110,206 1250,232 C1350,250 1400,222 1440,236 L1440,0 Z',
    dB: 'M0,0 L0,226 C130,196 270,246 410,210 C550,182 690,238 830,204 C970,178 1110,236 1250,204 C1350,186 1400,238 1440,214 L1440,0 Z',
  },
  {
    // pale aqua shallows - the step between turquoise and foam, so the
    // edge grades smoothly instead of jumping straight to white
    fill: 'url(#crestPaleG)',
    duration: 8,
    delay: 1.1,
    dA: 'M0,0 L0,228 C130,252 270,212 410,238 C550,262 690,218 830,242 C970,264 1110,222 1250,244 C1350,260 1400,236 1440,248 L1440,0 Z',
    dB: 'M0,0 L0,240 C130,216 270,256 410,226 C550,202 690,248 830,222 C970,200 1110,246 1250,220 C1350,206 1400,250 1440,232 L1440,0 Z',
  },
  {
    // wide soft foam wash - a blurred band around the waterline
    fill: 'url(#foamWideG)',
    filter: 'url(#foamSofter)',
    duration: 6.5,
    delay: 0.8,
    dA: 'M0,180 C150,205 300,170 450,196 C600,220 750,182 900,204 C1050,224 1200,186 1440,204 L1440,268 C1200,248 1050,286 900,264 C750,244 600,282 450,258 C300,236 150,272 0,250 Z',
    dB: 'M0,196 C150,172 300,212 450,184 C600,162 750,208 900,186 C1050,168 1200,212 1440,190 L1440,252 C1200,272 1050,240 900,262 C750,282 600,246 450,272 C300,292 150,254 0,268 Z',
  },
  {
    // bright foam crest - thinner, more jagged ribbon; its fill fades
    // vertically so even the brightest zone never reads as a solid bar
    fill: 'url(#foamBrightG)',
    filter: 'url(#foamSoft)',
    duration: 5.5,
    delay: 0.2,
    dA: 'M0,196 C120,214 240,186 360,206 C480,224 600,190 720,210 C840,228 960,194 1080,212 C1200,228 1320,198 1440,214 L1440,246 C1320,232 1200,262 1080,244 C960,228 840,262 720,242 C600,224 480,258 360,238 C240,220 120,248 0,228 Z',
    dB: 'M0,210 C120,192 240,222 360,200 C480,182 600,218 720,196 C840,178 960,214 1080,194 C1200,178 1320,212 1440,196 L1440,230 C1320,248 1200,218 1080,240 C960,258 840,222 720,246 C600,266 480,230 360,252 C240,270 120,236 0,252 Z',
  },
];

// Shared between the continuous (wheel) and one-shot (touch autoPlay)
// rendering paths below - the foam/particles/burst decorations don't care
// how the crest itself got triggered, only whether it's active/complete.
function WaveTransitionOverlayBody({ active, complete }) {
  return (
    <>
      {/* Gradient body of water */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #052D38 0%, #063845 35%, #0A5A6E 65%, #0D6B82 100%)',
        }}
      />

      {/* Caustic light shimmer - underwater light-ray feel */}
      {active && (
        <motion.div
          className="absolute inset-0 mix-blend-screen opacity-30"
          style={{
            background:
              'conic-gradient(from 0deg at 30% 20%, transparent 0deg, rgba(94,234,255,0.25) 60deg, transparent 140deg, rgba(94,234,255,0.15) 220deg, transparent 320deg)',
            filter: 'blur(30px)',
            // Fade the shimmer out before the container's bottom edge -
            // its tint ending abruptly there was drawing a horizontal
            // step across the water right above the foam.
            WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
            maskImage: 'linear-gradient(to bottom, black 55%, transparent 92%)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Ambient particles rising through the water */}
      <div className="absolute inset-0 overflow-hidden">
        {active && (
          <>
            {[...Array(22)].map((_, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  width: 3 + (i % 5),
                  height: 3 + (i % 5),
                  background: `radial-gradient(circle, rgba(94,234,255,${0.18 + (i % 4) * 0.08}) 0%, transparent 70%)`,
                }}
                animate={{
                  y: [0, -30 - (i % 6) * 12, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 5),
                  repeat: Infinity,
                  delay: (i % 7) * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Layered foamy leading edge */}
      {active && (
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          style={{ height: '300px', transform: 'translateY(56%)' }}
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
        >
          <defs>
            {/* userSpaceOnUse pins the stops to the 300-unit SVG box, so
                the deep layer is guaranteed still fully opaque where the
                water body's hard bottom edge sits (~44% down this box) -
                that overlap is what erases the seam line. */}
            {/* Fades IN from the top (not solid from row zero): painting
                flat opaque color from the SVG's rectangular top edge drew
                a sharp full-width line across the water where this layer
                began. It still reaches full opacity well before the
                container's bottom edge, so that seam stays hidden too. */}
            <linearGradient id="crestDeepG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
              <stop offset="0%" stopColor="#0D6B82" stopOpacity="0" />
              <stop offset="40%" stopColor="#0D6B82" stopOpacity="1" />
              <stop offset="55%" stopColor="#0D6B82" stopOpacity="1" />
              <stop offset="72%" stopColor="#17859E" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1FA3B8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="crestMidG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
              <stop offset="0%" stopColor="#2FB4C6" stopOpacity="0" />
              <stop offset="58%" stopColor="#2FB4C6" stopOpacity="0.08" />
              <stop offset="74%" stopColor="#48C4D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7FE3EE" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="crestPaleG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
              <stop offset="0%" stopColor="#BFEFF5" stopOpacity="0" />
              <stop offset="64%" stopColor="#BFEFF5" stopOpacity="0" />
              <stop offset="80%" stopColor="#BFEFF5" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D9F7FA" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="foamWideG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
              <stop offset="0%" stopColor="#F2FDFF" stopOpacity="0" />
              <stop offset="58%" stopColor="#F2FDFF" stopOpacity="0.05" />
              <stop offset="72%" stopColor="#F2FDFF" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#F2FDFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="foamBrightG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="300">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="63%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0.5" />
              <stop offset="84%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
            <filter id="foamSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <filter id="foamSofter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="11" />
            </filter>
          </defs>

          {crestLayers.map((layer, i) => (
            <motion.path
              key={i}
              fill={layer.fill}
              fillOpacity={layer.fillOpacity}
              filter={layer.filter}
              initial={{ d: layer.dA }}
              animate={{ d: [layer.dA, layer.dB, layer.dA] }}
              transition={{
                duration: layer.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: layer.delay,
              }}
            />
          ))}
        </svg>
      )}

      {/* Foam flecks drifting along the leading edge */}
      {active && (
        <div className="absolute inset-x-0 bottom-0" style={{ height: '140px', transform: 'translateY(68%)' }}>
          {[...Array(16)].map((_, i) => {
            const r1 = seeded(i + 41);
            const r2 = seeded(i + 141);
            const r3 = seeded(i + 241);
            const r4 = seeded(i + 341);
            return (
              <motion.div
                key={`fleck-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${r1 * 98}%`,
                  top: `${r2 * 100}%`,
                  width: 3 + r3 * 5,
                  height: 2 + r3 * 3,
                  filter: 'blur(1.5px)',
                }}
                animate={{
                  x: [0, (r4 - 0.5) * 70, 0],
                  opacity: [0, 0.5, 0],
                  scale: [0.6, 1.25, 0.6],
                }}
                transition={{
                  duration: 3.5 + r4 * 3,
                  repeat: Infinity,
                  delay: r2 * 4,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>
      )}

      {/* Foam burst when the wave fully crests */}
      {complete && (
        <div className="absolute inset-x-0 bottom-0 overflow-hidden" style={{ height: '260px', transform: 'translateY(40%)' }}>
          {[...Array(28)].map((_, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                left: `${(i * 3.6) % 100}%`,
                bottom: 0,
                width: 3 + (i % 4),
                height: 3 + (i % 4),
              }}
              initial={{ opacity: 0, y: 0, scale: 0.3 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [0, -60 - (i % 5) * 14],
                scale: [0.3, 1.4, 0.3],
              }}
              transition={{
                duration: 1.4 + (i % 5) * 0.15,
                delay: (i % 8) * 0.03,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Shimmering sheen once the water has settled */}
      {complete && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5EEAFF]/5 to-transparent"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </>
  );
}

export default function WaveTransitionOverlay({ progress = 0, complete = false, autoPlay = false, onComplete }) {
  const [windowHeight, setWindowHeight] = useState(800);
  // Only relevant in autoPlay (touch) mode: flips once the one-shot dive
  // animation genuinely finishes, per Framer's own completion callback -
  // which fires off the browser's real animation-finished signal, not our
  // own polling, so it's correct even if it arrives a beat late because the
  // main thread was busy right at the tail end.
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keep this close to linear against progress: the crest sits at the
  // bottom edge of this div, so if height overshoots the viewport early
  // the crest/foam scroll off-screen and the last stretch of the gesture
  // is just a static color fill. A small overshoot at the very end (rather
  // than a front-loaded ease) keeps the crest visible almost the whole way.
  const waveHeight = progress * (windowHeight + 60);
  const waveOpacity = autoPlay ? 1 : Math.min(progress * 6, 1);
  const active = autoPlay || progress > 0.01;
  const isComplete = autoPlay ? settled : complete;

  // autoPlay (touch): `height` is a layout property, so animating it can
  // only ever run on the main JS thread - no matter whether JS, CSS, or
  // Framer drives it. iOS deprioritizing that thread during an active touch
  // gesture (while transform/opacity animations elsewhere, like the turtle,
  // keep running on the compositor) is exactly what caused the dive to
  // stall and then snap straight to "done" without ever visibly completing.
  // `transform: scaleY` has no such restriction - it's compositor-only, so
  // handing the browser one declarative animation up front (rather than
  // feeding it a new height value every frame from our own JS loop) lets it
  // play out the full descent smoothly and independently, the same way the
  // sea creatures do.
  if (autoPlay) {
    return (
      <motion.div
        className="fixed top-0 pointer-events-none z-30"
        style={{
          left: -18,
          right: -18,
          opacity: waveOpacity,
          height: windowHeight + 60,
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        // Same signature ease used for the site's other elegant reveals
        // (section underlines, card fades) - a long, gentle glide rather
        // than a mechanical linear/cubic-out curve. 1.6s gives the crest
        // and creatures time to actually read as "descending" instead of
        // flashing past.
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          setSettled(true);
          if (onComplete) onComplete();
        }}
      >
        <WaveTransitionOverlayBody active={active} complete={isComplete} />
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 pointer-events-none z-30"
        // Wider than the viewport so the horizontal sway below never
        // exposes an uncovered sliver at the screen edges.
        style={{ left: -18, right: -18, opacity: waveOpacity }}
        animate={{ height: waveHeight, x: active ? [0, 8, -8, 0] : 0 }}
        transition={{
          // The incoming progress value is already spring-smoothed upstream
          // (in page.js), so this just needs to track it tightly rather than
          // apply a second, slower layer of easing on top. The previous
          // spring here (damping 30 against a critical value of ~19 for
          // this stiffness/mass) was actually overdamped - it crept for the
          // first few hundred ms before catching up, which is exactly what
          // read as "stuck at the top while the background waves keep
          // moving." A short linear tween just follows the already-eased
          // value immediately instead of re-smoothing it.
          height: { duration: 0.1, ease: 'linear' },
          x: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <WaveTransitionOverlayBody active={active} complete={isComplete} />
      </motion.div>
    </AnimatePresence>
  );
}
