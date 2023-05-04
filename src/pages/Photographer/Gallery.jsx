import React, { useEffect, useState } from 'react'
import axios from "../../instance/axios"
import {Card} from "flowbite-react"
import AddImage from '../../components/Photographer/AddImage'
import {useSelector} from "react-redux"
// import Body from '../../components/Photographer/Gallery'

function Gallery() {
  const { photographerDetails } = useSelector((state) => state.photographer);
  const id = photographerDetails._id;
  const [addModal, setAddModal] = useState(false)
  const [data, setData] = useState([])

  const handleAddOnClose = () =>setAddModal(false)

  const fetchData = async () => {
      await axios.post("/photographer/gallery",{id}).then((res) => {
        setData(res.data);
      });
    };  

    useEffect (()=>{
      fetchData() 
    },[]) 
    
  return (
    <div className="w-100 min-h-96 rounded-lg mt-20 mx-5 bg-gray-300">
      <button onClick={()=>setAddModal(true)} className="px-5 py-2 mt-7 ml-10 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/40 text-white font-semibold rounded-lg">
        Add Image
      </button>
    <div className="grid md:grid-cols-4 grid-col p-3">
      {data.map((data, index) => {
        return (
          <div key={index} className="mx-2 my-2 flex justify-center">
            <Card className="w-56">
              <img
                className="object-cover md:h-36 rounded"
                src={data}
                alt="photographs"
              />
            </Card>
          </div>
        );
      })}
    </div>
    <AddImage onClose={handleAddOnClose} visible={addModal} reload={fetchData}/>
  </div>
    // <Body/>
  )
}

export default Gallery