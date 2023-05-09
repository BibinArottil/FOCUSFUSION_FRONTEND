import { useState } from "react";
import axios from "../../instance/axios";
import {toast} from "react-toastify"

function BookingDetails({ visible, onClose, reload, details }) {
  
  const [value, setValue] = useState({
    amount: "",
    status: "",
  })

  // console.log(value);

  const handleClick = async () => {
    if(value.amount==='' && value.status===''){
      toast.error("You doesn't have make any changes")
    }else{
      await axios
        .patch("/photographer/update-bookings/"+details._id, { value })
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message)
        }).catch((err)=>{
          toast.error(err.response.data.message)
        })
    }

  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-2/6 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            {details.user.name}
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="ml-5 text-lg">
          <p>
            Advance amount paid -{" "}
            <span className="font-bold">{details.advance}</span>
          </p>
        </div>
        <div className="ml-5 mt-5 text-lg">
          <p>
            Time - <span className="font-bold">{details.time}</span>
          </p>
        </div>
        <div className="ml-5 mt-5 text-lg">
          <p>
            Location - <span className="font-bold">{details.location}</span>
          </p>
        </div>
        <div className="flex flex-col mt-5 mx-5">
          <label>Total Amount</label>
          <input
            type="number"
            name="amount"
            value={details.totalAmount}
            className="border border-gray-700 p-2 rounded mb-5 outline-none"
            onChange={(e) =>
              setValue({...value,[e.target.name]:e.target.value})
            }
          />
        </div>
        <div className="flex flex-col mx-5">
          <label>Status</label>
          <select
            className="border p-2 rounded-lg outline-none"
            name="status"
            onChange={(e) =>
              setValue({...value,[e.target.name]:e.target.value})
            }
          >
            <option value={details.status}>{details.status}</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="text-center p-5">
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded"
            onClick={() => handleClick()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
