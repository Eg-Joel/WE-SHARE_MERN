import React, { useEffect,useRef } from 'react'
import "./rightbar.css"
import socket from '../../Socket/Socket'


import { useState } from 'react'
import axios from '../../utils/axios'
import Follow from './Follow'
import { useSelector } from 'react-redux'
import ChatOnline from '../ChatOnline/ChatOnline'

function Rightbar(values) {
  const userDetails =useSelector((state)=>state.user)
  let user = userDetails.user
  let id = user?.other?._id
  const [users, setUsers] = useState([])
  const [onlineUsers, setOnlineUsers] = useState([])
  
  
  const value = values.value


 
  useEffect  (() => {
   
    const getuser = async()=>{
    
     try {
       const res = await axios.get(`user/all/user/${id}`)
       const filteredData = res.data.filter(user => user._id !== id);
       
      setUsers(filteredData)
     
       
     } catch (error) {
       console.log("some error occured");
     }
    }
    
    getuser()
   }, [])
   useEffect(()=>{
    socket.emit("addUser",id)
    socket.on("getUsers",(users)=>{
      const onlineFriends = user?.other?.following?.filter((f) =>
      users.some((u) => u.userId === f)
    );
    setOnlineUsers(onlineFriends);
    
    })
  },[id])
  // console.log(onlineUsers,"onlo");
 
  return (
    <div className='rightbar'>
 <div className='rightcontainer'>
      <h4 style={{ marginTop:"25px" ,textAlign:"start",marginLeft:"66px"}}>Friends Online</h4>
      {onlineUsers.length > 0 ? <ChatOnline 
            onlineUsers={onlineUsers} 
            currentUser={id}
            
           
            />  :
       <p style={{ marginLeft: "100px" ,textAlign:"start",marginTop:"100px",}}>no friends Online</p>}
      </div>

     { value === true ? "": <div className='rightcontainer2'>
        <h4 style={{ marginLeft: "40px" ,textAlign:"start",marginBottom:"30px"}}>Suggested for you  </h4>
        {users.map((item,index)=>(
          
       <Follow userdetails={item} key={index}/>
         ))}
        

      </div>}
    </div>
  )
}

export default Rightbar
