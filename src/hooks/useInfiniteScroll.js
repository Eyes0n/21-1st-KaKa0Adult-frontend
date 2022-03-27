import { useState, useEffect, useCallback } from 'react';
import useThrottle from './useThrottle';

const useInfiniteScroll = (fetcher, margin = 1000) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    try {
      if (!isFetching) return;
      fetcher();
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, fetcher, margin]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - margin
    ) {
      setIsFetching(true);
    }
  }, [margin]);

  const throttledScroll = useThrottle(handleScroll, 500);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
