import { TbFilterSearch } from "react-icons/tb";

import css from "./Filters.module.css";

export default function FilterButton({ click, showState }) {
  return (
    <button onClick={click} className={css.filters_button}>
      <span className={css.button_context}>
        <TbFilterSearch className={css.filters_button_icon} />
        <span style={{ marginLeft: "10px" }}>
          {showState ? "Hide" : "Show"}
        </span>
      </span>
    </button>
  );
}
