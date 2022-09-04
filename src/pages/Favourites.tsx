import React, { FC, useEffect } from "react";
import { useAppSelector } from "../hooks/hook";
import { favouritesActions } from "../store/slices/favouritesSlice";
import { useDispatch } from "react-redux";
import { IJoke } from "./../types/types";

const Favourites: FC = () => {
  const { favourites } = useAppSelector((state) => state.favourites);
  const { removeFromFavourites, removeAllFavourites } = favouritesActions;
  const dispatch = useDispatch();
  console.log(favourites);
  const handleRemove = (fav: IJoke) => {
    dispatch(removeFromFavourites(fav));
  };
  const handleClearStorage = () => {
    dispatch(removeAllFavourites());
  };
  useEffect(() => {}, [favourites]);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1 className="title">Favourites Jokes</h1>
          <div className="btn-clear">
            <button className="btn" onClick={() => handleClearStorage()}>
              Clear Favorites
            </button>
          </div>
          <div className="favourites-content">
            {favourites.map((fav) => (
              <div className="main" key={fav.id}>
                <div className="content-text">{fav.value}</div>
                <button className="btn" onClick={() => handleRemove(fav)}>
                  Remove From Favourites
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourites;
