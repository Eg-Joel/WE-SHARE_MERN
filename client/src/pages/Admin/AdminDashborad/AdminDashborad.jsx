import React from 'react'
import MainDash from '../../../components/admin components/MainDash/MainDash'
import Sidebar from '../../../components/admin components/sidebar/Sidebar'
import './AdminDashborad.css'

function AdminDashborad() {
  return (
    <div className='Dashborad'>
      <div className='DashGlass'>
        <Sidebar/>
        <MainDash/>
      </div>
    </div>
  )
}

export default AdminDashborad