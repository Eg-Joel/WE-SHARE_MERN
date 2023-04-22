import React from 'react'
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from "@mui/material/Divider";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from "../../utils/axios"
import { Link } from 'react-router-dom';
function ChatItem({ chat }) {

    const userDetails = useSelector((state) => state.user)
    let CurrentUser = userDetails.user
    let UserId = CurrentUser?.other?._id
    const accesstoken = CurrentUser?.accessToken
    const token = accesstoken
    const config = {
      headers: { token: ` ${token}` }
    }
    const [user, setUser] = useState(null);
    const friendId = chat.members.find(m => m !== UserId);

    useEffect(()=>{
        
    
        const getUser = async ()=>{
          try {
            const res = await axios.get(`user/post/user/details/${friendId}`,config)
            setUser(res.data)
    
          } catch (error) {
            console.log(error);
          }
          
        }
        getUser()
      },[config])
  return (
    <Box >
    <Link to={`/chat/${chat._id}/${friendId}`} style={{ textDecoration: 'none', color: "inherit" }}>
    <ListItem>
        <ListItemButton>
            <ListItemAvatar>
                <Avatar
                    alt={`Avatar `}
                    src={user?.profile}
                />
            </ListItemAvatar>
            <ListItemText primary={user?.username} />
            <ListItemText primary={chat._id}/>
        </ListItemButton>
        </ListItem>
    </Link>
    <Divider />
</Box>
  )
}

export default ChatItem