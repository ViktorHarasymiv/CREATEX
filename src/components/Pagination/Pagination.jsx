import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

import { useEffect } from "react";

export default function Pagination({
  totalPages,
  data,
  page,
  setPage,
  sliceValue,
  setSliceValue,
}) {
  useEffect(() => {}, [page]);

  const handlePageChange = (selected) => {
    const itemsPerPage = 8;
    if (sliceValue > data.length) {
      setPage(0);
      setSliceValue((prev) => prev - itemsPerPage);
    } else {
      setPage((prev) => prev + 8);
      setSliceValue(selected * itemsPerPage);
    }
  };

  console.log(page, sliceValue);

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => handlePageChange(selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
