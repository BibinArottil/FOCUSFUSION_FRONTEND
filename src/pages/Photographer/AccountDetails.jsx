import React, { useState } from "react";
import axios from "../../instance/axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {toast} from "react-toastify"
import {GoVerified} from "react-icons/go"

function AccountDetails() {
  const { photographerDetails } = useSelector((state) => state.photographer);
  const id = photographerDetails?._id;
  const [value, setValue] = useState({
    companyName: "",
    name: "",
  });

  const fetchData = async () => {
    await axios
      .get("/photographer/account-details/"+id)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async() =>{
    await axios.put("/photographer/account-details/",{
      value,id
    }).then((res)=>{
      toast.success(res.data.success)
    })
  }

  return (
    <div className="w-100 h-96 rounded-lg mx-5 m-auto sm:mt-32 bg-gray-300">
      <div className="flex justify-around flex-wrap items-center pt-20 font-Lora text-lg">
        <div>
          <h1>Company Name</h1>
          <input
          className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
          name="companyName"
          value={value.companyName}
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
            type="text"
            // placeholder={details.companyName}
          />
        </div>
        <div>
          <h1>Owner Name</h1>
          <input
          className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
          value={value.name}
          name="name"
            onChange={(e) =>
              setValue({ ...value, [e.target.name]: e.target.value })
            }
            type="text"
            // placeholder={details.name}
          />
        </div>
        <div>
          <h1>Email</h1>
          <p className="flex flex-row-reverse mr-2 text-black relative">
                <i className="absolute text-green-500 top-5">
                  <GoVerified/>
                </i>
              </p>
          <input
          readOnly
          value={value.email}
            // onChange={(e) =>
            //   setValue({ ...value, [e.target.name]: e.target.value })
            // }
            className="rounded-lg text-gray-700 mt-2 p-2 focus:outline-none cursor-default"
            type="email"
            // placeholder={details.email}
          />

        </div>
        <div>
          <h1>Mobile No:</h1>
          <p className="flex flex-row-reverse mr-2 text-black relative">
                <i className="absolute text-green-500 top-5">
                  <GoVerified/>
                </i>
              </p>
          <input
          readOnly
          value={value.mobile}
            // onChange={(e) =>
            //   setValue({ ...value, [e.target.name]: e.target.value })
            // }
            className="rounded-lg text-gray-700 mt-2 p-2 focus:outline-none cursor-default"
            type="number"
            // placeholder={details.mobile}
          />
        </div>
      </div>
      <div className="flex justify-center font-Lora items-center mt-14">
        <button onClick={handleUpdate} className=" px-5  py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          Update
        </button>
      </div>
    </div>
  );
}

export default AccountDetails;
