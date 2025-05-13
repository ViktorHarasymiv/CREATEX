import { TbFilterSearch } from "react-icons/tb";

import css from "./Filters.module.css";

export default function FilterButton({ click, showState }) {
  return (
    <button onClick={click} className={css.filters_button}>
      <span className={css.button_context}>
        <TbFilterSearch style={{ marginRight: "14px" }} />
        {showState ? "Hide filters" : "Show filters"}
      </span>
    </button>
  );
}
