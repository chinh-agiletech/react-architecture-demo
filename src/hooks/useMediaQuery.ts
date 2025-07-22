import { useCallback, useEffect, useState } from 'react';

/**
 * Hook for managing media queries
 * @param query The media query to check
 * @returns Boolean indicating if the media query matches
 */
const useMediaQuery = (query: string): boolean => {
  const getMatches = useCallback((query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  }, []);

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Handle change
    const handleChange = () => {
      setMatches(getMatches(query));
    };

    // Listen for changes
    if (matchMedia.addListener) {
      // Deprecated but needed for older browsers
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    // Update on mount
    handleChange();

    // Clean up
    return () => {
      if (matchMedia.removeListener) {
        // Deprecated but needed for older browsers
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [query, getMatches]);

  return matches;
};

export default useMediaQuery;
