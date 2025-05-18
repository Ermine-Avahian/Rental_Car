import lokal from "../../assets/Location.svg";
import circle from "../../assets/check-circle.svg";
import calendar from "../../assets/calendar.svg";
import type from "../../assets/car.svg";
import fuel from "../../assets/fuel-pump.svg";
import gear from "../../assets/gear.svg";
import css from "./DetailsCarRight.module.css";

export default function DetailsCarRight({ car }) {
  // Extract city and country from address for display
  const cityCountry = car.address.split(", ").slice(1).join(" | ");
  // Combine accessories and functionalities into one list
  const combinedList = [...car.accessories, ...car.functionalities];

  return (
    <div className={css.wrapperDetails}>
      {/* Car main info */}
      <div className={css.topRow}>
        <h3 className={css.carTitle}>
          {car.brand} {car.model} {car.year}
        </h3>
        <p className={css.id}>Id: {car.id}</p>
        <p className={css.locationCompany}>
          <img src={lokal} alt="location icon" className={css.locationIcon} />{" "}
          {cityCountry} | Mileage: {car.mileage.toLocaleString()} km
        </p>
        <p className={css.rentalPrice}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
      </div>

      {/* Rental conditions list */}
      <div className={css.section}>
        <h3 className={css.sectionTitle}>Rental Conditions</h3>
        <ul className={css.list}>
          {car.rentalConditions.map((condition, index) => (
            <li key={index} className={css.listItem}>
              <img src={circle} alt="check icon" className={css.circleIcon} />{" "}
              {condition}
            </li>
          ))}
        </ul>
      </div>

      {/* Car specifications with icons */}
      <div className={css.section}>
        <h3 className={css.sectionTitle}>Car Specifications</h3>
        <ul className={css.list}>
          <li className={css.listItem}>
            <img
              src={calendar}
              alt="calendar icon"
              className={css.circleIcon}
            />
            Year: {car.year}
          </li>
          <li className={css.listItem}>
            <img src={type} alt="car type icon" className={css.circleIcon} />
            Type: {car.type}
          </li>
          <li className={css.listItem}>
            <img src={fuel} alt="fuel icon" className={css.circleIcon} />
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.listItem}>
            <img src={gear} alt="engine icon" className={css.circleIcon} />
            Engine Size: {car.engineSize}
          </li>
        </ul>
      </div>

      {/* Accessories and functionalities combined list */}
      <div className={css.section}>
        <h3 className={css.sectionTitle}>Accessories and Functionalities</h3>
        <ul className={css.list}>
          {combinedList.map((item, index) => (
            <li key={index} className={css.listItem}>
              <img src={circle} alt="check icon" className={css.circleIcon} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
