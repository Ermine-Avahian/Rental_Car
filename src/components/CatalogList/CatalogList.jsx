import Car from "../Car/Car";
import s from "./CatalogList.module.css";

export default function CatalogList({ filteredCars }) {
  return (
    <div role="list" className={s.list}>
      {filteredCars.map((filteredCar) => (
        <div className={s.item} key={filteredCar.id} role="listitem">
          <Car
            id={filteredCar.id}
            img={filteredCar.img}
            brand={filteredCar.brand}
            model={filteredCar.model}
            year={filteredCar.year}
            rentalPrice={filteredCar.rentalPrice}
            address={filteredCar.address}
            rentalCompany={filteredCar.rentalCompany}
            type={filteredCar.type}
            mileage={filteredCar.mileage}
          />
        </div>
      ))}
    </div>
  );
}
