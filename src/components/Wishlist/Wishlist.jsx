import React from "react";
import { useSelector } from "react-redux";
import css from "./Wishlist.module.css";
import WishlistItem from "./WishlistItem";
import PageBar from "../PageBar/PageBar";

import NO_DATA from "./images/9264828.jpg";

function Wishlist() {
  const wishlistArray = useSelector((state) => state.wishlist.products);
  return (
    <div className={css.wishlist_page}>
      <PageBar />
      <div className="container">
        <ul className={css.wishlist_list}>
          {wishlistArray.length > 0 ? (
            wishlistArray.map((item) => (
              <li key={item.id}>
                <WishlistItem data={item} />
              </li>
            ))
          ) : (
            <img className={css.no_data_image} src={NO_DATA} alt="NO_DATA" />
          )}
        </ul>
      </div>
    </div>
  );
}

export default Wishlist;
