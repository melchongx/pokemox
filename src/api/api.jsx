//https://pokeapi.co/api/v2/{endpoint}/ = pokeApi

const baseUrl = "https://pokeapi.co/api/v2/";

export async function PokedexCall() {
  const pokemons = [];
  let url = baseUrl + "pokemon?limit=1025";

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    pokemons.push(...data.results);
    url = data.next;
  }

  return pokemons;
}

export async function GetPokemon(name) {
  const response = await fetch(baseUrl + `pokemon/${name}`);

  if (!response.ok) {
    throw new Error("Error fetching Pokémon data");
  }

  return response.json();
}

// https://pokeapi.co/docs/v2#pokemon-species
export async function GetPokemonSpecies(id) {
  const response = await fetch(baseUrl + `pokemon-species/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching Pokémon Species data");
  }

  return response.json();
}