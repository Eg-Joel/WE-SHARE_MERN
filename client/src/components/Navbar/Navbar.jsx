import React ,{useState,useEffect}from 'react'
import "./navbar.css"
import searchIcon from "../Images/search.png"
import profileImage from "../Images/Profile.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../ReduxContainer/useReducer'
import axios from 'axios'


function Navbar() {
  const userDetails = useSelector((state)=>state.user);
  const [userData, setUserData] = useState("")
  const [searchWord, setSearchWord]=useState("")
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/user/get/users`)
      .then(({ data }) => setUserData(data))
      .catch((error) => console.log(error))
  }, [])

  let user = userDetails?.user
  console.log(user,"nav");
  let id = user?.other?._id;
  
  const profile=user?.other?.profile
  
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
    <div className='mainNavbar'>
      <div className='logoContainer'>
        <p>WE SHARE</p>
      </div>
      <div className='searchInput'>
        <img src={`${searchIcon}`} className="searchIcon" alt="" />
        <input type="text" className='searchbar' value={searchWord} onChange={handleChange} placeholder='Search your friends' name='' id='' />
       
      </div>

      {searchWord && <div className='absolute top-[-11rem] bg-gray-300 md:w-4/12  rounded-2xl mt-56'>
             <ul className="relative" >
              { filteredData.length >0?
                filteredData.map((user) => (
                    <Link to={`/profile/${user._id}`} onClick={()=> setSearchWord('')} key={user._id} className='flex flex-wrap gap-2 items-center p-3 hover:bg-gray-200 border-b border-gray-200'>
                    <img src={user?.profilePicture} alt={user?.username} className="w-10 h-10 rounded-full object-cover" />
                     <p>{user?.username}</p> 
                     </Link>
                ))
                : 
                  <li className='p-3 hover:bg-gray-300 border-b rounded-b-lg border-gray-200'>No results found</li>
                }
                </ul>
            </div>}

      <div className='profileContainernav'>
        <Link to={`/profile/${id}`}>
        <div style={{display:'flex' , alignItems:'center'}}>
        <img src={`${profile}`} className="profileImage" alt="" />
        <p style={{ marginLeft: '5px' }}>{user?.other?.username}</p>
        </div>
        </Link>
        <div style={{marginRight:"30px",marginLeft:"20px",cursor:'pointer'}} onClick={handleLogout}>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar