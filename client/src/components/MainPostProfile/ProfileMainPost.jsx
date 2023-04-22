import React, { useState } from 'react'
import Content from '../ContentPostContainer/Content'
import Post from '../ProfilePostContainer/Post'
import "./Profilemainpost.css"
import Coverimage from "../Images/Profile.png"
import { useEffect } from 'react'
import axios from '../../utils/axios'
import { useLocation } from 'react-router-dom'
function ProfileMainPost() {
  const [post ,setPost] =  useState([])
  let location = useLocation()
  let id = location.pathname.split("/")[2]
 

  useEffect(() => {
    const getPost = async ()=>{
     
      try {
        const res = await axios.get(`post/get/post/${id}`)
        setPost(res.data)
      } catch (error) {
        console.log("error ocured");
      }
    }
    getPost()
  }, [id])
  
  return (
    <div className='mainpost'>
      <div>
        <img src={`${Coverimage}`} className="profileCoverimage" alt="" />
        <h2 style={{marginTop:-43 , color:"white" , textAlign:"start" , marginLeft:"85px"}}>Your Profile</h2>
      </div>
      {/* <Content/> */}
      {post.map((item,index)=>(
        <Post details={item} key={index}/>
      ))}
    
    </div>
  )
}

export default ProfileMainPost