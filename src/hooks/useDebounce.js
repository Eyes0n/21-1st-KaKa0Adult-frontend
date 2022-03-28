import { useRef, useEffect, useState } from 'react';

const useDebounce = (value, threshold) => {
  const timerRef = useRef(null);
  const [debounce, setDebouce] = useState(null);

  useEffect(() => {
    if (typeof value === 'function') {
      setDebouce((...args) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          callback(...args);
          timerRef.current = null;
        }, threshold);
      });
    }

    if (threshold) {
      timerRef.current = setTimeout(() => {
        setDebouce(value);
      }, threshold);

      return () => clearTimeout(timerRef.current);
    }
  }, [value, threshold]);

  return debounce;
};

export default useDebounce;
