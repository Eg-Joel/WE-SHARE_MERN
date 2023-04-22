import React ,{useState,useEffect}from 'react'
import "./navbar.css"
import searchIcon from "../Images/search.png"
import profileImage from "../Images/Profile.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../ReduxContainer/useReducer'
import axios from '../../utils/axios'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

function Navbar() {
  const userDetails = useSelector((state)=>state.user);
 
 
  const [userData, setUserData] = useState("")
  const [searchWord, setSearchWord]=useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [user,setUser]=useState(userDetails?.user)
  
  useEffect(() => {
    setUser(userDetails.user);
  }, [userDetails]);
  const profile= user?.other?.profile
  useEffect(() => {
    axios.get(`user/get/users`)
      .then(({ data }) => setUserData(data))
      .catch((error) => console.log(error))
  }, [])
 
 
  let id = user?.other?._id;

  


  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout())
  }
  

  const handleChange = async(e) => {
    const searchWord = e.target.value
    
    setSearchWord(searchWord)
    const newFilter =await userData.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase())
    });
    
   newFilter && setFilteredData(newFilter);
  };
  return (
  <div className="navbar">
  <div className="left"> 
   <span>WE SHARE</span> 
  </div>
  <div className="search rounded-pill d-flex align-items-center">
      <SearchOutlinedIcon />
      <input type="text" id="search-navbar" value={searchWord} onChange={handleChange} className="form-control border-0 mx-3" placeholder="Find people..." />
      {searchWord && <div class='position-absolute top-100 start-0 bg-gray-300 w-50 rounded-3' style={{marginTop:"20rem"}}>
         <ul className="list-group" >
          { filteredData.length >0?
            filteredData.map((user) => (
                <Link to={`/profile/${user._id}`} onClick={()=> setSearchWord('')} key={user._id} className='list-group-item d-flex align-items-center  py-2'>
                <img src={user?.profile} alt={user?.username} className="rounded-circle me-3" width="30" height="30" />
                 <span class="mb-0">{user?.username}</span>
                 </Link>
            ))
            : 
              <li className='list-group-item py-2'>No results found</li>
            }
            </ul>
        </div>}
    </div>
  <div className="right">  
  <div className='profileContainernav'>
         <Link to={`/profile/${id}`}>
         
         <div style={{display:'flex' , alignItems:'center'}}>
        <img src={`${profile}`} className="profileImage" alt="" />
     <span style={{ marginLeft: '5px' }}>{user?.other?.username}</span>
        </div>
        </Link>
         {/* <div style={{marginRight:"30px",marginLeft:"20px",cursor:'pointer'}} onClick={handleLogout}>
        <span>Logout</span>
         </div> */}
       </div>
  </div>
</div>







    // <div className='mainNavbar'>
    //   <div className='logoContainer'>
    //     <p>WE SHARE</p>
    //   </div>
    //   <div className='searchInput'>
    //     <img src={`${searchIcon}`} className="searchIcon" alt="" />
    //     <input type="text" className='searchbar' value={searchWord} onChange={handleChange} placeholder='Search your friends' name='' id='' />
       
    //   </div>

    //   {searchWord && <div className="position-absolute top-0 start-50 translate-middle-x bg-secondary w-md-50 rounded-3xl mt-5 mt-md-0">
    //          <ul className="position-relative" >
    //           { filteredData.length >0?
    //             filteredData.map((user) => (
    //                 <Link to={`/profile/${user._id}`} onClick={()=> setSearchWord('')} key={user._id} className='d-flex flex-wrap gap-2 align-items-center p-3 bg-hover-gray-200 border-bottom border-gray-200'>
    //                 <img src={user?.profilePicture} alt={user?.username} className="rounded-circle custom-img" style={{width: "10rem", height: "10rem", objectFit:"cover"}} />
    //                  <p>{user?.username}</p> 
    //                  </Link>
    //             ))
    //             : 
    //               <li className='p-3 border-bottom border-gray rounded-bottom-lg'>No results found</li>
    //             }
    //             </ul>
    //         </div>}

    //   <div className='profileContainernav'>
    //     <Link to={`/profile/${id}`}>
    //     <div style={{display:'flex' , alignItems:'center'}}>
    //     <img src={`${profile}`} className="profileImage" alt="" />
    //     <p style={{ marginLeft: '5px' }}>{user?.other?.username}</p>
    //     </div>
    //     </Link>
    //     <div style={{marginRight:"30px",marginLeft:"20px",cursor:'pointer'}} onClick={handleLogout}>
    //       <p>Logout</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Navbar