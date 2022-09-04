import React from "react";
import { Routes, Route } from "react-router-dom";
import { FAVOURITES_ROUTE, HOME_ROUTE } from "./../utils/const";
import Favourites from "./../pages/Favourites";
import Home from "./../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Home />} />
      <Route path={FAVOURITES_ROUTE} element={<Favourites />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;
