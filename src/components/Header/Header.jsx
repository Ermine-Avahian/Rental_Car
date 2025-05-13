import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import logo from "./RentalCar.svg";

export default function Header() {
  const buildLinkClass = ({ isActive }) =>
    clsx(s.item, isActive && s.activeItem);

  return (
    <header className={s.header}>
      <img src={logo} alt="" />

      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink className={buildLinkClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={buildLinkClass} to="/catalog">
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
