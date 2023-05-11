import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../instance/axios";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { AiFillFolderOpen } from "react-icons/ai";
import FilterComponent from "../Ui/FilterComponent";

function PhotographersRequests() {
  const token = localStorage.getItem("admin");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");

  const fetchData = async () => {
    await axios
      .get("/admin/request", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data.request);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (id, email) => {
    try {
      await axios.post("/admin/accept", { id, email }).then((res) => {
        if (res.data.success) fetchData();
        toast.success("Request accepted");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id, email) => {
    try {
      await axios.post("/admin/reject", { id, email }).then((res) => {
        if (res.data.success) fetchData();
        toast.success("Request rejected");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const viewImage = async (id) => {
    try {
      await axios
        .post("/admin/view-images", {
          id,
        })
        .then((res) => {
          navigate("/admin/photographers/images", { state: res.data });
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
      name: "Images",
      selector: (row) => (
        <AiFillFolderOpen
          onClick={() => viewImage(row.id)}
          className="text-xl cursor-pointer"
        />
      ),
    },
    {
      name: null,
      cell: (row) => (
        <button
          className="bg-green-500 rounded w-20 h-8"
          onClick={() => {
            handleAccept(row.id, row.email);
          }}
        >
          Accept
        </button>
      ),
    },
    {
      name: null,
      cell: (row) => (
        <button
          className="bg-red-500 rounded w-20 h-8"
          onClick={() => handleReject(row.id, row.email)}
        >
          Reject
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

  const tableData = data.map((value, i) => {
    return {
      id: value._id,
      no: i + 1,
      company: value.companyName,
      name: value.name,
      email: value.email,
      mobile: value.mobile,
      verified: value.verified,
    };
  });

  return (
    <div className="h-full w-full">
      <div className="flex flex-col px-20 py-5">
        <h1 className="text-3xl font-semibold">Photographers Requests</h1>
        <button className="self-start my-5 bg-slate-400 w-32 h-10 shadow-slate-800 shadow-sm rounded-full">
          <Link to="/admin/photographers/list">Photographers</Link>
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

export default PhotographersRequests;
