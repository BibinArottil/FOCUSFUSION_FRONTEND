import { useState } from "react";
import axios from "../../instance/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ReplyModal({ visible, onClose, data }) {
  const id = data._id;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(data.reply);
  }, [visible]);

  const handleClick = async () => {
    await axios.patch("/photographer/reply/" + id, { value }).then((res) => {
      toast.success(res.data.message);
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            Reply
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col  p-5">
          <textarea
            value={value}
            className="w-[330px] max-h-28 border outline-none"
            placeholder="Write your reply"
            cols="30"
            rows="4"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="text-center p-5">
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded"
            onClick={() => handleClick()}
          >
            {data.reply ? "Update" : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}
