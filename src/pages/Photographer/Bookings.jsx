import React, { useState } from "react";
import { useEffect } from "react";
import Table from "../../components/Ui/Table";
import axios from "../../instance/axios";
import { useSelector } from "react-redux";
import BookingDetails from "../../components/Photographer/BookingDetails";
import { useNavigate } from "react-router-dom";

function Bookings() {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState(null);
  const { photographerDetails } = useSelector((state) => state.photographer);
  const id = photographerDetails._id;
  const handleOnClose = () => setModal(false);

  const fetchData = async () => {
    await axios
      .get("/photographer/bookings/" + id)
      .then((res) => {
        setValue(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [modal]);

  const handleView = async (val) => {
    setDetails(val);
  };

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
  const data = value.map((value, i) => {
    return {
      val: value,
      id: value._id,
      no: i + 1,
      bookingDate: value.bookingDate,
      name: value.user.name,
      mobile: value.user.mobile,
      date: value.date,
      status: value.status,
    };
  });

  return (
    <div className="mx-5 mt-20">
      <div className="mb-5">
        <button
          onClick={() => navigate("/photographer/bookingHistory")}
          className="bg-gray-500 text-white px-5 py-2 rounded"
        >
          View history
        </button>
      </div>
      <Table data={data} columns={columns} />
      <BookingDetails
        visible={modal}
        onClose={handleOnClose}
        details={details}
      />
    </div>
  );
}

export default Bookings;
