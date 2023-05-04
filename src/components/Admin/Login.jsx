import React,{useState} from "react";
import {useNavigate, Navigate} from 'react-router-dom'
import axios from "../../instance/axios";
import { toast} from "react-toastify"
import {loginValidation} from "../../validation/validation"

function Login() {
  const navigate = useNavigate()
  // const token = localStorage.getItem("admin")
  const [values, setValues] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      loginValidation.validate(values).then(async()=>{
        await axios.post('/admin/admin-login',{
          ...values
        }).then((res)=>{
          localStorage.setItem('admin',res.data.token)
          navigate('/admin')
        }).catch((err)=>{
      toast.error(`${err.response.data}`)
          console.log(err.response.data);
        })
      }).catch((validateError)=>{
      toast.error(`${validateError.message}`)
        console.log(validateError.message);
      })
    } catch (error) {
      console.log(error.response.data);
      toast.error(`${error.response.data}`)
    }
  }

  return  (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block h-screen text-center">
        <h1 className="text-3xl font-Lora tracking-widested mt-80 text-gray-400">
          FOCUSFUSION
        </h1>
      </div>
      <div className="flex flex-col justify-center p-5 h-screen">
        <form className="flex flex-col max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 m-10 rounded-xl"
        onSubmit={handleSubmit}
        >
          <h2 className="text-3xl dark:text-white font-bold text-center">
            ADMIN LOGIN
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              type="password"
              name="password"
            />
          </div>
          <button className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Login
          </button>
          <p className="text-white underline"></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
