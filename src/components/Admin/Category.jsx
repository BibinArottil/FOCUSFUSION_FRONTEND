import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "../../instance/axios";
import DataTable from "react-data-table-component";
import AddModal from "./CategoryAdd";
import EditModal from "./CategoryEdit";
import FilterComponent from "../Ui/FilterComponent";

function Category() {
  const [data, setData] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleAddOnClose = () => setAddModal(false);
  const handleEditOnClose = () => setEditModal(false);

  const fetchData = async () => {
    await axios.get("/admin/category").then((res) => {
      setData(res.data.list);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleList = async (id) => {
    try {
      await axios.patch("/admin/category-block", { id }).then((res) => {
        if (res.data.success) fetchData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {};

  const columns = [
    {
      name: "NO:",
      selector: (row) => row.no,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable:true
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
    {
      name: null,
      cell: (row) => (
        <button
          className="bg-cyan-500 text-white font-medium rounded w-20 h-8"
          onClick={() => {
            handleEdit(row.id);
            setEditModal(true);
            setName(row.name);
            setId(row.id);
          }}
        >
          Edit
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
      name: value.name,
      status: value.status,
    };
  });

  return (
    <div className="h-full w-full">
      <div className="flex flex-col px-20 py-5">
        <h1 className="text-3xl font-semibold">Category List</h1>
        <button
          className="self-start my-5 bg-slate-400 w-32 h-10 shadow-slate-800 shadow-sm rounded-full"
          onClick={() => setAddModal(true)}
        >
          Add
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
      <AddModal
        onClose={handleAddOnClose}
        visible={addModal}
        reload={fetchData}
      />
      <EditModal
        onClose={handleEditOnClose}
        visible={editModal}
        reload={fetchData}
        data={name}
        id={id}
      />
    </div>
  );
}

export default Category;
