import { useSelector, useDispatch } from "react-redux";
import {
  selectBrands,
  selectBrandsLoading,
  selectBrandsError,
} from "../../redux/brands/selectorsBrands";
import { useId, useState } from "react";
import { setFilters } from "../../redux/filters/sliceFilters";
import { resetCars } from "../../redux/cars/sliceCars";
import { fetchCars } from "../../redux/cars/operations";
import css from "./CatalogFilters.module.css";

// Format input number with commas
function formatWithCommas(value) {
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  return Number(numericValue).toLocaleString("en-US");
}

export default function CatalogFilters() {
  const brandId = useId();
  const priceId = useId();

  const brands = useSelector(selectBrands);
  const isLoading = useSelector(selectBrandsLoading);
  const error = useSelector(selectBrandsError);

  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const prices = Array.from({ length: 50 }, (_, i) => (i + 1) * 10);

  // Handle mileage "From" input change
  const handleFromChange = (e) => {
    const raw = e.target.value.replace(/^From\s*/i, "").replace(/,/g, "");
    setFrom(formatWithCommas(raw));
  };

  // Handle mileage "To" input change
  const handleToChange = (e) => {
    const raw = e.target.value.replace(/^To\s*/i, "").replace(/,/g, "");
    setTo(formatWithCommas(raw));
  };

  // On form submit: set filters and fetch cars
  const handleSearch = (e) => {
    e.preventDefault();

    const fromNumber = from ? Number(from.replace(/,/g, "")) : "";
    const toNumber = to ? Number(to.replace(/,/g, "")) : "";

    dispatch(resetCars()); // Clear previous results

    dispatch(
      setFilters({
        brand: selectedBrand,
        rentalPrice: selectedPrice ? Number(selectedPrice) : "",
        minMileage: fromNumber,
        maxMileage: toNumber,
      })
    );

    dispatch(fetchCars()); // Load filtered cars
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      {/* Brand selector */}
      <div className={css.field}>
        <label className={css.label} htmlFor={brandId}>
          Car brand
        </label>
        <select
          className={css.select}
          id={brandId}
          disabled={isLoading || error}
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          {isLoading && <option>Loading...</option>}
          {error && <option>Error loading</option>}
          {!isLoading && !error && (
            <>
              <option value="" disabled hidden>
                Choose a brand
              </option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </>
          )}
        </select>
      </div>

      {/* Price selector */}
      <div className={css.field}>
        <label className={css.label} htmlFor={priceId}>
          Price/1 hour
        </label>
        <select
          className={css.select}
          id={priceId}
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
        >
          <option value="" hidden>
            Choose a price
          </option>
          {prices.map((price) => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      {/* Mileage inputs */}
      <div className={css.mileageField}>
        <label className={css.label}>Car mileage/km</label>
        <div className={css.mileageInputs}>
          <input
            className={css.input}
            type="text"
            value={`From ${from}`}
            onChange={handleFromChange}
          />
          <input
            className={css.input}
            type="text"
            value={`To ${to}`}
            onChange={handleToChange}
          />
        </div>
      </div>

      {/* Submit button */}
      <button type="submit" className={css.submitButton}>
        Search
      </button>
    </form>
  );
}
