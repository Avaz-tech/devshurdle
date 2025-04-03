"use client";
import SearchBox from "./SearchBox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchContext } from "@app/Context/SearchContext";
import { useState, useEffect } from "react";

interface Category {
  title: string;
  description: string;
}

interface Post {
  categories: Category[];
}
const filterOptions = [
  { label: "Browser", value: "browser" },
  { label: "Design", value: "design" },
  { label: "Config", value: "config" },
  { label: "Type", value: "type" },
  { label: "Performance", value: "performance" },
  { label: "API", value: "api" },
];

const SearchPanel: React.FC = () => {
  const { setFilteredItems, originalItems } = useSearchContext();
  const [activeFilters, setActiveFilters] = useState<string[]>([]); // Track active filters

  console.log("Oringinal Items:", originalItems);

  useEffect(() => {
    if (activeFilters.length === 0) {
      // If no filters are active, show all posts
      setFilteredItems(originalItems);
    } else {
      // If filters are active, filter posts based on selected filters
      const filteredP = originalItems.filter((_post: Post) => {
        return _post.categories?.some((category) =>
          activeFilters.some((filter) => category.title?.toLowerCase().includes(filter.toLowerCase()))
        );
      });
      setFilteredItems(filteredP);
    }
  }, [activeFilters, originalItems, setFilteredItems]);

  const handleToggle = (value: string) => {
    // Toggle filter on/off
    setActiveFilters(
      (prevFilters) =>
        prevFilters.includes(value)
          ? prevFilters.filter((filter) => filter !== value) // Remove filter
          : [...prevFilters, value] // Add filter
    );
  };

  return (
    <div className="h-full pt-40 flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 w-full max-w-screen-xl">
      <SearchBox className="max-w-[400px]" />
      <div>
        <ToggleGroup className="flex flex-wrap justify-center gap-3" type="multiple" variant="outline">
          {filterOptions.map((option, index) => (
            <ToggleGroupItem
              key={index}
              value={option.value}
              aria-label={`Filter ${option.value} issues`}
              onClick={() => handleToggle(option.value)} // Toggle filter onClick
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default SearchPanel;
