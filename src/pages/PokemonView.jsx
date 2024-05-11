import { useEffect, useState } from "react";
import { GetPokemon, GetPokemonSpecies } from "../api/api.jsx";
import { useParams } from "react-router-dom";

const PokemonView = () => {
  const [pokemon, setPokemon] = useState([]);
  const [species, setSpecies] = useState([]);
  const [fetchError, setFetchError] = useState({
    pokemon: false,
    species: false,
  });
  const { slug } = useParams();

  useEffect(() => {
    // Fetch pokemon
    const fetchPokemon = async () => {
      try {
        const response = await GetPokemon(slug);
        setPokemon(response);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setFetchError(true);
      }
    }

    // Fetch Pokemon Species
    const fetchPokemonSpecies = async () => {
      if (!pokemon.id) return;

      try {
        const response = await GetPokemonSpecies(pokemon.id);
        setSpecies(response);
      } catch (error) {
        console.error("Error fetching Pokémon Species data:", error);
        setFetchError(true);
      }
    }

    // Fetch pokemon data first and then its species data
    const fetchPokemonData = () => {
      return Promise.all([fetchPokemon(), fetchPokemonSpecies()]);
    };

    fetchPokemonData()
  }, [pokemon, slug]);

  const sanitizeFlavorText = (text) => {
    if (!text) return;

    return text.replace(/u'\f'/, /u'\n'/)
      .replace(/u'\u00ad\n'/, /u''/)
      .replace(/u'\u00ad'/, /u''/)
      .replace(/u' -\n'/, /u' - '/)
      .replace(/u'-\n'/, /u'-'/)
      .replace(/u'\n'/, /u' '/)
  }

  const genders = () => {
    if (!species) return "male";

    if (species.gender_rate === 1) {
      return "male";
    } else if (species.gender_rate === 8) {
      return "female";
    } else {
      return "male/female";
    }
  }

  return (
    <>
      { fetchError.pokemon ? (<div>Error fetching Pokémon data</div>) : (
        <section className="flex flex-row flex-wrap justify-center w-full gap-8">
          <div className="bg-[#D1C8C1] w-50 h-100 rounded-md p-5">
            <img className="w-[400px]" src={pokemon.sprites?.other["official-artwork"].front_default} alt={pokemon.name} />
          </div>
          <div>
            <div className="mb-5">
              <h1 className="text-3xl font-bold capitalize">
                {pokemon.name}
              </h1>
              <h1 className="text-xl font-bold">
                #{pokemon.id}
              </h1>
            </div>

            <p className="mb-8">
              { sanitizeFlavorText(species.flavor_text_entries?.find((entry) => entry.language.name === "en")?.flavor_text) }
            </p>

            <div className="flex bg-[#D8AE7E] p-5 rounded-md">
              <div className="w-9/12 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold mb-1">Height: </p>
                  <p className="mb-0">{pokemon.height / 10} m</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Weight: </p>
                  <p className="mb-0">{pokemon.weight / 10} kg</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Category: </p>
                  <p className="mb-0">
                    {species.genera?.find((genus) => genus.language.name === "en")?.genus}
                  </p>
                </div>
                <div>
                  <p className="font-bold mb-1">Abilities: </p>
                  <p className="mb-0">{pokemon.abilities?.map((i) => i.ability.name).join(", ")}</p>
                </div>
              </div>
              <div>
                <div>
                  <p className="font-bold mb-2">Gender: </p>
                  {
                    genders() === 'male' && <img src="/male-gender.png" alt="male" width="40" />
                  }
                  {
                    genders() === 'female' && <img src="/female-gender.png" alt="female" width="40" />
                  }
                  {
                    genders() === 'male/female' && <img src="/male-and-female-gender.png" alt="male/female" width="60" />
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default PokemonView;