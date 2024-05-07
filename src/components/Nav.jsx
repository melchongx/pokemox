import NavLink from "./NavLink";

const Nav = () => {
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
      <ul className="flex space-x-4 uppercase items-center">
        {paths.map((path) => (
          <li key={path.href}>
            <NavLink href={path.href} text={path.text} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
