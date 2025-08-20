import React from "react";

import style from "./Details.module.css";
import SelfGoodCard from "../../../SelfGoodCard/SelfGoodCard";

export default function Details({ item }) {
  console.log(item);

  return (
    <div className={style.tab_wrapper}>
      <div className={style.tab_body}>
        {item.productInfo ? (
          item.productInfo.map((section, index) => {
            const [sectionName, details] = Object.entries(section)[0];
            return (
              <div className={style.tab_content} key={index}>
                <h4 className={style.detail_title}>{sectionName}</h4>
                <ul>
                  {Object.entries(details).map(([key, value]) => {
                    // Якщо значення — об'єкт з icon і text (як у care)
                    if (typeof value === "object" && value.icon && value.text) {
                      return (
                        <li className={style.detail_item_icon} key={key}>
                          <img src={value.icon} alt={value.text} width={20} />
                          <span>{value.text}</span>
                        </li>
                      );
                    }

                    // Якщо значення — просто текст (як у details або fabric)
                    return (
                      <li className={style.detail_item} key={key}>
                        {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        ) : (
          <h2>Not information... Wait for update..</h2>
        )}
      </div>
    </div>
  );
}
