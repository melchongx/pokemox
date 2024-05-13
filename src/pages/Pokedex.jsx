import { useEffect, useState } from "react";
import { fetchPokemonData } from "../api/api";

import FilterMenu from "../components/FilterMenu";
import ChevronIcon from "../components/ChevronIcon";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";

const Pokedex = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filterVariant, setFilterVariant] = useState("simple");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      data.sort((a, b) => a.id - b.id);

      setPokemonData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleClear = async () => {
    setLoading(true);
    const data = await fetchPokemonData();
    setPokemonData(data);
    setLoading(false);
  };

  const handleLoadMoreClick = async () => {
    setLoading(true);
    const data = await fetchPokemonData();
    setPokemonData((prev) => [...prev, ...data]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold uppercase italic">Pokedex</h1>

      <FilterMenu variant={filterVariant} onClear={handleClear} />

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
        {pokemonData.length !== 0 &&
          pokemonData.map((pokemon) => (
            <Card pokemon={pokemon} key={pokemon.id} />
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
