import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import axios from "../../instance/axios";
import { toast } from "react-toastify";

export default function ReviewEditModal({ visible, onClose, data }) {
  const id = data._id;

  const [value, setValue] = useState({
    rating: "",
    review: "",
  });

  useEffect(() => {
    setValue({ ...value, review: data.review });
  }, [visible]);

  const handleClick = async () => {
    if (value.rating === "" && value.review === data.review) {
      toast.error("You haven't change any field");
    } else {
      await axios.patch("/view-review/" + id, { value }).then((res) => {
        toast.success(res.data.message);
      });
    }
  };

  const thirdExample = {
    size: 20,
    count: 5,
    isHalf: false,
    value: data.rating,
    color: "grey",
    activeColor: "gold",
    onChange: (newValue) => {
      setValue({ ...value, rating: newValue });
    },
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            Edit review
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col px-5">
          <div className="flex mb-5">
            <p className="text-xl pr-3">Rating</p>
            <ReactStars {...thirdExample} />
          </div>
          <textarea
            value={value?.review}
            className="w-[330px] max-h-28 border outline-none"
            placeholder="Write your reply"
            cols="30"
            rows="4"
            onChange={(e) => setValue({ ...value, review: e.target.value })}
          />
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
