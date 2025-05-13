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
        {/* {video ? (
          <ReactPlayer
            loop={true}
            playing={true}
            muted={true}
            url={windowWidth > 599.98 ? video : videoMobile}
            width="100vw"
            height="100vh"
            className={css.image_background}
          />
        ) : ( */}
        <img
          src={`images/slider/${image}`}
          alt={image}
          width="100%"
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
            <Button width={style}>
              <Link to={name}>Shop the {name}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
