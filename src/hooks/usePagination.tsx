import { useCallback, useEffect, useMemo, useState } from "react";

const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset page if data changes or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [data, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return data.slice(startIdx, endIdx);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  // Generate page numbers for pagination UI
  const getPageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5; // Number of page numbers to show directly

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show first page

      if (currentPage > 3) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      pages.push(totalPages); // Always show last page
    }

    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
    totalItems,
    getPageNumbers,
  };
};

export default usePagination;
