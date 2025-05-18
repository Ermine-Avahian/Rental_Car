import { NavLink } from "react-router-dom";
import s from "./AppBar.module.css";
import clsx from "clsx";
import logo from "./RentalCar.svg";

export default function AppBar() {
  const buildLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <img src={logo} alt="" />

      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink end className={buildLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink end className={buildLinkClass} to="/catalog">
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
