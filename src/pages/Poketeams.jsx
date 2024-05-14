import { teams } from "../data/teams";
import { useState, useEffect } from "react";
import Card from "../components/Card";
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

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDeleteTeam = (teamNameToDelete) => {
    const teamIndex = teams.findIndex((team) => team.name === teamNameToDelete);
    if (teamIndex !== -1) {
      teams.splice(teamIndex, 1); // Remove the team directly from the array
      // Trigger re-render
      setPokemonData([...pokemonData]);
    }
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
                <button
                  className="mx-2 w-24 rounded-xl bg-blue-500 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                  onClick={() => setIsEditing(true)}
                >
                  EDIT
                </button>
                <button
                  className="mx-2 w-24 rounded-xl bg-rose-600 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                  onClick={() => setIsDeleting(true)}
                >
                  DELETE
                </button>
              </div>
              <div className="grid w-full grid-cols-6">
                {teamMembers.map((pokemon) => (
                  <Card pokemon={pokemon} key={pokemon.id} />
                ))}
              </div>
              {isDeleting && (
                <div className="flex w-full justify-center">
                  <div className="h-5/12 fixed left-1/2 top-1/2 z-50 flex w-1/3 -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-xl border-2 border-stone-600 bg-[#fff2d7] px-5 py-3 text-center drop-shadow-2xl">
                    <h3 className="font-semibold sm:text-sm lg:text-lg">
                      Are you sure you want to delete this team?
                    </h3>
                    <div>
                      <button
                        className="mx-2 my-3 w-24 rounded-xl bg-rose-600 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                        onClick={() => handleDeleteTeam(teamName)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {isEditing && (
                <div className="flex w-full justify-center">
                  <div className="h-5/12 fixed left-1/2 top-1/2 z-50 flex w-1/3 -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-xl border-2 border-stone-600 bg-[#fff2d7] px-5 py-3 text-center drop-shadow-2xl">
                    <h3 className="font-semibold sm:text-sm lg:text-lg">
                      Are you sure you want to edit this team?
                    </h3>
                    <div>
                      <button
                        className="mx-2 w-24 rounded-xl bg-blue-500 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                        onClick={() => handleDeleteTeam(teamName)}
                      >
                        EDIT
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Poketeams;
