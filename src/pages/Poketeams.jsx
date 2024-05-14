import { useState, useEffect } from "react";
import Card from "../components/Card";
import { fetchAllPokemonData } from "../api/api";
import SmallCard from "../components/SmallCard";

const Poketeams = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [createPokemonData, setCreatePokemonData] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [currentTeam, setCurrentTeam] = useState([]);

  const [editingTeamName, setEditingTeamName] = useState("");
  const [editingTeamIndex, setEditingTeamIndex] = useState(-1);

  function isTeamsEmpty() {
    if (pokemonData.length <= 0) {
      return true;
    } else {
      return false;
    }
  }

  const handleEditClick = (teamName, index) => {
    setEditingTeamName(teamName);
    setEditingTeamIndex(index);
    setCurrentTeam(pokemonData[index][1]); // Set currentTeam to the members of the team being edited
    setIsEditing(true);
  };

  const handleSaveTeam = () => {
    // Check for unique team name (same logic as in handleCreateTeam)
    const isTeamNameUnique = !pokemonData.some(
      (team, i) =>
        i !== editingTeamIndex &&
        team[0].toLowerCase() === editingTeamName.toLowerCase(),
    );
    if (!isTeamNameUnique) {
      alert("Team name already exists. Please choose a different name.");
      return;
    }

    // Update the pokemonData state with the edited team
    setPokemonData((prevData) => {
      const newData = [...prevData];
      newData[editingTeamIndex] = [teamName, currentTeam]; // Use teamName
      return newData;
    });

    // Reset state and close the editing mode
    setCurrentTeam([]);
    setTeamName("");
    setEditingTeamName("");
    setEditingTeamIndex(-1);
    setIsEditing(false);
  };

  const handleDeleteTeam = (teamNameToDelete) => {
    setPokemonData((prevData) =>
      prevData.filter(([teamName]) => teamName !== teamNameToDelete),
    );
    setIsDeleting(false); // Reset isDeleting after deletion
  };

  // !!!!!!!!!!! CREATE FUNCTIONS

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllPokemonData();
      data.sort((a, b) => a.id - b.id);
      setCreatePokemonData(data);
    };

    fetchData();
  }, []);

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

  const handleCreateTeam = () => {
    const isTeamNameUnique = !pokemonData.some(
      (team) => team[0].toLowerCase() === teamName.toLowerCase(),
    );

    if (!isTeamNameUnique) {
      alert("Team name already exists. Please choose a different name.");
      return; // Don't create the team if the name is not unique
    }
    const newPokemonData = [...pokemonData, [teamName, currentTeam]];
    setPokemonData(newPokemonData);
    setCurrentTeam([]);
    setTeamName("");
    setIsCreating(false);
  };

  // !!!!!!!!!!! END OF CREATE FUNCTIONS

  return (
    <div>
      {!isCreating && !isEditing && (
        <div className="flex flex-col">
          {" "}
          {/** poketeams div */}
          <h1 className="m-auto text-3xl font-bold italic">POKETEAMS</h1>
          <button
            className="mt-3 self-start rounded-3xl bg-[#d8ae7e] px-7 py-3 font-bold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
            onClick={() => setIsCreating(true)}
          >
            ADD
          </button>
          <hr className="my-3 h-px border-0 bg-gray-200 dark:bg-gray-700" />
          {isTeamsEmpty() ? (
            <div className="flex h-20 w-full items-center rounded-xl border border-stone-400 px-6 py-2 text-stone-600">
              You currently have no teams to display, why not&nbsp;
              <button
                className="font-semibold text-stone-600 transition-all duration-200 hover:font-bold hover:text-stone-900"
                onClick={() => setIsCreating(true)}
              >
                create one
              </button>
              ?
            </div>
          ) : (
            <div>
              {pokemonData.map(([teamName, teamMembers], index) => (
                <div key={teamName} className="my-3">
                  <div className="my-2 flex w-full flex-row items-center">
                    <h3 className="mx-3 w-5/6 text-lg font-semibold italic">
                      {teamName}
                    </h3>
                    <button
                      className="mx-2 w-24 rounded-xl bg-blue-500 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                      onClick={() => {
                        setIsEditing(true);
                        handleEditClick(teamName, index);
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      className="mx-2 w-24 rounded-xl bg-rose-600 px-3 py-1 font-semibold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                      onClick={() => {
                        setIsDeleting(true);
                        handleDeleteTeam(teamName);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                  <div className="grid w-full grid-cols-6">
                    {teamMembers.map((pokemon) => (
                      <Card pokemon={pokemon} key={pokemon.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {(isCreating || isEditing) && (
        <div className="flex flex-col items-center">
          {/** create teams div */}
          <h1 className="m-auto text-3xl font-bold italic">CREATE TEAM</h1>
          <div className="flex w-full flex-row space-x-4">
            <input
              type="text"
              id="team_name"
              className="mt-5 block w-3/4 rounded-lg border px-5 py-2"
              placeholder={isEditing ? editingTeamName : "Team Name"}
              onChange={(e) => {
                const inputValue = e.target.value;
                setTeamName(
                  inputValue === "" ? e.target.placeholder : inputValue,
                );
              }}
              required
            />
            <div className="flex w-1/4 justify-center">
              <button
                className="ml-5 mt-5 rounded-3xl bg-[#d8ae7e] px-7 py-3 font-bold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
                onClick={
                  isEditing ? () => handleSaveTeam() : () => handleCreateTeam()
                }
              >
                {isEditing ? "SAVE" : "CREATE"}
              </button>
            </div>
          </div>
          <div className="my-3 flex w-full flex-row space-x-4">
            <div className="w-3/5 rounded-lg border-2 border-stone-400 px-3 py-2">
              <h3 className="invisible text-xl font-semibold italic">filler</h3>
              <div className="flex w-full flex-wrap justify-center gap-2 pt-4">
                {createPokemonData.length !== 0 &&
                  createPokemonData.map((pokemon) => (
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
      )}
    </div>
  );
};

export default Poketeams;
