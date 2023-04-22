import React, { useEffect } from 'react'
import "./ProfileLeftbar.css"
import image from "../Images/Profile.png"
import { useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import axios from "../../utils/axios"
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile, updateProfiles, setUserss } from '../ReduxContainer/useReducer'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root');

function ProfileLeftbar() {

  let ids = useParams()
  let id= ids.id
 
  
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user)
  const [user, setUser] = useState(userDetails.user);
  const navigate = useNavigate();
  useEffect(() => {
    setUser(userDetails.user);
  }, [userDetails]);
  // const [Follow, setFollow] = useState([user.other.following.includes(id) ? "Unfollow" : "Follow"]);
  const userid = user.other._id
  // let username = user?.other?.username
   const [Follow, setFollow] = useState("");

  useEffect(() => {
    if (user?.other?.following.includes(id)) {
      setFollow("Unfollow");
    } else {
      setFollow("Follow");
    }
  }, [id]);
  const accesstoken = user?.accessToken
  const [users, setUsers] = useState([])
  const { profile, username, bio } = users;
  const [modelIsOpen, setModelIsOpen] = useState(false)
  const [modalProfile, setModalPrfile] = useState(false)
  const [imag, setImag] = useState(null)
  const [files, setFiles] = useState(null)
  const [newName, setNewName] = useState('')
  const [bios, setBio] = useState("")
 

  //    console.log(user.other.following.includes('641c92882561bb5eb24d9989'),"ofloof");

  const config = {
    headers: { token: ` ${accesstoken}` }
  }

  useEffect(() => {
    const getusers = async () => {
      try {
        const res = await axios.get(`user/post/user/details/${id}`)
        setUsers(res.data)

      } catch (error) {
        console.log("some error occured");
      }
    }
    getusers()
  }, [id, setUsers, users])
  let followersCounter = users?.followers?.length
  let followingCounter = users?.following?.length
  const [followingUser, SetFollowingUser] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(`post/following/${id}?page=${currentPage}&limit=3`, config)
        SetFollowingUser(res.data.results)
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowing()
  }, [id, currentPage])
  const handlePageChange = (page) => {
    setCurrentPage(page + page)
  };


const handleFollow = async (friendId)=>{
  try {
    const data = await axios.put(`user/follow`,{friendId},config)
    const userDet = data.data.updatedUser
   
    dispatch(setUserss(  userDet ))
    setFollow("Unfollow");
  } catch (error) {
    console.log(error)
  }
}
const handleUnFollow = async (friendId)=>{
  try {
    const data = await axios.put(`user/Unfollow`,{friendId},config)
    const userDet = data.data.updatedUser
    console.log(userDet);
    dispatch(setUserss(  userDet ))
    setFollow("Follow");
  } catch (error) {
    console.log(error)
  }
}


  const hanldeEditOpen = () => {
    setModelIsOpen(true)
  }
  const handleEditProfile = () => {
    setModalPrfile(true)
  }

  const handleProfileUpdate = () => {
    const fileName = new Date().getTime() + files?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update user's profile image on the backend
          axios
            .patch(`user/users/${user?.other?._id}/profile`, { profile: downloadURL }, config)
            .then((response) => {
              console.log(response.data);
              const res = response.data.profile
              // Update user's profile image on the frontend
              // const updatedUser = { ...user, profile: downloadURL };
              // console.log(updatedUser,"lop");
              dispatch(updateProfile(res));
              //  updateProfile(dispatch,{res})
              setModalPrfile(false)
            })
            .catch((error) => {
              console.error(error);
            });
        });
      }
    );
  };

  const handleProfileEdit = async () => {
    // try {

    let updateFields = {};
    if (newName) {
      updateFields.name = newName;
    }
    if (bios) {
      updateFields.bio = bios;
    }
    const res = await axios.put(`user/Editsprofile/${userid}`, { updateFields }, config);
    if (res.status === 200) {

      dispatch(updateProfiles({ name: newName, bio: bios }));
      console.log(res, "upo");
      setModelIsOpen(false);
    } else {

      console.error('Failed to update profile');
    }

    // } catch (error) {
    //   console.error(error)
    // }
  }
  const createConverStation = async (friendId) => {

    const { data } = await axios.post('conversation/con', { friendId }, config)

    navigate(`/chat/${data._id}/${friendId}`);

  }


  
  return (
    <div className='ProfileLeftbar'>
      <div className='notificationContainers'>
        <img src={`${image}`} alt="" className='ProfilePagecover' />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img src={`${profile}`} alt="" className='ProfilePageimage' onClick={handleEditProfile} />
          <Modal isOpen={modalProfile} onRequestClose={() => setModalPrfile(false)} style={customStyles}>
            {
             <label htmlFor="file"  style={{ cursor: "pointer", }} >
              <img src={imag === null ? `${profile}` : `${imag}`} alt="" style={{ width: "200px", height: "200px", objectFit: "cover",}} />
              </label>
            }
            <input type="file" name="file" id="file" className='inputText' style={{ display: "none" }} onChange={(e) => [setFiles(e.target.files[0]), setImag(URL.createObjectURL(e.target.files[0]))]} />
        
            <Stack direction="row" spacing={2} className='mt-3'>
            <Button variant="outlined" color="error" onClick={() => setModalPrfile(false)}>Cancel </Button>
            <Button variant="contained" color="success" onClick={handleProfileUpdate} >Update </Button>
             </Stack>
            
          </Modal>
          <div>
            <p style={{ marginLeft: 6, marginTop: 25, color: "black", textAlign: "start" }}>{username}</p>
            <p style={{ marginLeft: 6, color: "black", textAlign: "start", marginTop: -16, fontSize: 11 }}>user details</p>
          </div>
          {userid !== id ? <div style={{ marginLeft: "auto", marginRight: "15px", marginTop: "5px" }}>

            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton aria-label="message" size="small">
                <ChatIcon onClick={() => createConverStation(id)} />
              </IconButton>
            </Stack>

          </div> : ""}

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 17 }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followings</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", }}>{followingCounter}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>Followers</p>
          <p style={{ color: "black", marginRight: 20, fontSize: "12px", }}>{followersCounter}</p>
        </div>
        <div >
          <h5 style={{ color: "black", marginLeft: 10, fontSize: "14px", marginRight: 30, textAlign: "start" }}>User bio</h5>
          <p style={{ color: "black", fontSize: "12px", textAlign: "start", marginLeft: "10px" }}>{bio ? bio : ` I would rather be despised of who I am, rather than loved by who I am not.`}</p>
        </div>
        {/* {user?.other?._id !== id ? <div onClick={handleFollow}><button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }}>{Follow}</button></div> : <div><button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }} onClick={hanldeEditOpen}>Edit Bio</button></div>} */}
        {
          user?.other?._id !== id ? (
            Follow ==="Unfollow"   ? <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }} onClick={() => handleUnFollow(id)}>Unfollow</button>:
          <button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }} onClick={() => handleFollow(id)}>Follow</button>) :(
          <div><button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }} onClick={hanldeEditOpen}>Edit Bio</button></div> )
        }
        <Modal isOpen={modelIsOpen} onRequestClose={() => setModelIsOpen(false)} style={customStyles}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Name"
                defaultValue={username}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div style={{ marginTop: "10px", }}>
              <TextField
                id="outlined-multiline-flexible"
                label="BIO"
                multiline
                maxRows={4}
                defaultValue={bio}
                onChange={(e) => setBio(e.target.value)}
              />

            </div>

            <Stack direction="row" spacing={2}>

              <Button variant="contained" color="success" justifyContent="center" onClick={handleProfileEdit}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={() => setModelIsOpen(false)}>
                cancel
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* onChange={(e) => setNewTitle(e.target.value)}  */}
      </div>

      <div className='notificationContainer'>
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <p style={{ marginLeft: 10 }}>Friends</p>


          <p style={{ marginRight: 10, color: "#aaa", cursor: "pointer" }} onClick={() => handlePageChange(1)}>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>
          {followingUser.map((item, index) => (
            <Link to={ `/Profile/${item._id}` }  key={index} >
              <div style={{ marginLeft: 4, cursor: "pointer" }}>
                <img src={`${item.profile}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination">
          {Array.from(Array(totalPages).keys()).map((page) => (
            <div key={page} className={currentPage === page + 1 ? "active" : ""} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </div>
          ))}
        </div>
      </div>

      {/* <div className='notificationContainer'>
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>See all</p>
        </div>
        <div style={{ display: 'flex', flexWrap: "wrap", marginLeft: 5 }}>
          {followingUser.map((item, index) => (
            <Link to={`/Profile/${item._id}`} key={index}>
              <div style={{ marginLeft: 4, cursor: "pointer" }}>
                <img src={`${item.profile}`} className="friendimage" alt="" />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}



        </div>
      </div> */}
    </div>
  )
}

export default ProfileLeftbar
