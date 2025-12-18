"use client";
import SearchBox from "./SearchBox";
import { useSearchContext } from "@app/context/SearchContext";
import { useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Category {
  title: string;
  _id: string;
}

const SearchPanel: React.FC = () => {
  const { filters, setFilters, originalItems } = useSearchContext();

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

  return (
    <div className="w-full">
      {/* Search Box - Full Width */}
      <div className="mb-6">
        <SearchBox className="w-full" onSearch={handleSearch} />
      </div>

      {/* Filter Categories Section */}
      {filterOptions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Filter by Category</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <AiOutlineClose size={14} />
                Clear all
              </button>
            )}
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
