import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function AnimatedCounter({ end, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-railway-purple">
      {count}{suffix}
    </span>
  );
}

function AchievementCard({ achievement, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="bg-railway-gray p-8 rounded-2xl border border-railway-border text-center hover:border-railway-purple transition-all duration-300 shadow-xl group"
    >
      <div className="text-center">
        <div className="mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gradient-to-br from-railway-purple to-railway-pink mb-4"
          >
            <span className="text-2xl">{achievement.icon}</span>
          </motion.div>
        </div>
        
        <h3 className="text-xl font-bold text-railway-text mb-2">
          {achievement.platform}
        </h3>
        
        <div className="mb-3">
          {achievement.animated ? (
            <AnimatedCounter end={achievement.value} suffix={achievement.suffix} />
          ) : (
            <div>
              <span className="text-4xl md:text-5xl font-bold text-railway-purple">
                {achievement.value}{achievement.suffix}
              </span>
              <h3 className="text-lg font-bold text-railway-text mb-2">{achievement.title}</h3>
              <p className="text-railway-muted text-sm">{achievement.description}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Achievements() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(-0.3);

  const achievementsData = [
    {
      platform: "LeetCode",
      value: 1566,
      suffix: "",
      description: "Highest Contest Rating",
      icon: "🏆",
      bgColor: "bg-gradient-to-br from-violet-primary to-violet-dark",
      animated: true,
      title: "Contest Rating"
    },
    {
      platform: "SkillRack",
      value: 220,
      suffix: "",
      description: "Problems Solved",
      icon: "💻",
      bgColor: "bg-gradient-to-br from-violet-secondary to-violet-primary",
      animated: true,
      title: "Problems Solved"
    },
    {
      platform: "HackerRank",
      value: 150,
      suffix: "+",
      description: "Problems Solved (C & Python)",
      icon: "🚀",
      bgColor: "bg-gradient-to-br from-violet-accent to-violet-secondary",
      animated: true,
      title: "Problems Solved"
    },
    {
      platform: "Certifications",
      value: 4,
      suffix: "",
      description: "Professional Certifications",
      icon: "📜",
      bgColor: "bg-gradient-to-br from-violet-dark to-violet-accent",
      animated: true,
      title: "Certifications"
    }
  ];

  const certifications = [
    "HTML, CSS, SQL (HackerRank)",
    "Data Structures & Algorithms using C/C++ (Udemy)",
    "AWS (Amazon Web Services)",
    "Frontend Developer (HackerRank)"
  ];

  return (
    <motion.section 
      id="achievements"
      className="min-h-screen py-32 px-4 bg-railway-dark"
      style={{ transform: `translateY(${parallaxY}px)` }}
      animate={{
        backgroundColor: scrollDirection === 'down' ? '#050505' : '#000000',
        rotateY: scrollDirection === 'down' ? 1 : 0
      }}
      transition={{ duration: 0.9 }}
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
            Achievements
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Milestones that define my technical journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={achievement.platform}
              achievement={achievement}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-railway-gray p-8 rounded-2xl border border-railway-border shadow-xl"
        >
          <h3 className="text-2xl font-bold text-railway-text text-center mb-8">
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-railway-dark transition-colors duration-300"
              >
                <span className="text-railway-green">✓</span>
                <span className="text-railway-muted">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Achievement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-center"
        >
          <div className="text-center mt-12 bg-gradient-to-r from-railway-purple via-railway-pink to-railway-blue p-8 rounded-2xl shadow-xl border border-railway-border">
            <h3 className="text-2xl font-bold text-white mb-4">
              Code Debugging Event Winner
            </h3>
            <p className="text-white/90 font-semibold">
              KIT College - First Place in Competitive Programming
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Achievements;
