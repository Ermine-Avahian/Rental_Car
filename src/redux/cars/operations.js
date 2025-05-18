import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

// Fetch list of cars with optional filters and pagination
export const fetchCars = createAsyncThunk(
  "cars/fetchAll",
  async ({ page = 1, limit = 8 } = {}, thunkAPI) => {
    const state = thunkAPI.getState();
    const { brand, rentalPrice, minMileage, maxMileage } = state.filters;

    const params = { page, limit };

    // Add filters to request params if set
    if (brand) params.brand = brand;
    if (rentalPrice) params.price = rentalPrice;
    if (minMileage) params.minMileage = minMileage;
    if (maxMileage) params.maxMileage = maxMileage;

    try {
      const response = await axios.get("/cars", { params });
      return response.data; // Return fetched cars
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Return error message on failure
    }
  }
);

// Fetch single car details by ID
export const getCarById = createAsyncThunk(
  "cars/getById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data; // Return car data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Return error message on failure
    }
  }
);
