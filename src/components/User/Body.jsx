import React from 'react'

function Body() {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center text-center m-5'>
        <h1 className='w-full text-sm font-Lora sm:text-3xl'>Frame your moments with best photographers</h1>
      </div>
        <div className='h-auto m-5 '>
            <div className='flex justify-between'>
              <img className='w-96 px-3 py-2  mx-auto rounded-lg mb-1' src='https://res.cloudinary.com/ds79wb3yq/image/upload/v1679124063/Focusfusion/GeorgiaSP-19_ixssth.jpg' alt=''/>
              <img className='w-96 px-3 py-2 hidden md:block mx-auto  rounded-md mb-1 ' src='https://res.cloudinary.com/ds79wb3yq/image/upload/v1679124063/Focusfusion/AshleyJulian_HIGH-775-1046x1569_fa5uvk.jpg' alt=''/>
            </div>
        </div>
    </div>
  )
}

export default Body