import { IJoke } from "../types/types";

export const LS_FAV_JOKES = "lsfj";

export const setStorageItems = (items: IJoke[]) => {
  localStorage.setItem(LS_FAV_JOKES, JSON.stringify(items));
};

export const getStorageItems = () => {
  return JSON.parse(localStorage.getItem(LS_FAV_JOKES) ?? "[]");
};
