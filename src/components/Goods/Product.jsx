import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Skeleton from "@mui/material/Skeleton";

function Product() {
  const navigate = useNavigate();

  const param = useParams();
  const [selfItem, setSelfItem] = useState(null);

  const product = useSelector((state) => state.goods.items);

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

  return (
    <div>
      {selfItem && (
        <div>
          {!selfItem.image ? (
            <Skeleton
              sx={{ width: 285, height: 320 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <img
              src={`./../../../public/images/goods/${selfItem.image}`}
              width="285px"
              height="320px"
            />
          )}

          <h2>{selfItem.title}</h2>
          <h5>{selfItem.price}</h5>
        </div>
      )}
    </div>
  );
}

export default Product;
