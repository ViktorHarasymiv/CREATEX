import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

import { useEffect, useState } from "react";

export default function Pagination({
  totalPages,
  data,
  page,
  setPage,
  currentPage,
  setCurrentPage,
  sliceValue,
  setSliceValue,
}) {
  // useEffect(() => {}, [page]);

  const handlePageChange = (selected) => {
    const itemsPerPage = 8;
    setCurrentPage(selected);

    if (sliceValue === itemsPerPage && selected === 1) return;
    if (currentPage === selected) return;
    if (sliceValue > data.length) {
      setPage(0);
      setSliceValue((prev) => prev - itemsPerPage);
    } else if (sliceValue <= data.length) {
      setPage((prev) => prev + itemsPerPage);
      setSliceValue(selected * itemsPerPage);
    }

    console.log(selected);
  };

  console.log(currentPage);

  return sliceValue <= data.length ? (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => handlePageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  ) : (
    ""
  );
}
