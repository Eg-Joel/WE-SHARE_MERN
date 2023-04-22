import React from 'react'
import Chatlists from '../../components/Chatlists/Chatlists'
import Leftbar from '../../components/leftContainer/Leftbar'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightcontainer/Rightbar'

function Chats() {
  return (
    <div><div className='home'>
      
    <Navbar/>
    <div className='componentContainers'>
      <div className='subCop'>
      
        <Leftbar/>
       
      
        <div className='chatboxsss'>
        <Chatlists/>
      </div>
      
      <div className='RightBars'>
      <Rightbar/>
      </div>
      </div>
      
    </div>
  </div></div>
  )
}

export default Chats