import { Input } from "./ui/input";
import { LuSearch } from "react-icons/lu";
import { useSearchContext } from "@app/context/SearchContext";

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
    <div className={`w-full ${className} relative group`}>
      <Input
        className="w-full h-11 rounded-lg pl-11 pr-4 bg-card border border-border focus:border-mainColor focus:ring-2 focus:ring-mainColor/20 transition-all placeholder:text-muted-foreground text-foreground"
        type="search"
        placeholder="Search solutions, keywords, titles..."
        value={filters.query}
        onChange={(e) => handleChange(e.target.value)}
      />
      <LuSearch
        size={18}
        className="absolute top-1/2 -translate-y-1/2 left-4 text-muted-foreground group-focus-within:text-mainColor transition-colors pointer-events-none"
      />
    </div>
  );
};

export default SearchBox;
