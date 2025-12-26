"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Post } from "@types";

// Define the interface for search filters
interface SearchFilters {
  query: string;
  categories: string[];
}

// Define the context props with proper typing
interface SearchContextProps {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  filteredItems: Post[];
  originalItems: Post[];
  isLoading: boolean;
}

// Create the search context with default values
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

// Custom hook to use the search context with error handling
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
};

// Provider component with proper type safety
interface SearchProviderProps {
  children: ReactNode;
  posts: Post[];
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children, posts }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    categories: [],
  });
  const [filteredItems, setFilteredItems] = useState<Post[]>(posts);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Combined effect for both text search and category filtering
  useEffect(() => {
    setIsLoading(true);
    let result = posts;

    // Apply text search filter
    if (filters.query) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(filters.query.toLowerCase()) ||
          post.description?.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((post) =>
        post.categories?.some((category) =>
          filters.categories.some(
            (selectedCategory) =>
              category.title?.toLowerCase() === selectedCategory.toLowerCase()
          )
        )
      );
    }

    // Simulate async operation for better UX
    setTimeout(() => {
      setFilteredItems(result);
      setIsLoading(false);
    }, 150);
  }, [filters, posts]);

  const value: SearchContextProps = {
    filters,
    setFilters,
    filteredItems,
    originalItems: posts,
    isLoading,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
