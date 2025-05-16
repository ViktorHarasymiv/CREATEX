import { useState, useRef } from "react";
import { useSelector } from "react-redux";

import css from "./Search.module.css";

import SearchTile from "./SearchTile";

import { CiSearch } from "react-icons/ci";

function Search({ valute }) {
  const product = useSelector((state) => state.goods.items);
  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const myRef = useRef(null);

  const handleChange = (event) => {
    setInputValue(event.target.value.trim().toLowerCase());
  };

  const handleKeyDown = (event) => {
    const form = event.target.closest("form");
    if (event.key === "Escape") {
      setInputValue(null);
      setOpenSearch(false);
      form.reset();
    } else {
      setInputValue(null);
    }
  };

  const handleOnBlur = () => {
    setOpenSearch((prev) => !prev);
  };

  return (
    <div className={css.search_header}>
      <form
        ref={myRef}
        onSubmit={(event) => {
          event.preventDefault();
        }}
        onKeyDown={handleKeyDown}
        onClick={handleOnBlur}
        className={css.input_tile}
      >
        <input
          onChange={handleChange}
          className={css.search_input}
          name="SEARCH"
          placeholder="Search for products..."
        />
        <button className={css.search_button} type="submit">
          <CiSearch className={css.search_icon} />
        </button>
      </form>
      {openSearch > 0 && (
        <SearchTile
          DATA={product}
          value={inputValue}
          valute={valute}
          input={myRef}
          setInputValue={setInputValue}
          close={handleKeyDown}
          autoClose={handleOnBlur}
        />
      )}
    </div>
  );
}

export default Search;
