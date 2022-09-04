import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJoke } from "../../types/types";

const LS_FAV_JOKES = "lsfj";
interface IFavourites {
  favourites: IJoke[];
}

const initialState: IFavourites = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_JOKES) ?? "[]"),
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
      localStorage.setItem(LS_FAV_JOKES, JSON.stringify(state.favourites));
    },
    removeFromFavourites(state, action: PayloadAction<IJoke>) {
      state.favourites = state.favourites.filter(
        (fav) => fav.id !== action.payload.id
      );
      localStorage.setItem(LS_FAV_JOKES, JSON.stringify(state.favourites));
    },
    removeAllFavourites(state) {
      localStorage.clear();
      state.favourites = [];
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export const favouritesReducers = favouritesSlice.reducer;
