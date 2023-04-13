import React from 'react'
import { useSelector } from 'react-redux'
import ProfileMainPost from '../../components/MainPostProfile/ProfileMainPost'
import Navbar from '../../components/Navbar/Navbar'
import ProfileLeftbar from '../../components/ProfileLeftContainer copy/ProfileLeftbar'
import ProfileRightbar from '../../components/ProfileRightcontainer copy/ProfileRightbar'
import "./profile.css"


function Profile() {
  const userDetails =useSelector((state)=>state.user)
  let user = userDetails.user
 
  return (
    
    <div className='profileContainer'>
      <Navbar />
      <div className='subProfileContainer'>
      <div className='subCop'>
          <ProfileLeftbar/>
          <ProfileMainPost/>
          <ProfileRightbar/>
          </div>
      </div>
    </div>
  )
}

export default Profile