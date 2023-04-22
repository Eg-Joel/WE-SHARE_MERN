import React, { useState } from 'react'
import "./leftbar.css"
import image from "../Images/Profile.png"
import { useSelector } from 'react-redux';
import {UilSignOutAlt} from '@iconscout/react-unicons'
import { useDispatch} from 'react-redux'
import { logout } from '../ReduxContainer/useReducer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
  import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link, useLocation } from 'react-router-dom';
import {UilEstate} from "@iconscout/react-unicons";
import NotificationsIcon from '@mui/icons-material/Notifications';

function Leftbar() {
    const userDetails = useSelector((state)=>state.user);
    const [selectedPath, setSelectedPath] = useState('');

    const dispatch = useDispatch();
    const handleLogout = ()=>{
      dispatch(logout())
      setSelectedPath('');
    } 
  let user = userDetails?.user
  let id = user?.other?._id;
  
  const location = useLocation();
  const LeftbarData = [
    
    {
      icon: UilEstate,
      heading: "Home",
      path: "/"
    },
    {
        icon: ChatBubbleOutlineIcon,
        heading: "Chat",
        path: "/chats"
        
      },
      {
        icon: AccountBoxIcon,
        heading: 'Profile',
        path: `/profile/${id}`
      },
      {
        icon: NotificationsIcon,
        heading: 'Notifications',
        path: `/notification`
      },
    
    
    
  ];
    return (
        <div className='Sidebars'>


                
             <div className="menul">
      
            {LeftbarData.map((item,index)=>{
                const isActive = location.pathname === item.path || selectedPath === item.path;
                return (
                    <div className={`menuItemsl ${isActive ? 'active' : ''}`}
                    key={index}
                    onClick={()=>setSelectedPath(item.path)}
                    ><Link to={item.path}  >
                        <item.icon/>
                        <span style={{marginLeft:"15px"}}>
                            {item.heading}
                        </span>
                        </Link>
                    </div>
                )
            })}
            <div className="menuItemsl">
                <UilSignOutAlt />
                <span onClick={handleLogout}>Logout</span>
            </div>

        </div>
        
           
        </div>
    )
}

export default Leftbar
