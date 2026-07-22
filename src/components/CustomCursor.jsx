import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth trailing spring animations
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 450, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile devices (touch screens) to disable custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button' ||
        target.closest('.interactive-node');
      
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    // Hide standard cursor
    document.body.classList.add('cursor-none');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('cursor-none');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Glowing spotlight Ring */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-7 h-7 rounded-full border border-purpleSoft pointer-events-none z-50 mix-blend-screen"
        animate={{
          scale: isHovered ? 1.6 : 1.0,
          backgroundColor: isHovered ? 'rgba(217, 70, 239, 0.15)' : 'rgba(168, 85, 247, 0)',
          borderColor: isHovered ? '#D946EF' : '#A855F7',
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.2 }}
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-1.5 h-1.5 rounded-full bg-purpleSoft pointer-events-none z-50"
        animate={{
          scale: isHovered ? 0.5 : 1.0,
        }}
      />
      {/* Soft spotlight behind cursor */}
      <motion.div
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed w-72 h-72 rounded-full pointer-events-none z-30 opacity-30 select-none"
        style={{
          position: 'fixed',
          width: '320px',
          height: '320px',
          left: cursorXSpring,
          top: cursorYSpring,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, rgba(217, 70, 239, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
    </>
  );
}
