import css from "./DetailsCarLeft.module.css";
import BookingForm from "./BookingForm.jsx";

export default function DetailsCarLeft({ car }) {
  return (
    <div>
      <div className={css.wrapper}>
        <img
          className={css.image}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width="640"
          height="512"
        />
      </div>

      <BookingForm />
    </div>
  );
}
