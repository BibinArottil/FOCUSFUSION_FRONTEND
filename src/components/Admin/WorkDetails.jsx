import React from "react";

export default function WorkDetails({ visible, onClose, details }) {

  console.log(details);
  
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-2/6 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            {details.company.companyName}
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex justify-between mx-5 text-lg">
          <p>
            Photographer Name 
            {/* <span className="font-bold">{details.location}</span> */}
          </p>
          <p>{details.company.name}</p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Email
            {/* <span className="font-bold">{details.advance}</span> */}
          </p>
          <p>
          {details.company.email}
          </p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            User Name
             {/* <span className="font-bold">{details.totalAmount}</span> */}
          </p>
          <p>
          {details.user.name}
          </p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Mobile No:
            {/* <span className="font-bold">{details.balance}</span> */}
          </p>
          <p>
          {details.user.mobile}
          </p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Advance Paid
            {/* <span className="font-bold">{details.balance}</span> */}
          </p>
          <p>
          {details.advance}
          </p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Total
            {/* <span className="font-bold">{details.balance}</span> */}
          </p>
          <p>
          {details.totalAmount}
          </p>
        </div>
        <div className="flex justify-between mx-5 mt-5 text-lg">
          <p>
            Payment Status
            {/* <span className="font-bold">{details.balance}</span> */}
          </p>
          {/* <p className={`${details.success?"bg-green-500":"text-yellow-400"}font-bold`}> */}
          <p className={`font-bold ${details.success?"text-green-500":"text-yellow-400"}`}>
          {details.success?"Payment success":"Payment Pending"}
          </p>
        </div>
      </div>
    </div>
  );
}
