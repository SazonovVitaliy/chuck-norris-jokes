import { configureStore } from "@reduxjs/toolkit";
import { favouritesReducers } from "./slices/favouritesSlice";

const store = configureStore({
  reducer: {
    favourites: favouritesReducers,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
