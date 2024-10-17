// "use client"; // Indicates that this component is meant to run on the client side
import { Input } from "./ui/input"; // Importing a custom Input component
import { LuSearch } from "react-icons/lu"; // Importing a search icon from react-icons
import { useEffect, useState } from "react"; // Importing React hooks

// Interface defining the structure of an item
interface Item {
  id: number;
  title: string;
  description: string;
}

// Interface for the props accepted by the SearchBox component
interface SearchBoxProps {
  className?: string; // Optional additional class names for styling
  items: Item[];      // Array of items to be searched
}

// Functional component for the search box
const SearchBox: React.FC<SearchBoxProps> = ({ className, items }) => {
  // State to hold the filtered items
  const [filteredItems, setFilteredItems] = useState<Item[] | null | string>();

  // Function to handle input changes when Enter key is pressed
  const handleInputChange = (e: any) => {
    const input = e.target.value.toLowerCase(); // Get input value and convert to lowercase
    const newFilteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(input) // Filter items based on input
    );
    setFilteredItems(newFilteredItems); // Update the filtered items state
  };

  // Effect hook that runs when 'filteredItems' changes
  useEffect(() => {

  }, [filteredItems]);

  return (
    <div className={`w-full ${className} relative`}> {/* Container with dynamic classes */}
      <Input
        className="rounded-full p-5"
        type="search"                
        placeholder="Search blogs"   
        onKeyDown={(e) => {
          if (e.code === "Enter") {  // Check if Enter key was pressed
            handleInputChange(e);    // Call the input change handler
          }
        }}
      />
      <LuSearch size="18px" className="absolute top-3 right-4" /> {/* Search icon positioned inside the input */}
    </div>
  );
};

export default SearchBox;
