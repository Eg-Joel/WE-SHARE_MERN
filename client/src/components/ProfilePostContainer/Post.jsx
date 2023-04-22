import React, { useState,useEffect } from 'react'
import "./post.css"
import profileImage from "../Images/Profile.png"
import Likebtn from "../Images/like.png"
import Likedbtn from "../Images/setLike.png"
import commentBtn from "../Images/speech-bubble.png"
import optionIcon from "../Images/more.png"
import ReactTimeAgo from 'react-time-ago'
import axios from '../../utils/axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Post({details}) {


  const userDetails = useSelector((state) => state.user);
  let currentUser = userDetails?.user
  const userId = currentUser?.other?._id;
  const [Like, setLike] = useState(details.like.includes(userId) ? Likedbtn : Likebtn)
  const [Count, setCount] = useState(details.like.length)
  const accesstoken = currentUser.accessToken
  const [Comments, SetComments] = useState(details.comments)
  const [Commentadded, setCommentadded] = useState('')
  const [Show, setShow] = useState(false)
  const [user , setUser] =useState([])

  const token =accesstoken
 
  const config = {
    headers: { token: ` ${token}` }
}
  
  useEffect(() => {
   
   const getuser = async()=>{
   
    try {
      const res = await axios.get(`user/post/user/details/${details.user}`)
      setUser(res.data)
      
    } catch (error) {
      console.log("some error occured");
    }
   }
   
   getuser()
  }, [details.user])
 
  // console.log("b4 post post");
  // console.log(post);
 
  const handleLike = async() => {
    if (Like == Likebtn) {
      await fetch(`http://localhost:5000/api/post/${details._id}/like`,{method:"PUT",headers:{'Content-Type':"application/Json",token:accesstoken}})
      setLike(Likedbtn)
      setCount(Count + 1)
    
    } else {
      await fetch(`http://localhost:5000/api/post/${details._id}/dislike`,{method:"PUT",headers:{'Content-Type':'application/Json',token:accesstoken}})
      setLike(Likebtn)
      setCount(Count - 1)
      
    }
  }

  const addCommeent = async () => {
    if (Commentadded.trim() !== '') {
      const comment = {
        "postid": `${details._id}`,
        "username": `${currentUser.other.username}`,
        "comment": `${Commentadded}`,
        "profile": `${currentUser.other?.profile}`
      }
      const updatedComments = [...Comments, comment];
      setCommentadded('');



      // console.log(currentUser.other?.profile,"jjij");

      await fetch(`http://localhost:5000/api/post/comment/post`, { method: "PUT", headers: { 'Content-Type': 'application/Json', token: accesstoken }, body: JSON.stringify(comment) })
      SetComments(Comments.concat(comment))
      SetComments(updatedComments);

      toast.success('comment added')
    } else {
      toast.warning('wirte any thing')
    }

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
        <div className='postProfi'>
          <div>
          <img src={`${user.profile}`} className="postProfile" alt="" />
          </div>
  
          
          
          <div>
            <p style={{ marginLeft: "5px", textAlign: "start",marginTop:"3px",marginBottom:"0"  }}>{user.username}</p>
            <p style={{ marginLeft: "5px", textAlign: "start", color: "gray",marginBottom:"0" }}><ReactTimeAgo date={Date.parse(details.createdAt)} locale="en-US" /> </p>
           
          </div>

          <img src={`${optionIcon}`} className="option" alt="" />
        </div>
        
        <p style={{ textAlign: "start", width: "96%", marginLeft: 10, marginTop: 0 }}>{details.title} </p>
        <img src={`${details.image}`} className="postImage" alt="" />

        <div style={{ display: "flex" }}>
          <div style={{ display: 'flex', marginLeft: '10px' ,marginTop:"5px"}}>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>

              <img src={`${Like}`} className="LikeComments" onClick={handleLike} alt="" />
              {Count > 0 && <span style={{ marginLeft: "6px",marginBottom:"0" }}>{Count} Likes</span>}
              {/* <p style={{ marginLeft: "6px" }}>{details.like.length} Likes</p> */}
            </div>

            <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
              <img src={`${commentBtn}`} className="LikeComments" onClick={handleShow} alt="" />
              {Comments.length > 0 && <span style={{ marginLeft: "6px" }}>{Comments.length} Comments</span>}
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
         {Comments.map((items, index) => (
           <div style={{  alignItems: "center" }} key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
            <img src={`${items.profile}`} className="postProfile" alt="" />
             <p style={{ marginLeft: "6px",marginTop:7 ,fontSize:18 }}> {items.username}</p>
             <p style={{ marginLeft: "5px", textAlign: "start", color: "gray" ,marginTop: -7, fontSize: 12 ,marginBottom:"0" }}><ReactTimeAgo date={Date.parse(items.createdAt)} locale="en-US" /></p>
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