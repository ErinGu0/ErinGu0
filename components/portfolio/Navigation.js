import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const navItems = ['About', 'Experience', 'Projects', 'Contact'];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#1A6B7A]/90 backdrop-blur-lg shadow-lg' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.span
              className="text-xl font-light text-white tracking-wider"
              whileHover={{ scale: 1.05 }}
            >
              EG
            </motion.span>
            
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm text-white/70 hover:text-white transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#88C5CC] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>
            
            {/* Social links */}
            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/ErinGu0" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/erin-guo-6a2760291/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:guoe215@gmail.com" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#1A6B7A]/95 backdrop-blur-lg pt-20 px-6"
          >
            <div className="flex flex-col items-center gap-6 mt-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollToSection(item)}
                  className="text-2xl text-white/80 hover:text-white transition-colors"
                >
                  {item}
                </motion.button>
              ))}
              
              <div className="flex items-center gap-6 mt-8">
                <a href="https://github.com/ErinGu0" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/in/erin-guo-6a2760291/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:guoe215@gmail.com" className="text-white/60 hover:text-[#88C5CC] transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}