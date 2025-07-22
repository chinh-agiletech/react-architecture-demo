import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook for handling pagination
 * @param initialPage The initial page number
 * @param itemsPerPage Number of items per page
 * @returns Pagination state and handler functions
 */
const usePagination = <T>(items: T[], itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Get current items
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Change page
  const goToPage = useCallback((page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }, [totalPages]);

  // Go to next page
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  // Go to previous page
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  }, [currentPage]);

  // Get pagination information text
  const paginationInfo = useCallback(() => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, items.length);
    return t('pagination.showing', { start, end, total: items.length });
  }, [currentPage, items.length, itemsPerPage, t]);

  return {
    currentPage,
    currentItems,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    paginationInfo,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

export default usePagination;
