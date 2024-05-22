import { NavLink as ReactRouterNavLink } from "react-router-dom";

const NavLink = ({ href, text, onClick }) => {
  return (
    <ReactRouterNavLink
      to={href}
      className={({ isActive }) =>
        isActive ? "sm:text-md font-bold lg:text-xl" : "sm:text-md lg:text-xl"
      }
      onClick={onClick}
    >
      {text}
    </ReactRouterNavLink>
  );
};

export default NavLink;
