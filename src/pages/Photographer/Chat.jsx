import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../../components/Photographer/Conversation'
import Message from '../../components/Photographer/Message'
import axios from "../../instance/axios"
import {useSelector} from "react-redux"
import {io} from "socket.io-client"

function Chat() {
  const {photographerDetails} = useSelector((state)=>state.photographer)
  const [chat, setChat] = useState([])
  const [filterText, setFilterText] = useState('')
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socket = useRef()
  const scrollRef = useRef()

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
    arrivalMessage && currentChat?.users.includes(arrivalMessage.sender) &&
    setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  useEffect(()=>{
    socket.current.emit("addUser",photographerDetails._id)
    socket.current.on("getUsers",users=>{
    })
  },[photographerDetails])

  const fetchChat = async() =>{
    try {
      await axios.get("/chat/"+photographerDetails._id).then((res)=>{
        setChat(res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchChat()
  },[photographerDetails._id])

  const getMessages=async()=>{
    try {
      await axios.get("/photographer/message/"+currentChat?._id).then((res)=>{
        setMessages(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(()=>{
    getMessages()
  },[currentChat])
  
const handleSubmit = async(e) =>{
  e.preventDefault()
  const message = {
    sender:photographerDetails._id,
    text:newMessage,
    chatId:currentChat._id
  }
  const receiverId = currentChat.users.find(u=>u!==photographerDetails._id)

  socket.current.emit("sendMessage",{
    senderId:photographerDetails._id,
    receiverId,
    text:newMessage
  })
  try {
    await axios.post("/photographer/message",message).then((res)=>{
      setMessages([...messages,res.data])
      setNewMessage("")
    })
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])

  return (
    <div className="w-100 h-4/6 flex mt-16  bg-gray-300">
        <div className='w-2/6 m-4 rounded-lg pt-5 h-4/4 bg-white overflow-scroll'>
            {/* <input type="search" placeholder='Search' value={filterText} onChange={(e)=>setFilterText(e.target.value)} className='w-11/12 p-3 m-3 border-b-2 outline-none'/> */}
            {chat.map((c,i)=>{
              return( 
              <div key={i} onClick={()=>setCurrentChat(c)}>
                <Conversation chat={c} currentUser={photographerDetails} filterText={filterText} />
              </div>
                )
            })}
        </div>
        <div className='w-4/6 h-4/4 m-4 rounded-lg bg-white'>
          {
            currentChat?
              <>
                <div className='h-5/6 overflow-scroll relative'>
                  {messages.map((m,i)=>(
                    <div key={i} ref={scrollRef}>
                      <Message message={m} own={m.sender===photographerDetails._id} />
                    </div>
                  ))}
                </div>
                <div className='mt-5 flex justify-between'>
                    <input onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className='w-full rounded-3xl outline-none p-3 mx-5 border' type="text" placeholder='Write something'/>
                    <button onClick={handleSubmit} className='border mx-5 px-10 rounded-3xl shadow-lg font-bold text-white bg-green-500'>Send</button>
                </div>
                </>:<span className='absolute top-48 text-4xl text-slate-300 mx-36'>Open a chat to start messaging.</span>}
        </div>
    </div>
  )
}

export default Chat