import React, { useEffect, useRef, useState } from "react";
import axios from "../../instance/axios";
import Message from "../Photographer/Message";
import {useSelector} from "react-redux"
import {io} from "socket.io-client"

function ChatModel({ visible, onClose, reload , nowChat, companyName}) {
  const nowChatId = nowChat._id
  const {userDetails} = useSelector((state)=>state.user)
  const [chat, setChat] = useState(userDetails._id)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [messages,setMessages] = useState([])
  const [newMessage,setNewMessage] = useState("")
  const scrollRef = useRef()
  const inputRef=useRef()
  const socket = useRef()
  inputRef.current?.focus()

    useEffect(()=>{
      socket.current = io("https://focusfusion-api.bibin.tech/api")
      // socket.current = io("http://localhost:8000")
      socket.current.on("getMessage",data=>{
        setArrivalMessage({
          sender:data.senderId,
          text:data.text,
          createdAt:Date.now()
        })
      })
    },[])

      useEffect(()=>{
    arrivalMessage && nowChat?.users.includes(arrivalMessage.sender) &&
    setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,nowChat])

    useEffect(()=>{
      socket.current.emit("addUser",userDetails?._id)
      socket.current.on("getUsers",users=>{
      })
    },[userDetails])

  const fetchChat=async()=>{
    try {
      await axios.post("/get-chat",{nowChatId}).then((res)=>{
        setChat(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchChat()
  },[nowChatId])

  const getMessages=async()=>{
    try {
      await axios.get("/photographer/message/"+chat._id).then((res)=>{
        setMessages(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getMessages()
  },[chat])

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const message={
      sender:userDetails._id,
      text:newMessage,
      chatId:nowChatId
    }

    const receiverId = nowChat.users.find(u=>u!==userDetails._id)
  
    socket.current.emit("sendMessage",{
      senderId:userDetails._id,
      receiverId,
      text:newMessage
    })

    try {
      await axios.post("/photographer/message",message).then((res)=>{
        setMessages([...messages,res.data])
        setNewMessage("")
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center">
      <div className="flex flex-col bg-white p-2 rounded w-3/6 h-5/6 my-auto">
        <div className="flex justify-between px-2 my-2">
          <h1 className="font-semibold text-center text-3xl  text-gray-700">
            {companyName.companyName}
          </h1>
          <p className="font-semibold cursor-pointer mr-3 mt-3 text-2xl" onClick={onClose}>
            X
          </p>
        </div>

          <div className="h-5/6 overflow-scroll">
            {
              messages.map((m,i)=>(
                <div key={i} ref={scrollRef}>
                  <Message message={m} own={m.sender===userDetails._id} />
                </div>
              ))
            }
          </div>
          <div className="mt-3 flex justify-between">
            <input
            ref={inputRef}
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}
              className="w-full outline-none rounded-3xl p-3 mx-5 border"
              type="text"
              placeholder="Write something"
            />
            <button onClick={handleSubmit} className="border mx-5 px-10 rounded-3xl shadow-lg font-bold text-white bg-green-500">
              Send
            </button>
          </div>
      </div>
    </div>
  );
}

export default ChatModel;
