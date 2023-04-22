import React, { useState } from 'react'
import "./rightbar.css"
import addfriends from "../Images/add-user.png"
import userToFollow from "../Images/afterFollowImg.png"
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import imgg from '../Images/defaultprofile.jpg'
import axios from '../../utils/axios'
import { setUserss } from '../ReduxContainer/useReducer';

function Follow({ userdetails }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  let id = user?.other?._id;
  
  const [follow, setFollow] = useState(addfriends)
  const accesstoken = user.accessToken
  const config = {
    headers: { token: ` ${accesstoken}` }
  }
 
  const handleFollow = async (friendId) => {
 
 
    const res= await axios.put(`user/follow`,{friendId},config)
    
    setFollow(userToFollow)
 
    const userDet = res.data.updatedUser
    

    dispatch(setUserss( userDet ))

 } 
  return (
    
    <div style={{ marginTop: "-10px" }} >
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