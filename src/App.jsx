import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { fetchAllPokemonData } from "./api/api.js";
// import { pokemons } from "./data/teams.jsx";

import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Poketeams from "./pages/Poketeams";
import PokemonView from "./pages/PokemonView.jsx";
// import CreateTeam from "./pages/CreateTeam.jsx";
import { SearchContext } from "./helpers/index.js";
import { useState } from "react";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchAllPokemonData();
  //     data.sort((a, b) => a.id - b.id);
  //
  //     pokemons.push(data);
  //     console.log(pokemons);
  //   };
  //
  //   fetchData();
  // }, []);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/poketeams" element={<Poketeams />} />
            <Route path="/pokedex/pokemonview" element={<PokemonView />} />
            {/* <Route path="/createteam" element={<CreateTeam />} /> */}
          </Route>
        </Routes>
      </Router>
    </SearchContext.Provider>
  );
};

export default App;
