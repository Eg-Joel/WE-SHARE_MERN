import React, { useState,useEffect } from 'react'
import "./post.css"
import profileImage from "../Images/Profile.png"
import Likebtn from "../Images/like.png"
import Likedbtn from "../Images/setLike.png"
import commentBtn from "../Images/speech-bubble.png"
import optionIcon from "../Images/more.png"

import axios from 'axios'


function Post({details}) {

 

  
  const [Count, setCount] = useState(0)

  const [Comments, SetComments] = useState([])
  const [Commentadded, setCommentadded] = useState('')
  const [Show, setShow] = useState(false)
  const [user , setUser] =useState([])

  
  useEffect(() => {
   
   const getuser = async()=>{
   
    try {
      const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${details.user}`)
      setUser(res.data)
      
    } catch (error) {
      console.log("some error occured");
    }
   }
   
   getuser()
  }, [])
 
  // console.log("b4 post post");
  // console.log(post);
  
  const handleLike = async() => {
    // if (Like == Likebtn) {
    //   await fetch(`http://localhost:5000/api/post/${post._id}/like`,{method:"PUT",headers:{'Content-Type':"application/Json",token:accesstoken}})
    //   setLike(Likedbtn)
    //   setCount(Count + 1)
    
    // } else {
    //   await fetch(`http://localhost:5000/api/post/${post._id}/dislike`,{method:"PUT",headers:{'Content-Type':'application/Json',token:accesstoken}})
    //   setLike(Likebtn)
    //   setCount(Count - 1)
      
    // }
  }

  const addCommeent = () => {
    const comment = {
      "id": "81fsbf231323323ffe",
      "username": "user",
      "title": `${Commentadded}`

    }
    SetComments(Comments.concat(comment))
    
  }

  const handleComment = () => {
    addCommeent()
  }
  

  const handleShow = ()=>{
    if(Show === false){
      setShow(true)
    }else
    {
      setShow(false)
    }
  }
 
 
  return (
    <div className='postContainer'>
      <div className='subPostContainer'>
        <div style={{ display: "flex", justifyContent:"space-between" }}>
        <img src={`${user.profile}`} className="postProfile" alt="" />
          
          
          <div>
            <p style={{ marginLeft: "5px", textAlign: "start" }}>{user.username}</p>
           
          </div>

          <img src={`${optionIcon}`} className="option" alt="" />
        </div>
        
        <p style={{ textAlign: "start", width: "96%", marginLeft: 10, marginTop: 0 }}>{details.title} </p>
        <img src={`${details.image}`} className="postImage" alt="" />

        <div style={{ display: "flex" }}>
          <div style={{ display: 'flex', marginLeft: '10px' }}>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>

              {/* <img src={`${Like}`} className="LikeComments" onClick={handleLike} alt="" /> */}
              <p style={{ marginLeft: "6px" }}>{details.like.length} Likes</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
              <img src={`${commentBtn}`} className="LikeComments" onClick={handleShow} alt="" />
              <p style={{ marginLeft: "6px" }}>{details.Comments?details.Comments.length:"0"}Comments</p>
            </div>
          </div>
         {/*{post.Comments.length} */}
        </div>
        {Show === true ?
         <div style={{padding:"10px"}}>
         <div style={{ display: "flex", alignItems: "center" }}>
           <img src={`${profileImage}`} className="postProfile" alt="" />
           {/* <p style={{marginLeft:"6px"}}> user</p> */}
           <input type="text" className='commentbox' placeholder='Add a comment' onChange={(e) => setCommentadded(e.target.value)} />
           <button className='comentbtn' onClick={handleComment}>Post</button>

           

         </div>
         {Comments.map((items) => (
           <div style={{  alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${profileImage}`} className="postProfile" alt="" />
             <p style={{ marginLeft: "6px",marginTop:7 ,fontSize:18 }}> {items.username}</p>
            </div>

             
             <p style={{ display:"flex", marginLeft: "56px",alignItems: "start" ,marginTop:-16 }}>{items.title}</p>
             <p style={{ display:"flex", marginLeft: "56px",alignItems: "start" ,marginTop:-16 ,color:"#aaa",fontSize:12}}>Reply</p>
           </div>
         ))}
       </div>:""
      }
       


      </div>
    </div>
  )
}

export default Post