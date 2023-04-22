import React, { useEffect, useState } from 'react'
import './MainDash.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../utils/axios';

function PostComponent() {
  const adminDetails = useSelector((state)=>state.admin)
  const token= adminDetails.admin.accessToken
  const config = {
        headers: { token: ` ${token}` }
    }
  const [pageNumber, setPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState('')
  const [posts, setPosts]  = useState([])
  const [postSearch, setPostSearch] = useState([])
  const [pageCount,setPageCount]=useState(1)

  useEffect(()=>{

    const getPosts = async () => {
        try {
            
            const response =await axios.get(`admin/posts/${pageNumber}`,config)
           
            const res=response.data.data
       
            setPosts(res.posts)
            setPageCount(res.pageCount)
        } catch (error) {
            console.error(error);
          }
        };
        getPosts()
    },[pageNumber])

useEffect(()=>{
    const searchPosts = async () => {
    if(!searchInput){
      setPostSearch([])
    }else{
        try {
        const searchPosts =await axios.get(`admin/searchPosts/${searchInput}`,config)
        const searc=searchPosts.data
        setPostSearch(searc.data)
    }catch (error) {
        console.error(error);
      }
    }
};
searchPosts();
},[searchInput])

function previousFn() {
    setPageNumber((val) => val - 1);
  }
  function nextFn() {
    setPageNumber((val) => val + 1);
  }


//   const  ban= async (id) =>{

//     try {
        
//         const res = await axios.patch(`admin/banPost`,{id},config)
        
//         if (res.data.status) {
//           const updatedUsers = users.map((user) => {
//             if (user._id === id) {
//               return { ...user, isBanned: true };
//             }
//             return user;
//           });
//           setUsers(updatedUsers);
//         }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// const unBan = async(id)=>{
//     try {
//         const res = await axios.patch(`admin/unBanPost`,{id},config)
//         if (res.data.status) {
//           const updatedUsers = users.map((user) => {
//             if (user._id === id) {
//               return { ...user, isBanned: false };
//             }
//             return user;
//           });
//           setUsers(updatedUsers);
//         }
//     } catch (error) {
//       console.error(error);
//     }
// }
  
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
           
            <th className="th-sm">Image</th>
            <th className="th-sm">User Name</th>
            <th className="th-sm">Discription</th>
            <th className="th-sm">Created At</th>
            {/* <th className="th-sm">Block</th> */}
          </tr>
        </thead>
        <tbody>
          {
            // userSearch ?
            postSearch && postSearch.length > 0 ? (
              postSearch.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                 
                  <td><img width={130} src={val.image} /></td>
                  <td>{val?.userDetail?.username}</td>
                  <td>{val?.title}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  {/* <td>
                    {
                      val.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td> */}
                </tr>
              );
            })
            ) : (
            posts.map((val, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + ((pageNumber - 1) * 5)}</td>
                  <td><img width={130} src={val.image} /></td>
                  <td>{val?.userDetail?.username}</td>
                  <td>{val?.title}</td>
                  <td>{new Date(val.createdAt).toLocaleDateString()}</td>
                  {/* <td>
                    {
                      val.isBanned?
                      <button onClick={()=>unBan(val._id)} className="btn btn-success">Unban</button>
                      :
                      <button onClick={()=>ban(val._id)} className="btn btn-danger" >Ban</button>
                    }
                  </td> */}
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

export default PostComponent