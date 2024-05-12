import { useEffect, useState } from "react";
import { GetPokemon } from "../api/api.jsx";
import { Link } from "react-router-dom";

const PokemonNav = ({ currentId, isBaseForm = true }) => {
  const [baseFormPokemon, setBaseFormPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [nextPokemon, setNextPokemon] = useState(null);

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
    }

    const fetchNextPokemon = async () => {
      if (currentId < 1025) {
        try {
          const response = await GetPokemon(currentId + 1);
          setNextPokemon(response);
        } catch (error) {
          console.error("Error fetching previous pokemon:", error);
        }
      }
    }

    const fetchBaseFormPokemon = async () => {
      if (!isBaseForm) {
        try {
          const response = await GetPokemon(currentId);
          setBaseFormPokemon(response);
        } catch (error) {
          console.error("Error fetching previous pokemon:", error);
        }
      }
    }

    const executeFetch = async() => {
      await Promise.all([
        fetchPreviousPokemon(),
        fetchNextPokemon(),
        fetchBaseFormPokemon()
      ]);
    }

    executeFetch()
  }, [currentId, isBaseForm]);

  return (
    <div className="flex justify-between mb-8">
      {(currentId > 1 && isBaseForm && previousPokemon) && (
        <Link to={`/pokedex/${previousPokemon.name}`}
              className="bg-[#A4A4A4] px-4 py-2 rounded-md text-left text-white flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <div>
            <span className="font-bold">
              #{currentId - 1}
            </span>
            <span className="block capitalize">
              {previousPokemon.name}
            </span>
          </div>
        </Link>
      )}

      { (!isBaseForm && baseFormPokemon) && (
        <Link to={`/pokedex/${baseFormPokemon.name}`}
              className="bg-[#A4A4A4] px-4 py-2 rounded-md text-left text-white flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="feather feather-chevron-left">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <div>
            <span className="font-bold">
              #{currentId}
            </span>
            <span className="block capitalize">
              {baseFormPokemon.name}
            </span>
          </div>
        </Link>
      )}

      {currentId === 1 && (
        <div />
      )}

      {(currentId < 1025 && nextPokemon) && (
        <Link to={`/pokedex/${nextPokemon.name}`}
              className="bg-[#A4A4A4] px-4 py-2 rounded-md text-left text-white flex items-center gap-3">
          <div>
            <span className="font-bold">
              #{currentId + 1}
            </span>
            <span className="block capitalize">
              {nextPokemon.name}
            </span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="feather feather-chevron-right">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </Link>
      )}
    </div>
  )
}

export default PokemonNav;