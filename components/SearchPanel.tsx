"use client";
import { useMemo, useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { useSearchContext } from "@app/context/SearchContext";
import { AiOutlineClose } from "react-icons/ai";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Category {
  title: string;
  _id: string;
}

const SearchPanel: React.FC = () => {
  const { filters, setFilters, originalItems, filteredItems, isLoading } = useSearchContext();
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    return Array.from(categories.values())
      .map((cat) => ({
        label: cat.title,
        value: cat.title,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
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

  const removeCategory = (categoryToRemove: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.filter((cat) => cat !== categoryToRemove),
    });
  };

  const hasActiveFilters = filters.query || filters.categories.length > 0;

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll to results when search is active
  useEffect(() => {
    if (hasActiveFilters && mounted) {
      setTimeout(() => {
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
          const yOffset = -50;
          const y = resultsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  }, [filters.query, filters.categories.length, hasActiveFilters, mounted]);

  return (
    <div className="w-full space-y-4">
      {/* Unified Search Bar with Integrated Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input - Takes most space */}
        <div className="flex-1">
          <SearchBox className="w-full" onSearch={handleSearch} />
        </div>

        {/* Filter Dropdown Button - Same height as search */}
        {mounted ? (
          <DropdownMenu open={showFilters} onOpenChange={setShowFilters}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 px-4 border-border hover:border-mainColor/50 hover:bg-mainColor/5 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
                type="button"
              >
                <FiFilter className="w-4 h-4" />
                <span className="text-sm font-medium">Categories</span>
                {filters.categories.length > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full bg-mainColor text-white">
                    {filters.categories.length}
                  </span>
                )}
                <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 max-h-[400px] overflow-y-auto">
              <div className="p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Filter by Category
                </div>
                <DropdownMenuSeparator className="my-2" />
                {filterOptions.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">No categories available</div>
                ) : (
                  <div className="space-y-1">
                    {filterOptions.map((option) => {
                      const isActive = filters.categories.includes(option.value);
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => toggleCategory(option.value)}
                          className="cursor-pointer focus:bg-mainColor/10"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-sm ${isActive ? "font-semibold text-mainColor" : "text-foreground"}`}>
                              {option.label}
                            </span>
                            {isActive && (
                              <div className="w-2 h-2 rounded-full bg-mainColor"></div>
                            )}
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            className="h-11 px-4 border-border hover:border-mainColor/50 hover:bg-mainColor/5 transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
            type="button"
            disabled
          >
            <FiFilter className="w-4 h-4" />
            <span className="text-sm font-medium">Categories</span>
            {filters.categories.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full bg-mainColor text-white">
                {filters.categories.length}
              </span>
            )}
            <FiChevronDown className="w-4 h-4" />
          </Button>
        )}

        {/* Clear Button - Only show when filters are active */}
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="outline"
            className="h-11 px-4 border-border hover:border-destructive/50 hover:bg-destructive/5 text-destructive hover:text-destructive transition-all duration-200"
            type="button"
          >
            <FiX className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Clear</span>
          </Button>
        )}
      </div>

      {/* Active Filters Display - Pills below search bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {isLoading ? (
            <div className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground">
              Searching...
            </div>
          ) : (
            <>
              <div className="px-3 py-1.5 bg-mainColor/10 border border-mainColor/30 rounded-full text-sm font-medium text-foreground">
                {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
              </div>
              {filters.query && (
                <div className="px-3 py-1.5 bg-card border border-border rounded-full text-sm text-foreground flex items-center gap-2">
                  <span className="text-muted-foreground">Search:</span>
                  <span className="font-medium">&quot;{filters.query}&quot;</span>
                </div>
              )}
              {filters.categories.map((category) => (
                <div
                  key={category}
                  className="px-3 py-1.5 bg-mainColor/10 border border-mainColor/30 rounded-full text-sm text-mainColor font-medium flex items-center gap-2 group"
                >
                  <span>{category}</span>
                  <button
                    onClick={() => removeCategory(category)}
                    className="hover:bg-mainColor/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Remove ${category} filter`}
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
