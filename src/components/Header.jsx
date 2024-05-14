import { Link } from "react-router-dom";

import Search from "./Search";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-[#ffaf61] px-12 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center justify-center gap-4">
          <img
            src="/logo.png"
            alt="Pokemox header branding"
            className="sm:w-12 lg:w-16"
          />
          <h1 className="sm:text-md font-bold uppercase lg:text-xl">Pokemox</h1>
        </Link>
        <Search />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
