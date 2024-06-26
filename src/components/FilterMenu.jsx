import { types } from "../constants";

import DropdownMenu from "./DropdownMenu";
import FilterRow from "./FilterRow";
import Button from "./Button";

const FilterMenu = ({
  variant,
  onClear,
  sortQuery,
  setSortQuery,
  typeQuery,
  setTypeQuery,
  resetFilter,
}) => {
  if (variant === "simple") {
    return (
      <div className="w-full max-w-2xl text-stone-700">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 min-[667px]:justify-between">
          <Button
            className="flex max-w-[384px] flex-1 items-center gap-2 min-[667px]:w-auto min-[667px]:flex-none"
            onClick={onClear}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="uppercase">Clear</span>
          </Button>
          <div className="flex max-w-[384px] gap-x-6">
            <label
              htmlFor="sortBy"
              className="flex items-center font-semibold uppercase"
            >
              Sort&nbsp;By
            </label>
            <div className="w-72 flex-none basis-72">
              <DropdownMenu
                title={sortQuery}
                items={["name", "number", "type"]}
                onSelect={setSortQuery}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-2 text-stone-700">
          <FilterRow>
            <label
              htmlFor="pokemonType"
              className="flex basis-72 items-center font-semibold uppercase min-[696px]:justify-end"
            >
              Pokemon type
            </label>
            <div className="flex-none basis-72">
              <DropdownMenu
                title={typeQuery ? typeQuery : "Select type"}
                items={types}
                onSelect={setTypeQuery}
              />
            </div>
          </FilterRow>

          <FilterRow>
            <label
              htmlFor="sortBy"
              className="flex basis-72 items-center font-semibold uppercase min-[696px]:justify-end"
            >
              Sort By
            </label>
            <div className="flex-none basis-72">
              <DropdownMenu
                title={sortQuery}
                items={["name", "number", "type"]}
                onSelect={setSortQuery}
              />
            </div>
          </FilterRow>

          <FilterRow className="mt-4">
            <Button className="basis-24" onClick={resetFilter}>
              Reset
            </Button>
          </FilterRow>
        </div>
      </div>
    );
  }
};

export default FilterMenu;
