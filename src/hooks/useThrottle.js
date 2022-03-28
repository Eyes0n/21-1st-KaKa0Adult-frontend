import { useRef } from 'react';

const useThrottle = (callback, threshold) => {
  const throttleId = useRef(null);

  const throttledFn = (...args) => {
    if (!throttleId.current) {
      throttleId.current = setTimeout(() => {
        throttleId.current = null;
        callback(...args);
      }, threshold);
    }
  };

  return throttledFn;
};

export default useThrottle;
