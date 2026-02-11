"use client";
import Link from "next/link";

function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function Pagination({ page = 1, total = 2 }: { page?: number; total?: number }) {
  const pages = Array.from({ length: total }).map((_, i) => i + 1);
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === total;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12 mb-6">
      {/* Previous Button */}
      {isPrevDisabled ? (
        <button disabled className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed flex items-center gap-1">
          <ChevronLeftIcon />
          <span className="hidden sm:inline">Previous</span>
        </button>
      ) : (
        <Link
          href={`?page=${Math.max(1, page - 1)}`}
          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md"
        >
          <ChevronLeftIcon />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Link
            key={p}
            href={`?page=${p}`}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center ${
              p === page
                ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/30 scale-105"
                : "text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {isNextDisabled ? (
        <button disabled className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 cursor-not-allowed flex items-center gap-1">
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </button>
      ) : (
        <Link
          href={`?page=${Math.min(total, page + 1)}`}
          className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 transition-all duration-200 flex items-center gap-1 shadow-sm hover:shadow-md"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon />
        </Link>
      )}
    </nav>
  );
}

