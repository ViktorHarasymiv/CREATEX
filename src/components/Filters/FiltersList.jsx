import React, { useState } from "react";

import css from "./Filters.module.css";

// ACCORDION

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

// RANGE MUI

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// ICONS

import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

const filtersArray = [
  {
    filterValue: "Clothes",
    filterCategory: [
      "All",
      "Jackets",
      "Cardigans & sweaters",
      "Sweatshirts & hoodies",
      "T-shirt",
      "Shorts",
      "Jeans",
      "Boots",
    ],
  },
  {
    filterValue: "Accessories",
    filterCategory: ["Cap", "Clock", "Earrings", "Sunglasses", "Bag"],
  },
  {
    filterValue: "Size",
    filterCategory: [
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
    ],
  },
  {
    filterValue: "Color",
    filterCategory: [
      "White",
      "Dimgray",
      "Beige",
      "Royalblue",
      "Black",
      "Browm",
      "Blue",
      "Gray",
      "Green",
    ],
  },
  {
    filterValue: "Price",
    filterCategory: [
      "0 - 20",
      "20 - 80",
      "80 - 120",
      "120 - 180",
      "180 - 240",
      "240 -",
    ],
  },
];

function valuetext(value) {
  return `${value}`;
}

const minDistance = 10;

function FiltersList({ setFilter }) {
  const [expanded, setExpanded] = useState(1);

  const handleClick = () => {
    setExpanded(2);
  };

  const [value1, setValue1] = useState([0, 599]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
      setFilter([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setFilter([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <ul className={css.filters_list}>
      <li className={css.filter_options}>
        <Accordion defaultExpanded style={{ boxShadow: "none" }}>
          <AccordionSummary
            onClick={handleClick}
            expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span" className={css.filter_title}>
              {filtersArray[0].filterValue}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className={css.category_filters}>
              {filtersArray[0].filterCategory.map((item, index) => {
                return (
                  <div className={css.filter_radio_tile} key={index}>
                    <label htmlFor={item} className={css.subscribe_checkbox}>
                      <div className={css.custom_checkbox}>
                        <input
                          className={css.checkbox_input}
                          id={item}
                          onChange={(e) => setFilter(e.target.value)}
                          type="radio"
                          name="filter"
                          value={item}
                        />
                        <div className={css.primary_checkbox}></div>
                      </div>
                      <span className={css.checkbox_label}>{item}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </li>
      <li className={css.filter_options}>
        <Accordion style={{ boxShadow: "none" }}>
          <AccordionSummary
            onClick={handleClick}
            expandIcon={expanded == 2 ? <HiOutlineMinus /> : <HiOutlinePlus />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span" className={css.filter_title}>
              {filtersArray[1].filterValue}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className={css.category_filters}>
              {filtersArray[1].filterCategory.map((item, index) => {
                return (
                  <div key={index} className={css.filter_radio_tile}>
                    <label htmlFor={item} className={css.subscribe_checkbox}>
                      <div className={css.custom_checkbox}>
                        <input
                          className={css.checkbox_input}
                          id={item}
                          onChange={(e) => setFilter(e.target.value)}
                          type="radio"
                          name="filter"
                          value={item}
                        />
                        <div className={css.primary_checkbox}></div>
                      </div>
                      <span className={css.checkbox_label}>{item}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </li>
      <li className={css.filter_options}>
        <Accordion style={{ boxShadow: "none" }}>
          <AccordionSummary
            onClick={handleClick}
            expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span" className={css.filter_title}>
              {filtersArray[2].filterValue}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className={css.category_filters}>
              {filtersArray[2].filterCategory.map((item, index) => {
                return (
                  <div className={css.filter_radio_tile} key={index}>
                    <label htmlFor={item} className={css.subscribe_checkbox}>
                      <div className={css.custom_checkbox}>
                        <input
                          className={css.checkbox_input}
                          id={item}
                          onChange={(e) => setFilter(e.target.value)}
                          type="radio"
                          name="filter"
                          value={item}
                        />
                        <div className={css.primary_checkbox}></div>
                      </div>
                      <span className={css.checkbox_label}>{item}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </li>

      <li className={css.filter_options}>
        <Accordion style={{ boxShadow: "none" }}>
          <AccordionSummary
            onClick={handleClick}
            expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography component="span" className={css.filter_title}>
              {filtersArray[3].filterValue}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className={css.category_filters}>
              {filtersArray[3].filterCategory.map((item, index) => {
                return (
                  <div className={css.filter_radio_tile} key={index}>
                    <label htmlFor={item} className={css.subscribe_checkbox}>
                      <div className={css.custom_checkbox}>
                        <input
                          className={css.checkbox_input}
                          id={item}
                          onChange={(e) => setFilter(e.target.value)}
                          type="radio"
                          name="filter"
                          value={item}
                        />
                        <div className={css.primary_checkbox}></div>
                      </div>
                      <span className={css.checkbox_label}>{item}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </li>

      <li className={css.filter_options}>
        <Accordion style={{ boxShadow: "none" }}>
          <AccordionSummary
            onClick={handleClick}
            expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography component="span" className={css.filter_title}>
              {filtersArray[4].filterValue}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className={css.category_filters_range}>
              <Box className={css.range_tile} sx={{ width: "180px" }}>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={value1}
                  min={0}
                  max={999}
                  onChange={handleChange1}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                  className={css.range}
                />
              </Box>
            </div>
          </AccordionDetails>
        </Accordion>
      </li>
    </ul>
  );
}

export default FiltersList;
