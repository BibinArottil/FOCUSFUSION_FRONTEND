import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../instance/axios"
import Table from "../../components/Ui/Table"

export default function WorkHistory() {
    const [works, setworks] = useState([])
    const navigate = useNavigate()

    const fetchData =async()=>{
        await axios.get("/admin/history").then((res)=>{
            setworks(res.data.data)
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
          name: "Amount",
          selector: (row) => row.amount,
          sortable: true,
        },
        {
          name: "Payment",
          selector: (row) => row.payment,
          sortable: true,
        },
        {
          name: "Status",
          selector: (row) => row.status,
        }
      ];

      const data = works.map((value, i) => {
        return {
          val: value,
          id: value._id,
          no: i + 1,
          bookingDate: value.bookingDate,
          company: value.company.companyName,
          user:value.user.name,
          date: value.date,
          status: value.status,
          amount:value.totalAmount,
          payment:value.photographerAmount
        };
      });
    
  return (
    <div className="w-full h-full">
    <div className="flex px-20 py-5">
      <h1 className="text-3xl font-semibold">Works Management</h1>
    </div>
    <div className="mx-5">
    <div className="mb-5">
      <button
        onClick={() => navigate("/admin/works")}
        className="bg-gray-500 text-white px-10 py-2 rounded"
      >
        Works
      </button>
    </div>
    <Table columns={columns} data={data}/>
    </div>
  </div>
  )
}
