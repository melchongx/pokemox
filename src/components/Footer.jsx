import NavLink from "./NavLink";

const Footer = () => {
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
    <footer className="bg-[#ffaf61] px-12 py-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8">
        <div>
          <h1 className="text-2xl font-bold">The Pokemox Corporation</h1>
          <p className="font-poppins">&copy; Copyright 2024 Pokemox Corp.</p>
        </div>

        <div>
          <ul className="flex flex-col items-end justify-center space-y-1 text-sm sm:text-base">
            {paths.map((path) => (
              <li key={path.href}>
                <NavLink href={path.href} text={path.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
