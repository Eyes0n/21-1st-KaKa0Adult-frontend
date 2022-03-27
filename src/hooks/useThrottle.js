import { useRef, useCallback } from 'react';

const useThrottle = (fn, threshold) => {
  const throttleId = useRef(null);

  const throttledFn = useCallback(
    (...args) => {
      if (!throttleId.current) {
        throttleId.current = setTimeout(() => {
          throttleId.current = null;
          fn(...args);
        }, threshold);
      }
    },
    [fn, threshold]
  );

  return throttledFn;
};

export default useThrottle;
