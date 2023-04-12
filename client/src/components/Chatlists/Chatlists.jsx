import React from 'react'
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from '@mui/material/List';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from "../../utils/axios"
import ChatItem from '../ChatItem/ChatItem';

function Chatlists() {

    const userDetails = useSelector((state) => state.user)
    let user = userDetails.user
    let UserId = user?.other?._id
    const accesstoken = user?.accessToken
    const token = accesstoken
    const config = {
      headers: { token: ` ${token}` }
    }
  
    const [converstations, setConverstations] = useState([]);


    useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get(`conversation/` + UserId, config)
            setConverstations(res.data)
          } catch (error) {
            console.log(error);
          }
    
        }
        getConversations()
      }, [])
  return (
    <Box flex={4}>
    <Card sx={{
      boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
      height: "90vh",
      width: "98%"
    }} >
      <Box sx={{
        textAlign: "center"
      }}>
        <Typography variant="h6" component="h1" >
          Chats
        </Typography>
      </Box>
      <Box>
        <Box>
          <TextField sx={{
            marginInline: "2rem",
            width: "98%",
            backgroundColor: "transparent"
          }} id="standard-basic" placeholder="Find User" variant="standard" />
        </Box>
        <Box >
          <List dense sx={{
            bgcolor: 'background.paper',
            maxHeight: "80vh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}>
            {converstations?.map((chat) => {
              return (
                <ChatItem
                  key={chat._id}
                  chat={chat}
                />
              );
            })}
          </List>
        </Box>
      </Box>
    </Card>
  </Box>
  )
}

export default Chatlists