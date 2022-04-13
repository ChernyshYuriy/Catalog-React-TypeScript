import React, { useContext } from "react";
import { Context } from "../store/AppState";
import { heroesType } from "./../types/heroes";
import CatalogItem from "./CatalogItem";
import "../css/catalog.css";
import CatalogFilter from "./CatalogFilter";

const Catalog: React.FC = () => {
  const { heroes } = useContext(Context);

  return (
    <React.Fragment>
      <div className="catalog catalog-container">
        <CatalogFilter />
        <div className="catalog__list">
          {heroes.map((hero: heroesType) => {
            return <CatalogItem key={hero.id} heroesData={hero} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Catalog;
