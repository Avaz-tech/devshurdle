// "use client";
import { Input } from "./ui/input";
import { LuSearch } from "react-icons/lu";

interface SearchBoxProps {
  className?: string;
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ className, onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={`w-full ${className} relative`}>
      <Input className="rounded-full p-5" type="search" placeholder="Search blogs" onChange={handleInputChange} />
      <LuSearch size='18px' className="absolute top-3 right-4" />
    </div>
  );
};

export default SearchBox;
