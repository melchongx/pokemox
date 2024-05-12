import { useEffect, useState } from "react";

import FilterMenu from "../components/FilterMenu";
import ChevronIcon from "../components/ChevronIcon";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filterVariant, setFilterVariant] = useState("simple");

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold uppercase italic">Pokedex</h1>

      <FilterMenu variant={filterVariant} />

      <div className="w-full">
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() =>
              setFilterVariant((prev) =>
                prev === "simple" ? "advance" : "simple",
              )
            }
            className="flex items-center justify-center gap-2"
          >
            <span>
              {filterVariant === "simple" ? "Show" : "Hide"}
              &nbsp;advanced&nbsp;search
            </span>
            <ChevronIcon variant={filterVariant === "simple" ? "down" : "up"} />
          </button>
        </div>
        <div className="mt-1 h-px w-full bg-neutral-600" />
      </div>

      <div className="flex w-full flex-wrap justify-center">
        {/* {pokemons.map((pokemon) => (
          <div
            className="m-2 h-60 w-1/6 rounded-xl border border-neutral-600"
            key={pokemon.name}
          >
            <img
              src={pokemon.sprites.front_default || pokemon.sprites.front_shiny}
              alt={pokemon.name}
              className="h-auto max-w-full"
            />
            <h6 className="text-center">{pokemon.name.toUpperCase()}</h6>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Pokedex;
