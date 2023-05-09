import React, { useState } from "react";
import Table from "../../components/Ui/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../../instance/axios";
import { useNavigate } from "react-router-dom";

export default function BookingHistory() {
    const navigate = useNavigate()
  const [value, setValue] = useState([]);

  const { photographerDetails } = useSelector((state) => state.photographer);
  const id = photographerDetails._id;

  const fetchData = async () => {
    await axios.get("/photographer/history/" + id).then((res) => {
      console.log(res.data.data);
      setValue(res.data.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      name: "Mobile No:",
      selector: (row) => row.mobile,
    },
    {
      name: "Work Date",
      selector: (row) => row.workDate.split("T", [1]),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Payment",
      selector: (row) => row.payment,
    }
  ];
  const data = value.map((value, i) => {
    return {
      no: i + 1,
      name: value.user.name,
      mobile: value.user.mobile,
      workDate: value.date,
      status:value.status,
      amount: value.totalAmount,
      payment:value.photographerAmount
    };
  });
  return (
    <div className="mx-5 mt-20">
              <div className="mb-5">
        <button
          onClick={() => navigate("/photographer/bookings")}
          className="bg-gray-500 text-white px-8 py-2 rounded"
        >
          Bookings
        </button>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
}
