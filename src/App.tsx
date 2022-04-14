import "./App.css";
import { Routes, Route } from "react-router-dom";
import Catalog from "./page/catalogPage";
import HeroesPage from "./page/heroePage";
import { useContext, useEffect } from "react";
import { Context } from "./store/AppState";
const App: React.FC = () => {
  const { getHeroes } = useContext(Context);

  useEffect(() => {
    getHeroes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
