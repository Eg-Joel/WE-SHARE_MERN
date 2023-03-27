import React from 'react'
import UserComponent from '../../../components/admin components/MainDash/UserComponent'
import Sidebar from '../../../components/admin components/sidebar/Sidebar'

function UserMangement() {
  return (
    <div className='Dashborad'>
      <div className='DashGlass'>
        <Sidebar/>
        <UserComponent/>
      </div>
    </div>
  )
}

export default UserMangement