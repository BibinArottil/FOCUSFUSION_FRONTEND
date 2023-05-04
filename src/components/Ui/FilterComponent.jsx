import React from "react";

function FilterComponent({ filterText, onFilter }) {
  return (
    <div className="flex justify-end pb-5">
      <input
        className="border rounded-lg px-5 py-2 outline-none"
        type="search"
        placeholder="Search"
        value={filterText}
        onChange={onFilter}
      />
    </div>
  );
}

export default FilterComponent;
