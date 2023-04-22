import React from 'react'
import ChatBox from '../../components/ChatBox/ChatBox'
import Leftbar from '../../components/leftContainer/Leftbar'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightcontainer/Rightbar'

function Chating() {
  return (
    <div><div className='home'>
      
    <Navbar/>
    <div className='componentContainers'>
      <div className='subCop'>
        
        <Leftbar/>
     
     
      <div className='chatboxsss'>
      <ChatBox/>
      </div>
     
      <div className='RightBars'>
      <Rightbar value={true}/> 
      </div>
      
      </div>
      
    </div>
  </div></div>
  )
}

export default Chating