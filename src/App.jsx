import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Poketeams from "./pages/Poketeams";
import PokemonView from "./pages/PokemonView.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/poketeams" element={<Poketeams />} />
          <Route path="/pokedex/:slug" element={<PokemonView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
