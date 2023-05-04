import axios from '../../instance/axios';
import React, { useEffect, useState } from 'react'
import RegisterPage from '../../components/Photographer/Register'
import { Navigate } from 'react-router-dom';

function Register() {
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
    <div>
      {auth ?<Navigate to="/photographer/profile"/> : <RegisterPage /> }
        {/* <RegisterPage/> */}
    </div>
  )
}

export default Register