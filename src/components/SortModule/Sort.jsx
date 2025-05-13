import { use, useState } from "react";

import css from "./Sort.module.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const sortArray = ["Popular", "New", "Interesting", "Sale", "Hot"];

function Sort({ setFilter }) {
  const [sort, setSort] = useState("");

  console.log(sort);
  return (
    <div className={css.sort_module_tile}>
      <div className={css.sort_tile}>
        <h4>Sort by</h4>
        <FormControl sx={{ m: 1, minWidth: 120 }} className="form_size_tile">
          <Select
            className={css.select_size_tile}
            value={sort ? sort : "All"}
            onChange={(event) => {
              setFilter(event.target.value);
              setSort(event.target.value);
            }}
            displayEmpty
          >
            <MenuItem default value="All" className={css.menu_select}>
              <em>Please select</em>
            </MenuItem>
            {sortArray.map((item, index) => (
              <MenuItem key={index} value={item} className={css.menu_select}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Sort;
