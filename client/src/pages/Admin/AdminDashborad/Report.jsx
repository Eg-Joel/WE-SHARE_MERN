import React from 'react'
import ReportCom from '../../../components/admin components/MainDash/ReportCom'
import Sidebar from '../../../components/admin components/sidebar/Sidebar'

function Report() {
  return (
    <div className='Dashborad'>
    <div className='DashGlass'>
      <Sidebar/>
      <ReportCom/>
    </div>
  </div>
  )
}

export default Report