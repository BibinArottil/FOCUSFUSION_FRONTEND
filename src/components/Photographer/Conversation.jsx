import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "../../instance/axios"

function Conversation({chat,currentUser}) {
  const [user,setUser] = useState([])
  const fetchUser =async() =>{
    const userId = chat.users.find((u)=>u!==currentUser._id)
    await axios.post("/users",{userId}).then((res)=>{
      setUser(res.data)
    })
  }

  useEffect(()=>{
    fetchUser()
  },[chat,currentUser])

  return (
    <div className='flex items-center ml-5 mr-5 p-2  rounded-md hover:bg-gray-200 cursor-pointer'>
        <img className='w-10 h-10 rounded-full object-cover' 
        src={user?.image ? user?.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="" />
        <span className='font-semibold ml-5'>{user?.name}</span>
    </div>
  )
}

export default Conversation