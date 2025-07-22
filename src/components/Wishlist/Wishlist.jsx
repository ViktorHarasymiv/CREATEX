import { useSelector } from "react-redux";

import css from "./Wishlist.module.css";

import WishlistItem from "./WishlistItem";
import HistoryBar from "../HistoryBar/HistoryBar";

import NO_DATA from "./images/9264828.jpg";

function Wishlist({ valute }) {
  const wishlistArray = useSelector((state) => state.wishlist.products);
  return (
    <div className={css.wishlist_page}>
      <HistoryBar />
      <div className="container">
        {wishlistArray.length > 0 ? (
          <ul className={css.wishlist_list}>
            {wishlistArray.map((item) => (
              <li key={item.id}>
                <WishlistItem data={item} valute={valute} />
              </li>
            ))}
          </ul>
        ) : (
          <img className={css.no_data_image} src={NO_DATA} alt="NO_DATA" />
        )}
      </div>
    </div>
  );
}

export default Wishlist;
