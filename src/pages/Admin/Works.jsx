import React from "react";
import { useState, useEffect } from "react";
import WorkDetails from "../../components/Admin/WorkDetails";
import Table from "../../components/Ui/Table";
import axios from "../../instance/axios";

function Works() {
  const [work, setWork] = useState([]);
  const [modal,setModal] = useState(false)
  const [details,setDetails] = useState(null)

  const handleOnClose = () => setModal(false);


  const fetchData = async () => {
    await axios
      .get("/admin/works")
      .then((res) => {
        setWork(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleView = (val)=>{
  setDetails(val)
}

console.log(details);

  const columns = [
    {
      name: "No:",
      selector: (row) => row.no,
      sortable: true,
    },
    {
      name: "Booking Date",
      selector: (row) => row.bookingDate.split("T", [1]),
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Work Date",
      selector: (row) => row.date.split("T", [1]),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: null,
      cell: (row) => (
        <button
          onClick={() => {
            handleView(row.val);
            setModal(true);
          }}
          className="bg-cyan-500 sm:px-2 text-white sm:py-1 rounded"
        >
          View more
        </button>
      ),
    },
  ];

  const data = work.map((value, i) => {
    return {
      val: value,
      id: value._id,
      no: i + 1,
      bookingDate: value.bookingDate,
      company: value.company.companyName,
      user:value.user.name,
      date: value.date,
      status: value.status,
    };
  });

  return (
    <div className="w-full h-full">
      <div className="flex px-20 py-5">
        <h1 className="text-3xl font-semibold">Works Management</h1>
      </div>
      <div className="mx-5">
      <Table columns={columns} data={data}/>
      </div>
      <WorkDetails visible={modal} onClose={handleOnClose} details={details}/>
    </div>
  );
}

export default Works;
