import React from "react";
import ReactStars from "react-rating-stars-component";

export default function Review({ data }) {
  const thirdExample = {
    size: 20,
    count: 5,
    isHalf: false,
    value: data.rating,
    color: "grey",
    edit: false,
    activeColor: "gold",
  };

  return (
    <div className="flex w-full justify-between max-w-[1000px] my-5">
      <div className="flex">
        <img
          className="w-10 h-10 object-cover border rounded-full"
          src={
            data.user.image
              ? data.user.image
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          alt=""
        />
        <div className="flex flex-col">
          <h2 className="ml-5 text-xl">{data.user.name}</h2>
          <ReactStars classNames="ml-5" {...thirdExample} />
          <p className="ml-5 mt-2">{data.review}</p>
          {data.reply ? (
            <p className="ml-5 mt-3 text-sm font-sans">
              Response from the owner:
              <span className="font-normal"> {data.reply}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div>
        <p className="text-xs">{data.createdAt.split("T", [1])}</p>
      </div>
    </div>
  );
}
