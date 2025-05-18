import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

// Async thunk to fetch cars with filters from state
export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { brand, rentalPrice, minMileage, maxMileage } = state.filters;

      // Build query params based on filters
      const params = {};
      if (brand) params.brand = brand;
      if (rentalPrice) params.rentalPrice = rentalPrice;
      if (minMileage) params.minMileage = minMileage;
      if (maxMileage) params.maxMileage = maxMileage;

      const response = await axios.get("/cars", { params });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch a single car by ID
export const getCarById = createAsyncThunk(
  "cars/getById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    selectedCar: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetCars(state) {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        // Save fetched cars; handle API response shape
        state.items = action.payload.cars || action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCarById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
