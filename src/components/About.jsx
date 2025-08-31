import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function SkillsCube() {
  const meshRef = useRef();
  const skills = ['React', 'Node.js', 'MongoDB', 'Java', 'MySQL', 'C'];

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={meshRef}>
      <Box args={[2, 2, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8b5cf6" wireframe />
      </Box>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Text
            key={skill}
            position={[x, 0, z]}
            fontSize={0.3}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
    </group>
  );
}

function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(-0.2);

  return (
    <motion.section 
      id="about" 
      className="min-h-screen py-32 px-4 bg-railway-dark"
      style={{ transform: `translateY(${parallaxY}px)` }}
      animate={{
        backgroundColor: scrollDirection === 'down' ? '#0a0a0a' : '#000000'
      }}
      transition={{ duration: 1 }}
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
            About
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Passionate developer building the future of web applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <div className="bg-railway-gray p-6 rounded-2xl border border-railway-border">
                <h3 className="text-xl font-bold text-railway-text mb-3">Current Focus</h3>
                <p className="text-railway-muted leading-relaxed">
                  B.Tech Information Technology student at Sri Eshwar College of Engineering, 
                  specializing in <span className="text-railway-purple font-semibold">MERN stack development</span> 
                  and building scalable web applications.
                </p>
              </div>
              
              <div className="bg-railway-gray p-6 rounded-2xl border border-railway-border">
                <h3 className="text-xl font-bold text-railway-text mb-3">Problem Solver</h3>
                <p className="text-railway-muted leading-relaxed">
                  Competitive programming enthusiast with a 
                  <span className="text-railway-green font-semibold">LeetCode rating of 1566</span>. 
                  This foundation drives my approach to writing clean, efficient, and scalable code.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-railway-gray p-6 rounded-2xl border border-railway-border hover:border-railway-purple transition-all duration-300">
                <div className="text-2xl mb-2">📍</div>
                <h3 className="text-railway-text font-bold mb-1">Location</h3>
                <p className="text-railway-muted">Coimbatore, India</p>
              </div>
              <div className="bg-railway-gray p-6 rounded-2xl border border-railway-border hover:border-railway-blue transition-all duration-300">
                <div className="text-2xl mb-2">🎓</div>
                <h3 className="text-railway-text font-bold mb-1">Education</h3>
                <p className="text-railway-muted">B.Tech IT (2023-2027)</p>
              </div>
            </div>
          </motion.div>

          {/* 3D Skills Cube */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-96 w-full"
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <SkillsCube />
            </Canvas>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default About;
