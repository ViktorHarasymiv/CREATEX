import React from "react";

import css from "./css.module.css";

import men_card from "./images/men_card_image.jpg";
import women_card from "./images/women_card_image.jpg";
import { Link, useParams } from "react-router-dom";

function Season() {
  const seasonArray = [
    {
      id: crypto.randomUUID(),
      gender: "men",
      title: "Season collection",
      image: men_card,
      url: "men_collection",
    },
    {
      id: crypto.randomUUID(),
      gender: "women",
      title: "Season collection",
      image: women_card,
      url: "women_collection",
    },
  ];
  return (
    <div className={css.season_section}>
      {seasonArray.map(({ id, title, image, gender, url }) => {
        return (
          <Link to={`/${gender}/${url}`} key={id} className={css.season_tile}>
            <img
              className={css.season_images}
              src={image}
              alt={title}
              style={{
                backgroundSize: "cover",
                width: "50vw",
                height: "100vh",
              }}
            />
            <h2 className={css.season_title}>{title}</h2>
          </Link>
        );
      })}
    </div>
  );
}

export default Season;
