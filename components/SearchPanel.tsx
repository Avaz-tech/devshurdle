"use client";
import SearchBox from "./SearchBox";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <div className="h-full pt-40 flex justify-between items-center gap-3 w-full max-w-screen-xl">
      <SearchBox onSearch={handleSearch} className="max-w-[400px]" />
      <div className=" ">
        <ToggleGroup className="hidden md:flex justify-center gap-3" type="multiple" variant="outline">
          {filterOptions.map((option, index) => (
            <ToggleGroupItem key={index} value={option.value} aria-label={`"Filter ${option.value} issues"`}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Select>
          <SelectTrigger className="w-[180px] md:hidden">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {filterOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchPanel;
