import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "../../../redux/wishlistSlice";

import style from "./Like.module.css";
import clsx from "clsx";

import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";

export default function Like({ id, good }) {
  const dispatch = useDispatch();

  const wishlistArray = useSelector((state) => state.wishlist.products);

  const getLike = (good) => {
    dispatch(addProduct(good));
  };

  const deleteLike = (id) => {
    dispatch(deleteProduct(id));
  };

  const wishlistID = wishlistArray.map((item) => {
    return item.id;
  });

  return (
    <div
      onClick={() =>
        wishlistID.some((itemID) => itemID === id)
          ? deleteLike(id)
          : getLike(good)
      }
      className={style.favorite_tile}
    >
      <button className={style.favorite_button}>
        {wishlistID.find((itemID) => itemID === id) ? (
          <IoMdHeart
            style={{
              fill: wishlistID.find((itemID) => itemID === id)
                ? "red"
                : "var(--primary)",
            }}
          />
        ) : (
          <CiHeart
            style={{
              fill: "var(--primary)",
            }}
          ></CiHeart>
        )}
      </button>
    </div>
  );
}
