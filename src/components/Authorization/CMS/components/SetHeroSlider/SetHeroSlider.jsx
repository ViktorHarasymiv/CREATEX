import clsx from "clsx";
import css from "./SetSlider.module.css";

// REDUX STORE

import { useSelector, useDispatch } from "react-redux";
import { deleteSlider } from "../../../../../redux/sliderSlice";

import SetForm from "./SetForm";
import GetSliders from "./GetSliders";
import { useState } from "react";

export default function SetHeroSlider() {
  const dispatch = useDispatch();

  const sliders = useSelector((state) => state.slider.items);

  const [tab, setTab] = useState(1);

  const onDelete = (title) => {
    dispatch(deleteSlider(title));
  };

  return (
    <div className={css.setSliderWrapper}>
      <div className={css.tabs_buttons}>
        <button
          onClick={() => {
            setTab(1);
          }}
          className={tab == 1 ? css.active : css.tabs_button}
        >
          Slider
        </button>
        <button
          onClick={() => {
            setTab(2);
          }}
          className={tab == 2 ? css.active : css.tabs_button}
        >
          ADD SLIDE
        </button>
      </div>
      {tab == 1 ? (
        <GetSliders sliders={sliders} onDelete={onDelete} />
      ) : (
        <SetForm />
      )}
    </div>
  );
}
