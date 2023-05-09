import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "../../instance/axios"
import { useSelector } from 'react-redux'
import Table from '../../components/Ui/Table'
import ReviewModal from '../../components/User/ReviewModal'
import { useNavigate } from 'react-router-dom'

export default function BookingHistory() {
    const navigate = useNavigate()
    const [history,setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const [details, setdetails] = useState(null)
    const {userDetails} = useSelector((state)=>state.user)
    const id = userDetails._id
    const handleOnClose = () => setModal(false);

    const fetchData = async()=>{
        await axios.get("/booking-history/"+id).then((res)=>{
            setHistory(res.data.data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleReview =(val)=>{
      setdetails(val)
    }

    const columns = [
        {
          name: "No:",
          selector: (row) => row.no,
          sortable: true,
        },
        {
          name: "Company",
          selector: (row) => row.company,
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
          name: "Amount",
          selector: (row) => row.total,
        },
        {
          name: null,
          cell: (row) => (
            <button
              onClick={() => {
                handleReview(row.val);
                setModal(true);
              }}
              className="bg-cyan-500 sm:px-2 text-white sm:py-1 rounded"
            >
              Add Review
            </button>
          ),
        },
      ];
      const data = history.map((value, i) => {
        return {
          val: value,
          id: value._id,
          no: i + 1,
          bookingDate: value.bookingDate,
          company: value.company.companyName,
          email: value.company.email,
          date: value.date,
          advance:value.advance,
          total:value.totalAmount,
          status: value.status,
        };
      });

  return (
    <div className="mx-20 mt-20">
          <div className="mb-5">
      <button
        onClick={() => navigate("/bookings")}
        className="bg-gray-500 text-white px-10 py-2 rounded"
      >
        Works
      </button>
    </div>
        <Table columns={columns} data={data} />
        <ReviewModal visible={modal} onClose={handleOnClose} details={details}/>
    </div>
  )
}

