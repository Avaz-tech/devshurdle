"use client";
import { useMemo, useEffect } from "react";
import SearchBox from "./SearchBox";
import { useSearchContext } from "@app/context/SearchContext";
import { AiOutlineClose } from "react-icons/ai";

interface Category {
  title: string;
  _id: string;
}

const SearchPanel: React.FC = () => {
  const { filters, setFilters, originalItems, filteredItems } = useSearchContext();

  // Dynamically derive filter options from actual posts categories
  const filterOptions = useMemo(() => {
    const categories = new Map<string, Category>();
    originalItems.forEach((post) => {
      post.categories?.forEach((category) => {
        if (category.title && !categories.has(category.title)) {
          categories.set(category.title, category);
        }
      });
    });
    return Array.from(categories.values()).map((cat) => ({
      label: cat.title,
      value: cat.title,
    }));
  }, [originalItems]);

  const handleSearch = (query: string) => {
    setFilters({
      ...filters,
      query,
    });
  };

  const toggleCategory = (value: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(value)
        ? filters.categories.filter((cat) => cat !== value)
        : [...filters.categories, value],
    });
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      categories: [],
    });
  };

  const hasActiveFilters = filters.query || filters.categories.length > 0;

  // Auto-scroll to results when search is active
  useEffect(() => {
    if (hasActiveFilters) {
      // Small delay to let the filter take effect
      // setTimeout(() => {
      //   const resultsSection = document.getElementById("results-section");
      //   if (resultsSection) {
      //     const yOffset = -50; // Offset for sticky header
      //     const y = resultsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      //     window.scrollTo({ top: y, behavior: "smooth" });
      //   }
      // }, 100);
    }
  }, [filters.query, filters.categories.length, hasActiveFilters]);

  return (
    <div className="w-full ">
      {/* Search Box - Full Width */}
      <div className="mb-6">
        <SearchBox className="w-full" onSearch={handleSearch} />
      </div>

      {/* Active Search Indicator */}
      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-mainColor/10 border border-mainColor/30 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"} found
            </span>
            {filters.query && <span className="text-sm text-muted-foreground">for &quot;{filters.query}&quot;</span>}
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-mainColor hover:text-mainColor/80 font-medium flex items-center gap-1"
          >
            <AiOutlineClose size={14} />
            Clear
          </button>
        </div>
      )}

      {/* Filter Categories Section */}
      {filterOptions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Filter by Category</h3>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const isActive = filters.categories.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleCategory(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-mainColor text-white shadow-md shadow-mainColor/30 hover:shadow-lg hover:shadow-mainColor/40"
                      : "bg-card border border-border text-foreground hover:border-mainColor/50 hover:bg-mainColor/5"
                  }`}
                  aria-label={`Filter by ${option.label}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
