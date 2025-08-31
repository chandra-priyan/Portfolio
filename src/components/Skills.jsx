import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function SkillOrb({ skill, position, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime + position[1]) * 0.1;
      meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime + position[2]) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </Sphere>
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.15}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
}

function SkillsGlobe() {
  const globeRef = useRef();
  
  const skills = useMemo(() => [
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
    { name: 'MySQL', icon: '🐬', color: '#4479A1' },
    { name: 'C', icon: '🔧', color: '#A8B9CC' },
  ], []);

  const skillPositions = useMemo(() => {
    return skills.map((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 2;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
      ];
    });
  }, [skills]);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Central wireframe sphere */}
      <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
      </Sphere>
      
      {/* Skill orbs */}
      {skills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          position={skillPositions[index]}
          color="#a78bfa"
        />
      ))}
    </group>
  );
}

function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(0.25);

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["C", "Java", "JavaScript", "HTML", "CSS"],
      color: "text-violet-primary"
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React.js", "Node.js"],
      color: "text-violet-secondary"
    },
    {
      title: "Databases",
      skills: ["MongoDB", "MySQL"],
      color: "text-violet-accent"
    },
    {
      title: "Tools & Platforms",
      skills: ["VS Code", "GitHub", "Canva"],
      color: "text-violet-dark"
    }
  ];

  return (
    <motion.section 
      id="skills"
      className="min-h-screen py-20 px-4 bg-gradient-to-b from-black-secondary to-black-primary"
      style={{ transform: `translateY(${parallaxY}px)` }}
      animate={{
        rotateX: scrollDirection === 'down' ? 2 : 0,
        opacity: scrollDirection === 'down' ? 0.9 : 1
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
            Skills
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Technologies I use to build exceptional products
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-96 w-full"
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} />
              <SkillsGlobe />
            </Canvas>
          </motion.div>

          {/* Skills List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-railway-gray p-6 rounded-2xl border border-railway-border text-center shadow-xl hover:border-railway-purple transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-railway-text mb-4">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-railway-dark text-railway-muted rounded-xl border border-railway-border hover:border-railway-purple hover:text-railway-purple transition-all duration-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default Skills;
