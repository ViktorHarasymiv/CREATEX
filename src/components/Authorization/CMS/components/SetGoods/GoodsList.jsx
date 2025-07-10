import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteGood } from "../../../../../redux/goodsSlice";

import { AiOutlineDelete } from "react-icons/ai";
import css from "./SetProduct.module.css";

import clsx from "clsx";

export default function GoodsList() {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState("men");
  const goodsCategory = ["men", "women", "kids"];
  const goods = useSelector((state) => state.goods.items);

  const buildLinkClass = (category) => {
    return clsx(css.goodsCategotyTabs, tabIndex === category && css.active);
  };

  const hundleDelete = (id) => {
    dispatch(deleteGood(id));
  };

  return (
    <div>
      <ul className={css.goodsTabsList}>
        {goodsCategory.map((category, index) => (
          <li
            key={index}
            onClick={() => setTabIndex(category)}
            className={buildLinkClass(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <div className={css.goodsWrapper}>
        {goods
          .filter((item) => item.gender === tabIndex)
          .map((item) => (
            <div key={item.id} className={css.goodsItemTile}>
              <div className={css.content}>
                <img src={item.image[0]} alt="" width={120} height={150} />
                {item.title}
              </div>
              <button
                onClick={() => hundleDelete(item.id)}
                className={css.delete_button}
              >
                <AiOutlineDelete className={css.delete_ico} />
                Delete account
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
