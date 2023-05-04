import { GrLocation } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import {MdOutlineRateReview} from "react-icons/md"
import { useLocation,useNavigate } from "react-router-dom";
import ChatModal from "../../components/User/ChatModal";
import ReviewModal from "../../components/User/ReviewModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../instance/axios"

function PhotographerView() {
  const {userDetails} = useSelector((state)=>state.user)
  const [chat,setChat] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [openChat,setOpenChat] = useState(false)
    // const [review,setReview] = useState(false)
    const data = location.state
    const image = data.images
    let count = image.length-4

    const chatId = {
      senderId:userDetails?._id,
      receiverId:data._id
    }

    const handleOpenChatClose = () =>setOpenChat(false)

    const createChat = async() =>{
      try {
        await axios.post("/chat",chatId).then((res)=>{
          setChat(res.data)
        })
      } catch (error) {
        console.log(error);
      }
    }

    const handleReview = () =>{
      
    }

  return (
    <div className="flex flex-wrap justify-center items-center pt-16 pb-2">
      <div className=" w-5/6 h-auto font-Lora border rounded-md text-gray-500 pl-10">
        <h1 className="text-6xl mt-5">{data.companyName}</h1>
        <div className="flex items-center mt-5">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-300 dark:text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
        <h2 className="mt-5 text-2xl">{data.category}</h2>
        <div className="flex mt-5 text-2xl">
          <GrLocation size={20} className="mt-2"/>
          <h2>{data.location}</h2>
        </div>
        <div className="flex space-x-10">
        <button onClick={()=>{setOpenChat(true);createChat()}} className="flex border py-1 px-5 mt-5 rounded-md shadow-lg hover:text-white hover:bg-slate-700">
          <AiFillWechat size={20} className="mr-1" />
          Chat
        </button>
        {/* <button onClick={handleReview} className="flex border py-1 px-5 mt-5 rounded-md shadow-lg hover:text-white hover:bg-slate-700">
          <MdOutlineRateReview size={20} className="mr-1 mt-1" />
          Review
        </button> */}
        </div>
        <p className="mt-5 text-lg">{data.aboutUs}</p>
        <div className="w-full mt-5 border-t-2">
          <h3 className="text-2xl mt-2">Photos</h3>
          <div className="grid md:grid-cols-4 grid-col py-2">
            {image.slice(0,4).map((pic, i) => {
              return (
                <div className="flex justify-center w-56 p-2 dark:bg-slate-200 rounded-lg relative">

                  <img
                    className="object-cover md:h-36 rounded"
                    src={pic}
                    alt="photos"
                  />
                  {
                    i === 3 && <div onClick={()=>navigate("/view/gallery")} className="absolute rounded top-2 w-52 h-36 cursor-pointer bg-black/50  flex flex-col text-white text-3xl font-bold ">
                      <p className="ml-10 mt-10">+{count} more</p>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>
        <ChatModal onClose={handleOpenChatClose} visible={openChat} nowChat={chat} companyName={data}/>
        {/* <ReviewModal visible={review}/> */}
      </div>
    </div>
  );
}

export default PhotographerView;
