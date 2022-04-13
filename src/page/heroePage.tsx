import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/AppState";
import "../css/itemPage.css";
import React from "react";

const HeroesPage: React.FC = () => {
  let par = useParams();
  const { getHeroData } = useContext(Context);
  const Hero: any = getHeroData(par.id);
  console.log(Hero, "HDS");
  let error;
  if (Object.keys(Hero).length) {
    error = "Data not founded";
  }

  const infoInterface = (HeroParams: { [key: string]: any }) => {
    return (
      <div className="characteristics-group">
        {Object.keys(HeroParams).map((param, index) => {
          return (
            <div className="characteristics-group__item" key={index}>
              <span className="characteristics-group___title">{`${param}: `}</span>{" "}
              <span className="characteristics-group___value">
                {HeroParams[param]}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="item-page">
      <Link className="link" to={"/"}>
        &#8592; Home Page
      </Link>
      {!Object.keys(Hero).length ? (
        <div>{error}</div>
      ) : (
        <React.Fragment>
          <div className="item-page__top">
            <div>
              <img src={Hero.image.url} width="100%" alt="" />
              <div className="item-page__title">{Hero.name}</div>
            </div>
            <div>
              {infoInterface(Hero.biography)}
              {infoInterface(Hero.appearance)}
              {infoInterface(Hero.powerstats)}
            </div>
          </div>
          <div className="item-page__bottom"></div>
        </React.Fragment>
      )}
    </div>
  );
};

export default HeroesPage;
