import React, { useEffect, useState } from "react";
import Header from "../../components/Ui/Header";
import {Navigate, useNavigate} from "react-router-dom"
import axios from "../../instance/axios";

function RequestPending() {
  const navigate = useNavigate()
  const token = localStorage.getItem("photographer")
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    try {
      axios
    .post("/photographer/verify-token", {
      token,
    })
    .then((res) => {
      if (res.data.photographer === true) {
          setAuth(true);
      }
      });
    } catch (error) {
      console.log(error.message)
    }
  }, []);
  return (
    <>
    {auth ?<Navigate to="/photographer/profile"/> :  
    <>
      <Header />
      <div className="flex justify-center items-center w-full h-screen font-Lora">
        <div className="w-3/6 h-80 border rounded-lg">
          <div className="w-full flex justify-center">
            <h1 className="text-3xl mt-10">
              Your account verification is under process
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <h3 className="text-2xl mt-10">We will verify your account as soon as possible</h3>
          </div>
          <div className="w-full flex justify-center items-center">
            <button onClick={()=>navigate("/")} className="mt-14 border bg-gray-300 shadow-sm rounded-md hover:bg-black hover:text-white px-4 py-1">Home</button>
          </div>
        </div>
      </div>
    </>}
    </>
  );
}

export default RequestPending;
