import React, { useState } from 'react'
import './Sidebar.css'
import logo from '../../Images/logonobac.png'
import { SidebarData } from '../../../Data/Data'
import {UilSignOutAlt,UilBars} from '@iconscout/react-unicons'
import { useDispatch} from 'react-redux'
import { Adminlogout } from '../../ReduxContainer/adminReducer'
import { Link,useLocation  } from 'react-router-dom'
import { motion } from "framer-motion"
const Sidebar = () => {
    // const adminDetails = useSelector((state)=>state.admin);
    const [selected, SetSelected] =useState(0)
    const [selectedPath, setSelectedPath] = useState('');

    const [expanded,setExpaned] = useState(true)
    const dispatch = useDispatch();
    const handleLogout = ()=>{
      dispatch(Adminlogout())
      setSelectedPath('');
    }
    const location = useLocation();
    const sidebarVariants = {
        true: {
          left : '0'
        },
        false:{
          left : '-60%'
        }
      }
  return (
    <>
    <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
            <UilBars/>
        </div>
    <motion.div className='Sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}>
        
        <div className="logo">
            <img src={logo} alt="" />
            <span>
                WE Share
            </span>
        </div>

        <div className="menu">
            {SidebarData.map((item,index)=>{
             const isActive = location.pathname === item.path || selectedPath === item.path;
                return (
                     
                    <div className={`menuItems ${isActive ? 'active' : ''}`}
                       key={index}
                    onClick={()=>setSelectedPath(item.path)}
                    ><Link to={item.path}  >
                        <item.icon/>
                        <span>
                            {item.heading}
                        </span>
                        </Link>
                    </div>
                     
                )
            })}
            <div className="menuItems">
                <UilSignOutAlt />
                <span onClick={handleLogout}>Logout</span>
            </div>

        </div>
    </motion.div>
    </>
  )
}

export default Sidebar