import OtpInput from "otp-input-react-18";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import axios from "../../instance/axios"
import "./Otp.css";
import {otpValidationSchema} from "../../validation/validation"

function Otp() {
  const navigate = useNavigate()
  const [OTP, setOTP] = useState();
  const location = useLocation();
  const data = location.state
  console.log(data);
    const handleSubmit = async (e) =>{
      e.preventDefault();
        try {
          otpValidationSchema.validate({otp:OTP}).then(async(validateData)=>{
            await axios.post('/otp-verify',
           {
             data,OTP
           }).then((res)=>{
            console.log(res);
            if(res.data.signup===true){
              navigate('/login')
            }
            if(res.data.forgot===true){
              navigate('/resetPassword',{state:data})
            }
           }).catch((err)=>{
            console.log(err);
           })
          }).catch((validateError)=>{
            toast.error(`${validateError.message}`)
            console.log(validateError.message);
          })
        } catch (error) {
            console.log(error);
        }
    }

  const handleChange = (OTP) => {
    setOTP(OTP);
  };

  return (
    <div className="flex justify-center items-center h-screen m-5">
      <div className="hidden md:block">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-Lora tracking-widested text-gray-400">
            FOCUSFUSION
          </h1>
          <h2 className="text-lg font-Lora">Login for seamless experience</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center p-5">
        <form
        className="flex flex-col justify-center max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 m-10 rounded-xl"
        onSubmit={handleSubmit}
        >
          <h2 className="text-3xl dark:text-white font-bold text-center">
            ENTER YOUR OTP
          </h2>
          <p className="dark:text-white text-center mb-5">
            OTP sent your mobile number
          </p>
          <div className="flex font-bold text-gray-600 py-2">
            <OtpInput
              value={OTP}
              onChange={handleChange}
              inputStyle="inputStyle"
              numInputs={6}
              separator={<span></span>}
              
            />
          </div>
          <button
            className="mx-auto px-3 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
