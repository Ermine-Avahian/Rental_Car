import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/sliceCars.js";
import filtersReducer from "./filters/sliceFilters.js";
import brandsReducer from "./brands/sliceBrands.js";
import favoritesReducer from "./favorites/sliceFavorites.js";

const loadFavorites = () => {
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Error loading favorites from localStorage", e);
    return undefined;
  }
};

const saveFavorites = (favoritesState) => {
  try {
    const serializedState = JSON.stringify(favoritesState);
    localStorage.setItem("favorites", serializedState);
  } catch (e) {
    console.warn("Error loading favorites from localStorage", e);
  }
};

const preloadedFavorites = loadFavorites();

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    brands: brandsReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: preloadedFavorites || { items: [] },
  },
});

store.subscribe(() => {
  saveFavorites(store.getState().favorites);
});
