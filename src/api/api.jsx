//https://pokeapi.co/api/v2/{endpoint}/ = pokeApi

export async function tite() {
  const url = "https://pokeapi.co/api/v2/";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
