import { useState } from "react";

import css from "./Sort.module.css";
import style from "../Goods/product/SelfProduct.module.css";

// ARROW

import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const sortArray = ["Popular", "New", "Interesting", "Sale", "Hot"];

function Sort({ data, setFilter, sliceValue, setSliceValue }) {
  const [sort, setSort] = useState("");

  return (
    <div className={css.sort_module_tile}>
      <div className={css.sort_show_tile}>
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
        {data > 6 && (
          <div className={css.sort_tile_page}>
            <h4>Show</h4>
            {/* COUNT PRICE */}
            <div
              className={style.product_count_price}
              style={{ width: "80px" }}
            >
              <span style={{ marginLeft: "23px" }}>{sliceValue}</span>

              <div className={style.count_price_buttons}>
                <button
                  className={style.custom_count_button}
                  onClick={() => {
                    if (sliceValue >= 21) {
                      return;
                    }
                    setSliceValue(sliceValue + 4);
                  }}
                >
                  <TiArrowSortedUp />
                </button>
                <button
                  className={style.custom_count_button}
                  onClick={() => {
                    if (sliceValue <= 6) {
                      return;
                    } else setSliceValue(sliceValue - 4);
                  }}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
