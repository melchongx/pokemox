const generateRandomPokemonId = () => {
  return Math.floor(Math.random() * 1025) + 1;
};

const padStartId = (id) => {
  return String(id).padStart(4, "0");
};

export { generateRandomPokemonId, padStartId };
