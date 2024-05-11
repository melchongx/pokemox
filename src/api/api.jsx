//https://pokeapi.co/api/v2/{endpoint}/ = pokeApi

export async function PokedexCall() {
  const pokemons = [];
  let url = "https://pokeapi.co/api/v2/pokemon?limit=1025";

  while (url) {
    const response = await fetch(url);
    const data = await response.json();
    pokemons.push(...data.results);
    url = data.next;
  }

  return pokemons;
}
