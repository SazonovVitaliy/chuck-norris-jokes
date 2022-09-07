import React, { FC } from "react";
import { useAppSelector } from "../hooks/hook";
import { favouritesActions } from "../store/slices/favouritesSlice";
import { useDispatch } from "react-redux";
import { IJoke } from "./../types/types";
import { useNavigate } from "react-router-dom";

const Favourites: FC = () => {
  const { favourites } = useAppSelector((state) => state.favourites);
  const { removeFromFavourites, removeAllFavourites } = favouritesActions;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = (fav: IJoke) => {
    dispatch(removeFromFavourites(fav));
  };

  const handleClearStorage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(removeAllFavourites());
  };
  console.log(favourites);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <h1 className="title">Favourites Jokes</h1>
          <div className="btn-clear">
            <button className="btn" onClick={() => navigate(-1)}>
              Go Back
            </button>
            {favourites.length > 0 && (
              <button className="btn" onClick={handleClearStorage}>
                Clear Favourites
              </button>
            )}
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
