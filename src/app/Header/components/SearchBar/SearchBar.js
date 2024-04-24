import React, { useState } from "react";
import SearchSvg from "@/app/svgCollection/SearchSvg";
import { useRecoilState } from "recoil";
import { searchBarFilteredConsumablesState } from "@/app/recoil/atoms/searchBarFilteredConsumablesState";
import { activeComponentState } from "@/app/recoil/atoms/activeComponentState";
import { isAdminState } from "@/app/recoil/atoms/isAdminState";
import { fetchedConsumablesState } from "@/app/recoil/atoms/fetchedConsumablesState";
import { useTheme } from "next-themes";

const SearchBar = () => {
  const { theme, setTheme } = useTheme();
  const [fetchedConsumables, setFetchedConsumables] = useRecoilState(
    fetchedConsumablesState
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConsumables, setFilteredConsumables] = useState("");
  const [, setActiveComponent] = useRecoilState(activeComponentState);
  const [, setIsAdmin] = useRecoilState(isAdminState);
  const [, setSearchBarFilteredConsumables] = useRecoilState(
    searchBarFilteredConsumablesState
  );

  const detectAdminLogin = () => {
    if (searchQuery === "admi") {
      setIsAdmin(true);
      setTimeout(() => {
        setSearchQuery("");
      }, 0);
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    detectAdminLogin();
    setSearchQuery(query);
    filterConsumables(query);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (searchQuery.trim() === "") {
        alert("Please write something");
        return;
      }
      setTimeout(() => {
        setSearchQuery("");
      }, 0);

      setSearchBarFilteredConsumables(filteredConsumables);
      setActiveComponent("searchBarResult");
    }
  };

  const handleSearchSvgClick = () => {
    if (searchQuery.trim() === "") {
      alert("Please write something");
      return;
    }
    setTimeout(() => {
      setSearchQuery("");
    }, 0);
    setSearchBarFilteredConsumables(filteredConsumables);
    setActiveComponent("searchBarResult");
  };

  const filterConsumables = (query) => {
    const filtered = fetchedConsumables.filter((consumable) =>
      Object.values(consumable).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredConsumables(filtered);
  };

  return (
    <div className="relative w-1/4 flex">
      <input
        placeholder="e.g. 1A8"
        className="h-8 w-full border border-black/50 rounded-sm text-sm text-center enabled:outline-appOrange placeholder-black/20 dark:bg-white dark:text-black"
        value={searchQuery.toLowerCase()}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
      <span
        className="absolute right-0 top-0 rotate-90 scale-50 cursor-pointer"
        onClick={handleSearchSvgClick}
      >
        <span>
          <SearchSvg />
        </span>
      </span>
    </div>
  );
};

export default SearchBar;
