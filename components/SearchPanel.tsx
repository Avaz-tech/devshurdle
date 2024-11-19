"use client";
import SearchBox from "./SearchBox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useSearchContext } from "@app/Context/SearchContext";
import { useState, useEffect } from "react";

const filterOptions = [
  { label: "Latest", value: "latest" },
  { label: "Browser", value: "browser" },
  { label: "Style", value: "style" },
  { label: "Config", value: "config" },
  { label: "Common", value: "common" },
];

const SearchPanel: React.FC = () => {
  const { setFilteredItems, filteredItems, originalItems } = useSearchContext();
  const [activeFilters, setActiveFilters] = useState<string[]>([]); // Track active filters

  useEffect(() => {
    if (activeFilters.length === 0) {
      // If no filters are active, show all posts
      setFilteredItems(originalItems);
    } else {
      // If filters are active, filter posts based on selected filters
      const filteredP = originalItems.filter((_post: { title: string; description: string }) => {
        return activeFilters.some((filter) =>
          _post.title.toLowerCase().includes(filter.toLowerCase()) ||
          _post.description.toLowerCase().includes(filter.toLowerCase())
        );
      });
      setFilteredItems(filteredP);
    }
  }, [activeFilters, originalItems, setFilteredItems]);

  const handleToggle = (value: string) => {
    // Toggle filter on/off
    setActiveFilters((prevFilters) =>
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
