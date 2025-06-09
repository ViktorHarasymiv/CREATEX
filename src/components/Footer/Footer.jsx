import { Link } from "react-router-dom";

import css from "./Footer.module.css";

import FB from "./media/Facebook.png";
import IN from "./media/Instagram.png";
import X from "./media/Twitter.png";
import YT from "./media/YouTube.png";
import P from "./media/pinterest.png";

import AppStore from "./media/app-store.png";
import GoogleStore from "./media/google-play.png";

export default function Footer() {
  return (
    <div className={css.footer_component}>
      <div className="container">
        <div className={css.footer}>
          <div className={css.footer_navigation}>
            <ul className={css.footer_navigation_list}>
              <li
                className={css.footer_nav_list_title}
                style={{ marginBottom: "8px" }}
              >
                Help
              </li>
              <li>
                <Link to={"/delivery"} className={css.footer_nav_link}>
                  Delivery & returns
                </Link>
              </li>
              <li>
                <Link to={"/faq"} className={css.footer_nav_link}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to={"/track"} className={css.footer_nav_link}>
                  Track order
                </Link>
              </li>
              <li>
                <Link to={"/contacts"} className={css.footer_nav_link}>
                  Contacts
                </Link>
              </li>
              <li>
                <Link to={"/blog"} className={css.footer_nav_link}>
                  Blog
                </Link>
              </li>
            </ul>
            {/* SHOP  */}
            <ul className={css.footer_navigation_list}>
              <li
                className={css.footer_nav_list_title}
                style={{ marginBottom: "8px" }}
              >
                Shop
              </li>
              <li>
                <Link to={"/delivery"} className={css.footer_nav_link}>
                  New arrivals
                </Link>
              </li>
              <li>
                <Link to={"/faq"} className={css.footer_nav_link}>
                  Trending now
                </Link>
              </li>
              <li>
                <Link to={"/sale"} className={css.footer_nav_link}>
                  Sales
                </Link>
              </li>
              <li>
                <Link to={"/contacts"} className={css.footer_nav_link}>
                  Brands
                </Link>
              </li>
            </ul>
            {/* MEDIA  */}
            <ul className={css.footer_navigation_list}>
              <li
                className={css.footer_nav_list_title}
                style={{ marginBottom: "8px" }}
              >
                Get in touch
              </li>
              <li>
                <span className={css.phone_context_text}>Call:</span>
                <a className={css.footer_nav_link} href="tel:(405) 555-0128">
                  <span style={{ marginLeft: "5px" }}>(405) 555-0128</span>
                </a>
              </li>
              <li>
                <span className={css.phone_context_text}>Email:</span>
                <a
                  className={css.footer_nav_link}
                  href="mailto:hello@createx.com"
                >
                  <span style={{ marginLeft: "5px" }}>hello@createx.com</span>
                </a>
              </li>
            </ul>
            {/* Download our app  */}
            <ul className={css.footer_navigation_list}>
              <li
                className={css.footer_nav_list_title}
                style={{ marginBottom: "8px" }}
              >
                Download our app
              </li>
              <li>
                <div className={css.media_nav_list}>
                  <a href="" target="_blank">
                    <img src={AppStore} alt="FB" />
                  </a>
                  <a href="" target="_blank">
                    <img src={GoogleStore} alt="IN" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={css.footer_copyright}>
        <div className="container">
          <div className={css.footer_copyright_content}>footer_copyright</div>
        </div>
      </div>
    </div>
  );
}
