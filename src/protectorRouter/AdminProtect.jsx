import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../instance/axios";

function AdminProtect() {
  const [auth, setAuth] = useState(null);
  const token = localStorage.getItem("admin");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
    .post("/admin/verify-token", {
      token,
    })
    .then((res) => {
      if (res.data.admin === true) {
          setAuth(true);
        } else {
          navigate("/admin/login");
        }
      });
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  if (auth === null) return;

  return auth ? <Outlet /> : <Navigate to="/admin/login" />;
}

export default AdminProtect;
