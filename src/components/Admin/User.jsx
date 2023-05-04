import React, { useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import axios from "../../instance/axios";
import DataTable from "react-data-table-component";
import FilterComponent from "../Ui/FilterComponent";

function User() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("admin");
  const [filterText, setFilterText] = useState("");

  const fetchData = async () => {
    await axios.get("/admin/users").then((res) => {
      setUser(res.data.list);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleList = async (id) => {
    try {
      await axios.post("/admin/user-block", { id }).then((res) => {
        if (res.data.success) fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "No:",
      selector: (row) => row.no,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Mobile No:",
      selector: (row) => row.mobile,
    },
    {
      name: null,
      cell: (row) => (
        <button
          className={`${
            row.status ? "bg-green-500" : "bg-red-500"
          } rounded text-white font-medium w-20 h-8`}
          onClick={() => {
            handleList(row.id);
          }}
        >
          {row.status ? "UnBlock" : "Block"}
        </button>
      ),
    },
  ];

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

  const tableData = user.map((value, i) => {
    return {
      id: value._id,
      no: i + 1,
      name: value.name,
      email: value.email,
      mobile: value.mobile,
      status: value.status,
    };
  });

  return !token ? (
    <Navigate to="/admin/login" />
  ) : (
    <div className="h-full w-full">
      <div className="flex px-20 py-5">
        <h1 className="text-3xl font-semibold">Users Management</h1>
      </div>
      <div className="sm:w-full px-10">
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />

        <DataTable
          columns={columns}
          data={tableData.filter(
            (item) =>
              item.name &&
              item.name.toLowerCase().includes(filterText.toLowerCase())
          )}
          customStyles={style}
          pagination
        />
      </div>
    </div>
  );
}

export default User;
