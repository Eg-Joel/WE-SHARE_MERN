import React, { useEffect, useState } from 'react'
import './Conversation.css'
import imgg from '../../Images/defaultprofile.jpg'
import axios from 'axios'
const Conversation = ({Conversation,currentUser}) => {

  const [user,setUser]=useState(null)
  const accesstoken = currentUser?.accessToken
  const token =accesstoken

  const config = {
    headers: { token: ` ${token}` }
}
  useEffect(()=>{
    const friendId = Conversation.members.find((m)=> m !== currentUser.other._id)

    const getUser = async ()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${friendId}`,config)
        setUser(res.data)

      } catch (error) {
        console.log(error);
      }
      
    }
    getUser()
  },[Conversation,currentUser])

  return (
    <div className='conversation'>
        <img className='conversationImg' src={user?.profile ? user?.profile:imgg}alt="" />
        <span className="conversationName">{user?.username}</span>
        
    </div>
  )
}

export default Conversation