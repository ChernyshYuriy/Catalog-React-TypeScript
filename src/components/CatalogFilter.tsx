import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppState";
import "../css/filter.css";
import Checkbox from "./ui/checkbox";
import { useOnClickOutside } from "usehooks-ts";

const CatalogFilter: React.FC = () => {
  const { filterActiveParams, changeActiveFilter, activateFilter } =
    useContext(Context);

  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowMobileFilter(false);
  };

  const changeFilterVisibility = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileFilter(!showMobileFilter);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    console.log(filterActiveParams, 1232);
    activateFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterActiveParams]);

  const changeCheckboxHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    status: boolean,
    id: number,
    keyParameter: string
  ) => {
    await changeActiveFilter(!status, id, keyParameter);
  };
  return (
    <React.Fragment>
      <div className="filter-container" ref={ref}>
        <span
          onClick={(e) => changeFilterVisibility(e)}
          className="btn filter__btn filter__btn--filter clickable"
        >
          Filter
        </span>
        <div
          className={`catalog__filter filter ${
            showMobileFilter ? "filter--show" : "filter--hide"
          }`}
        >
          {Object.keys(filterActiveParams).map((parameter) => {
            return (
              <div className="parameter" key={parameter}>
                <div className="parameter__title"></div>
                {parameter}
                <div>
                  {filterActiveParams[parameter].values.map(
                    (valueObj: {
                      value: string | number;
                      status: boolean;
                      id: number;
                    }) => {
                      return (
                        <div key={valueObj.id} className="parameter__value">
                          <Checkbox
                            onChange={changeCheckboxHandler}
                            keyParameter={parameter}
                            value={valueObj.value}
                            id={valueObj.id}
                            status={valueObj.status}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CatalogFilter;
