import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import User from "./Routes/User";
import Admin from "./Routes/Admin";
import Photographer from "./Routes/Photographer";
import DotLoader from "react-spinners/DotLoader";
// import { useSelector } from "react-redux";

const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  toastClassName: "toast-container",
  bodyClassName: "toast-body",
  theme: "dark",
};

function App() {
  // const {loadings} = useSelector((state) => state.alerts)
  const [loading, setLoading] = useState(false);
  let color =("#0d6efd");
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000)
  // }, []);

  return (
    <>
    {loading ?
        <div className='flex justify-center mt-80'>
          <DotLoader
            color={color}
            loading={loading}
            size={80}
          />
        </div>:
        <>
    <Router>
      <Routes>
        <Route exact path="/*" element={<User />} />
        <Route exact path="/photographer/*" element={<Photographer />} />
        <Route exact path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
    <ToastContainer {...toastConfig} />
    </>
    }
    </>
  );
}

export default App;
