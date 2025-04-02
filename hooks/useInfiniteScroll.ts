'use client';

import { useEffect, RefObject } from 'react';

interface UseInfiniteScrollProps<T extends HTMLElement> {
  scrollRef: RefObject<T | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  threshold?: number;
}

export const useInfiniteScroll = <T extends HTMLElement>({
  scrollRef,
  fetchNextPage,
  hasNextPage,
  threshold = 100,
}: UseInfiniteScrollProps<T>) => {
  useEffect(() => {
    const scrollElement = scrollRef.current;

    const handleScroll = () => {
      if (!scrollElement || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = scrollElement;

      if (scrollHeight - (scrollTop + clientHeight) < threshold) {
        fetchNextPage();
      }
    };

    scrollElement?.addEventListener('scroll', handleScroll);

    return () => {
      scrollElement?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, fetchNextPage, hasNextPage, threshold]);
};
