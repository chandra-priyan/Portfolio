import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function FloatingOrb({ position, color }) {
  const meshRef = React.useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.2, 16, 16]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </Sphere>
  );
}

function ContactForm({ inView }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <motion.input
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-4 bg-railway-gray border border-railway-border rounded-xl text-railway-text placeholder-railway-muted focus:border-railway-purple focus:outline-none transition-colors duration-300"
        />
      </div>
      
      <div>
        <motion.input
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full p-4 bg-railway-gray border border-railway-border rounded-xl text-railway-text placeholder-railway-muted focus:border-railway-purple focus:outline-none transition-colors duration-300"
        />
      </div>
      
      <div>
        <motion.textarea
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          required
          className="w-full p-4 bg-railway-gray border border-railway-border rounded-xl text-railway-text placeholder-railway-muted focus:border-railway-purple focus:outline-none resize-none transition-colors duration-300"
        />
      </div>
      
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-railway-purple text-white px-6 py-4 rounded-xl font-semibold hover:bg-railway-pink transition-all duration-300 shadow-lg"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
}

function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "chandrapriyan.k2023it@sece.ac.in",
      link: "mailto:chandrapriyan.k2023it@sece.ac.in"
    },
    {
      icon: "📱",
      label: "Phone",
      value: "+91 9360190441",
      link: "tel:+919360190441"
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "GitHub Profile",
      link: "#"
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "LinkedIn Profile",
      link: "#"
    }
  ];

  return (
    <motion.section 
      id="contact"
      className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          <FloatingOrb position={[-2, 0, 0]} color="#8b5cf6" />
          <FloatingOrb position={[2, 1, -1]} color="#ec4899" />
          <FloatingOrb position={[0, -2, 1]} color="#3b82f6" />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-display font-black text-railway-text mb-4 tracking-tight">
            Contact
          </h2>
          <p className="text-lg text-railway-muted max-w-2xl mx-auto">
            Let's build something exceptional together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-railway-text mb-5 md:mb-6">Get In Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-6 bg-railway-gray rounded-2xl border border-railway-border hover:border-railway-purple transition-all duration-300 group"
                  >
                    <span className="text-2xl">{contact.icon}</span>
                    <div>
                      <h4 className="font-semibold text-railway-text">{contact.label}</h4>
                      <p className="text-railway-muted">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Internship Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-railway-gray p-8 rounded-2xl border border-railway-border shadow-xl"
            >
              <h3 className="text-xl font-bold text-railway-text mb-4">Current Experience</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg text-railway-purple font-semibold">MERN Stack Internship</h4>
                  <p className="text-railway-muted">The Better Tomorrow</p>
                  <p className="text-sm text-railway-muted">
                    Hands-on experience in HTML, CSS, JavaScript, React.js, and full-stack development.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-railway-text mb-2">Open to Opportunities</h4>
                  <p className="text-railway-muted leading-relaxed">
                    Actively seeking internship opportunities in full-stack development.
                    Available for remote work and eager to contribute to innovative projects.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <div>
            <ContactForm inView={inView} />
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16 pt-8 border-t border-railway-border"
        >
          <p className="text-railway-muted">
            © 2025 Chandra Priyan K. Built with React, Three.js & Framer Motion
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
