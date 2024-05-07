import imgUrl from "../assets/react.svg";

import Nav from "./Nav";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-amber-200 flex justify-between items-center">
      <Link to="/" className="flex space-x-2 justify-center items-center">
        <img src={imgUrl} alt="Pokemox header branding" />
        <h1 className="uppercase">Pokemox</h1>
      </Link>

      <input type="text" placeholder="Search" />

      <Nav />
    </header>
  );
};

export default Header;
