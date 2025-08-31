import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function AnimatedParticles(props) {
  const ref = useRef();
  const sphere = useMemo(() => {
    const positions = new Float32Array(1500);
    for (let i = 0; i < 1500; i += 3) {
      const radius = Math.random() * 1.5 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function TypewriterText({ text, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.05,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Hero() {
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(0.3);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-railway-dark"
      style={{ transform: `translateY(${parallaxY}px)` }}
    >
      {/* 3D Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          opacity: scrollDirection === 'down' ? 0.7 : 1,
          scale: scrollDirection === 'down' ? 1.1 : 1
        }}
        transition={{ duration: 0.8 }}
      >
        <Canvas camera={{ position: [0, 0, 1] }}>
          <AnimatedParticles />
        </Canvas>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h1 className="text-hero font-black text-railway-text mb-6 tracking-tight">
            Chandra Priyan K
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <p className="text-xl md:text-2xl text-railway-muted font-medium mb-8 max-w-2xl mx-auto">
              Full-Stack Developer crafting scalable web applications with modern technologies
            </p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={scrollToAbout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-railway-purple text-white px-8 py-4 rounded-xl font-semibold hover:bg-railway-pink transition-all duration-300 shadow-lg"
          >
            View My Work
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-railway-border text-railway-text px-8 py-4 rounded-xl font-semibold hover:border-railway-purple hover:text-railway-purple transition-all duration-300"
          >
            Download Resume
          </motion.button>
        </div>

      </div>
    </section>
  );
}

export default Hero;
