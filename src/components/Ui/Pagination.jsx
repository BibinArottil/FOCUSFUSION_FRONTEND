import React from "react";

export default function Pagination({ page, total, limit, setPage }) {
  const totalPages = Math.ceil(total / limit);
  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <div className="flex justify-center items-center z-30">
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) => (
          <button
            className={
              page === index + 1
                ? "bg-gray-500 text-white px-2 mb-3 rounded mr-2"
                : "px-2 mb-3 rounded border mr-2"
            }
            key={index}
            onClick={() => onClick(index)}
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
}
