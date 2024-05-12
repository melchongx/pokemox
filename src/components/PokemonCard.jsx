const PokemonCard = ({ pokemon }) => {
  return (
    <div className="m-auto mb-5 flex h-52 w-11/12 flex-col items-center rounded-2xl bg-white p-2 shadow-xl">
      <img
        className="w-full"
        src={pokemon.sprites.front_shiny}
        alt={pokemon.name}
      />
      <h2 className="text-lg font-bold">{pokemon.name.toUpperCase()}</h2>
      <div className="mt-2">
        <button className="mr-2 rounded bg-blue-500 px-2 py-1 text-white">
          Edit
        </button>
        <button className="rounded bg-red-500 px-2 py-1 text-white">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
