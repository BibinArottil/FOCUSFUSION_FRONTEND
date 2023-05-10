import { useState } from "react";
import ReactStars from "react-rating-stars-component"
import axios from "../../instance/axios"
import {toast} from "react-toastify"

export default function ReviewModal({ visible,onClose,details}) {

  const [value, setValue] = useState({
    rating:"",
    review:""
  })

  const thirdExample = {
    size: 40,
    count: 5,
    isHalf: false,
    value: 0,
    color: "grey",
    activeColor: "gold",
    onChange: newValue => {
      setValue({...value,rating:newValue})
    }
  };

  const handleClick =async()=>{
    await axios.post("/review",{value,details}).then((res)=>{
      toast.success(res.data.message)
    })
  }

    if(!visible ) return null
    
  return (
<div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
        <h1 className="font-semibold text-center text-2xl px-5 mt-5 text-gray-700">
          Share your experience
        </h1>
        <button className="font-semibold mr-3 mb-8 text-xl" 
        onClick={onClose}
        >X</button>
        </div> 
        <div className="flex flex-col justify-center p-5">
          <h1 className="font-bold">Rate your experience</h1>
          <ReactStars {...thirdExample}/>
        </div>
        <div className="px-5">
          <textarea className="w-[330px] max-h-28 border outline-none" name="" placeholder="Write your experience" cols="30" rows="4" onChange={(e)=>setValue({...value,review:e.target.value})} />
        </div>
        <div className="text-center p-5">
          {
            
          }
          <button className="px-5 py-2 bg-gray-700 text-white rounded"
          onClick={()=>handleClick()}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
