
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import {  useSelector } from "react-redux";

import axios from "../../utils/axios"
import Message from "../Messaga/Message";
import socket from "../../Socket/Socket"

function ChatBox() {

    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const { id } = useParams();
    const { friendId } = useParams();
    const [friend, setFriend] = useState(null);
    const userDetails = useSelector((state) => state.user)
    let user = userDetails.user
    let UserId = user?.other?._id
    const scrollRef = useRef();
    
    const accesstoken = user?.accessToken
    const token = accesstoken
    const config = {
      headers: { token: ` ${token}` }
    }
   
    useEffect(()=>{
        
        socket.on("getMessage",data =>{
         
            setArrivalMessage({
             sender: data?.senderId,
             text: data?.text,
             createdAt: Date.now()
           })
        })
       },[])


       useEffect(()=>{
        arrivalMessage && friendId === arrivalMessage.sender &&
        setMessages((prev)=>[...prev,arrivalMessage])
      },[arrivalMessage])
    
    
      useEffect(()=>{
        socket.emit("addUser",UserId)
        socket.on("getUsers",(users)=>{
        
        
        })
      },[UserId])

      
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`message/` + id, config)
        setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [])

  useEffect(()=>{
       
    const getUser = async ()=>{
      try {
        const res = await axios.get(`user/users/${friendId}`,config)
        setFriend(res.data)

      } catch (error) {
        console.log(error);
      }
      
    }
    getUser()
  },[config])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: UserId,
          text: newMessage,
          conversationId: id,
        };
       
    
          socket.emit("sendMessage", {
            senderId: UserId,
            receiverId:friendId,
            text: newMessage,
          });
    
        try {
          const res = await axios.post("message", message, config);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
      // console.log(friend,"us");
  return (
    <Box flex={4} sx={{marginLeft:"3rem"}}>
            <Card sx={{
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                height: "88vh",
                width: "90%",
                marginTop:"10px",
                borderRadius: "20px"
            }} >
                <CardHeader
                    
                    avatar={
                        <Avatar
                            alt={`Avatar `}
                            src={friend?.profile}
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={friend?.username}
                    subheader="online"
                />
                <Box sx={{
                    backgroundColor: "#f0f5f5",
                    height: "calc(100% - 8rem)",
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    overflowX: "scroll",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    }
                }}>
                
                    <Box>
                        {messages &&
                            messages.map((msg,index) => {
                                return (
                                    <Box ref={scrollRef} key={index}>
                                        <Message msg={msg} />
                                    </Box>
                                ) 
                            })}
                                 
                    </Box>
                </Box>
                <Box sx={{
                        
                    display: "flex",
                    backgroundColor: "#f0f5f5",
                }}>
                    
                    <Box sx={{
                        marginLeft:"3rem",
                        height:"3rem",
                        width: "90%",
                        display: "flex",
                        paddingLeft:"1rem"
                       
                    }}>
                        <OutlinedInput
                            sx={{
                                padding: "1rem",
                                backgroundColor: "white",
                                borderRadius:"20px"
                            }}
                            placeholder="Type here"
                            multiline
                            fullWidth
                            onChange={e => setNewMessage(e.target.value)}
                            value={newMessage}
                            inputProps={{ 'aria-label': 'Type Message' }}
                        />
                    </Box>
                    <SendRoundedIcon
                        onClick={handleSubmit}
                        sx={{
                        backgroundColor: "#bc80d4",
                        padding: "1rem",
                        paddingLeft: "1rem",
                        borderRadius: "100%",
                        color: "white",
                        marginInline: "1rem",
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "green",
                            color: "black",
                        }
                            
                    }} />
                </Box>
               

            </Card>
        </Box>
  )
}

export default ChatBox