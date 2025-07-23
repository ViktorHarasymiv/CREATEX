import { Link } from "react-router-dom";

import css from "./Slider.module.css";

import Button from "../Button/Button";
import Button_T from "../Button/T-Button";

const style = 229;

function Slider({ url, image, relations, title, data, motivation }) {
  return (
    <div className={css.slider_tile}>
      <div className={css.wrapper_background}>
        <img src={image} alt={image} className={css.image_background} />
        {/* )} */}
      </div>
      <div className="container">
        <div className={css.slider_content_tile}>
          <p className={css.PR_text}>{relations}</p>
          <h1 className={css.title_text}>
            <span className={css.hero_title}>{title}</span>
            <span>{data}</span>
          </h1>
          <h4 className={css.motivational_text}>{motivation}</h4>
          <div className={css.buttons_tile}>
            <Button_T>Shop sale</Button_T>
            <Link className={css.hero_link_button} to={url}>
              <Button width={style}>Find Your Look</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
