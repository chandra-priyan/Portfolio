import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ScrollIndicator() {
  const { scrollY, currentSection } = useScrollAnimation();
  
  const sections = ['Hero', 'About', 'Education', 'Projects', 'Skills', 'Achievements', 'Contact'];
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      {/* Progress Bar */}
      <div className="w-1 h-64 bg-black-border rounded-full overflow-hidden mb-4">
        <motion.div
          className="w-full bg-gradient-to-b from-violet-primary to-violet-accent rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>
      
      {/* Section Indicators */}
      <div className="space-y-3">
        {sections.map((section, index) => (
          <motion.div
            key={section}
            className="flex items-center space-x-3 group cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              const element = document.getElementById(section.toLowerCase());
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                currentSection === index
                  ? 'bg-violet-primary border-violet-primary shadow-lg shadow-violet-primary/50'
                  : 'border-violet-primary hover:bg-violet-primary/30'
              }`}
              animate={{
                scale: currentSection === index ? 1.2 : 1,
              }}
            />
            <motion.span
              className={`text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                currentSection === index ? 'text-violet-primary' : 'text-gray-text'
              }`}
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              {section}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ScrollIndicator;
