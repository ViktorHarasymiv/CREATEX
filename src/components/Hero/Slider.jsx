import React from "react";
import { Link } from "react-router-dom";

import ReactPlayer from "react-player";

import css from "./Slider.module.css";

import Button from "../Button/Button";
import Button_T from "../Button/T-Button";

function Slider({
  id,
  name,
  image,
  video,
  videoMobile,
  PR,
  title,
  motivational,
  windowWidth,
}) {
  return (
    <div
      className={css.slider_tile}
      // style={{
      //   backgroundImage: `url(./../src/images/slider/${image}) `,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   width: "100%",
      //   height: "100%",
      // }}
    >
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
          <h1 className={css.title_text}>{title}</h1>
          <h4 className={css.motivational_text}>{motivational}</h4>
          <div className={css.buttons_tile}>
            <Button_T>Shop sale</Button_T>
            <Button>
              <Link to={name}>Shop the {name}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
