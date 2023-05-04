import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from '../../instance/axios'
import {toast} from "react-toastify"
import {forgotPasswordValidation} from '../../validation/validation'

function ForgotPassword() {
    const navigate = useNavigate()
    const [values,setValues]=useState({
        mobile:"",
        data:"forgot"
    })
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          forgotPasswordValidation.validate(values).then(async()=>{
            await axios.post('/forgot-password',{
                ...values
            }).then((data)=>{
                console.log(data.data);
                navigate('/otp',{state:values})
            }).catch((err)=>{
            toast.error(`${err.response.data}`)
              console.log(err.response.data);
            })
          }).catch((ValidateError)=>{
            toast.error(`${ValidateError.message}`)
            console.log(ValidateError.message);
          })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
    <div className="hidden sm:block h-screen text-center">
      <h1 className="text-3xl font-Lora tracking-widested mt-80 text-gray-400">
        FOCUSFUSION
      </h1>
      <h2 className="text-lg font-Lora">Login for seamless experience</h2>
    </div>
    <div className="flex flex-col justify-center p-5">
      <form className="flex flex-col max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 m-10 rounded-xl"
      onSubmit={handleSubmit}
      >
        <h2 className="text-2xl dark:text-white font-bold text-center">
          ENTER YOUR REGISTERED MOBILE NUMBER
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Mobile No:</label>
          <input
            className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
            type="text"
            name="mobile"
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
          />
        </div>
        <button className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          Send OTP
        </button>
        <p className="text-white underline">
          <Link to='/'>
          Back to home
          </Link>
          </p>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword