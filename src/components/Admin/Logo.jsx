import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "../../instance/axios"
import {toast} from "react-toastify"
import { MoonLoader } from 'react-spinners';

export default function Logo({value,logo}) {
    const { photographerDetails } = useSelector((state) => state.photographer);
    const id = photographerDetails._id;
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleImage = (e) => {
      const file = e.target.files[0];
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
      if (!allowedExtensions.exec(file.name)) {
        toast.error("Format is not supported");
      } else {
        setImage(file);
      }
    };
  
    const addImage = async () => {
      setLoading(true);
      let formData = new FormData();
      formData.append("photo", image);
      await axios
        .post("/photographer/logo/" + id, formData)
        .then((res) => {
          toast.success(res.data);
          logo();
          setLoading(false);
          setImage(null)
        })
        .catch((err) => {
          toast.error(err.response.data);
          setLoading(false);
        });
    };
  return (
    <div className="flex flex-col items-center border p-3 rounded">
      <h1>Logo</h1>
      <img
        className="bg-white w-28 mt-2 h-28 object-cover rounded-full"
        src={
          value.logo
            ? value.logo
            : "https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
        }
        alt="User profile"
      />
      <input
        type="file"
        name="photo"
        onChange={handleImage}
        className="mt-2 w-28"
      />
      {loading ? (
        <MoonLoader className="mt-2" size={25} />
      ) : (
        <button onClick={addImage} className="bg-black text-white rounded px-2 my-2">
          {value.logo ? "UPDATE" : "ADD"}
        </button>
      )}
    </div>
  )
}
