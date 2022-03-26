import { useState, useEffect, useCallback } from 'react';

const useInfiniteScroll = (fetcher, margin = 800) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - margin
    ) {
      setIsFetching(true);
    }
  }, [margin]);

  useEffect(() => {
    try {
      if (!isFetching) return;
      fetcher();
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsFetching(false);
    }
  }, [isFetching, fetcher]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
