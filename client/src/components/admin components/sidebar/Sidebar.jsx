import React, { useState } from 'react'
import './Sidebar.css'
import logo from '../../Images/logonobac.png'
import { SidebarData } from '../../../Data/Data'
import {UilSignOutAlt} from '@iconscout/react-unicons'
import { useDispatch} from 'react-redux'
import { Adminlogout } from '../../ReduxContainer/adminReducer'
import { Link,useLocation  } from 'react-router-dom'
const Sidebar = () => {
    // const adminDetails = useSelector((state)=>state.admin);
    const [selected, SetSelected] =useState(0)
    const [selectedPath, setSelectedPath] = useState('');

    const dispatch = useDispatch();
    const handleLogout = ()=>{
      dispatch(Adminlogout())
      setSelectedPath('');
    }
    const location = useLocation();
  return (
    <div className='Sidebar'>
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
    </div>
  )
}

export default Sidebar