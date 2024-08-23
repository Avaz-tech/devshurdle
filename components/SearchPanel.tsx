"use client";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


const filterOptions = [
  {
    label: "Latest",
    value: "latest",
  },
  {
    label: "Browser",
    value: "browser",
  },
  {
    label: "Style",
    value: "style",
  },

  {
    label: "Config",
    value: "config",
  },
  {
    label: "Common",
    value: "common",
  },
];

const SearchPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // console.log("Searching for:", query);
  };
  return (
    <div className="h-full pt-40 flex flex-col md:flex-row justify-center gap-4 md:justify-between items-center gap-3 w-full max-w-screen-xl">
      <SearchBox onSearch={handleSearch} className="max-w-[400px]" />
      <div className="">
        <ToggleGroup className="flex flex-wrap justify-center gap-3" type="multiple" variant="outline">
          {filterOptions.map((option, index) => (
            <ToggleGroupItem key={index} value={option.value} aria-label={`"Filter ${option.value} issues"`}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

      </div>
    </div>
  );
};

export default SearchPanel;
