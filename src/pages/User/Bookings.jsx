import { useEffect } from "react"
import { useState } from "react"
import Table from "../../components/Ui/Table"
import axios from "../../instance/axios"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import BookingDetails from "../../components/User/BookingDetails"

function Bookings() {
    const {userDetails} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const [value,setValue] = useState([])
    const [modal, setModal] = useState(false)
  const [details, setDetails] = useState(null);

  const handleOnClose = () => setModal(false);

    const fetchData =async()=>{
        await axios.get("/bookings/"+userDetails._id).then((res)=>{
            setValue(res.data.data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleView = (val)=>{
        setDetails(val)
    }

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
              className="bg-cyan-500 sm:px-2 text-white sm:py-1 rounded mr-10"
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
        <button onClick={()=>navigate("/bookingHistory")} className="bg-gray-500 text-white px-5 py-2 rounded">View history</button>
      </div>
        <Table columns={columns} data={data}/>
        <BookingDetails
        visible={modal}
        onClose={handleOnClose}
        details={details}
        reload={fetchData}
      />
    </div>
  )
}

export default Bookings