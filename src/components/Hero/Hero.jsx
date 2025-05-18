import { useNavigate } from "react-router-dom";
import s from "./Hero.module.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h1 className={s.title}>Find your perfect rental car</h1>
        <p className={s.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button className={s.button} onClick={() => navigate("/catalog")}>
          View Catalog
        </button>
      </div>
    </div>
  );
}
