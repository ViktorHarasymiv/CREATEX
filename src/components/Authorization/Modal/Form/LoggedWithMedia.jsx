import React from "react";

import css from "./Form.module.css";

import FB from "../../../../../public/icons/Facebook.png";
import GOO from "../../../../../public/icons/Google.png";
import TW from "../../../../../public/icons/Twitter.png";
import IN from "../../../../../public/icons/Linked-In.png";

export default function LoggedWithMedia() {
  return (
    <div className={css.auth_media_tile}>
      <div className={css.auth_media_block}>
        <span className={css.auth_media_title}>Or sign in with</span>
        <ul className={css.auth_media_list}>
          <li className={css.media_item}>
            <a href="#">
              <img src={FB} alt="FB" />
            </a>
          </li>
          <li className={css.media_item}>
            <a href="#">
              <img src={GOO} alt="GOOGLE" />
            </a>
          </li>
          <li className={css.media_item}>
            <a href="#">
              <img src={TW} alt="TWITER" />
            </a>
          </li>
          <li className={css.media_item}>
            <a href="#">
              <img src={IN} alt="LINKEDIN" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
