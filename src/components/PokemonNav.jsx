import { useEffect, useState } from "react";
import { GetPokemon } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const PokemonNav = ({ currentId, isBaseForm = true }) => {
  const [baseFormPokemon, setBaseFormPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousPokemon = async () => {
      if (currentId > 1) {
        try {
          const response = await GetPokemon(currentId - 1);
          setPreviousPokemon(response);
        } catch (error) {
          console.error("Error fetching previous pokemon:", error);
        }
      }
    };

    const fetchNextPokemon = async () => {
      if (currentId < 1025) {
        try {
          const response = await GetPokemon(currentId + 1);
          setNextPokemon(response);
        } catch (error) {
          console.error("Error fetching next pokemon:", error);
        }
      }
    };

    const fetchBaseFormPokemon = async () => {
      if (!isBaseForm) {
        try {
          const response = await GetPokemon(currentId);
          setBaseFormPokemon(response);
        } catch (error) {
          console.error("Error fetching base pokemon:", error);
        }
      }
    };

    const executeFetch = async () => {
      await Promise.all([
        fetchPreviousPokemon(),
        fetchNextPokemon(),
        fetchBaseFormPokemon(),
      ]);
    };

    executeFetch();
  }, [currentId, isBaseForm]);

  return (
    <div className="mb-8 flex justify-between">
      {currentId > 1 && isBaseForm && previousPokemon && (
        <button
          onClick={() =>
            navigate(`/pokedex/pokemonview`, {
              state: { pokemon: previousPokemon },
            })
          }
          className="flex items-center gap-3 rounded-md bg-[#A4A4A4] px-4 py-2 text-left text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <div>
            <span className="font-bold">#{currentId - 1}</span>
            <span className="block capitalize">{previousPokemon.name}</span>
          </div>
        </button>
      )}

      {!isBaseForm && baseFormPokemon && (
        <button
          onClick={() =>
            navigate(`/pokedex/pokemonview`, {
              state: { pokemon: baseFormPokemon },
            })
          }
          className="flex items-center gap-3 rounded-md bg-[#A4A4A4] px-4 py-2 text-left text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <div>
            <span className="font-bold">#{currentId}</span>
            <span className="block capitalize">{baseFormPokemon.name}</span>
          </div>
        </button>
      )}

      {currentId === 1 && <div />}

      {currentId < 1025 && nextPokemon && (
        <button
          onClick={() =>
            navigate(`/pokedex/pokemonview`, {
              state: { pokemon: nextPokemon },
            })
          }
          className="flex items-center gap-3 rounded-md bg-[#A4A4A4] px-4 py-2 text-left text-white"
        >
          <div>
            <span className="font-bold">#{currentId + 1}</span>
            <span className="block capitalize">{nextPokemon.name}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}
    </div>
  );
};

export default PokemonNav;
