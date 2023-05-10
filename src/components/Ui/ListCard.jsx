import React from "react";
import {useNavigate} from "react-router-dom"
import { GrLocation } from "react-icons/gr";
import ReactStars from "react-rating-stars-component";

function List({ value,companyname, image, location, category }) {
const navigate = useNavigate()
const thirdExample = {
  size: 25,
  count: 5,
  isHalf: false,
  value: 3,
  color: "grey",
  edit:false,
  activeColor: "gold",
};
  return (
    <div className="flex justify-center">
      <div className="flex w-3/4 h-80 mr-32 ml-32 my-3 rounded-lg border shadow-xl text-gray-500">
        <div className="w-72 h-64 m-8">
          <img
            className="w-72 h-64 object-fill rounded-md"
            src={image}
            alt="cover"
          />
        </div>
        <div className="flex flex-col font-Lora mt-8">
          <h1 className="text-6xl">{companyname}</h1>
          <div className="flex items-center mt-3">
          <ReactStars {...thirdExample}/>
          </div>
          
          <h2 className="mt-4 text-xl">
            {category}
          </h2>
          <div className="flex mt-5 text-xl">
            <GrLocation size={20} className="mt-1" />
            <h2>{location}</h2>
          </div>
          <div className="mt-5">
            <button onClick={()=>navigate("/view",{state:value})} className="bg-teal-200 py-1 px-5 rounded-md shadow-lg">
              View more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
