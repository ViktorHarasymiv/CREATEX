import { TbFilterSearch } from "react-icons/tb";

import css from "./Filters.module.css";

export default function FilterButton({ isOnFilter, showFilter }) {
  const show = () => {
    showFilter((prev) => !prev);
  };

  return (
    <button onClick={show} className={css.filters_button}>
      <span className={css.button_context}>
        <TbFilterSearch className={css.filters_button_icon} />
        <span style={{ marginLeft: "10px" }}>
          {isOnFilter ? "Hide filters" : "Show filters"}
        </span>
      </span>
    </button>
  );
}
