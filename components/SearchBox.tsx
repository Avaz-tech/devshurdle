import { Input } from "./ui/input"; // Importing a custom Input component
import { LuSearch } from "react-icons/lu"; // Importing a search icon from react-icons
import { useSearchContext, } from "@app/Context/SearchContext";
// Interface defining the structure of an item
interface Item {
  id: number;
  title: string;
  description: string;
}

// Interface for the props accepted by the SearchBox component
interface SearchBoxProps {
  className?: string; // Optional additional class names for styling
}

// Functional component for the search box
const SearchBox: React.FC<SearchBoxProps> = ({ className}) => {
  // State to hold the filtered items
  const {query, setQuery, filteredItems} = useSearchContext();
  const handleInputChange = (e:any) => {
    setQuery(e.target.value.toLowerCase());
  };

  return (
    <div className={`w-full ${className} relative`}> {/* Container with dynamic classes */}
      <Input
        className="rounded-full p-5"
        type="search"                
        placeholder="Search blogs"
        value={query}
        onChange={handleInputChange}
      />
      <LuSearch size="18px" className="absolute top-3 right-4" /> {/* Search icon positioned inside the input */}
    </div>
  );
};

export default SearchBox;
