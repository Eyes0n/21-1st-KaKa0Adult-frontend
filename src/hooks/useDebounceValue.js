import { useState, useEffect } from 'react';

const useDebounceValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    let timer;

    if (delay) {
      timer = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounceValue;
