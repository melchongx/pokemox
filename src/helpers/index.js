import { createContext } from "react";

const generateRandomPokemonId = () => {
  return Math.floor(Math.random() * 1025) + 1;
};

const padStartId = (id) => {
  return String(id).padStart(4, "0");
};

const sortPokemonData = (dataArr, sortBy) => {
  const updatedArr = [...dataArr];
  switch (sortBy) {
    case "number":
      updatedArr.sort((a, b) => a.id - b.id);
      break;
    case "name":
      updatedArr.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      break;
    case "type":
      updatedArr.sort((a, b) => {
        const typeA = a.types[0].type.name.toLowerCase();
        const typeB = b.types[0].type.name.toLowerCase();
        if (typeA < typeB) return -1;
        if (typeA > typeB) return 1;
        return 0;
      });
      break;
    default:
      throw new Error("Invalid sort option.");
  }

  return updatedArr;
};

const SearchContext = createContext();

export { generateRandomPokemonId, padStartId, sortPokemonData, SearchContext };
