import React from 'react'
import {format} from "timeago.js"

function Message({message,own}) {
  return (
    <div className={own?'flex flex-col justify-items-end items-end mr-5 mt-5':'flex flex-col mt-5 ml-5'}>
        <div className={own?'flex flex-row-reverse':'flex'}>
            <p className={own?'py-2 px-4 mr-2 text-gray-600 rounded-3xl max-w-[300px] bg-gray-200':'py-2 px-4 ml-2 text-white rounded-3xl max-w-[300px] bg-gray-400'}>{message?.text}</p>
        </div>
        <div className='text-xs mt-2 mr-3 ml-3'>
            {format(message?.createdAt)}
        </div>
    </div>
  )
}

export default Message