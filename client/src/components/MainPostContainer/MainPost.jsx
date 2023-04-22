import axios from '../../utils/axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Content from '../ContentPostContainer/Content'
import Post from '../PostContainer/Post'
import "./mainpost.css"





function MainPost() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  let id = user?.other?._id;
  
  const accesstoken =  user.accessToken
  
  const [post,setPost] = useState([])
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);
   const getPost = async ()=>{
    try {
      
      const res = await axios.get(`user/followerpost/${id}?page=${page}`,{
      headers:{
        token:accesstoken
      },
     
    })
   
    const newPosts = res.data.posts.filter((post) => !post.isDeleted);
    setPost(newPosts);
    
    setTotalPages(res.data.totalPages);
  } catch (error) {
    
    console.error(error);
    }
   }
   useEffect(() => {
   getPost()
   window.addEventListener('scroll', handleScroll);
   return () => {
     window.removeEventListener('scroll', handleScroll);
   }
  }, [])
  
  
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight && page < totalPages) {
      setPage(page + 1);
      getPost();
    }
  };

  useEffect(() => {
    getPost();
  }, [page]);

  return (
    <div className='mainpost'>
      <Content/>
    
      {post.map((item, index) => {
  
 
      
     return   <Post post={item} key={index}/>
  
   
 
})} 
  
       </div>
  )
}

export default MainPost