import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/reveal.css';

/**
 * ScrollReveal Component
 *
 * Efficiently triggers directional reveal animations as elements enter the viewport
 * using IntersectionObserver and CSS transitions.
 */
const ScrollReveal = ({
  children,
  direction = 'bottom', // 'left', 'right', 'top', 'bottom'
  delay = 0,            // ms
  duration = 600,       // ms
  distance = '60px',    // px, rem, etc.
  threshold = 0.1,      // 0.0 to 1.0
  once = true,          // animate only once
  className = '',
  style: extraStyle = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // If user prefers reduced motion, trigger immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        }
      });
    }, {
      threshold,
      // Optional: add rootMargin to trigger slightly before/after viewport
      rootMargin: '0px 0px -50px 0px'
    });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold, once]);

  const getInitialTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';

    // Subtle scale .98 makes it look more "settled" when it reaches 1
    const scale = 'scale(0.98)';
    switch (direction) {
      case 'left': return `translateX(-${distance}) ${scale}`;
      case 'right': return `translateX(${distance}) ${scale}`;
      case 'top': return `translateY(-${distance}) ${scale}`;
      case 'bottom': return `translateY(${distance}) ${scale}`;
      default: return `translateY(${distance}) ${scale}`;
    }
  };

  const revealStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transform: getInitialTransform(),
    opacity: isVisible ? 1 : 0,
    ...extraStyle,
  };

  return (
    <div
      ref={domRef}
      className={`scroll-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={revealStyle}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
