import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineMinus } from "react-icons/hi";

import css from "./Filters.module.css";

export default function FiltersOptions({ item }) {
  return (
    <>
      {/* ACCORDION */}
      <Accordion style={{ boxShadow: "none" }}>
        <AccordionSummary
          onClick={handleClick}
          expandIcon={expanded ? <HiOutlineMinus /> : <HiOutlinePlus />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className={css.filter_title}>
            {item.filterValue}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <li className={css.filter_options}>
            <ul className={css.category_filters}>
              {item.filterCategory.map((item) => {
                return (
                  <li>
                    <label htmlFor={item}>
                      <input type="checkbox" name={item} />
                    </label>
                    {item}
                  </li>
                );
              })}
            </ul>
          </li>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
