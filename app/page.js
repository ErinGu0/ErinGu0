"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, GraduationCap, Users, Code, Wrench } from 'lucide-react';
import Navigation from '../components/portfolio/Navigation';
import HeroSection from '../components/portfolio/HeroSection';
import ExperienceCard from '../components/portfolio/ExperienceCard';
import ProjectCard from '../components/portfolio/ProjectCard';
import OceanSection from '../components/portfolio/OceanSection';
import BubbleCursor from '../components/portfolio/BubbleCursor';
import WaveTransitionOverlay from '../components/portfolio/WaveTransitionOverlay';
import EducationSection from '../components/portfolio/EducationSection';
import AwardsWave from '../components/portfolio/AwardsWave';

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Biomechatronics Design Team',
    period: 'Sept 2025 – Present',
    location: 'University of Waterloo',
    highlights: [
      'Collaborated to engineer reusable EMG electrode systems that reliably capture and process muscle-activation signals, integrating machine-learning pipelines to support real-time assistive-movement control',
      'Developed Arduino C++ signal-processing algorithms and Python automation pipelines that cleared and processed 1GB+ of electromyography data, improving data quality and reducing manual intervention',
      'Integrated and debugged real-time sensor systems alongside hardware engineers, capturing 100+ muscle-activity signals across 20 users while resolving noise, latency, and stability issues',
      'Conducted iterative testing with clinical advisors and patients to validate system reliability and usability, achieving a 90% successful signal-capture rate'
    ]
  },
  {
    title: 'Founder & Developer',
    company: 'TrulyHer',
    link: 'https://github.com/ErinGu0/TrulyHer',
    period: 'Sept 2025 – Present',
    location: 'Waterloo, ON',
    highlights: [
      'Architected AI-powered platform to flag and address imposter-syndrome patterns in women in tech, building an interactive dashboard to visualize emotional trends and identify stress triggers',
      'Developed full-stack application using React, Node.js, and Tailwind CSS with Gemini 2.5 Flash API sentiment analysis for personalized affirmation generation',
      'Deployed backend on AWS (Lambda, API Gateway, DynamoDB) to enable scalable data processing and secure user analytics',
      'Validated platform performance and user needs through 200+ user tests and interviews, achieving 4.5/5 satisfaction and 20% improvement in mental-health indicators'
    ]
  }
];

const projects = [
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

function EducationSectionContent() {
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

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Education & Recognition</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto" />
      </div>
      
      <div className="mb-12">
        <div className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#5EEAFF]/30 to-[#5EEAFF]/10 border border-[#5EEAFF]/30">
              <GraduationCap className="w-7 h-7 text-[#5EEAFF]" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Education</h3>
          </div>
          <div>
            <h4 className="text-xl text-white font-semibold">University of Waterloo</h4>
            <p className="text-[#5EEAFF] font-medium mt-1">Bachelor of Mathematics, Major in Computer Science</p>
            <p className="text-white/70 text-sm mt-2">Minor in Cognitive Science</p>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-white/50 text-sm">Expected May 2030</p>
              <p className="text-white/50 text-sm">Waterloo, ON</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white text-center mb-8">Awards & Recognition</h3>
        <AwardsWave />
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
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
      </div>
      
      <div className="bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl">
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
      </div>
    </div>
  );
}

export default function Home() {
  const [waveProgress, setWaveProgress] = useState(0);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      scrollUnlocked || e.preventDefault();
      
      scrollUnlocked || setWaveProgress(prev => {
        const delta = e.deltaY * 0.001;
        const newProgress = Math.max(0, Math.min(1, prev + delta));
        newProgress >= 0.95 && setTimeout(() => setScrollUnlocked(true), 300);
        return newProgress;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrollUnlocked]);

  const heroOpacity = 1 - (waveProgress * 2);
  const waveComplete = waveProgress >= 0.8;

  return scrollUnlocked ? (
    <div className="min-h-screen bg-[#052D38]">
      <BubbleCursor />
      <Navigation />
      
      <section id="about" className="pt-24 pb-32 bg-gradient-to-b from-[#0A5A6E] via-[#0D6B82] to-[#0A5A6E]">
        <EducationSectionContent />
      </section>
      
      <OceanSection id="experience" className="py-32 bg-gradient-to-b from-[#0A5A6E] via-[#084858] to-[#063845]">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Experience & Research</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto" />
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5EEAFF] via-[#5EEAFF]/50 to-transparent hidden md:block rounded-full" />
            
            <div className="space-y-8 md:pl-12">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <ExperienceCard experience={exp} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </OceanSection>
      
      <OceanSection id="projects" className="py-32 bg-gradient-to-b from-[#063845] via-[#052D38] to-[#0A5A6E]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Featured Projects</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto" />
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
      
      <OceanSection id="contact" className="py-32 bg-gradient-to-b from-[#0A5A6E] to-[#0D7A94]">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Let's Connect</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#5EEAFF] to-transparent mx-auto mb-8" />
            
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
      
      <footer className="py-8 border-t border-white/10 bg-[#0D7A94]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-white/40 text-sm">
            © 2025 Erin Guo. Crafted with passion for meaningful technology.
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <div className="min-h-screen bg-[#052D38] overflow-hidden">
      <BubbleCursor />
      <Navigation />
      
      <div 
        className="fixed inset-0 z-10"
        style={{ opacity: Math.max(0, heroOpacity) }}
      >
        <HeroSection />
      </div>
      
      <WaveTransitionOverlay waveProgress={waveProgress} />
      
      <EducationSection isVisible={waveComplete} waveProgress={waveProgress} />
    </div>
  );
}