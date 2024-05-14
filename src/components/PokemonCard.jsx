const PokemonCard = ({ pokemon }) => {
  return (
    <div className="m-auto mb-5 flex h-fit w-11/12 flex-col items-center rounded-2xl bg-white p-2 pb-5 shadow-xl">
      <img
        className="w-full"
        src={pokemon.sprites.front_shiny}
        alt={pokemon.name}
      />
      <h2 className="font-semibold sm:text-sm lg:text-lg">
        {pokemon.name.toUpperCase()}
      </h2>
    </div>
  );
};

export default PokemonCard;
