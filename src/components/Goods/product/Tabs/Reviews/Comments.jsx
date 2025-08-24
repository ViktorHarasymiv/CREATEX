import React, { useState, useRef, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Arrow from "../../../../../../public/icons/paginationArray.svg";

import style from "./Reviews.module.css";
import starEmpty from "/icons/StarEmpty.svg";
import starSelect from "/icons/StarColor.svg";

export function Comments({ data }) {
  const elementRef = useRef(null);

  const [itemOffset, setItemOffset] = useState(0);

  let itemsPerPage = 4;
  let items = [...data.reviews]
    .reverse()
    .sort((a, b) => new Date(b.data) - new Date(a.data));

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const scrollTop = rect.top + window.scrollY;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div ref={elementRef} className={style.reviews_content}>
        {currentItems.map(({ data, name, rating, comment }, index) => {
          return (
            <div key={index} className={style.reviews_tile}>
              <div className={style.reviews_user_tile}>
                <div
                  className={style.reviews_user_info}
                  style={{ marginBottom: 16 }}
                >
                  <span className={style.user_name}>{name}</span>
                  <span className={style.number_style}>{data}</span>
                </div>
                <div>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <span key={index}>
                        <img
                          src={currentRating <= rating ? starSelect : starEmpty}
                          alt="Rating star"
                          width={14}
                          height={14}
                        />
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={style.reviews_comment_tile}>
                <span className={style.comment_text}>{comment}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<img src={Arrow} width={18} height={11} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel=""
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
