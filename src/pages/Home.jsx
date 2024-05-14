import { useEffect, useRef, useState } from "react";
import { GetPokemon } from "../api/api.js"
import Carousel from "../components/Carousel.jsx";

const Home = () => {
  const initialized = useRef(false);
  const [featuredPokemons, setFeaturedPokemons] = useState([]);

  const featuredPokemonList = [
    "squirtle",
    "pikachu",
    "charmander",
    "bulbasaur",
    "eevee",
  ];

  const fetchFeaturedPokemons = async () => {
    for (const name of featuredPokemonList) {
      const response = await GetPokemon(name);
      setFeaturedPokemons((prev) => [...prev, response]);
    }
  }

  useEffect(() => {
    if (!initialized.current) {
      fetchFeaturedPokemons();
      initialized.current = true;
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl italic font-bold text-center uppercase mb-10">
        Welcome to Pokemox!
      </h1>

      <div className="flex items-center gap-4 mb-10">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-center mb-5 uppercase">
            What is Pokemox?
          </h1>

          <img src="/logo.png" className={"w-[150px] mx-auto"} alt="Pokemox Logo" />
        </div>
        <div className="bg-[#D8AE7E] p-4 text-center rounded-md w-1/2">
          <p className="mb-5">
            Pokemox is the ultimate companion for Pokémon trainers, offering a comprehensive Pokédex experience. Whether
            you&apos;re a seasoned Master or a beginner, Pokemox provides detailed stats, abilities, and evolutions for
            every
            Pokémon species.
          </p>
          <p>
            Beyond information, Pokemox is a powerful team-building tool, allowing trainers to craft their dream teams
            effortlessly. With its intuitive interface, you can effectively strategize move sets and exploit type
            advantages. With Pokemox, you&apos;ll be poised to conquer gyms, defeat the Elite Four, and claim your title
            as
            the ultimate Pokémon Champion.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="bg-[#D8AE7E] p-4 text-center rounded-md w-1/2">
          <p className="mb-5">
            Pokémon, short for &quot;Pocket Monsters,&quot; inhabit a diverse universe, each possessing unique abilities
            and
            appearances, from the charming Pikachu to the majestic Dragonite. Trainers capture and train these creatures
            for battles, friendship, and sometimes to save the world.
          </p>
          <p>
            With types like Fire, Water, Grass, Electric, and Psychic, Pokémon exhibit strengths and weaknesses. Beyond
            battling, they serve as companions, partners, and symbols of friendship. With hundreds of species to
            discover and bond with, the Pokémon world offers endless adventures for trainers seeking companionship or
            aiming for Champion status.
          </p>
        </div>
        <div className="w-1/2">
          <h1 className="text-2xl font-bold text-center mb-5 uppercase">
            What is a Pokemon?
          </h1>

          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            className={"w-[200px] mx-auto"} alt="Pikachu" />
        </div>
      </div>

      <div className="flex gap-4 mb-10">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-5 uppercase">
            Pokedex is...
          </h1>

          <img src="/pokemonteam.png" className={"w-[400px] rounded-md"} alt="Pokemon Roster" />
        </div>
        <div className="bg-[#D8AE7E] p-4 text-center rounded-md w-1/2">
          <p className="mb-5">
            A Pokédex is a digital encyclopedia Pokémon trainers use to catalog and access information about various
            Pokémon species. It details each Pokémon&apos;s characteristics, abilities, evolutions, habitats, and moves.
            Trainers use the Pokédex to learn about new Pokémon they encounter and strategize for battles.
          </p>
          <p>
            The device is essential for completing the Pokédex, a goal many trainers aspire to achieve by capturing and
            registering every Pokémon species. With its compact design and user-friendly interface, the Pokédex is an
            indispensable tool for trainers aiming to become Pokémon Masters.
          </p>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-5 uppercase text-center">
        Featured Pokemon
      </h1>

      {featuredPokemons && (
        <Carousel pokemons={featuredPokemons} />
      )}

    </div>
  );
};

export default Home;
