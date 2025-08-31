import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

function ProjectCard3D({ project, index, inView }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color={project.color} wireframe />
    </Box>
  );
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-railway-gray border border-railway-border rounded-2xl p-8 hover:border-railway-purple transition-all duration-300 group shadow-xl hover:shadow-2xl overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <ProjectCard3D project={project} index={index} inView={inView} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="text-title font-bold text-railway-text mb-3">{project.title}</h3>
        <p className="text-railway-muted mb-6 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="inline-block bg-railway-purple/10 text-railway-purple px-4 py-2 rounded-full text-sm font-medium border border-railway-purple/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-railway-purple text-white px-6 py-3 rounded-xl font-semibold hover:bg-railway-pink transition-all duration-300 shadow-lg"
          >
            View Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-railway-border text-railway-text px-6 py-3 rounded-xl font-semibold hover:border-railway-purple hover:text-railway-purple transition-all duration-300"
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { scrollDirection } = useScrollAnimation();
  const parallaxY = useParallax(-0.15);

  const projectsData = [
    {
      title: "Turf Booking System",
      year: "2025",
      description: "Web-based system with real-time slot booking, role-based access (Admin, Turf Owner, User), secure authentication, calendar scheduling, booking management, and optional online payments.",
      techStack: ["React.js", "Node.js", "MongoDB"],
      color: "#00f5ff"
    },
    {
      title: "Meme Generator",
      year: "2025",
      description: "Built with React & Vite. Real-time meme creation with dynamic text overlays, customizable templates, and MongoDB Atlas authentication.",
      techStack: ["React.js", "Node.js", "MongoDB"],
      color: "#39ff14"
    },
    {
      title: "Expense Tracker",
      year: "2025",
      description: "Simple expense tracker with React for state management. Users can add, view, and delete expenses with real-time updates.",
      techStack: ["React.js", "MongoDB"],
      color: "#ff073a"
    },
    {
      title: "E-commerce Application",
      year: "2024",
      description: "Users can browse products, add to cart, and place orders. Includes login, product management, and checkout system.",
      techStack: ["Java", "MySQL"],
      color: "#bf00ff"
    }
  ];

  return (
    <motion.section 
      id="projects"
      className="min-h-screen py-20 px-4"
      style={{ transform: `translateY(${parallaxY}px)` }}
      animate={{
        backgroundColor: scrollDirection === 'down' ? '#0f0f0f' : '#000000',
        scale: scrollDirection === 'down' ? 1.02 : 1
      }}
      transition={{ duration: 0.8 }}
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
            Projects
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Crafting digital solutions that solve real-world problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;
