import { Input } from "./ui/input"; // Import your custom Input component
import { LuSearch } from "react-icons/lu"; // Import the search icon
import { useSearchContext } from "@app/Context/SearchContext";

const SearchBox: React.FC<{ className?: string }> = ({ className }) => {
  const { query, setQuery } = useSearchContext();

  return (
    <div className={`w-full ${className} relative`}>
      <Input
        className="rounded-full p-5"
        type="search"
        placeholder="Search blogs"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <LuSearch size="18px" className="absolute top-3 right-4" />
    </div>
  );
};

export default SearchBox;
