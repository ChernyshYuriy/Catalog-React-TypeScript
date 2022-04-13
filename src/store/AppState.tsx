import React, { createContext, useState } from "react";
import { heroesType } from "./../types/heroes";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface filterParams {
  [key: string]: {
    values: [string | number] | { value: string | number; status: boolean }[];
    parentKey: string;
  };
}

interface ContextValue {
  heroes: heroesType[];
  heroesDefault: heroesType[];
  filterActiveParams: filterParams | { [key: string]: any };
  changeActiveFilter: (status: boolean, id: number, key: string) => void;
  activateFilter: () => void;
  getHeroes: () => void;
  getHeroData: (id: string | number | undefined) => heroesType | {};
  searchHero: (request: string) => void;
}

export const Context = createContext<ContextValue>({
  heroes: [],
  heroesDefault: [],
  filterActiveParams: {},
  changeActiveFilter: () => {},
  activateFilter: () => {},
  getHeroes: () => {},
  searchHero: () => {},
  getHeroData: () => ({}),
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [heroes, setHeroes] = useState<heroesType[]>([]);
  const [heroesDefault, setDefaultHeroes] = useState<heroesType[]>([]);
  const [filterParams, setFilterParams] = useState<
    filterParams | { [key: string]: any }
  >({});

  const getHeroes = () => {
    fetch(
      "https://marvel-test-d5786-default-rtdb.europe-west1.firebasedatabase.app/.json"
    ).then(async (response) => {
      const Heroes = await response.json();
      setDefaultHeroes(Heroes);
      setHeroes(Heroes);
      getFilterParams(Heroes, "appearance", "biography");
    });
  };

  const getFilterParams = (arr: [], ...keys: string[]): void => {
    const params: filterParams = {};
    arr.forEach((item) => {
      keys.forEach((key) => {
        const KeyValue = item[key];
        if (
          typeof KeyValue === "object" &&
          KeyValue !== null &&
          !Array.isArray(KeyValue)
        ) {
          Object.keys(KeyValue).forEach((keyObj) => {
            if (
              params[keyObj] !== undefined &&
              params[keyObj].values !== undefined
            ) {
              if (!params[keyObj].values.includes(KeyValue[keyObj])) {
                params[keyObj].values.push(KeyValue[keyObj]);
              }
            } else {
              params[keyObj] = { values: [" "], parentKey: "" };
              params[keyObj].values = [KeyValue[keyObj]];
              params[keyObj].parentKey = key;
            }
          });
        }
      });
    });
    let id = 0;
    for (const key in params) {
      let endValues: any = [];
      // eslint-disable-next-line no-loop-func
      params[key].values.forEach((val) => {
        endValues.push({ value: val, status: false, id });
        id++;
      });

      params[key].values = endValues;
    }
    setFilterParams(params);
  };

  const activateFilter = async () => {
    const activeFilters: {
      mainKey: string;
      subKey: string | number;
      value: string | string | number[];
    }[] = [];
    Object.keys(filterParams).forEach((key: string) => {
      const valuesFiltered: any[] = [];
      filterParams[key].values.forEach(
        (item: { status: boolean; value: string }) => {
          if (!!item.status) {
            valuesFiltered.push(item.value);
          }
        }
      );
      if (valuesFiltered.length) {
        activeFilters.push({
          mainKey: filterParams[key].parentKey,
          subKey: key,
          value: valuesFiltered,
        });
      }
    });

    let filteredHeroes = heroesDefault;

    activeFilters.forEach(
      (filter: {
        value: string | any[];
        mainKey: string | number;
        subKey: string | number;
      }) => {
        filteredHeroes = filteredHeroes.filter((hero: any) => {
          return filter.value.includes(hero[filter.mainKey][filter.subKey]);
        });
      }
    );

    activeFilters.length ? setHeroes(filteredHeroes) : setHeroes(heroesDefault);
    return activeFilters.length ? filteredHeroes : heroesDefault;
  };

  const changeActiveFilter = async (
    status: boolean,
    id: number,
    key: string
  ) => {
    let newFilter = JSON.parse(JSON.stringify(filterParams));

    newFilter[key].values = newFilter[key].values.map(
      (item: { id: number; value: any; status: boolean }) => {
        if (item.id === id) {
          return {
            value: item.value,
            status: !item.status,
            id,
          };
        } else {
          return item;
        }
      }
    );

    await setFilterParams(newFilter);
  };

  const getHeroData = (id: number | string | undefined) => {
    const HeroData = heroesDefault.filter((hero) => hero.id === id)[0];
    if (id !== undefined && heroesDefault.length && !!HeroData) {
      return HeroData;
    } else {
      return {};
    }
  };

  const searchHero = (request: string) => {
    if (request.length) {
      new Promise((resolve, reject) => {
        resolve(activateFilter());
      }).then((data: any) => {
        setHeroes(
          data.filter((item: { name: string }) =>
            item.name.toLowerCase().includes(request.toLowerCase())
          )
        );
      });
    } else {
      activateFilter();
    }
  };

  const state: ContextValue = {
    heroes: heroes,
    heroesDefault: heroesDefault,
    filterActiveParams: filterParams,
    changeActiveFilter: changeActiveFilter,
    getHeroData,
    activateFilter,
    getHeroes,
    searchHero,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
