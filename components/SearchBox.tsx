import { Input } from "./ui/input"; // Import your custom Input component
import { LuSearch } from "react-icons/lu"; // Import the search icon
import { useSearchContext } from "@app/Context/SearchContext";

interface SearchBoxProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ className, onSearch }) => {
  const { filters, setFilters } = useSearchContext();

  const handleChange = (value: string) => {
    const query = value.toLowerCase();
    onSearch ? onSearch(query) : setFilters({ ...filters, query });
  };

  return (
    <div className={`w-full ${className} relative`}>
      <Input
        className="rounded-full p-5"
        type="search"
        placeholder="Search blogs"
        value={filters.query}
        onChange={(e) => handleChange(e.target.value)}
      />
      <LuSearch size="18px" className="absolute top-3 right-4" />
    </div>
  );
};

export default SearchBox;
