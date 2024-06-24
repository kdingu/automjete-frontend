import React from "react";
import { noop } from "@/helpers/utilities/utils";
import SvgIcon from "@/components/svg-icon";
import PropTypes from 'prop-types';

const MAX_PAGINATION = 5;

const Separator = () => <div className="self-end text-gray-400">...</div>;

const PaginationButton = (props) => {
  const { onClick = noop, children, disabled, className = "" } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group flex h-8 min-w-[35px] w-max px-2 items-center justify-center rounded border hover:border-teal-800 ${disabled ? "pointer-events-none border-gray-100" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

const Pagination = (props) => {
  const { mini, currentPage, totalPages, onChange = noop } = props;

  const handlePrev = () => {
    onChange(currentPage - 1);
  };

  const handleNext = () => {
    onChange(currentPage + 1);
  };

  const handleGoToPage = (page = 1) => {
    onChange(page);
  };

  if (totalPages === 0) return <div></div>;

  if (mini)
    return (
      <div className="flex items-center justify-start gap-2">
        <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
          <SvgIcon className="group-hover:fill-teal-800" name="arrow-previous" />
        </PaginationButton>
        <PaginationButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <SvgIcon className="group-hover:fill-teal-800" name="arrow-next" />
        </PaginationButton>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    );

  const pages = new Array(totalPages).fill(1).map((v, index) => v + index);
  const start = currentPage - Math.ceil(MAX_PAGINATION / 2);
  const end = currentPage + Math.floor(MAX_PAGINATION / 2);
  const slicedPages = pages.slice(start < 1 ? 1 : start, end < MAX_PAGINATION ? MAX_PAGINATION : end > totalPages ? totalPages - 1 : end);
  const activeClasses = "bg-teal-300 text-white border-teal-300";

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
        <SvgIcon className="group-hover:fill-teal-800" name="arrow-previous" />
      </PaginationButton>

      <div className="flex justify-center gap-1 text-gray-600">
        <PaginationButton
          className={currentPage === 1 ? activeClasses : ""}
          onClick={() => handleGoToPage(1)}
        >
          1
        </PaginationButton>

        {currentPage > Math.ceil(MAX_PAGINATION / 2) + 1 && <Separator />}

        {slicedPages.map((page) => {
          return (
            <PaginationButton
              key={page}
              className={currentPage === page ? activeClasses : ""}
              onClick={() => handleGoToPage(page)}
            >
              {page}
            </PaginationButton>
          );
        })}

        {currentPage < totalPages - Math.ceil(MAX_PAGINATION / 2) && <Separator />}

        {totalPages > 1 && (
          <PaginationButton
            className={currentPage === totalPages ? activeClasses : ""}
            onClick={() => handleGoToPage(totalPages)}
          >
            {totalPages}
          </PaginationButton>
        )}
      </div>

      <PaginationButton
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <SvgIcon className="group-hover:fill-teal-800" name="arrow-next" />
      </PaginationButton>
    </div>
  );
};

Pagination.propTypes = {
  mini: PropTypes.bool,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChange: PropTypes.func
};

export default Pagination;
