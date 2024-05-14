import { padStartId } from "../helpers";

import PokemonType from "./PokemonType";

const Panel = ({ pokemon }) => {
  return (
    <div className="panel rounded-[12px] mx-4">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        className="rounded-[4px] bg-white p-2"
      />

      <div className="bg-[#D1C8C1] p-3">
        <div className="font-bold capitalize text-center">
          {pokemon.name}
        </div>
        <div className="text-center">
          #{padStartId(pokemon.id)}
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
    </div>
  );
};

export default Panel;
