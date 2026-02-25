import { useState, useEffect } from 'react';

// Custom hook for debouncing values
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for throttling functions
export const useThrottle = (callback, delay) => {
  const [lastCall, setLastCall] = useState(0);

  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      setLastCall(now);
      callback(...args);
    }
  };
};

// Custom hook for lazy loading images
export const useImageLazyLoad = (src, placeholder = '/placeholder.jpg') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
    
    img.onerror = () => {
      setImageSrc(placeholder);
      setLoaded(false);
    };
  }, [src, placeholder]);

  return { imageSrc, loaded };
};

// Custom hook for infinite scroll
export const useInfiniteScroll = (callback, options = {}) => {
  const { threshold = 100, rootMargin = '0px' } = options;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 0.1, rootMargin }
    );

    const sentinel = document.getElementById('sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [callback, rootMargin, threshold]);
};

// Custom hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now();
    setMetrics(prev => ({ ...prev, loadTime }));

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      const memory = performance.memory;
      setMetrics(prev => ({ 
        ...prev, 
        memoryUsage: Math.round(memory.usedJSHeapSize / 1048576) // MB
      }));
    }

    // Monitor FPS
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({ ...prev, fps: frameCount }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }, []);

  return metrics;
};