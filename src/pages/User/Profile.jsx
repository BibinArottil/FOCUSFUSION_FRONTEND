import React, { useState } from 'react'
import { useEffect } from 'react'
import {GoVerified} from "react-icons/go"
import {useSelector} from "react-redux"
import axios from "../../instance/axios"
import { useDispatch } from 'react-redux'
import {userNameUpdate} from "../../redux/features/user"
import ProfileCard from '../../components/Ui/ProfilePic'
import { toast } from 'react-toastify'

function Profile() {
    const {userDetails} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const id = userDetails._id
    const name = userDetails.name
    const [value, setValue] = useState({
        name:""
    })

    const fetchData = async() =>{
        try {
            await axios.get("/profile/"+id).then((res)=>{
                setValue(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleUpdate = async()=>{
        if(name!==value.name){
            await axios.put("/profile",{value}).then((res)=>{
                console.log(res.data.message);
                toast.success(res.data.message)
                dispatch(userNameUpdate(value.name))
            }).catch((err)=>{
                console.log(err)
            })
        }
    }
    
  return (
    <div className="w-100 h-96 rounded-lg mx-5 m-auto sm:mt-32 bg-gray-300">
    <div className="flex justify-evenly flex-wrap items-center mt-10 font-Lora text-lg">
        <ProfileCard value={value} pic={fetchData} />
      <div>
        <h1>Name</h1>
        <input
        className="rounded-lg text-gray-700 mt-2 p-2 focus:bg-gray-200 focus:outline-none"
        value={value.name}
        name="name"
          onChange={(e) =>
            setValue({...value,[e.target.name]:e.target.value})
          }
          type="text"
          // placeholder={details.name}
        />
      </div>
      <div>
        <h1>Email</h1>
        <p className="flex flex-row-reverse mr-2 text-black relative">
              <i className="absolute text-green-500 top-5">
                <GoVerified/>
              </i>
            </p>
        <input
        readOnly
        value={value.email}
          // onChange={(e) =>
          //   setValue({ ...value, [e.target.name]: e.target.value })
          // }
          className="rounded-lg text-gray-700 mt-2 p-2 w-64 focus:outline-none cursor-default"
          type="email"
          // placeholder={details.email}
        />

      </div>
      <div>
        <h1>Mobile No:</h1>
        <p className="flex flex-row-reverse mr-2 text-black relative">
              <i className="absolute text-green-500 top-5">
                <GoVerified/>
              </i>
            </p>
        <input
        readOnly
        value={value.mobile}
          // onChange={(e) =>
          //   setValue({ ...value, [e.target.name]: e.target.value })
          // }
          className="rounded-lg text-gray-700 mt-2 p-2 focus:outline-none cursor-default"
          type="number"
          // placeholder={details.mobile}
        />
      </div>
    </div>
    <div className="flex justify-center font-Lora items-center">
      <button onClick={handleUpdate} className=" px-5  py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        Update
      </button>
    </div>
  </div>
  )
}

export default Profile