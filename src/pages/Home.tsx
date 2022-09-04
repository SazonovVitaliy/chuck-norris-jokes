import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API, FAVOURITES_ROUTE } from "../utils/const";
import { favouritesActions } from "../store/slices/favouritesSlice";
import { useDispatch } from "react-redux";
import { IJoke } from "./../types/types";
const Home: FC = () => {
  const { addToFavourites, removeFromFavourites } = favouritesActions;
  const dispatch = useDispatch();
  const [joke, setJoke] = useState<IJoke>();
  const [showJokes, setShowJokes] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const fetchRandomJoke = () => {
    axios.get<IJoke>(`${API}/jokes/random`).then(({ data }) => setJoke(data));
  };

  const handleClick = () => {
    fetchRandomJoke();
    setIsFav(false);
  };
  const handleAddToFavourites = () => {
    joke && dispatch(addToFavourites(joke));
    setIsFav(true);
  };
  useEffect(() => {
    if (!showJokes) {
    }
  }, [showJokes]);
  const handleRemoveFromFavourites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    joke && dispatch(removeFromFavourites(joke));
    setIsFav(false);
  };
  const handleClickShowJokes = () => {
    setShowJokes(!showJokes);
    try {
      const interval = setInterval(function () {
        fetchRandomJoke();
      }, 3000);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  console.log(isFav);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <header className="header">
            <h1 className="title">Chuck Norris Jokes</h1>
            <div className="header-content">
              <div className="btns">
                <button className="btn" onClick={handleClick}>
                  Show New Joke
                </button>
                {!showJokes ? (
                  <button className="btn" onClick={handleClickShowJokes}>
                    New Joke every 3s
                  </button>
                ) : (
                  <button className="btn" onClick={handleClickShowJokes}>
                    Stop Showing Jokes
                  </button>
                )}
              </div>
              <div>
                <Link className="btn" to={FAVOURITES_ROUTE}>
                  Favourites Jokes
                </Link>
              </div>
            </div>
          </header>
          <main className="main">
            <div className="content">{joke?.value}</div>
            {!isFav ? (
              <button className="btn" onClick={handleAddToFavourites}>
                Add To Favourites
              </button>
            ) : (
              <button className="btn" onClick={handleRemoveFromFavourites}>
                Remove from Favourites
              </button>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Home;
