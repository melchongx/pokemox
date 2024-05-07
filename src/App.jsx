import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import Poketeams from "./pages/Poketeams";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/poketeams" element={<Poketeams />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
