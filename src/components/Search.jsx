import { useContext } from "react";
import { SearchContext } from "../helpers";

const Search = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  return (
    <div className="relative flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="absolute ml-4 hidden h-6 w-6 sm:inline"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        type="text"
        placeholder="SEARCH FOR POKEMON"
        className="w-full rounded-2xl border-2 border-[#31241e] bg-transparent px-6 py-2 text-center text-sm text-[#31241e] placeholder:text-[#31241e60] sm:px-12 lg:text-base"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
