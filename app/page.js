"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, GraduationCap, Users, Code, Wrench } from 'lucide-react';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import ExperienceCard from '../components/portfolio/ExperienceCard';
import ProjectCard from '../components/portfolio/ProjectCard';
import OceanSection from '../components/portfolio/OceanSection';
import BubbleCursor from '../components/portfolio/BubbleCursor';
import WaveTransitionOverlay from '../components/portfolio/WaveTransitionOverlay';
import AwardsWave from '../components/portfolio/AwardsWave';

// iOS Safari doesn't reliably honor `overflow: hidden` on the body - it
// still lets touch-driven scrolling through in some cases (rubber-band
// bounce, fast flicks), which was the cause of the real page silently
// scrolling underneath the fake wave overlay: two independent motions
// fighting for the same screen, which read as the wave stalling, jumping,
// and a "second wave" rising from the bottom. `position: fixed` on the
// body is the standard, actually-reliable way to lock scroll on iOS.
function lockPageScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
}
function unlockPageScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY ? -parseInt(scrollY, 10) : 0);
}

const experiences = [
  {
    title: 'AI Automation Developer',
    company: 'Bulk Barn Foods Limited',
    period: 'May 2026 – Present',
    location: 'Aurora, ON',
    highlights: [
      'Developed an agentic AI helpdesk assistant in Microsoft Copilot Studio that classifies, triages, and drafts responses to inbound IT support emails across 250+ retail store locations, automating 60% of routine ticket workflows',
      'Engineered intent-classification topics with knowledge-grounded answers over internal IT documentation, integrating Outlook and Power Automate to auto-route 150+ emails/week and cut first-response time by 40%',
      'Designed escalation guardrails handing off low-confidence cases to analysts with structured summaries, maintaining 92% routing accuracy in testing'
    ]
  },
  {
    title: 'Founder',
    company: 'Revierelle',
    link: 'https://github.com/chloewychan/reverielle',
    period: '2026 – Present',
    location: 'Toronto, ON',
    highlights: [
      'Designed makeup tutorials for non-Eurocentric and nontraditional makeup forms, celebrating features beyond mainstream beauty standards and building user confidence in their own look',
      'Founded an AI makeup-tutoring app, securing $1,000 in grant funding and growing to 50+ beta users; built the core agentic loop where Claude Vision analyzes face shape, eye geometry, and skin tone to generate personalized tutorials',
      "Engineered real-time AR makeup try-on by mapping DeepAR render layers onto MediaPipe Face Mesh's 468 facial landmarks, on-device in a React Native/Expo app backed by Supabase (Postgres, Auth, Storage)",
      'Architected an end-to-end makeup agent that autonomously plans, renders, and verifies complete looks: decomposes a target look into ordered application steps, streams matching AR overlays per step, and re-analyzes user photos mid-tutorial to adapt remaining steps, achieving 88% step-completion accuracy in testing'
    ]
  },
  {
    title: 'Developer',
    company: 'Oakville & Milton Humane Society',
    period: 'May 2026 – Present',
    location: 'Oakville, ON',
    highlights: [
      'Developed a volunteer task-management web application in React and TypeScript, building interactive task views with a detailed TaskDetailsModal that streamlined shift coordination for 80+ volunteers',
      'Implemented backend fixes and delete functionality for one-time and recurring tasks, reducing stale and duplicate task records by 35% and improving scheduling data integrity'
    ]
  },
  {
    title: 'Software Engineer',
    company: 'Biomechatronics Design Team',
    period: 'Sept 2025 – Present',
    location: 'Waterloo, ON',
    highlights: [
      'Developed EMG electrode systems that capture muscle-activation signals for assistive-movement control in muscular dystrophy patients, achieving 90% successful signal-capture rate across 23 users using Arduino C++',
      'Built signal-processing algorithms filtering noise from raw EMG voltage data, feeding cleaned signals into Python machine-learning models that achieved 18% improvement in gesture classification accuracy'
    ]
  }
];

