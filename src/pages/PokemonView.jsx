import { useEffect, useState } from "react";
import { GetPokemon, GetPokemonSpecies } from "../api/api.js";
import { useParams } from "react-router-dom";
import PokemonType from "../components/PokemonType.jsx";
import PokemonStats from "../components/PokemonStats.jsx";
import PokemonNav from "../components/PokemonNav.jsx";

const PokemonView = () => {
  const [pokemon, setPokemon] = useState([]);
  const [species, setSpecies] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
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
    };

    fetchPokemon();
  }, [slug]);

  useEffect(() => {
    // Fetch Pokemon Species
    const fetchPokemonSpecies = async () => {
      if (!pokemon.id) return;

      try {
        const response = await GetPokemonSpecies(pokemon.species.url);
        setSpecies(response);
      } catch (error) {
        console.error("Error fetching Pokémon Species data:", error);
        setFetchError(true);
      }
    };

    fetchPokemonSpecies();
  }, [pokemon.id]);

  useEffect(() => {
    // Fetch Pokemon Type's Weaknesses
    const fetchPokemonTypeWeaknesses = async () => {
      if (!pokemon.types) return;

      const typePromises = pokemon.types.map(async ({ type }) => {
        const typeResponse = await fetch(type.url);
        return typeResponse.json();
      });

      const typesData = await Promise.all(typePromises);

      setWeaknesses(
        typesData.map((typeData) => {
          return typeData.damage_relations.double_damage_from.map(
            (weakness) => weakness.name,
          );
        }),
      );
    };

    fetchPokemonTypeWeaknesses();
  }, [pokemon]);

  const sanitizeFlavorText = (text) => {
    if (!text) return;

    return text.replace(/\f/g, " ").replace(/-\n/g, "-").replace(/\n/g, " ");
  };

  const genders = () => {
    if (!species) return "male";

    if (species.gender_rate === 1) {
      return "male";
    } else if (species.gender_rate === 8) {
      return "female";
    } else {
      return "male/female";
    }
  };

  return (
    <>
      {fetchError.pokemon ? (
        <div>Error fetching Pokémon data</div>
      ) : (
        <>
          {pokemon && (
            <PokemonNav
              currentId={species.id}
              isBaseForm={pokemon.is_default}
            />
          )}

          <section className="flex w-full flex-row justify-center gap-8">
            <div className="">
              <img
                className="mb-8 w-[400px] rounded-md bg-[#D1C8C1] p-5"
                src={pokemon.sprites?.other["official-artwork"].front_default}
                alt={pokemon.name}
              />

              <PokemonStats stats={pokemon.stats} />
            </div>
            <div>
              <div className="mb-5">
                <h1 className="text-3xl font-bold capitalize">
                  {pokemon.name}
                </h1>
                <h1 className="mb-2 text-xl font-bold">#{species.id}</h1>

                {species.is_legendary && (
                  <h1 className="inline-block rounded bg-yellow-600 px-2 font-bold text-white">
                    Legendary
                  </h1>
                )}

                {species.is_mythical && (
                  <h1 className="inline-block rounded bg-purple-600 px-2 font-bold text-white">
                    Mythical
                  </h1>
                )}
              </div>

              <p className="mb-8">
                {sanitizeFlavorText(
                  species.flavor_text_entries?.find(
                    (entry) => entry.language.name === "en",
                  )?.flavor_text,
                )}
              </p>

              <div className="mb-5 flex rounded-md bg-[#D8AE7E] p-5">
                <div className="grid w-9/12 grid-cols-2 gap-4">
                  <div>
                    <p className="mb-1 font-bold">Height: </p>
                    <p className="mb-0">{pokemon.height / 10} m</p>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">Weight: </p>
                    <p className="mb-0">{pokemon.weight / 10} kg</p>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">Category: </p>
                    <p className="mb-0">
                      {
                        species.genera?.find(
                          (genus) => genus.language.name === "en",
                        )?.genus
                      }
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-bold">Abilities: </p>
                    <p className="mb-0">
                      {pokemon.abilities?.map((i) => i.ability.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="mb-2 font-bold">Gender: </p>
                    {genders() === "male" && (
                      <img src="/male-gender.png" alt="male" width="40" />
                    )}
                    {genders() === "female" && (
                      <img src="/female-gender.png" alt="female" width="40" />
                    )}
                    {genders() === "male/female" && (
                      <img
                        src="/male-and-female-gender.png"
                        alt="male/female"
                        width="60"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <h1 className="mb-3 text-xl font-bold uppercase">Type</h1>
                {pokemon.types?.map((type) => (
                  <PokemonType
                    key={type.type.name}
                    type={type.type.name}
                    className="me-3"
                  />
                ))}
              </div>

              <div className="mb-5">
                <h1 className="mb-3 text-xl font-bold uppercase">Weaknesses</h1>
                {weaknesses[0]?.map((type) => (
                  <PokemonType key={type} type={type} className="me-3" />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PokemonView;
