import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './ChatOnline.css'

function ChatOnline({onlineUsers,currentUser,setCurrentChat}) {

  const [friends,setFreinds]= useState([])
  const [onlineFriends,setOnlineFreinds]= useState([])
  
  

  useEffect(()=>{
    const getFriends = async ()=>{
      const res = await axios.get(`http://localhost:5000/api/post/following/${currentUser}`)
      setFreinds(res.data)
    }
    getFriends()
  },[currentUser])

  useEffect(()=>{
    setOnlineFreinds(friends.filter((f)=> onlineUsers.includes(f._id)))
  },[friends,onlineUsers])
  console.log(onlineUsers,"onli");
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profile}
              
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))} 
    </div> 
  )
}

export default ChatOnline