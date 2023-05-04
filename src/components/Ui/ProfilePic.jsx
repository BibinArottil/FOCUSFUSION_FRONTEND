import axios from "../../instance/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";

function Profile({ value, pic }) {
  const { userDetails } = useSelector((state) => state.user);
  const id = userDetails._id;
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
      .post("/profile-pic/" + id, formData)
      .then((res) => {
        toast.success(res.data);
        pic();
        setLoading(false);
        setImage(null)
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col border p-4 rounded">
      <h1>Profile photo</h1>
      <img
        className="bg-white w-28 mt-2 h-28 object-cover rounded-full"
        src={
          value.image
            ? value.image
            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
        <MoonLoader className="ml-10 mt-2" size={25} />
      ) : (
        <button onClick={addImage} className="bg-black text-white rounded m-3">
          {value.image ? "UPDATE" : "ADD"}
        </button>
      )}
    </div>
  );
}

export default Profile;
