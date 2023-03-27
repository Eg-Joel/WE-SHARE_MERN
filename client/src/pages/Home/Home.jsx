import React from 'react'
import { useSelector } from 'react-redux'
import Leftbar from '../../components/leftContainer/Leftbar'
import MainPost from '../../components/MainPostContainer/MainPost'
import Navbar from '../../components/Navbar/Navbar'
import Rightbar from '../../components/Rightcontainer/Rightbar'
import "./Home.css"
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import Sidebar from '../../components/admin components/sidebar/Sidebar'
function Home() {
  const userDetails =useSelector((state)=>state.user)
  let user = false
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <div className='home'>
      
      <Navbar/>
      <div className='componentContainers'>
        <div className='subCop'>
        <Leftbar/>
        
        <MainPost/>
        <Rightbar/>
        </div>
        
      </div>
    </div>
    </QueryClientProvider>
  )
}

export default Home