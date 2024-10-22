"use client";
import { Any } from "next-sanity";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the interface for the context
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  filteredItems: any[]; // Array to hold the filtered items
  setFilteredItems: (items: any[]) => void; // Function to update the filtered items
}

// Create the search context with default values
const SearchContext = createContext<SearchContextProps>({
  query: "", // Default empty query
  setQuery: () => {}, // Default no-op function
  filteredItems: [], // Empty array for filtered items
  setFilteredItems: () => {}, // Default no-op function
});

// Custom hook to use the search context (simplifies context usage)
export const useSearchContext = () => useContext(SearchContext);

// Provider component to wrap around the part of the app that needs search functionality
export const SearchProvider: React.FC<{ children: ReactNode; posts: any }> = ({ children, posts }) => {
  const [query, setQuery] = useState<string>(""); // State to manage the search query
  const [filteredItems, setFilteredItems] = useState<any[]>(posts); // State to manage filtered items
  useEffect(() => {
    if(!query){
        setFilteredItems(posts);
    }else{
        const filtered = posts.filter((post)=> post.title.toLowerCase().includes(query.toLowerCase()));
        setFilteredItems(filtered);
    }
  },[query, posts]);

  return (
    <SearchContext.Provider value={{ query, setQuery, filteredItems, setFilteredItems }}>
      {children} {/* Render children wrapped inside the context */}
    </SearchContext.Provider>
  );
};
