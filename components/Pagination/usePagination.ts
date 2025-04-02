import { useState, useMemo, useEffect } from 'react';

export function usePagination<T>(
  data: T[] = [],
  itemsPerPage: number,
  hasFixedItem: boolean = false
) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (hasFixedItem) {
      const firstPageCount = itemsPerPage - 1;
      const restCount = data.length - firstPageCount;
      if (restCount <= 0) return 1;
      return 1 + Math.ceil(restCount / itemsPerPage);
    }
    return Math.max(1, Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage, hasFixedItem]);

  const goToPrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return {
    currentPage,
    totalPages,
    goToPrev,
    goToNext,
  };
}
