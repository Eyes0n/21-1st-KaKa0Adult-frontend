import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (
  page,
  totalPageCount,
  fetcher,
  updatePageFn,
  margin = 800
) => {
  useEffect(() => {
    console.log('page', page);
    if (page !== 1 && page <= totalPageCount) {
      fetcher();
    }
  }, [fetcher, page, totalPageCount]);

  const infiniteScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - margin &&
      page < totalPageCount
    ) {
      updatePageFn();
    }
  }, [margin, page, updatePageFn, totalPageCount]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [infiniteScroll]);
};

export default useInfiniteScroll;
