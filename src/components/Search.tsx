import { useContext, useRef } from "react";
import { Context } from "../store/AppState";
import "../css/Search.css";

function Search() {
  const { searchHero, activateFilter } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value.length) {
      activateFilter();
    }
  };

  const searchHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    activateFilter();
    if (inputRef.current?.value) {
      searchHero(inputRef.current.value);
    }
  };

  return (
    <form
      className="search"
      onSubmit={(e) => {
        searchHandler(e);
      }}
    >
      <input
        className="search__input"
        ref={inputRef}
        type="text"
        onChange={onChange}
        name=""
        id=""
      />
      <button className="btn search__btn clickable">Search</button>
    </form>
  );
}

export default Search;
