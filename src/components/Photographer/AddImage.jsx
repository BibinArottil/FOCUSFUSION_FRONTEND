import React, { useState } from "react";
import axios from "../../instance/axios";
import { toast } from "react-toastify";
import {useSelector} from "react-redux"

function AddImage({ visible, onClose, reload }) {
  const { photographerDetails } = useSelector((state) => state.photographer);
  const [loading, setLoading] = useState(false)
  const id = photographerDetails._id;

  const [image, setImage] = useState(null);
  const config = {
    headres: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleImage = (e) => {
    const files = e.target.files;
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
    const images = [];

    for (let i = 0; i < files.length; i++) {
      if (!allowedExtensions.exec(files[i].name)) {
        let error = `The image ${files[i].name} extension is not supported`;
        imageError(error);
      } else {
        images.push(files[i]);
      }
    }
    setImage(images);
  };

  const imageError = (error) => {
    toast.error(error);
  };

  const formData = new FormData();

  const handleClick = async () => {
    setLoading(true)
    try {
        Array.from(image).forEach(item=>{
            formData.append("image",item)
          })
          formData.append("id",id)
      await axios
        .patch("/photographer/add-image", formData, config)
        .then((res) => {
          onClose();
          reload();
          setLoading(false)
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
            Add Image
          </h1>
          <button className="font-semibold mr-3 mb-8 text-xl" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col  p-2">
          <label>Image</label>
          <input
            type="file"
            name="images"
            multiple
            className="border border-gray-700 p-2 rounded mb-5"
            onChange={handleImage}
          />
        </div>
        <div className="text-center p-5">
        { !loading ? <button
            className="px-5 py-2 bg-gray-700 text-white rounded"
            onClick={() => handleClick()}
          >
            Upload
          </button>:
          <button disabled type="button" class="py-2.5 px-5 mr-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline w-5 h-5 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg>
    Uploading...
</button>}
        </div>
      </div>
    </div>
  );
}

export default AddImage;
