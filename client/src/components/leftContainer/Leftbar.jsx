import React, { useState } from 'react'
import "./leftbar.css"
import image from "../Images/Profile.png"
import { useSelector } from 'react-redux';
import {UilSignOutAlt} from '@iconscout/react-unicons'
import { useDispatch} from 'react-redux'
import { logout } from '../ReduxContainer/useReducer';
import { SidebarData } from '../../Data/Data';

function Leftbar() {
    const userDetails = useSelector((state)=>state.user);
    const [selected, SetSelected] =useState(0)

    const dispatch = useDispatch();
    const handleLogout = ()=>{
      dispatch(logout())
    } 
  let user = userDetails?.user
  let id = user?.other?._id;
    return (
        <div className='Sidebar'>
            

                
        <div className="menu">
            {SidebarData.map((item,index)=>{
                return (
                    <div className={selected=== index? 'menuItems active':'menuItems '}
                    key={index}
                    onClick={()=>SetSelected(index)}
                    >
                        <item.icon/>
                        <span>
                            {item.heading}
                        </span>
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

export default Leftbar
