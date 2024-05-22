import { useState } from "react";
import NavLink from "./NavLink";

const Nav = () => {
  const [showHamburgerNav, setShowHamburgerNav] = useState(false);

  const paths = [
    {
      href: "/",
      text: "Home",
    },
    {
      href: "/pokedex",
      text: "Pokedex",
    },
    {
      href: "/poketeams",
      text: "Poketeams",
    },
  ];

  return (
    <nav className="flex items-center">
      <ul className="hidden items-center space-x-4 uppercase min-[868px]:flex">
        {paths.map((path) => (
          <li key={path.href}>
            <NavLink href={path.href} text={path.text} />
          </li>
        ))}
      </ul>

      {/* Hamburger Menu */}
      <button
        type="button"
        className="text- rounded-2xl border border-[#31241e40] p-[6px] min-[868px]:hidden"
        onClick={() => setShowHamburgerNav(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Nav Panel */}
      {showHamburgerNav && (
        <>
          <div
            className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-25"
            onClick={() => setShowHamburgerNav(false)}
          />

          <div className="absolute bottom-0 right-0 top-0 flex flex-col items-center justify-center bg-red-400 px-10 shadow-2xl">
            <ul className="flex flex-col items-center justify-center space-y-1 text-xl uppercase">
              {paths.map((path) => (
                <li key={path.href}>
                  <NavLink
                    href={path.href}
                    text={path.text}
                    onClick={() => setShowHamburgerNav(false)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
