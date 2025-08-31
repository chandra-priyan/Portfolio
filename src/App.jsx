import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import ScrollIndicator from './components/ScrollIndicator';

function App() {
  return (
    <div className="App bg-black-primary text-gray-text">
      <ScrollIndicator />
      <Hero />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
