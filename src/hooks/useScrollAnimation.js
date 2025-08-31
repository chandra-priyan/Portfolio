import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollY = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      setScrollY(scrollY);
      setScrollDirection(direction);
      
      // Calculate current section based on scroll position
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scrollY / windowHeight);
      setCurrentSection(sectionIndex);
      
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollY, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollY);
  }, []);

  return { scrollY, scrollDirection, currentSection };
};

export const useParallax = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
};
