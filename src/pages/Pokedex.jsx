import { useEffect, useState } from "react";
import { PokedexCall } from "../api/api";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const allPokemon = await PokedexCall(); // Use your Pokedex function
        setPokemons(allPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="m-auto text-3xl font-bold italic">POKEDEX</h1>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            POKEMON TYPE
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm border border-neutral-600"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            ABILITY
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm border border-neutral-600"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            NUMBER RANGE
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-1/5 rounded-sm border border-neutral-600"></select>{" "}
          - &nbsp;
          <select className="w-1/5 rounded-sm border border-neutral-600"></select>
        </div>
      </div>
      <div className="m-auto my-2 flex w-full">
        <div className="w-1/3">
          <h3 className="px-5 text-end font-semibold text-stone-700">
            SORT BY
          </h3>
        </div>
        <div className="w-2/3">
          <select className="w-2/3 rounded-sm border border-neutral-600"></select>
        </div>
      </div>
      <div className="flex w-full flex-row flex-wrap justify-center">
        {pokemons.map((pokemon) => (
          <div
            className="m-2 h-60 w-1/5 rounded-xl border border-neutral-600"
            key={pokemon.name}
          >
            {/* <img
              src={pokemon.sprites.front_default || pokemon.sprites.front_shiny}
              alt={pokemon.name}
              className="h-auto max-w-full"
            /> */}
            <h6 className="text-center">{pokemon.name.toUpperCase()}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
