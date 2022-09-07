import React, { FC, useEffect, useState } from "react";
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchRandomJoke();
    setIsFav(false);
  };
  const handleAddToFavourites = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    joke && dispatch(addToFavourites(joke));
    setIsFav(true);
  };

  const handleRemoveFromFavourites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    joke && dispatch(removeFromFavourites(joke));
    setIsFav(false);
  };

  useEffect(() => {
    if (showJokes) {
      setInterval(fetchJokesByInterval, 3000);
      setIsFav(false);
    }
    //clearInterval()
  }, [showJokes]);
  const handleClickShowJokes = () => {
    setShowJokes(true);
  };

  const fetchJokesByInterval = () => {
    showJokes === true && fetchRandomJoke();
    setIsFav(false);
  };
  const handleCancelShowJokes = () => {
    setShowJokes(false);
  };

  //let timerID = setInterval(fetchJokesByInterval, 3000);
  console.log(showJokes);

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
                  <button className="btn" onClick={handleCancelShowJokes}>
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
          {joke && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
