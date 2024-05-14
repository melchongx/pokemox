import { teams } from "../data/teams";
import { useState } from "react";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState("");

  function handleCreateTeam() {
    if (teamName.trim() !== "") {
      // Prevent empty team names
      teams.push({ name: teamName, members: [1, 2, 3, 4, 5, 6] });
      console.log(teams);
      setTeamName(""); // Clear the input field after creation
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-auto text-3xl font-bold italic">CREATE TEAM</h1>
      <div className="flex w-full flex-row">
        <input
          type="text"
          id="team_name"
          className="mt-5 block w-5/6 rounded-lg border px-5 py-2"
          placeholder="Team Name"
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <button
          className="ml-5 mt-5 self-start rounded-3xl bg-[#d8ae7e] px-7 py-3 font-bold shadow-md transition-all duration-200 hover:bg-[#ffcd93]"
          onClick={handleCreateTeam}
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateTeam;
