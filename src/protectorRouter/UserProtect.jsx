import { useEffect, useState } from "react"
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../instance/axios";

function UserProtect() {
    const [auth, setAuth] = useState(null)
    const token = localStorage.getItem("user");
    const navigate = useNavigate();
    
    useEffect(() => {
      try {
        axios
      .post("/verify-token", {
        token,
      })
      .then((res) => {
        if (res.data.user) {
            setAuth(true);
          } else {
            navigate("/login");
          }
        });
      } catch (error) {
        console.log(error.message)
      }
    }, []);

    if(auth === null) return

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default UserProtect