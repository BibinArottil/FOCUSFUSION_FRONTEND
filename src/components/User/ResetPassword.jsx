import React,{useState} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import axios from '../../instance/axios'
import {toast} from "react-toastify"
import {resetPasswordValidation} from "../../validation/validation"

function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const [values,setValues]=useState({
        password:"",
        confirmPassword:""
    })
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
          resetPasswordValidation.validate(values).then(async()=>{
            await axios.post('/new-password',{
                ...values,data
            }).then((res)=>{
                console.log(res.data);
                navigate('/login')
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
        <h2 className="text-3xl dark:text-white font-bold text-center">
          RESET PASSWORD
        </h2>
        <div className="flex flex-col text-gray-400 py-2">
          <label>New password</label>
          <input
            className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
            type="password"
            name="password"
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
          />
        </div>
        <div className="flex flex-col text-gray-400 py-2">
          <label>Confirm password</label>
          <input
            className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
            type="password"
            name="confirmPassword"
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
          />
        </div>
        <button className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
          Confirm
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

export default ResetPassword