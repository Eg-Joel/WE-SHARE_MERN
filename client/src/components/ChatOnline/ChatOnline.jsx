import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ChatOnline.css'
import axios from '../../utils/axios'
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));


function ChatOnline({onlineUsers,currentUser}) {

  const [friends,setFreinds]= useState([])
  const [onlineFriends,setOnlineFreinds]= useState([])
  const userDetails = useSelector((state) => state.user)
  const accesstoken = userDetails.user?.accessToken
  const token =accesstoken
  const navigate = useNavigate();
  const config = {
    headers: { token: ` ${token}` }
}
  

  useEffect(()=>{
    const getFriends = async ()=>{
      const res = await axios.get(`post/followingUser/${currentUser}`,config)
      setFreinds(res.data)

    }
    getFriends()
  },[currentUser])
 
  useEffect(()=>{
    if (!Array.isArray(friends)) {
      return;
    }
    setOnlineFreinds(friends.filter((f)=> onlineUsers.includes(f._id)))
  },[friends,onlineUsers])

  const handleClick = async(user)=>{
    try {
      const friendId = user._id
      const { data } = await axios.post('conversation/con', { friendId }, config)

      navigate(`/chat/${data._id}/${friendId}`);
      
      
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className="chatOnline">
      {onlineFriends?.map((o) => (
        <div className="chatOnlineFriend" style={{display:"flex"}}>
          <div className="chatOnlineImgContainer"  onClick={()=>handleClick(o)}>
            <img
              className="chatOnlineImg"
              src={o?.profile}
              
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
         
          <div style={{marginLeft:"auto" ,marginRight:"15px"}} >
          <Stack spacing={2} direction="row">
         
          <ColorButton variant="contained" onClick={()=>handleClick(o)}>Chat</ColorButton>
        
          </Stack>
          </div> 
        </div>

      ))} 
    </div> 
  )
}

export default ChatOnline