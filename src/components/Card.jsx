import { padStartId } from "../helpers";

import PokemonType from "./PokemonType";

const Card = ({ pokemon }) => {
  return (
    <div className="flex min-h-[332px] w-[200px] flex-col items-center gap-6 rounded-[12px] bg-[#D1C8C1] p-2 pb-4">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        className="w-full flex-grow rounded-[4px] bg-white p-2"
      />

      <div className="flex flex-col items-center gap-1">
        <span className="font-bold capitalize">{pokemon.name}</span>
        <span>#{padStartId(pokemon.id)}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-1">
        {pokemon.types.map((type) => (
          <PokemonType
            key={type.type.name}
            type={type.type.name}
            className="text-xs"
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
