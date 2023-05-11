import React from "react";

export default function Card({ props }) {
  return (
    <div className="grid md:grid-cols-3 gap-5 px-5">
      <div className="bg-gray-300 w-full h-28 rounded-md flex flex-col text-center">
        <h1 className="text-sm md:text-xl font-semibold mt-1">TOTAL USERS</h1>
        <h3 className="text-4xl mt-2">{props.user}</h3>
      </div>
      <div className="bg-gray-300 w-full h-28 rounded-md flex flex-col text-center">
        <h1 className="text-sm md:text-xl font-semibold mt-1">
          TOTAL PHOTOGRAPHERS
        </h1>
        <h3 className="text-4xl mt-2">{props.photographer}</h3>
      </div>
      <div className="bg-gray-300 w-full h-28 rounded-md flex flex-col text-center">
        <h1 className="text-sm md:text-xl font-semibold mt-1">TOTAL WORKS</h1>
        <h3 className="text-4xl mt-2">{props.works}</h3>
      </div>
    </div>
  );
}
