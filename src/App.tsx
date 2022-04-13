import "./App.css";
// import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Catalog from "./page/catalogPage";
import HeroesPage from "./page/heroePage";
import { useContext, useEffect } from "react";
import { Context } from "./store/AppState";
const App: React.FC = () => {
  // const changeUserInfo = (user) => {
  //   setUserInfo(user);
  // };

  const { getHeroes } = useContext(Context);

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/Hero/:id" element={<HeroesPage />} />
      </Routes>
    </div>
  );
};

export default App;
