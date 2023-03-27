import { spacing } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatOnline from '../../components/Chat/ChatOnline/ChatOnline'
import Conversation from '../../components/Chat/Conversation/Conversation'
import Message from '../../components/Chat/Message/Message'
import io from "socket.io-client"
import Navbar from '../../components/Navbar/Navbar'
import './Chat.css'


const Chat = () => {

  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState('')
  const [arrivalMessages, setArrivalMessages] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const scrollRef = useRef()
  const socket = useRef()
  const userDetails = useSelector((state) => state.user)
  let user = userDetails.user
  let UserId = user?.other?._id
  const accesstoken = user?.accessToken
  const token = accesstoken
  const config = {
    headers: { token: ` ${token}` }
  }

  useEffect(()=>{
   socket.current = io("ws://localhost:8900")
   socket.current.on("getMessage",data =>{
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
   })
  },[])

  useEffect(()=>{
    arrivalMessages && currentChat?.members.includes(arrivalMessages.sender) &&
    setMessages((prev)=>[...prev,arrivalMessages])
  },[arrivalMessages,currentChat])


  useEffect(()=>{
    socket.current.emit("addUser",UserId)
    socket.current.on("getUsers",(users)=>{
    
      setOnlineUsers(
        user.other.following.filter((f)=> users.some((u)=> u.userId === f))
        )
    })
  },[user])
   console.log(onlineUsers,"onlini");

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/conversation/` + UserId, config)
        setConversations(res.data)
      } catch (error) {
        console.log(error);
      }

    }
    getConversations()
  }, [UserId])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/message/` + currentChat?._id, config)
        setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [currentChat])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: UserId,
      text: newMessages,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
        (member) => member !== UserId
      );

      socket.current.emit("sendMessage", {
        senderId: UserId,
        receiverId,
        text: newMessages,
      });

    try {
      const res = await axios.post("http://localhost:5000/api/message", message, config);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (

    <div>
      <Navbar />

      <div className="Chat">
        <div className="chatMenu">
          <div className="ChatMenuWrapper">
            <input type="text" name="" id="" placeholder='Serach for followers' className='chatMenuInput' />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation Conversation={c} currentUser={user} />

              </div>
            ))}

          </div>
        </div>
        <div className="chatBox">
          <div className="ChatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === UserId} />
                      </div>

                    ))}


                  </div>
                  <div className="chatBoxBottom">
                    <textarea name="" id="" placeholder='Write something' className='chatMessageInput'
                      onChange={(e) => setNewMessages(e.target.value)}
                      value={newMessages}
                    ></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit}>send</button>
                  </div></> : <span className='noConversationText'>Start chating</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="ChatOnlineWrapper">
            <ChatOnline 
            onlineUsers={onlineUsers} 
            currentUser={UserId}
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat