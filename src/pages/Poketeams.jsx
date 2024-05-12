import { teams } from "../data/teams";
import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";

function isTeamsEmpty() {
  if (teams.length <= 0) {
    return true;
  } else {
    return false;
  }
}

const Poketeams = () => {
  const [pokemonData, setPokemonData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (const team of teams) {
        for (const pokemonId of team) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          );
          const pokemon = await response.json();
          data.push(pokemon);
        }
      }
      setPokemonData(data);
    };

    fetchData();
  }, [teams]);

  const handleCreateClick = () => {
    navigate("/CreateTeam");
  };

  return (
    <div className="flex flex-col">
      <h1 className="m-auto text-3xl font-bold italic">POKETEAMS</h1>
      <button
        className="mt-3 self-start rounded-3xl bg-[#d8ae7e] px-7 py-3 font-bold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
        onClick={handleCreateClick}
      >
        ADD
      </button>
      <hr className="my-3 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      {isTeamsEmpty() ? (
        <div className="flex h-20 w-full items-center rounded-xl border border-stone-400 px-6 py-2 text-stone-600">
          You currently have no teams to display, why not&nbsp;
          <button
            className=" font-semibold text-stone-600 transition-all duration-200 hover:font-bold hover:text-stone-900"
            onClick={handleCreateClick}
          >
            create one
          </button>
          ?
        </div>
      ) : (
        <div className="grid w-full grid-cols-6">
          {pokemonData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Poketeams;
