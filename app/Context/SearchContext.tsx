"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the interface for the context
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: any[]; // Adjust `any` based on your post structure
  setFilteredItems: (items: any[]) => void;
  originalItems: any[]; // Add this to store the original posts
}

// Create the search context with default values
const SearchContext = createContext<SearchContextProps>({
  query: "",
  setQuery: () => {},
  filteredItems: [],
  setFilteredItems: () => {},
  originalItems: [], // Initialize with an empty array
});

// Custom hook to use the search context
export const useSearchContext = () => useContext(SearchContext);

// Provider component
export const SearchProvider: React.FC<{ children: ReactNode; posts: any[] }> = ({ children, posts }) => {
  const [query, setQuery] = useState<string>(""); // State to manage the search query
  const [filteredItems, setFilteredItems] = useState<any[]>(posts); // State to manage filtered items
  const [originalItems] = useState<any[]>(posts); // Store original posts
  
  useEffect(() => {
    if (!query) {
      setFilteredItems(posts); // If no query, show all posts
    } else {
      const filtered = posts.filter((post: { title: string }) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [query, posts]);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filteredItems,
        setFilteredItems,
        originalItems, // Provide the original posts to context
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
