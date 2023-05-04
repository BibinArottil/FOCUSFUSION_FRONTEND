import React, { useState } from "react";
import axios from "../../instance/axios";
import { toast } from "react-toastify";

function BannerEdit({ visible, onClose, reload, data, id }) {
  const [image, setImage] = useState(null);
  const config = {
    headres: {
      "Content-Type": "multipart/form-data",
    },
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    if (!allowedExtensions.exec(file.name)) {
      let error = "The image extension is not supported";
      imageError(error);
    } else {
      setImage(file);
    }
  };
  const imageError = (error) => {
    toast.error(error);
  };

  const formData = new FormData();
  formData.append("photo", image);
  formData.append("id",id);

  const handleClick = async () => {
    try {
          await axios
            .put("/admin/banner-edit", formData, config)
            .then((res) => {
              onClose();
              reload();
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
    } catch (error) {
      console.log(error);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded w-96 m-5">
        <div className="flex justify-between">
          <h1 className="font-semibold text-center text-2xl px-5 my-5 text-gray-700">
            Edit Banner
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col  p-2">
          <label>Image</label>
          <input
            type="file"
            name="photo"
            className="border border-gray-700 p-2 rounded mb-5"
            onChange={handleImage}
          />
        </div>
        <div className="text-center p-5">
          <button
            className="px-5 py-2 bg-gray-700 text-white rounded"
            onClick={() => handleClick()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default BannerEdit;
