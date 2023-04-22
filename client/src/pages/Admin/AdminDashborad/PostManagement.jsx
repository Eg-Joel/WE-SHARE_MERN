import React from 'react'
import PostComponent from '../../../components/admin components/MainDash/PostComponent'
import Sidebar from '../../../components/admin components/sidebar/Sidebar'

function PostManagement() {
  return (
    <div className='Dashborad'>
    <div className='DashGlass'>
    
      <Sidebar/>
   
   <PostComponent/>
  
     
    </div>
  </div>
  )
}

export default PostManagement