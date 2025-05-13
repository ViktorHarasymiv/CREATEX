import { useState } from "react";

import css from "./Filters.module.css";
import FilterButton from "./FilterButton";
import FiltersList from "./FiltersList";

export default function Filters({ setFilter }) {
  const [showFilter, setShowFilter] = useState(true);

  const show = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <div className={css.filters_wrapper}>
      <FilterButton click={show} showState={showFilter} />
      {showFilter && <FiltersList setFilter={setFilter} />}
    </div>
  );
}
