import React from 'react'
import './MainDash.css'
import  { useEffect, useState } from "react";
import axios from "../../../utils/axios"
import { useSelector } from 'react-redux';



function UserComponent() {

    const adminDetails = useSelector((state)=>state.admin)
    
    const token= adminDetails.admin.accessToken
    
    const config = {
        headers: { token: ` ${token}` }
    }
    const [pageNumber, setPageNumber] = useState(1);
    const [searchInput, setSearchInput] = useState('')
    const [users,setUsers]=useState([])
    const [userSearch,setUserSearch]=useState([])
    const [pageCount,setPageCount]=useState(1)
    useEffect(()=>{

        const getUsers = async () => {
            try {
                
                const response =await axios.get(`admin/users/${pageNumber}`,config)
               
                const res=response.data.data
                
                setUsers(res.users)
                setPageCount(res.pageCount)
            } catch (error) {
                console.error(error);
              }
            };
            getUsers()
        },[pageNumber])

    useEffect(()=>{
        const searchUsers = async () => {
        if(!searchInput){
            setUserSearch([])
        }else{
            try {
            const searchUsers =await axios.get(`admin/searchUsers/${searchInput}`,config)
            const searc=searchUsers.data
            setUserSearch(searc.data)
        }catch (error) {
            console.error(error);
          }
        }
    };
    searchUsers();
    },[searchInput])

    function previousFn() {
        setPageNumber((val) => val - 1);
      }
      function nextFn() {
        setPageNumber((val) => val + 1);
      }
    

      const  ban= async (id) =>{

        try {
            
            const res = await axios.patch(`admin/banUser`,{id},config)
            
            if (res.data.status) {
              const updatedUsers = users.map((user) => {
                if (user._id === id) {
                  return { ...user, isBanned: true };
                }
                return user;
              });
              setUsers(updatedUsers);
            }
        } catch (error) {
          console.error(error);
        }
      }
    const unBan = async(id)=>{
        try {
            const res = await axios.patch(`admin/unBanUser`,{id},config)
            if (res.data.status) {
              const updatedUsers = users.map((user) => {
                if (user._id === id) {
                  return { ...user, isBanned: false };
                }
                return user;
              });
              setUsers(updatedUsers);
            }
        } catch (error) {
          console.error(error);
        }
    }
      

  return (
    <div className='MainDash'>
         <div className="d-flex flex-row-reverse">
          <div id="top-div" className="d-flex m-3 mt-5">
           <div className="form-inline active-cyan-3 active-cyan-4">
           <input
           className="form-control form-control-sm ml-3 w-75"
           type="text"
           placeholder="Search"
           aria-label="Search"
           value={searchInput}
           onChange={(e)=>setSearchInput(e.target.value)}
         />
         <i className="fas fa-search" aria-hidden="true"></i>
      </div>
    </div>
          
        </div>
        <div id="table">
      <table
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th className="th-sm">Index</th>
           
            <th className="th-sm">Username</th>
            <th className="th-sm">Email</th>
            <th className="th-sm">Joined At</th>
            <th className="th-sm">Block</th>
          </tr>
        </thead>
        <tbody>
          {
            // userSearch ?
            userSearch && userSearch.length > 0 ? (
            userSearch.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                 
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>
                    {
                      val.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td>
                </tr>
              );
            })
            ) : (
            users.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + ((pageNumber - 1) * 5)}</td>
                 
                  <td>{val.username}</td>
                  <td>{val.email}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  <td>
                    {
                      val.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td>
                </tr>
              );
            })
            )
            }
        </tbody>
      </table>
    </div>

    
        <div className='d-flex flex-row-reverse'>
          <div className="btn-container d-flex">
            <button onClick={previousFn} disabled={pageNumber === 1} 
            className='mx-2 btn btn-primary'>
              Previous
            </button>
            <i className="btn">
              Page {pageNumber} of {pageCount}
            </i>
            <button
            className="btn btn-primary"
              onClick={nextFn}
              disabled={pageNumber === pageCount}
            >
              Next
            </button>
          </div>
        </div>

        {/* <UserTable pageNumber={pageNumber} /> */}
        {/* {
          !admin.searchUsers && <Pagination
            pageCount={admin?.users?.pageCount}
            pageNumber={pageNumber}
            previousFn={previousFn}
            nextFn={nextFn}
          />
        } */}

    </div>
  )
}

export default UserComponent