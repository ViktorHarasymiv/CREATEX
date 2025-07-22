import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteGood } from "../../../../../redux/goodsSlice";

import { AiOutlineDelete } from "react-icons/ai";
import css from "./SetProduct.module.css";

import clsx from "clsx";
import { Link } from "react-router-dom";

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
          .map((item, index) => (
            <div key={item.id} className={css.goodsItemTile}>
              <Link
                to={`/${item.gender}/${item.id}`}
                className={css.goodsContent}
              >
                <span>{index + 1}</span>
                <img
                  src={item.image[0]}
                  alt={item.alt}
                  width={70}
                  height={80}
                  className={css.goodsImage}
                />
                {item.title}
              </Link>
              <button
                onClick={() => hundleDelete(item.id)}
                className={css.delete_button}
              >
                <AiOutlineDelete className={css.delete_ico} />
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
