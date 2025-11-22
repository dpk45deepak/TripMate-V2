import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);

      // Set initial value
      setMatches(media.matches);

      // Create event listener function
      const listener = (e) => setMatches(e.matches);

      // Add listener
      media.addListener(listener);

      // Clean up
      return () => media.removeListener(listener);
    }
  }, [query]);

  return matches;
}

// Common media queries
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');
