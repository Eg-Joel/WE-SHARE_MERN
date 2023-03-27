import React, { useState } from 'react'
import "./rightbar.css"
import addfriends from "../Images/add-user.png"
import userToFollow from "../Images/afterFollowImg.png"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import imgg from '../Images/defaultprofile.jpg'


function Follow({ userdetails }) {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  let id = user?.other?._id;

  const [follow, setFollow] = useState(addfriends)
  const accesstoken = user.accessToken
 
  const handleFollow = async (e) => {
 
    await fetch(`http://localhost:5000/api/user/follow/${userdetails._id}`,{method:'PUT',headers:{'Content-Type':"appliction/Json",token:accesstoken},body:JSON.stringify({user:`${id}`})})

   setFollow(userToFollow)
 }
  return (
    <div style={{ marginTop: "-10px" }} id={userdetails._id}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <Link to={`/Profile/${userdetails._id}`}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {<img src={`${userdetails?.profile ? userdetails?.profile :imgg }`} className="profileImage" alt="" /> }
          <div>
            <p style={{ marginLeft: "10px", textAlign: "start",textDecoration: 'none',color:"black" }}>{userdetails.username}</p>
            <p style={{ marginLeft: "10px", textAlign: "start", marginTop: -15, fontSize: "11px", color: "#aaa" }}>Suggested for you</p>
          </div>
        </div>
        </Link>
        <div style={{ backgroundColor: "#aaa", padding: "10px", marginRight: 13, borderRadius: "50%", cursor: "pointer" }} onClick={e => handleFollow(userdetails._id)}>
          <img src={`${follow}`} className="addIcon" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Follow