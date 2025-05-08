import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addProduct, deleteProduct } from "../../../redux/wishlistSlice";
import { getInBasket, deleteFromBasket } from "../../../redux/basketSlice";

import Delivery from "../components/Delivery/Delivery";

import { BsCart2 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import starEmpty from "../../../icons/StarEmpty.svg";
import starSelect from "../../../icons/StarColor.svg";

import css from "./SelfProduct.module.css";
import "./mui.css";
import style from "./../../NewArrivals/ArrivalsItem/ArrivalsItem.module.css";
import clsx from "clsx";

import HistoryBar from "../../HistoryBar/HistoryBar";

import Skeleton from "@mui/material/Skeleton";

import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// ARROW

import { TiArrowSortedUp } from "react-icons/ti";
import { TiArrowSortedDown } from "react-icons/ti";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./Swiper.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

function Product() {
  // REDUX
  const product = useSelector((state) => state.goods.items);
  const wishlistArray = useSelector((state) => state.wishlist.products);
  const basket = useSelector((state) => state.basket.basketArr);

  const dispatch = useDispatch();

  // PARAMS
  const navigate = useNavigate();
  const param = useParams();

  // STATE
  const [selfItem, setSelfItem] = useState(null);

  const [tab, setTab] = useState("General info");
  const [color, setColor] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const [inBasket, setInBasket] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [size, setSize] = useState("");

  const [count, setCount] = useState(1);

  // EFFECT
  useEffect(() => {
    const fetchProduct = () => {
      return new Promise((resolve, reject) => {
        if (product.length === 0) {
          reject("Список продуктів порожній");
        } else {
          const foundItem = product.find((item) => item.id == param.id);
          resolve(foundItem);
        }
      });
    };

    fetchProduct()
      .then((foundItem) => {
        if (!foundItem) {
          navigate("/");
        }
        setSelfItem(foundItem);
      })
      .catch((error) => console.error("Помилка:", error));
  }, [param.id, product]);

  // TABS
  const tabs_list = ["General info", "Product details", "Reviews"];

  const buildLinkClass = (index) => {
    return clsx(
      css.self_product_tabs_button,
      index === tab && css.self_product_tabs_button_active
    );
  };

  // ADD LIKE

  const getLike = (
    id,
    title,
    gender,
    rating,
    price,
    sale,
    saleValue,
    image
  ) => {
    dispatch(
      addProduct({
        id,
        title,
        gender,
        rating,
        price,
        sale,
        saleValue,
        image,
      })
    );
  };

  const deleteLike = () => {
    dispatch(deleteProduct(selfItem.id));
    setIsLiked(false);
  };

  const wishlistID = wishlistArray.map((item) => {
    return item.id;
  });

  const buildLinkClassLike = () => {
    return clsx(
      css.favourite_button,

      wishlistID.find((itemID) => itemID == selfItem.id) && css.active
    );
  };

  // ADD TO BASKET

  const basketID = basket.map((item) => {
    return item.id;
  });

  function salePrice(price, sale) {
    return price * count - price * count * (sale / 100).toFixed(2);
  }

  const getToBasket = (
    id,
    title,
    rating,
    price,
    salePrice,
    sale,
    saleValue,
    image,
    count,
    color,
    size
  ) => {
    dispatch(
      getInBasket({
        id,
        title,
        rating,
        price,
        salePrice,
        sale,
        saleValue,
        image,
        count,
        color,
        size,
      })
    );
  };

  const deleteItem = () => {
    dispatch(deleteFromBasket(selfItem.id));
  };

  useEffect(() => {
    if (selfItem) {
      setInBasket(false);
      deleteItem();

      // getToBasket(
      //   selfItem.id,
      //   selfItem.title,
      //   selfItem.rating,
      //   selfItem.price,
      //   selfItem.sale,
      //   selfItem.saleValue,
      //   selfItem.image,
      //   count
      // );
    }
  }, [count, size]);

  // Count price

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    setThumbsSwiper(null);
  }, [tab]);

  return (
    <>
      <HistoryBar></HistoryBar>
      <div className="container">
        {selfItem && (
          <div className={css.self_product_tile}>
            <div className={css.self_product_title_tile}>
              <h2 className={css.selfItem_title}>{selfItem.title}</h2>
              <p className={css.selfItem_article}>
                <span className={css.art_no}>Art. No.</span>
                <span className={css.art_value}>{selfItem.id}</span>
              </p>
            </div>
            <ul className={css.self_product_tabs}>
              {tabs_list.map((item) => {
                return (
                  <li
                    key={item}
                    onClick={() => setTab(item)}
                    className={buildLinkClass(item)}
                  >
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
            <div className={css.tabs_tile}>
              {tab == "General info" && (
                <div className={css.general_info}>
                  <div className="image_slider">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      {selfItem.image && selfItem.image.length > 0 ? (
                        selfItem.image.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img src={`/images/goods/${image}`} />
                          </SwiperSlide>
                        ))
                      ) : (
                        <Skeleton
                          sx={{ width: 450, height: 450 }}
                          animation="wave"
                          variant="rectangular"
                        />
                      )}
                    </Swiper>
                    <Swiper
                      onSwiper={(swiper) => {
                        setThumbsSwiper(swiper);
                      }}
                      spaceBetween={20}
                      slidesPerView={5}
                      freeMode={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiperThumbs"
                    >
                      {selfItem.image && selfItem.image.length > 0 ? (
                        selfItem.image.map((image, index) => (
                          <SwiperSlide key={index} style={{ width: "104px" }}>
                            <img
                              src={`/images/goods/${image}`}
                              alt={`Product ${index}`}
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <Skeleton
                          sx={{ width: 104, height: 104 }}
                          animation="wave"
                          variant="rectangular"
                        />
                      )}
                    </Swiper>
                  </div>
                  <div className={css.product_info}>
                    <div className={css.product_info_top}>
                      <div className={style.price_tile}>
                        <div>
                          {selfItem.sale && (
                            <span
                              style={{
                                color: "var(--danger)",
                                fontWeight: "700",
                                fontSize: "24px",
                                lineHeight: "1",
                              }}
                            >
                              $
                              {(
                                selfItem.price * count -
                                selfItem.price *
                                  count *
                                  (selfItem.saleValue / 100)
                              ).toFixed(2)}
                            </span>
                          )}
                          <span
                            style={{
                              marginLeft: selfItem.sale ? "14px" : "0",
                              textDecoration: selfItem.sale
                                ? "line-through"
                                : "none",
                              fontSize: selfItem.sale ? "16px" : "24px",
                              color: selfItem.sale
                                ? "var(--gray-700)"
                                : "var(--gray-900)",
                              fontWeight: selfItem.sale ? "400" : "900",
                            }}
                            className={css.product_price}
                          >
                            ${(selfItem.price * count).toFixed(2)}
                          </span>
                        </div>
                        <div
                          className={style.sale_tile}
                          style={{ marginLeft: "24px" }}
                        >
                          {selfItem.saleValue > 0 && (
                            <span className={style.sale_band}>
                              -{selfItem.saleValue}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={css.product_info_rating}>
                        <div>
                          {[...Array(5)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                              <span key={index}>
                                <img
                                  src={
                                    currentRating <=
                                    (hover || rating || selfItem.rating)
                                      ? starSelect
                                      : starEmpty
                                  }
                                  alt=""
                                  width={14}
                                  height={14}
                                  onClick={() => setRating(currentRating)}
                                  onMouseEnter={() => setHover(currentRating)}
                                  onMouseLeave={() => setHover(0)}
                                />
                              </span>
                            );
                          })}
                        </div>
                        <div
                          onClick={() => {
                            setTab("Reviews");
                          }}
                          className={css.reviews_tile}
                        >
                          {selfItem.reviews ? selfItem.reviews.length : "0"}
                          <span>review</span>
                        </div>
                      </div>
                    </div>
                    {/* SELECTS BOX */}
                    <div className={css.select_box}>
                      <div className={css.colors_select}>
                        <span className={css.label}>Color</span>
                        {selfItem.color.map((item, index) => {
                          return (
                            <div
                              onClick={() => setColor(item)}
                              key={index}
                              className={css.color_select_tile}
                              style={{
                                border: `1.5px solid
                                  ${
                                    color == item
                                      ? "var(--primary)"
                                      : "var(--gray-400)"
                                  }`,
                              }}
                            >
                              <div
                                className={css.color_tile}
                                key={index}
                                style={{
                                  backgroundColor: item,
                                  width: "16px",
                                  height: "16px",
                                }}
                              ></div>
                            </div>
                          );
                        })}
                        <span className={css.color_text}>{color}</span>
                      </div>
                      <div className={css.size_select}>
                        {selfItem.sizeNumm ? (
                          <form className={css.sizeForm}>
                            {selfItem.sizeNumm.map((item, index) => {
                              return (
                                <label
                                  key={index}
                                  className={
                                    size == item
                                      ? css.size_item_label_active
                                      : css.size_item_label
                                  }
                                >
                                  <span className={css.size_number}>
                                    {item}
                                  </span>
                                  <input
                                    type="radio"
                                    name="size"
                                    value={item}
                                    onChange={handleChange}
                                  />
                                </label>
                              );
                            })}
                          </form>
                        ) : (
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            className="form_size_tile"
                          >
                            <FormHelperText className={css.label}>
                              Size
                            </FormHelperText>
                            <Select
                              className={css.select_size_tile}
                              value={size}
                              onChange={handleChange}
                              displayEmpty
                            >
                              <MenuItem value="" className={css.menu_select}>
                                <em>Please select</em>
                              </MenuItem>
                              {selfItem.size.map((item, index) => (
                                <MenuItem
                                  key={index}
                                  value={item}
                                  className={css.menu_select}
                                >
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      </div>
                    </div>
                    {/* E-COMMERCE */}
                    <div className={css.commerce_box}>
                      {/* COUNT PRICE */}
                      <div className={css.product_count_price}>
                        <input
                          className={css.product_count_input}
                          type="number"
                          value={count || ""}
                          onChange={(e) => {
                            let newValue = e.target.value.slice(0, 2);

                            if (Number(newValue) > 50) {
                              newValue = "1";
                            }

                            setCount(Number(newValue));
                          }}
                          max={50}
                          min={1}
                        />

                        <div className={css.count_price_buttons}>
                          <button
                            className={css.custom_count_button}
                            onClick={() => {
                              if (count >= 50) {
                                return;
                              }
                              setCount(count + 1);
                            }}
                          >
                            <TiArrowSortedUp />
                          </button>
                          <button
                            className={css.custom_count_button}
                            onClick={() => {
                              if (count <= 1) {
                                return;
                              } else setCount(count - 1);
                            }}
                          >
                            <TiArrowSortedDown />
                          </button>
                        </div>
                      </div>
                      {/* ADD TO CARD */}
                      <button
                        onClick={() => {
                          if (
                            basketID.find((itemID) => itemID == selfItem.id)
                          ) {
                            setInBasket(false);
                            deleteItem();
                            return;
                          } else {
                            setInBasket(true);
                            getToBasket(
                              selfItem.id,
                              selfItem.title,
                              selfItem.rating,
                              selfItem.price,
                              salePrice(selfItem.price, selfItem.saleValue),
                              selfItem.sale,
                              selfItem.saleValue,
                              selfItem.image,
                              count,
                              color,
                              size
                            );
                          }
                        }}
                        className={css.add_to_cart_button}
                      >
                        <BsCart2 className={css.cart_icon} />
                        <span>
                          {!basketID.find((itemID) => itemID == selfItem.id)
                            ? "Add to cart"
                            : "Remove from cart"}
                        </span>
                      </button>
                      {/* ADD TO FAVORITES */}

                      <button
                        onClick={() => {
                          if (isLiked == true) {
                            setIsLiked(false);
                            deleteLike();
                          } else if (
                            wishlistID.find((itemID) => itemID == selfItem.id)
                          ) {
                            setIsLiked(false);
                            deleteLike();
                            return;
                          } else {
                            getLike(
                              selfItem.id,
                              selfItem.title,
                              selfItem.gender,
                              selfItem.rating,
                              selfItem.price,
                              selfItem.sale,
                              selfItem.saleValue,
                              selfItem.image
                            );
                            setIsLiked(true);
                          }
                        }}
                        className={buildLinkClassLike(isLiked)}
                      >
                        <CiHeart className={css.cart_icon_favourite} />
                        <span>Favourite</span>
                      </button>
                    </div>
                    {/* DELIVERY */}
                    <Delivery />
                  </div>
                </div>
              )}
              {tab == "Product details" && <>Product</>}
              {tab == "Reviews" && (
                <div>
                  {selfItem.reviews && (
                    <ul>
                      {selfItem.reviews.map(({ index, name, comment }) => {
                        return (
                          <li key={index}>
                            <span>{name}</span>
                            <br />
                            <p>{comment}</p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
              <div />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
