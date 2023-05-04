import React from "react";
import DataTable from "react-data-table-component";

function Table(props) {
    const style = {
        rows: {
          style: {
            minWidth: "100px",
            minHeight: "60px",
            fontSize: "15px",
          },
        },
        columns: {
          Style: {
            width: "auto",
          },
        },
        headCells: {
          style: {
            fontWeight: "bold",
            fontSize: "17px",
            textColor: "gray",
            backgroundColor: "#F9FAFB",
          },
        },
      };
  return (
    <div className="w-full overflow-auto" >
      <DataTable
        pagination
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        customStyles={style}
        {...props}
      />
    </div>
  );
}

export default Table;
