import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand(state, action) {
      state.brand = action.payload;
    },
    setRentalPrice(state, action) {
      state.rentalPrice = action.payload;
    },
    setMinMileage(state, action) {
      state.minMileage = action.payload;
    },
    setMaxMileage(state, action) {
      state.maxMileage = action.payload;
    },

    setFilters(state, action) {
      const { brand, rentalPrice, minMileage, maxMileage } = action.payload;
      state.brand = brand ?? "";
      state.rentalPrice = rentalPrice ?? "";
      state.minMileage = minMileage ?? "";
      state.maxMileage = maxMileage ?? "";
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setBrand,
  setRentalPrice,
  setMinMileage,
  setMaxMileage,
  setFilters,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
