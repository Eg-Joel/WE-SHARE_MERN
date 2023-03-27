import React, { useEffect } from 'react'
import "./rightbar.css"

import image2 from "../Images/image2.jpg"

import { useState } from 'react'
import axios from 'axios'
import Follow from './Follow'
import { useSelector } from 'react-redux'

function Rightbar() {
  const userDetails =useSelector((state)=>state.user)
  let user = userDetails.user
  let id = user?.other?._id
  const [users, setUsers] = useState([])
  
  useEffect  (() => {
   
    const getuser = async()=>{
    
     try {
       const res = await axios.get(`http://localhost:5000/api/user/all/user/${id}`)
       setUsers(res.data)
       
     } catch (error) {
       console.log("some error occured");
     }
    }
    
    getuser()
   }, [])
 
  return (
    <div className='rightbar'>
      <div className='rightcontainer'>
      <h3 style={{ marginLeft: "10px" ,textAlign:"start"}}>friends online</h3>
        <div style={{marginTop:"-10px"}}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>


            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${image2}`} className="profileImage" alt="" />
              <div>
                <p style={{ marginLeft: "10px" ,textAlign:"start"}}>user </p>
                
              </div>
            </div>
           
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>


            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${image2}`} className="profileImage" alt="" />
              <div>
                <p style={{ marginLeft: "10px" ,textAlign:"start"}}>user</p>
                
              </div>
            </div>
           
          </div>
        </div>
        <div style={{marginTop:"-10px"}}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>


            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${image2}`} className="profileImage" alt="" />
              <div>
                <p style={{ marginLeft: "10px" ,textAlign:"start"}}>user</p>
                
              </div>
            </div>
           
          </div>
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

export default Rightbar
