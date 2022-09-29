import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJoke } from "../../types/types";
import { getStorageItems, setStorageItems } from "../../utils";

interface IFavourites {
  favourites: IJoke[];
}

const initialState: IFavourites = {
  favourites: getStorageItems(),
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites(state, action: PayloadAction<IJoke>) {
      if (state.favourites.length === 10) {
        state.favourites.shift();
      }
      state.favourites.push(action.payload);
      setStorageItems(state.favourites);
    },
    removeFromFavourites(state, action: PayloadAction<IJoke>) {
      state.favourites = state.favourites.filter(
        (fav) => fav.id !== action.payload.id
      );
      setStorageItems(state.favourites);
    },
    removeAllFavourites(state) {
      localStorage.clear();
      state.favourites = [];
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export const favouritesReducers = favouritesSlice.reducer;
