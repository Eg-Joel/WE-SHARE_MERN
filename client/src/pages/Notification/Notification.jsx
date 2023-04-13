import React from 'react'
import Leftbar from '../../components/leftContainer/Leftbar'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightcontainer/Rightbar'
import Notifications from '../../components/Notification/Notifications'


function Notification() {
  return (
    <div><div className='home'>
      
    <Navbar/>
    <div className='componentContainers'>
      <div className='subCop'>
      <Leftbar/>
      
      <Notifications/>
      <Rightbar/>
      </div>
      
    </div>
  </div></div>
  )
}

export default Notification