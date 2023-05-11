import React,{useEffect, useState} from 'react'
import Login from '../../components/Admin/Login'
import axios from "../../instance/axios"
import {Navigate, useLocation} from "react-router-dom"

function AdminLogin() {
  const location = useLocation()
  console.log(location);
  const token = localStorage.getItem("admin")
  const [auth, setAuth] = useState(false)
  useEffect(() => {
    try {
      axios
    .post("/admin/verify-token", {
      token,
    })
    .then((res) => {
      if (res.data.admin) setAuth(true);
      });
    } catch (error) {
      console.log(error.message)
    }
  }, []);
  return (
    <div>
        {auth ?<Navigate to="/admin/dashboard"/> : <Login /> }
    </div>
  )
}

export default AdminLogin