import { createSelector } from "@reduxjs/toolkit";
import {
  selectBrand,
  selectMaxMileage,
  selectMinMileage,
  selectRentalPrice,
} from "../filters/selectors";

// Basic selectors for cars slice state
export const selectCars = (state) => state.cars.items;
export const selectCarsLoading = (state) => state.cars.isLoading;
export const selectCarsError = (state) => state.cars.error;
export const selectSelectedCar = (state) => state.cars.selectedCar;

// Memoized selector to filter cars based on current filters
export const selectFilteredCars = createSelector(
  [
    selectCars,
    selectBrand,
    selectRentalPrice,
    selectMinMileage,
    selectMaxMileage,
  ],
  (cars, brand, rentalPrice, minMileage, maxMileage) => {
    return cars.filter((car) => {
      // Check if car matches brand filter (case-insensitive)
      const brandMatches = brand
        ? car.brand.toLowerCase().includes(brand.toLowerCase())
        : true;

      // Check if rental price matches exactly
      const rentalPriceMatches = rentalPrice
        ? Number(car.rentalPrice) === Number(rentalPrice)
        : true;

      // Check if mileage is above minMileage filter
      const minMileageMatches = minMileage
        ? car.mileage >= Number(minMileage)
        : true;

      // Check if mileage is below maxMileage filter
      const maxMileageMatches = maxMileage
        ? car.mileage <= Number(maxMileage)
        : true;

      // Include car only if all filter conditions are met
      return (
        brandMatches &&
        rentalPriceMatches &&
        minMileageMatches &&
        maxMileageMatches
      );
    });
  }
);
