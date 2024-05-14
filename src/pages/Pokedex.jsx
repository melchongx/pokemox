import { useEffect, useRef, useState } from "react";
import { GetPaginatedPokemonList, GetPokemon } from "../api/api";
import { sortPokemonData } from "../helpers";
import { useSearchContext } from "../helpers/searchContext";
import { useNavigate } from "react-router-dom";

import FilterMenu from "../components/FilterMenu";
import ChevronIcon from "../components/ChevronIcon";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

const Pokedex = () => {
  const isListFetched = useRef(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [filterVariant, setFilterVariant] = useState("simple");
  const [loading, setLoading] = useState(true);

  const [pokemonOffset, setPokemonOffset] = useState(0);

  const { searchQuery } = useSearchContext();

  // query states
  const [sortQuery, setSortQuery] = useState("number"); // enum: number, name, type

  const fetchPokemonList = async (reset = false) => {
    const data = await GetPaginatedPokemonList(reset ? 0 : pokemonOffset);

    data.results.map(async (item) => {
      const pokemon = await GetPokemon(item.name);
      setPokemonData((prev) => {
        return sortPokemonData([...prev, pokemon], sortQuery);
      });
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isListFetched.current) return;

    fetchPokemonList();
    setPokemonOffset((prev) => prev + 20);
    setLoading(false);

    return () => {
      isListFetched.current = true;
    };
  }, [sortQuery]);

  // useEffect(() => {
  //   const updated = sortPokemonData([...pokemonData], sortQuery);
  //   setPokemonData(updated);
  // }, [sortQuery]);

  const handleClear = async () => {
    setPokemonData([]);
    setLoading(true);

    fetchPokemonList(true);
  };

  const handleLoadMoreClick = async () => {
    setLoading(true);

    fetchPokemonList();
    setPokemonOffset((prev) => prev + 20);

    setLoading(false);
  };

  const handleSortQueryChange = (query) => {
    setSortQuery(query);
    // fetchPokemonList()
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold uppercase italic">Pokedex</h1>

      <FilterMenu
        variant={filterVariant}
        onClear={handleClear}
        sortQuery={sortQuery}
        setSortQuery={handleSortQueryChange}
      />

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

      <div className="flex w-full max-w-4xl flex-wrap justify-center gap-2 pt-4">
        {pokemonData.length > 0 &&
          pokemonData.map((pokemon) => (
            <a
              className="hover:cursor-pointer"
              onClick={() => {
                navigate("/pokedex/pokemonview", { state: { pokemon } });
              }}
              key={pokemon.id}
            >
              <Card pokemon={pokemon} />
            </a>
          ))}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Button onClick={handleLoadMoreClick}>Load more</Button>
      )}
    </div>
  );
};

export default Pokedex;
