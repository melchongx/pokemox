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
      const newPokemonData = [];
      for (const team of teams) {
        const teamData = [];
        for (const pokemonId of team.members) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
          );
          const pokemon = await response.json();
          teamData.push(pokemon);
        }
        newPokemonData.push([team.name, teamData]);
      }
      setPokemonData(newPokemonData);
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
            className="font-semibold text-stone-600 transition-all duration-200 hover:font-bold hover:text-stone-900"
            onClick={handleCreateClick}
          >
            create one
          </button>
          ?
        </div>
      ) : (
        <div>
          {pokemonData.map(([teamName, teamMembers]) => (
            <div key={teamName} className="my-3">
              <div className="my-2 flex w-full flex-row items-center">
                <h3 className="mx-3 w-5/6 text-lg font-semibold italic">
                  {teamName}
                </h3>
                <button className="mx-2 w-24 rounded-xl bg-blue-500 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]">
                  EDIT
                </button>
                <button className="mx-2 w-24 rounded-xl bg-rose-600 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]">
                  DELETE
                </button>
              </div>
              <div className="grid w-full grid-cols-6">
                {teamMembers.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poketeams;
