import React, { useState } from "react";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.scss";
import { uuid } from "../../../utils/helpers";

export const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const [customPageNo, setcustomPageNo] = useState("");

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  // const handleKeyDown = (event: any, eventType: any) => {
  //   if (
  //     event.key === "Enter" ||
  //     (eventType === "click" &&
  //       Number(customPageNo) > 0 &&
  //       paginationRange &&
  //       Number(customPageNo) <= paginationRange[paginationRange.length - 1])
  //   ) {
  //     onPageChange(Number(customPageNo));
  //   }
  // };
  const handleKeyDown = (event: any, eventType: any) => {
    if (
      (event.key === "Enter" && customPageNo !== "") ||
      (eventType === "click" &&
        Number(customPageNo) > 0 &&
        paginationRange &&
        Number(customPageNo) <= paginationRange[paginationRange.length - 1])
    ) {
      onPageChange(Number(customPageNo));
    }
  };

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    if (value && Number(value) === 0) return;
    const re = /^[0-9+]+$/;
    if (
      (value && !re.test(value)) ||
      (paginationRange &&
        Number(value) > paginationRange[paginationRange.length - 1])
    ) {
      return;
    }
    setcustomPageNo(value);
  };

  return (
    <div className="flex space-x-4  justify-center">
      <ul className={`pagination-container ${className}`}>
        <li
          key={uuid()}
          className={`font-redHatDisplayRegular arrow-icon pagination-item ${
            currentPage === 1 ? "disabled" : ""
          }`}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange?.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={uuid()}
                className="font-redHatDisplayRegular pagination-item dots"
              >
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={uuid()}
              className={`font-redHatDisplayRegular pagination-item ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          key={uuid()}
          className={`font-redHatDisplayRegular arrow-icon pagination-item ${
            currentPage === lastPage ? "disabled" : ""
          }`}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      </ul>
      <div className="hidden lg:flex space-x-2 justify-center items-center text-SpaceCadet pagination-goto relative">
        <p className="text-xs font-redHatDisplayRegular ml-4">Go to Page:</p>
        <div className="h-[40px] w-[84px] relative px-2 lg:flex justify-center items-center rounded-md border-2  bg-transparent hover:border-[2px] hover:border-[#ccc]  hidden">
          <input
            type="text"
            value={customPageNo}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, "")}
            className="h-full relative arrow right
            w-full outline-none  focus:outline-none hover:outline-none pl-1 rounded-md bg-transparent"
          />
          <span
            onClick={(e) => handleKeyDown(e, "click")}
            className="pagination-input-sec cursor-pointer absolute top-[15px] right-0"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
