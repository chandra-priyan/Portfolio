import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function TimelineItem({ education, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
      <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="ml-12 bg-railway-gray p-8 rounded-2xl border border-railway-border hover:border-railway-blue transition-all duration-300 shadow-xl">
          <h3 className="text-title font-bold text-railway-text mb-2">{education.degree}</h3>
          <h4 className="text-lg text-railway-purple mb-2 font-semibold">{education.institution}</h4>
          <p className="text-railway-blue font-medium mb-2">{education.period}</p>
          <p className="text-railway-muted">{education.score}</p>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="hidden md:flex w-2/12 justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
          className="absolute left-4 w-4 h-4 bg-railway-purple rounded-full border-4 border-railway-dark z-10 shadow-lg shadow-railway-purple/50"
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}

function Education() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(0.1);

  const educationData = [
    {
      degree: "B.Tech (Information Technology)",
      institution: "Sri Eshwar College of Engineering",
      period: "2023 – 2027",
      score: "CGPA: 7.32 (3rd Sem)"
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "PDRV Matric Higher Secondary School",
      period: "2022 – 2023",
      score: "76.66%"
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "PDRV Matric Higher Secondary School",
      period: "2019 – 2020",
      score: "Pass"
    }
  ];

  return (
    <motion.section 
      id="education"
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-black-primary to-black-secondary"
      style={{ transform: `translateY(${parallaxY}px)` }}
      animate={{
        opacity: scrollDirection === 'down' ? 0.95 : 1,
        scale: scrollDirection === 'down' ? 0.98 : 1
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-display font-black text-railway-text mb-4 tracking-tight">
            Education
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Academic foundation driving my technical expertise
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-railway-purple via-railway-pink to-railway-blue"></div>

          {/* Timeline items */}
          {educationData.map((education, index) => (
            <TimelineItem
              key={index}
              education={education}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Education;