const projects = [
  {
    name: 'TrulyHer',
    github: 'https://github.com/ErinGu0/TrulyHer',
    image: '/trulyher-preview.jpg',
    tech: ['React', 'Node.js', 'Tailwind CSS', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'Gemini 2.5 Flash API'],
    highlights: [
      'Architected an AI-powered platform that identifies impostor-syndrome stress triggers for 220+ women in tech, achieving a 97% satisfaction rate through personalized AI-driven recommendations and analysis',
      'Created a responsive analytics dashboard displaying emotional-trend insights across user journals, driving a 19% improvement on the CIPS scale, backed by sub-2-second serverless AWS response times'
    ],
    stats: [
      { value: '220+', label: 'Women Supported' },
      { value: '97%', label: 'Satisfaction Rate' },
      { value: '19%', label: 'CIPS Improvement' }
    ]
  },
  {
    name: 'StoryBridge',
    github: 'https://github.com/ErinGu0/StoryBridge',
    image: '/image_8f83ff.png',
    tech: ['JavaScript', 'React.js', 'TanStack Query', 'Gemini API', 'IndexedDB', 'Vite', 'Tailwind CSS'],
    highlights: [
      'Developed caregiver-guided storytelling app using Gemini API for dementia-friendly prompts and AI illustrations from 100+ patients, achieving 25% increase in family connection',
      'Implemented multi-format story generation with React and IndexedDB caching, enabling permanent client-side image storage without errors',
      'Piloted through Waterloo Dementia Youth Alliance, achieving 4.8/5 effectiveness rating from 20+ caregivers'
    ],
    stats: [
      { value: '100+', label: 'Patients' },
      { value: '25%', label: 'Connection Increase' },
      { value: '4.8/5', label: 'Rating' }
    ]
  },
  {
    name: 'ClearPharma',
    github: 'https://github.com/wrufay/clearpharma',
    image: '/image_8f83e5.png',
    tech: ['React', 'HTML', 'CSS', 'Firebase', 'Gemini 2.5 Flash API'],
    highlights: [
      'Architected an HTML/CSS/React front-end for a medication-management platform that integrates Gemini 2.5 Flash API with the Canadian National Drug Database to deliver verified drug information and support pharmacist communication',
      'Implemented real-time Firebase messaging enabling secure patient-pharmacist communication and medication-adherence tracking, validated by 30+ users for improved accessibility and reliability'
    ],
    stats: [
      { value: '30+', label: 'Users Validated' },
      { value: 'Real-time', label: 'Messaging' }
    ]
  },
  {
    name: 'Fluent Friends',
    github: 'https://github.com/ErinGu0/Fluent-Friends',
    image: '/image_8f8403.png',
    tech: ['Node.js', 'Firebase', 'ChatGPT API', 'PostgreSQL', 'Figma'],
    highlights: [
      'Developed a mentorship platform for 50+ ESL learners, implementing an interest-based matching workflow using Firebase and PostgreSQL to pair students with compatible mentors',
      'Integrated ChatGPT API to generate structured conversation prompts and real-time language guidance, achieving 15% improvement in mentee confidence with English soft skills'
    ],
    stats: [
      { value: '50+', label: 'Students' },
      { value: '15%', label: 'Confidence Boost' }
    ]
  }
];

// Staggered, blurred rise-in used to make the Experience section feel like
// it's condensing out of the water once the wave overlay clears, rather
// than simply popping into view. This is only used for the section that
// sits directly under the hero (the first thing the wave reveals) - every
// section further down the page uses ordinary scroll-triggered whileInView
// instead, since those are naturally out of view until the user scrolls.
const revealContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};
const revealItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(14px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
};

