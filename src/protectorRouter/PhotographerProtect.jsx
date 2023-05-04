import { useEffect, useState } from "react"
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../instance/axios";

function PhotographerProtect() {
    const [auth, setAuth] = useState(null)
    const token = localStorage.getItem("photographer");
    const navigate = useNavigate();
    
    useEffect(() => {
      try {
        axios
      .post("/photographer/verify-token", {
        token,
      })
      .then((res) => {
        if (res.data.photographer === true) {
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

export default PhotographerProtect