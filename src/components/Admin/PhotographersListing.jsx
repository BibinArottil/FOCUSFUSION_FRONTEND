import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../../instance/axios";
import DataTable from "react-data-table-component";
import FilterComponent from "../Ui/FilterComponent";

function PhotographersListing() {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");

  const token = localStorage.getItem("admin");

  const fetchData = async () => {
    await axios
      .get("/admin/list", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data.list);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleList = async (id) => {
    try {
      await axios
        .post("/admin/photographer-block", {
          id,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.data.success) fetchData();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "NO:",
      selector: (row) => row.no,
      sortable: true,
    },
    {
      name: "Company Name",
      selector: (row) => row.company,
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
          {row.status ? "Unblock" : "Block"}
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
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "17px",
        textColor: "gray",
        backgroundColor: "#F9FAFB",
      },
    },
  };

  const tableData = data.map((value, i) => {
    return {
      id: value._id,
      no: i + 1,
      company: value.companyName,
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
      <div className="flex flex-col px-20 py-5">
        <h1 className="text-3xl font-semibold">Photographers List</h1>
        <button className="self-start my-5 bg-slate-400 w-32 h-10 shadow-slate-800 shadow-sm rounded-full">
          <Link to="/admin/photographers/request">Requests</Link>
        </button>
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

export default PhotographersListing;
