import axios from '../../instance/axios';
import React, { useEffect, useState } from 'react'
import PhotographerLogin from '../../components/User/Login'
import { Navigate } from 'react-router-dom';

function Login() {
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
    {auth ?<Navigate to="/photographer/profile"/> : <PhotographerLogin /> }
    </>
  )
}

export default Login