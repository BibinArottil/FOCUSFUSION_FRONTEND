import { GrLocation } from "react-icons/gr";
import { AiFillWechat } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import { useLocation,useNavigate } from "react-router-dom";
import ChatModal from "../../components/User/ChatModal";
import Review from "../../components/User/Review";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../instance/axios"

function PhotographerView() {
  const {userDetails} = useSelector((state)=>state.user)
  const [chat,setChat] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const [openChat,setOpenChat] = useState(false)
    const [review, setReview] = useState([])
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

    const fetchReview = async()=>{
      await axios.get('/review/'+data._id).then((res)=>{
        setReview(res.data.reviews)
    })
    }

    useEffect(()=>{
      fetchReview()
    },[])

    const thirdExample = {
      size: 30,
      count: 5,
      isHalf: false,
      value: 3,
      color: "grey",
      edit:false,
      activeColor: "gold",
    };

  return (
    <div className="flex flex-wrap justify-center items-center pt-16 pb-2">
      <div className=" w-5/6 h-auto font-Lora border rounded-md text-gray-500 pl-10">
        <h1 className="text-6xl mt-5">{data.companyName}</h1>
        <div className="flex items-center mt-5">
          <ReactStars {...thirdExample}/>
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
        <div className="w-full mt-5 border-t-2">
          <h3 className="text-2xl my-2 ">Reviews</h3>
          {
            review.map((data,i)=> 
            <Review key={i} data={data}/>
            )
          }

        </div>
        <div>
        </div>
        <ChatModal onClose={handleOpenChatClose} visible={openChat} nowChat={chat} companyName={data}/>
      </div>
    </div>
  );
}

export default PhotographerView;
