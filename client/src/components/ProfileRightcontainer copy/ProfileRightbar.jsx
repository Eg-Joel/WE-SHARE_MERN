import React, { useEffect, useState } from 'react'
import "./ProfileRightbar.css"


import axios from '../../utils/axios'
import Follow from '../Rightcontainer/Follow'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function ProfileRightbar() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  let location = useLocation()
  let id = location.pathname.split("/")[2]
  let idSuggest = user?.other?._id
  const accesstoken = user?.accessToken
  const config = {
    headers: { token: ` ${accesstoken}` }
  }
  const [followingUser,SetFollowingUser] = useState([])
    useEffect(() => {
      const getFollowing = async()=>{
        try {
            const res =await axios.get(`post/followers/${id}`,config)
            SetFollowingUser(res.data)
        } catch (error) {
            
        }
      }
      getFollowing()
    }, [id])
    // console.log(followingUser);
    const [users, setUsers] = useState([])
 
  useEffect  (() => {
   
    const getuser = async()=>{
    
     try {
       const res = await axios.get(`user/all/user/${idSuggest}`)
       const filteredData = res.data.filter(user => user._id !== id);
       
      setUsers(filteredData)
     
       
     } catch (error) {
       console.log("some error occured");
     }
    }
    
    getuser()
   }, [])
  return (
    <div className='ProfileRightbar'>
      <div className='profileRightcontainer'>
      <h3>Followers</h3>
        <div>
          {followingUser.map((item,index)=>(
            <div style={{marginTop:"10px"}}key={index}>
             <div style={{display:'flex' , alignItems:"center" , marginLeft:10 , cursor:"pointer"}}>
            
              <img src={`${item.profile}`} className="Friendsimage" alt="" />
              <p style={{textAlign:"start"  , marginLeft:"10px"}}>{item.username} </p>
            </div>
          </div>
            ))}
          
      
          
        </div>
      </div>

      <div className='rightcontainer2'>
        <h3 style={{ marginLeft: "10px" ,textAlign:"start"}}>Suggested for you  </h3>
        {users.map((item,index)=>(
          <Follow userdetails={item} key={index}/>
        ))}
        
        
      </div>
    </div>
  )
}

export default ProfileRightbar
