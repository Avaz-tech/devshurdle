"use client";
import SearchBox from "./SearchBox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchContext } from "@app/Context/SearchContext";
import { useMemo } from "react";

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

  return (
    <div className="h-full flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 w-full max-w-screen-xl">
      <SearchBox className="max-w-[400px]" onSearch={handleSearch} />
      {filterOptions.length > 0 && (
        <div>
          <ToggleGroup
            className="flex flex-wrap justify-center gap-3"
            type="multiple"
            variant="outline"
            value={filters.categories}
            onValueChange={(value) => setFilters({ ...filters, categories: value })}
          >
            {filterOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                aria-label={`Filter by ${option.label}`}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
