//https://pokeapi.co/api/v2/{endpoint}/ = pokeApi

import { generateRandomPokemonId } from "../helpers";

const baseUrl = "https://pokeapi.co/api/v2/";

export async function getAllPokemons() {
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

export async function fetchPokemonData() {
  const promises = [];
  for (let i = 1; i <= 8; i++) {
    const id = generateRandomPokemonId();
    promises.push(fetch(`${baseUrl}pokemon/${id}`));
  }

  try {
    const responseArr = await Promise.all(promises);
    const pokemonDataArr = await Promise.all(
      responseArr.map(async (res) => await res.json()),
    );
    return pokemonDataArr;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while fetching pokemonData: ${error.message}`);
  }
}

export async function fetchAllPokemonData() {
  const promises = [];
  for (let i = 1; i <= 10; i++) {
    promises.push(fetch(`${baseUrl}pokemon/${i}`));
  }

  try {
    const responseArr = await Promise.all(promises);
    const pokemonDataArr = await Promise.all(
      responseArr.map(async (res) => await res.json()),
    );
    return pokemonDataArr;
  } catch (error) {
    console.error(error);
    throw new Error(`Error while fetching pokemonData: ${error.message}`);
  }
}

export async function GetPokemon(nameOrId) {
  const response = await fetch(baseUrl + `pokemon/${nameOrId}`);

  if (!response.ok) {
    throw new Error("Error fetching Pokémon data");
  }

  return response.json();
}

// https://pokeapi.co/docs/v2#pokemon-species
export async function GetPokemonSpecies(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Error fetching Pokémon Species data");
  }

  return response.json();
}
