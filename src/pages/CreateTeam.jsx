import { teams } from "../data/teams";
import { useState, useEffect } from "react";
import { fetchAllPokemonData } from "../api/api";
import Card from "../components/Card";
import SmallCard from "../components/SmallCard";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [currentTeam, setCurrentTeam] = useState([]);

  const navigate = useNavigate();

  function handleCreateTeam() {
    const data = [];
    if (teamName.trim() !== "") {
      // Prevent empty team names
      setTeamName(""); // Clear the input field after creation
      currentTeam.map((pokemon) => data.push(pokemon.id));
      teams.push({ name: teamName, members: data });
      navigate("/poketeams");
    }
  }

  const addPokemonToTeam = (pokemon) => {
    if (currentTeam.length < 6) {
      // Limit team size to 6
      setCurrentTeam([...currentTeam, pokemon]);
    } else {
      alert("Your team is full!"); // Or provide a more elegant notification
    }
  };

  const removePokemonFromTeam = (pokemon) => {
    setCurrentTeam(currentTeam.filter((p) => p.id !== pokemon.id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemonData();
      data.sort((a, b) => a.id - b.id);

      setPokemonData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-auto text-3xl font-bold italic">CREATE TEAM</h1>
      <div className="flex w-full flex-row space-x-4">
        <input
          type="text"
          id="team_name"
          className="mt-5 block w-3/4 rounded-lg border px-5 py-2"
          placeholder="Team Name"
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <div className="flex w-1/4 justify-center">
          <button
            className="ml-5 mt-5 rounded-3xl bg-[#d8ae7e] px-7 py-3 font-bold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
            onClick={handleCreateTeam}
          >
            CREATE
          </button>
        </div>
      </div>
      <div className="my-3 flex w-full flex-row space-x-4">
        <div className="w-3/5 rounded-lg border-2 border-stone-400 px-3 py-2">
          <h3 className="invisible text-xl font-semibold italic">filler</h3>
          <div className="flex w-full flex-wrap justify-center gap-2 pt-4">
            {pokemonData.length !== 0 &&
              pokemonData.map((pokemon) => (
                <div key={pokemon.id}>
                  <Card pokemon={pokemon} />
                  <button
                    className="relative -top-[90%] left-[81%] h-[40px] w-[40px] rounded-full bg-[#d8ae7e] text-3xl font-normal drop-shadow-2xl transition-all duration-200 hover:bg-[#ffcd93]"
                    onClick={() => addPokemonToTeam(pokemon)}
                  >
                    +
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="w-2/5 justify-center space-x-2 rounded-lg border-2 border-stone-400 px-3 py-2">
          {currentTeam.length < 1 ? (
            <h3>Add some Pokemons to your team.</h3>
          ) : (
            <div className="flex w-full flex-col items-center">
              <h3 className="text-xl font-semibold italic">Team Members</h3>
              <div className="flex w-full flex-wrap justify-center gap-2 pt-4">
                {currentTeam.map((pokemon) => (
                  <div key={pokemon.id} className="w-fit">
                    <SmallCard pokemon={pokemon} />
                    <button
                      className="relative -top-[90%] left-[81%] h-[40px] w-[40px] rounded-full bg-[#d8ae7e] text-3xl font-normal drop-shadow-2xl transition-all duration-200 hover:bg-[#ffcd93]"
                      onClick={() => removePokemonFromTeam(pokemon)}
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
