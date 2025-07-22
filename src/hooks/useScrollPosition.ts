import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks the window scroll position
 * @param throttleMs Optional throttle time in milliseconds
 * @returns Object containing x and y scroll position
 */
const useScrollPosition = (throttleMs = 100): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let ticking = false;
    
    const updatePosition = () => {
      setScrollPosition({ x: window.scrollX, y: window.scrollY });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    // Throttle the onScroll event
    const throttledScrollHandler = () => {
      const now = Date.now();
      
      if ((lastScrollTime.current + throttleMs) <= now) {
        lastScrollTime.current = now;
        onScroll();
      }
    };

    // Reference for the last scroll time
    const lastScrollTime = { current: 0 };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    
    // Call once to initialize
    updatePosition();
    
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttleMs]);

  return scrollPosition;
};

export default useScrollPosition;
