"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the interface for the context
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: any[]; // Define as an array of items (adjust `any` as needed for your post structure)
  setFilteredItems: (items: any[]) => void;
  selectedFilters: { [key: string]: boolean };
  toggleFilter: (filter: keyof typeof defaultFilters) => void; // Match the implementation type
}

// Default filters to reuse the type and ensure consistency
const defaultFilters = {
  stylish: false,
  new: false,
  common: false,
  old: false,
  browser: false,
  config: false,
};

// Create the search context with default values
const SearchContext = createContext<SearchContextProps>({
  query: "",
  setQuery: () => {},
  filteredItems: [], // Initialize as an empty array
  setFilteredItems: () => {},
  selectedFilters: defaultFilters,
  toggleFilter: () => {},
});

// Custom hook to use the search context (simplifies context usage)
export const useSearchContext = () => useContext(SearchContext);

// Provider component to wrap around the part of the app that needs search functionality
export const SearchProvider: React.FC<{ children: ReactNode; posts: any[] }> = ({ children, posts }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // Initialize as an empty array
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);

  // Function to toggle a filter on or off
  const toggleFilter = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

 // Effect to filter items based on query and active filters
useEffect(() => {
  let filtered = posts;

  // Apply search filter
  if (query) {
    filtered = filtered.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Apply selected category filters
  const activeFilters = (Object.keys(selectedFilters) as Array<keyof typeof selectedFilters>).filter(
    (filter) => selectedFilters[filter]
  );

  if (activeFilters.length > 0) {
    filtered = filtered.filter((post) =>
      activeFilters.includes(post.category)
    );
  }

  setFilteredItems(filtered);
}, [query, posts, selectedFilters]);


  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filteredItems,
        setFilteredItems,
        selectedFilters,
        toggleFilter,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
