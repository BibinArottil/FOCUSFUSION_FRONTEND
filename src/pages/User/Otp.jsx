import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import OtpPage from '../../components/User/Otp'
import axios from "../../instance/axios"

function Otp() {
  const token = localStorage.getItem("user")
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    try {
      axios
    .post("/verify-token", {
      token,
    })
    .then((res) => {
      if (res.data.user === true) {
          setAuth(true);
      }
      });
    } catch (error) {
      console.log(error.message)
    }
  }, []);
  return (
    <>
    {auth ?<Navigate to="/"/> : <OtpPage /> }
    </>
  )
}

export default Otp