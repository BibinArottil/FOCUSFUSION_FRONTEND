import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from "../../instance/axios";
import {registerValidationSchema} from "../../validation/validation"

function Register() {

  const navigate = useNavigate()
  const [image,setImage] = useState([])
    const [values, setValues] = useState({
        companyname:"",
        name:"",
        mobile:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const formData = new FormData()
    formData.append("companyname",values.companyname)
    formData.append("name",values.name)
    formData.append("mobile",values.mobile)
    formData.append("email",values.email)
    formData.append("password",values.password)

    const handleImage = (e) => {
      const files = e.target.files;
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/;
      const images = [];
    
      for (let i = 0; i < files.length; i++) {
        if (!allowedExtensions.exec(files[i].name)) {
          let error = `The image ${files[i].name} extension is not supported`;
          imageError(error);
        } else {
          images.push(files[i]);
        }
      }
      setImage(images);
    };

    const imageError = (error) =>{
      toast.error(error)
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          Array.from(image).forEach(item=>{
            formData.append("image",item)
          })
          registerValidationSchema.validate(values,image).then(async()=>{
            await axios.post('/photographer/register',
            formData
            ).then((data)=>{
              console.log(data.data);
              toast.success(`${data.data}`)
              navigate('/')
            })
          }).catch((validateError)=>{
            console.log(validateError.message);
            toast.error(`${validateError.message}`)
          })
        } catch (error) {
          console.log(error);
          toast.error(`${error.response.data}`)
        }
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block h-screen text-center">
        <h1 className="text-3xl font-Lora tracking-widested mt-80 text-gray-400">
          FOCUSFUSION
        </h1>
        <h2 className="text-lg font-Lora">Earn more growth in your business</h2>
      </div>
      <div className="flex flex-col justify-center m-10">
        <form className="flex flex-col max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-xl"
        onSubmit={handleSubmit}
        >
          <h2 className="text-3xl dark:text-white font-bold text-center">
            WELCOME
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Company name</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="text"
              name="companyname"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Owner name</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="text"
              name="name"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Mobile No:</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="number"
              name="mobile"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Image</label>
            <input
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="file" multiple
              // accept='image/png, image/jpg, image/jpeg'
              // onChange={(e)=>setImage(e.target.files)}
              onChange={handleImage}
              name="images"
            />
            <p className="text-sm">Upload atleast three images</p>
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="password"
              name="password"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Confirm password</label>
            <input
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              className="rounded-lg text-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-blue-200 focus:outline-none"
              type="password"
              name="confirmPassword"
            />
          </div>
          <div className="flex my-2 justify-between">
            <p className="text-white">Do you have an account?
            <span className="text-blue-200 ml-3 font-semibold underline">
            <Link to="/login">Login</Link>
            </span>
            </p>
          </div>
          <button className="mx-auto px-5 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
            Register
          </button>
          <p className="text-white underline">
            <Link to="/">Back to home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
