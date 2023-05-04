import React, { useEffect, useState } from "react";
import axios from "../../instance/axios";
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"
import {RxDotFilled} from "react-icons/rx"

function Home() {
  const [data, setData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0)
  const fetchBanner = async () => {
    await axios.get("/home-banner").then((res) => {
      setData(res.data.banner);
    });
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  const preSlide = () => { 
    const isFirstSlide = imageIndex === 0
    const newIndex = isFirstSlide ? data.length-1 : imageIndex -1;
    setImageIndex(newIndex)
  }
  const nextSlide = () => {
    const isLastSlide = imageIndex === data.length -1
    const newIndex = isLastSlide ? 0 : imageIndex +1
    setImageIndex(newIndex)
   }

   const slide = (slideIndex) =>{
    setImageIndex(slideIndex)
   }

  return (
    <>
    <div className="max-w-[1500px] flex justify-center items-center px-4 pt-12 md:pt-16">
      <div className="w-full duration-500">
        <img className="w-full rounded-xl md:h-[670px] object-cover" 
        src={data[imageIndex]} alt="photos" />
      </div>
      <div className="absolute top-[50] -translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
        <BsChevronCompactLeft onClick={preSlide}  size={20}/>
      </div>
      <div className="absolute top-[50] -translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
        <BsChevronCompactRight onClick={nextSlide} size={20}/>
      </div>
    </div>
    <div className="flex top-4 justify-center py-1">
    {data.map((Slide,index)=>(
      <div key={index} onClick={()=>slide(index)} className="text-2xl cursor-pointer">
        <RxDotFilled/>
      </div>
    ))}
    </div>
    </>
  );
}

export default Home;