function EducationSectionContent() {
  const leadership = [
    { role: 'PR Officer', org: 'Women in Mathematics', desc: 'Leading outreach initiatives to empower women in STEM fields' },
    { role: 'Co-organizer', org: 'Waterloo Dementia Youth Alliance', desc: 'Bridging generational gaps through dementia awareness programs' },
    { role: 'First Year Rep', org: 'Neuroscience Association', desc: 'Connecting students with research opportunities in neuroscience' },
    { role: 'VP Finance', org: 'Underwater Hockey Club', desc: 'Managing club budget and organizing competitive tournaments' },
    { role: 'Co-Founder', org: 'Hope for Hearing - Waterloo', desc: 'Fundraising for cochlear implant access and hearing research' },
    { role: '120+ Hours Volunteer', org: 'Alzheimer Society - Circle of Music', desc: 'Supporting individuals with dementia through music therapy sessions' }
  ];
  const languages = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'HTML', 'CSS'];
  const frameworks = ['React', 'React Native', 'Node.js', 'Expo', 'Tailwind CSS', 'LangChain', 'PostgreSQL', 'Supabase', 'Firebase', 'AWS', 'Microsoft Copilot Studio', 'Claude API', 'Gemini API', 'OpenAI API', 'Powershell', 'Linux', 'Windows'];

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 28, filter: 'blur(14px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }
  });

  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.div {...fadeUp(0)} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Education & Qualifications</h2>
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </motion.div>

      <motion.div {...fadeUp(0.05)} className="mb-12">
        <div className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5EEAFF]/30 to-[#5EEAFF]/10 border border-[#5EEAFF]/30">
              <GraduationCap className="w-7 h-7 text-[#5EEAFF]" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Education</h3>
          </div>
          <div>
            <h4 className="text-xl text-white font-semibold">University of Waterloo</h4>
            <p className="text-[#5EEAFF] font-medium mt-1">Bachelor of Computer Science, Minor in Cognitive Science</p>
            <p className="text-white/70 text-sm mt-2">GPA: 3.86/4.0</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-white/50 text-sm">Waterloo, ON</p>
              <p className="text-white/50 text-sm">e46guo@uwaterloo.ca</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.1)} className="mb-12">
        <h3 className="text-2xl font-semibold text-white text-center mb-8">Awards & Recognition</h3>
        <AwardsWave />
      </motion.div>

      <motion.div {...fadeUp(0.15)} className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5EEAFF]/30 to-[#5EEAFF]/10 border border-[#5EEAFF]/30">
              <Code className="w-7 h-7 text-[#5EEAFF]" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Programming Languages</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {languages.map((lang) => (
              <div key={lang} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#5EEAFF]/20 to-[#5EEAFF]/10 border border-[#5EEAFF]/30 text-[#5EEAFF] font-medium text-sm">
                {lang}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5E6D3]/30 to-[#F5E6D3]/10 border border-[#F5E6D3]/30">
              <Wrench className="w-7 h-7 text-[#F5E6D3]" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Frameworks & Tools</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {frameworks.map((framework) => (
              <div key={framework} className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5E6D3]/20 to-[#F5E6D3]/10 border border-[#F5E6D3]/30 text-[#F5E6D3] font-medium text-sm">
                {framework}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.2)} className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5EEAFF]/30 to-[#5EEAFF]/10 border border-[#5EEAFF]/30">
            <Users className="w-7 h-7 text-[#5EEAFF]" />
          </div>
          <h3 className="text-2xl font-semibold text-white">Leadership & Community</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {leadership.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/8 to-white/3 border border-white/15 hover:border-[#5EEAFF]/30 transition-colors duration-300">
              <p className="text-[#5EEAFF] font-bold text-base mb-2">{item.role}</p>
              <p className="text-white font-medium text-sm mb-2">{item.org}</p>
              <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  // waveProgress is the *smoothed, displayed* value (0 -> 1). targetRef is
  // where the wheel wants it to be; a rAF loop eases waveProgress toward it
  // every frame so the wave rises/recedes fluidly instead of snapping
  // directly to each wheel tick.
  const [waveProgress, setWaveProgress] = useState(0);
  const [introActive, setIntroActive] = useState(true);
  // scrollLocked stays true slightly longer than introActive: once the wave
  // finishes, we keep swallowing scroll input for a beat so the newly
  // revealed Experience section doesn't get scrolled straight past by
  // leftover wheel/trackpad momentum from finishing the gesture.
  const [scrollLocked, setScrollLocked] = useState(true);
  const [contentRevealed, setContentRevealed] = useState(false);
  const targetRef = useRef(0);
  const rafRef = useRef(null);
  const settleTimerRef = useRef(null);
  const lastWheelAtRef = useRef(0);
  const unlockCheckRef = useRef(null);
  // Read via a ref inside the wheel handler instead of putting introActive
  // in the effect's dependency array. Re-running the effect on every
  // introActive change would tear down and re-add the wheel listener right
  // at the wave-to-reveal handoff - that churn opened a brief window where
  // Chromium's compositor-thread fast-scroll path could slip a real scroll
  // through before the main-thread handler was reattached, letting the
  // page jump past the newly-revealed section despite preventDefault().
  const introActiveRef = useRef(true);
  useEffect(() => {
    introActiveRef.current = introActive;
  }, [introActive]);

  // Touch devices (phones/tablets) get a fundamentally different intro from
  // desktop. `height` (what drives the wave's growth) is a layout property,
  // which can only ever be animated on the main JS thread - no matter
  // whether our own code, a CSS transition, or Framer drives it. iOS Safari
  // deprioritizes main-thread JS for a stretch during an active touch
  // gesture, while compositor-only animations elsewhere (the turtle, the
  // bubbles - transform/opacity, which CAN run independent of the main
  // thread) keep playing regardless. That's what caused the dive to stall
  // and then snap straight to "done" without ever visibly completing - no
  // amount of clever per-frame math can make a main-thread-bound property
  // animate during a stretch where the main thread isn't running at all.
  //
  // So touch doesn't drive `waveProgress` continuously at all. The first
  // meaningful touch movement just flips `autoPlay` to true once; from
  // there, WaveTransitionOverlay and HeroSection each play a single
  // declarative, compositor-driven (transform/opacity) animation with a
  // fixed duration, which the browser executes independently of our JS -
  // immune to the exact stall that broke the old approach. `onComplete`
  // (Framer's real animation-finished callback, not our own polling) is
  // what advances the intro once that plays out.
  const [autoPlay, setAutoPlay] = useState(false);
  const handleDiveComplete = () => {
    setWaveProgress(1);
    targetRef.current = 1;
    setIntroActive(false);
    // The generic post-intro unlock timer below waits for wheel/touch input
    // to "go quiet" - built for wheel/trackpad momentum, where more input
    // can keep arriving well after the gesture that triggered completion.
    // A touch dive has no such ambiguity: Framer's onAnimationComplete is a
    // definitive, already-finished signal, and the user's finger touching
    // the screen while it was playing would otherwise keep resetting that
    // quiet-timer, silently stretching the gap before Experience & Research
    // appears. Unlock immediately instead of routing through that wait.
    unlockPageScroll();
    setScrollLocked(false);
    setTimeout(() => setContentRevealed(true), 100);
  };

  useEffect(() => {
    if (!scrollLocked) return undefined;

    const handleWheel = (e) => {
      e.preventDefault();
      lastWheelAtRef.current = performance.now();
      if (!introActiveRef.current) return; // post-wave settle window: swallow input only

      // Firefox reports deltaY in "lines" (small integers like 1-3) while
      // Chrome/Edge report pixels (~100 per notch) - without normalizing,
      // the wave barely moves per scroll in Firefox, which feels broken.
      const pixelDelta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      const delta = Math.max(-100, Math.min(100, pixelDelta)) * 0.0014;
      targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
    };

    let touchStartY = null;
    let touchCommitted = false;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      e.preventDefault();
      lastWheelAtRef.current = performance.now();
      if (touchCommitted || !introActiveRef.current) return; // already committed, or in the post-wave settle window: swallow input only
      const currentY = e.touches[0].clientY;
      // Small threshold so an accidental tap-and-twitch doesn't trigger the
      // whole dive, but any real, deliberate swipe (a few pixels) does.
      if (touchStartY !== null && Math.abs(touchStartY - currentY) > 8) {
        touchCommitted = true;
        setAutoPlay(true);
      }
    };

    lockPageScroll();
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Damped-spring integrator (frame-rate independent via dt) instead of a
    // flat per-frame lerp: gives the water actual inertia - it eases into
    // motion and settles without a hard per-frame ratio, which reads as
    // noticeably smoother/more fluid than a fixed-percentage chase. Only
    // drives the wheel path - once autoPlay is true, this keeps running
    // harmlessly (targetRef is already 1) but the touch visuals are driven
    // by WaveTransitionOverlay/HeroSection's own declarative animations.
    let velocity = 0;
    let lastTime = null;
    const stiffness = 100;
    const damping = 20; // critically damped for stiffness=100, mass=1 - settles without overshoot/bounce

    const tick = (now) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      setWaveProgress((prev) => {
        const displacement = targetRef.current - prev;
        const acceleration = displacement * stiffness - velocity * damping;
        velocity += acceleration * dt;
        let next = prev + velocity * dt;
        if (Math.abs(targetRef.current - next) < 0.0006 && Math.abs(velocity) < 0.001) {
          next = targetRef.current;
          velocity = 0;
        }
        return Math.max(0, Math.min(1, next));
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrollLocked]);

  // Once the water has fully crested and settled, start dissolving the
  // intro overlay. The page's real scroll position never moved during any
  // of this (body stayed overflow:hidden the whole time), so the instant
  // this unlocks, the Experience & Research section is sitting exactly at
  // the top - it was always there at scrollY 0, just hidden behind this
  // overlay.
  useEffect(() => {
    if (!introActive) return undefined;

    if (waveProgress >= 0.995 && targetRef.current >= 1) {
      if (!settleTimerRef.current) {
        settleTimerRef.current = setTimeout(() => setIntroActive(false), 300);
      }
    } else if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    return () => {
      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
    };
  }, [waveProgress, introActive]);

  // After the overlay starts dissolving: reveal the Experience section
  // almost immediately, but keep the scroll lock engaged until wheel/touch
  // input actually goes quiet (rather than releasing on a fixed clock). A
  // real scroll gesture - or trackpad/touch momentum - can keep generating
  // events for well over a second after the wave completes; releasing on a
  // fixed timer regardless of that meant leftover momentum could carry the
  // page straight past the section that just finished revealing. A hard
  // cap still guarantees it never feels stuck.
  useEffect(() => {
    if (introActive) return undefined;
    if (autoPlay) return undefined; // handleDiveComplete already unlocked immediately - no momentum to wait out

    const introEndedAt = performance.now();
    lastWheelAtRef.current = introEndedAt;
    const revealTimer = setTimeout(() => setContentRevealed(true), 100);

    const MIN_DWELL = 500;
    const QUIET_GAP = 350;
    const MAX_WAIT = 2500;

    const checkUnlock = () => {
      const now = performance.now();
      const sinceIntroEnded = now - introEndedAt;
      const sinceLastWheel = now - lastWheelAtRef.current;
      if (sinceIntroEnded >= MIN_DWELL && (sinceLastWheel >= QUIET_GAP || sinceIntroEnded >= MAX_WAIT)) {
        unlockPageScroll();
        setScrollLocked(false);
      } else {
        unlockCheckRef.current = setTimeout(checkUnlock, 100);
      }
    };
    unlockCheckRef.current = setTimeout(checkUnlock, MIN_DWELL);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unlockCheckRef.current);
    };
  }, [introActive, autoPlay]);

  // Nav links (and the hero's "Get in Touch") have to work even while the
  // intro wave still owns the viewport - especially on mobile, where the
  // hamburger is the most natural first tap. scrollIntoView is a no-op
  // while the body is overflow:hidden, so first force-complete the intro
  // and restore scrolling, then jump to the section once unlocked.
  const handleNavigate = (id) => {
    const wasLocked = scrollLocked;
    if (wasLocked) {
      targetRef.current = 1;
      setWaveProgress(1);
      setIntroActive(false);
      setContentRevealed(true);
      setScrollLocked(false);
      unlockPageScroll();
    }
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, wasLocked ? 150 : 0);
  };

  return (
    <div className="min-h-screen bg-[#0D6B82]">
      <BubbleCursor />
      <Navigation onNavigate={handleNavigate} />

      <section id="experience" className="pt-24 pb-32 bg-gradient-to-b from-[#0D6B82] via-[#0A5A6E] to-[#084858]">
        <motion.div
          className="max-w-4xl mx-auto px-6 relative z-10"
          variants={revealContainer}
          initial="hidden"
          animate={contentRevealed ? 'visible' : 'hidden'}
        >
          <motion.div variants={revealItem} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Experience & Research</h2>
            <motion.div
          className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5EEAFF] via-[#5EEAFF]/50 to-transparent hidden md:block rounded-full" />

            <div className="space-y-8 md:pl-12">
              {experiences.map((exp, i) => (
                <motion.div key={i} variants={revealItem}>
                  <ExperienceCard experience={exp} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <OceanSection id="projects" className="py-32 bg-gradient-to-b from-[#084858] via-[#063845] to-[#052D38]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Featured Projects</h2>
            <motion.div
          className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </OceanSection>

      <OceanSection id="about" className="py-32 bg-gradient-to-b from-[#052D38] via-[#042530] to-[#031F29]">
        <EducationSectionContent />
      </OceanSection>

      <OceanSection id="contact" className="py-32 bg-gradient-to-b from-[#031F29] via-[#021820] to-[#01141A]">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Let's Connect</h2>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto mb-8"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            />

            <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm passionate about leveraging technology to create meaningful impact in healthcare, education, and beyond.
              Let's collaborate on something extraordinary.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="mailto:guoe215@gmail.com"
                className="flex items-center gap-3 px-8 py-5 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-[#5EEAFF]/50 transition-colors duration-300 shadow-xl group"
              >
                <Mail className="w-6 h-6 text-[#5EEAFF]" />
                <span className="text-white font-medium">guoe215@gmail.com</span>
              </a>

              <a
                href="tel:226-988-5819"
                className="flex items-center gap-3 px-8 py-5 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl hover:border-[#5EEAFF]/50 transition-colors duration-300 shadow-xl group"
              >
                <Phone className="w-6 h-6 text-[#5EEAFF]" />
                <span className="text-white font-medium">226-988-5819</span>
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/ErinGu0"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-gradient-to-br from-white/12 to-white/5 border border-white/20 hover:border-[#5EEAFF]/50 hover:bg-[#5EEAFF]/10 transition-colors duration-300 shadow-xl"
              >
                <Github className="w-7 h-7 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/erin-guo-6a2760291/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-gradient-to-br from-white/12 to-white/5 border border-white/20 hover:border-[#5EEAFF]/50 hover:bg-[#5EEAFF]/10 transition-colors duration-300 shadow-xl"
              >
                <Linkedin className="w-7 h-7 text-white" />
              </a>
            </div>
          </motion.div>
        </div>
      </OceanSection>

      <footer className="py-8 border-t border-white/10 bg-[#01141A] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/40 text-sm">
            © 2025 Erin Guo. Crafted with passion for meaningful technology.
          </p>
        </div>
      </footer>

      {/* Intro wave sequence: sits on top of the real page and dissolves
          away once the water fully crests, revealing the page beneath it
          (which has already begun its own wave-in reveal) rather than
          swapping to a separate duplicate view. */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            className="fixed inset-0 z-40"
            exit={{ opacity: 0, filter: 'blur(24px)' }}
            // Shortened from 0.7s - once the dive/wave has already taken
            // its time, the dissolve into the page itself should feel
            // snappy, not add another long beat to the ending.
            transition={{ duration: 0.4, ease: [0.6, 0.05, 0.15, 1] }}
          >
            <div className="fixed inset-0 z-10">
              <HeroSection wash={waveProgress} onNavigate={handleNavigate} autoPlay={autoPlay} />
            </div>
            <WaveTransitionOverlay
              progress={waveProgress}
              complete={waveProgress >= 0.995}
              autoPlay={autoPlay}
              onComplete={handleDiveComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
