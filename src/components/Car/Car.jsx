import { useNavigate } from "react-router-dom";
import heart from "../../assets/heart.svg";
import heartFilled from "../../assets/heartFilled.svg";
import s from "./Car.module.css";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/favorites/sliceFavorites";
import { useDispatch, useSelector } from "react-redux";

export default function Car({
  id,
  img,
  brand,
  model,
  year,
  rentalPrice,
  address,
  rentalCompany,
  type,
  mileage,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((car) => car.id === id);

  const cityCountry = address.split(", ").slice(1).join(" | ");

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(
        addFavorite({
          id,
          img,
          brand,
          model,
          year,
          rentalPrice,
          address,
          rentalCompany,
          type,
          mileage,
        })
      );
    }
  };

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className={s.carCard}>
      <div className={s.carImage}>
        <img src={img} alt="Car" width="276" height="268" />
        <button
          onClick={handleToggleFavorite}
          className={`${s.favoriteBtn} ${isFavorite ? s.active : ""}`}
          aria-label="Toggle favorite"
        >
          <img
            src={isFavorite ? heartFilled : heart}
            alt="Favorite"
            width="24"
            height="24"
          />
        </button>
      </div>

      <div className={s.carInfo}>
        <div className={s.topRow}>
          <p className={s.carTitle}>
            {brand} <span className={s.span}>{model}</span>, {year}
          </p>
          <p className={s.rentalPrice}>${rentalPrice}</p>
        </div>
        <p className={s.locationCompany}>
          {cityCountry} | {rentalCompany} |
        </p>
        <p className={s.typeMileage}>
          {type} | {mileage.toLocaleString()} km
        </p>
        <button className={s.readMoreBtn} onClick={handleReadMore}>
          Read more
        </button>
      </div>
    </div>
  );
}
