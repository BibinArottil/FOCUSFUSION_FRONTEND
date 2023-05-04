import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "../../instance/axios"
import { useSelector } from 'react-redux'
import Table from '../../components/Ui/Table'
import {MdOutlineRateReview} from "react-icons/md"

export default function BookingHistory() {
    const [history,setHistory] = useState([])
    const [modal, setModal] = useState(false)
    const {userDetails} = useSelector((state)=>state.user)
    const id = userDetails._id
    const fetchData = async()=>{
        await axios.get("/booking-history/"+id).then((res)=>{
            setHistory(res.data.data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

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
                // handleReview(row.val);
                // setModal(true);
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
    <div className="mx-5 mt-20">
        <Table columns={columns} data={data} />
    </div>
  )
}

