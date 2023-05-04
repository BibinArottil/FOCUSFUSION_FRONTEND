import React from 'react'
import {AiFillInstagram,AiOutlineTwitter,AiFillFacebook} from "react-icons/ai"

function Footer() {
    let icons = [<AiFillInstagram size={30}/>,<AiFillFacebook size={30}/>,<AiOutlineTwitter size={30}/>]
  return (
    <div className='bg-gray-200 text-gray-700 font-Lora w-100 mt-2 sm:mt-auto h-48 sm:h-44'>
        <div className='sm:flex text-sm sm:text-xl sm:justify-around py-2 ml-5 sm:py-10'>
            <h2>About Us</h2>
            <h2>Terms and Conditions</h2>
            <h2>FAQ</h2>
            <h2>Privacy Policy</h2>
        </div>
        <div className='flex justify-around border-t-2 border-opacity-30 border-gray-500'>
            <p className='mt-5 sm:mt-3 sm:pt-4 ml-2 text-xs'>© 2023 apply.All rights reserved.</p>
            <div className='flex pt-3'>
                {icons.map((icons,i)=>{
                    return(
                        <i key={i} className="p-1 sm:p-1 cursor-pointer inline-flex items-center rounded-full bg-gray-400 mx-1.5 text-xl hover:text-gray-100 hover:bg duration-300">{icons}</i>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Footer