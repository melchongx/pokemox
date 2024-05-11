import { NavLink as ReactRouterNavLink } from "react-router-dom";

const NavLink = ({ href, text }) => {
  return (
    <ReactRouterNavLink
      to={href}
      className={({ isActive }) => isActive ? "font-bold" : undefined}
    >
      {text}
    </ReactRouterNavLink>
  );
};

export default NavLink;
