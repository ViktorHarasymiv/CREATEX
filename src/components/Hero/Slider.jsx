import React from "react";
import { Link } from "react-router-dom";

import ReactPlayer from "react-player";

import css from "./Slider.module.css";

import Button from "../Button/Button";
import Button_T from "../Button/T-Button";

const style = 229;

function Slider({
  id,
  name,
  image,
  video,
  videoMobile,
  PR,
  title,
  year,
  motivational,
  windowWidth,
}) {
  return (
    <div className={css.slider_tile}>
      <div className={css.wrapper_background}>
        <img
          src={`images/slider/${image}`}
          alt={image}
          className={css.image_background}
        />
        {/* )} */}
      </div>
      <div className="container">
        <div className={css.slider_content_tile}>
          <p className={css.PR_text}>{PR}</p>
          <h1 className={css.title_text}>
            <span className={css.hero_title}>{title}</span>
            <span>{year}</span>
          </h1>
          <h4 className={css.motivational_text}>{motivational}</h4>
          <div className={css.buttons_tile}>
            <Button_T>Shop sale</Button_T>
            <Link className={css.hero_link_button} to={name}>
              <Button width={style}>Shop the {name}</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
