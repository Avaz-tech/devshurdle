"use client";

import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath = "/blog" }: PaginationProps) {

  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    if (page <= 1) {
      return basePath;
    }
    return `${basePath}?page=${page}`;
  };

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-between gap-4 mt-10" aria-label="Pagination">
      <Link
        href={canGoPrev ? createPageUrl(currentPage - 1) : "#"}
        aria-disabled={!canGoPrev}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          canGoPrev
            ? "border-border text-foreground hover:border-mainColor hover:bg-mainColor/5"
            : "border-border/60 text-muted-foreground cursor-not-allowed"
        }`}
      >
        <FiChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Link>

      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          typeof p === "number" ? (
            <Link
              key={idx}
              href={createPageUrl(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`inline-flex h-9 min-w-9 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors ${
                p === currentPage
                  ? "border-mainColor bg-mainColor text-white"
                  : "border-border text-foreground hover:border-mainColor hover:bg-mainColor/5"
              }`}
            >
              {p}
            </Link>
          ) : (
            <span key={idx} className="px-2 text-sm text-muted-foreground">
              {p}
            </span>
          ),
        )}
      </div>

      <Link
        href={canGoNext ? createPageUrl(currentPage + 1) : "#"}
        aria-disabled={!canGoNext}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          canGoNext
            ? "border-border text-foreground hover:border-mainColor hover:bg-mainColor/5"
            : "border-border/60 text-muted-foreground cursor-not-allowed"
        }`}
      >
        <span>Next</span>
        <FiChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}


