import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
function Pagination(props) {
  const state = useContext(GlobalState);
  const [page, setPage] = state.productsAPI.page;
  const [totalProducts] = state.productsAPI.totalProducts;
  const totalPage = Math.ceil(totalProducts / 20);
  const [pageCurrent, setPageCurrent] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    setPageCurrent(newPage);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <button
        className={`btn-pagination ${page <= 1 ? "btn-disable" : ""}`}
        disabled={page <= 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Prev
      </button>
      <ul className="pagination-list">
        {pageNumbers.map((number) => {
          return (
            <li
              className={`pagination-list-item ${
                pageCurrent === number ? "pagination-active" : ""
              }`}
              key={number}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </li>
          );
        })}
      </ul>
      <button
        className={`btn-pagination ${page >= totalPage ? "btn-disable" : ""}`}
        disabled={page >= totalPage}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
