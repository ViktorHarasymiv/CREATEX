import React, { useState } from "react";

import css from "./Search.module.css";

import { CiSearch } from "react-icons/ci";

function Search() {
  const [inputValue, setInputValue] = useState("");

  const getSearch = (event) => {
    event.preventDefault();

    const form = event.target;

    const searchValue = form.elements.SEARCH.value.trim().toLowerCase();

    setInputValue(searchValue);

    form.reset();
  };

  return (
    <form onSubmit={getSearch} type="submit" className={css.input_tile}>
      <input
        className={css.search_input}
        name="SEARCH"
        type="text"
        placeholder="Search for products..."
      />
      <button className={css.search_button} type="submit">
        <CiSearch className={css.search_icon} />
      </button>
    </form>
  );
}

export default Search;
