import React, { useEffect } from 'react'
import "./ProfileLeftbar.css"
import image from "../Images/Profile.png"
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from '../ReduxContainer/useReducer'
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

  let location = useLocation()
  let id = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user)
  // let user = userDetails?.user
  const [user, setUser] = useState(userDetails.user);

  useEffect(() => {
    setUser(userDetails.user);
  }, [userDetails]);
  // const [Follow, setFollow] = useState([user.other.following.includes(id) ? "Unfollow" : "Follow"]);
  //const id = user.other._id
  // let username = user?.other?.username
  const [Follow, setFollow] = useState("");

  useEffect(() => {
    if (user?.other?.following.includes(id)) {
      setFollow("Unfollow");
    } else {
      setFollow("Follow");
    }
  }, [id, user]);
  const accesstoken = user?.accessToken
  const [users, setUsers] = useState([])
  const { profile, username } = users;
  const [modelIsOpen, setModelIsOpen] = useState(false)
  const [modalProfile, setModalPrfile] = useState(false)
  const [imag, setImag] = useState(null)
  const [files, setFiles] = useState(null)
  // const per = "63aea88866f7fb45b520c14c"
  //    console.log(user.other.following.includes('641c92882561bb5eb24d9989'),"ofloof");
  //    console.log(user.other.following);
  const config = {
    headers: { token: ` ${accesstoken}` }
  }
  console.log(user,"lb");
  useEffect(() => {

    const getusers = async () => {

      try {
        const res = await axios.get(`http://localhost:5000/api/user/post/user/details/${id}`)
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
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/post/following/${id}`)
        SetFollowingUser(res.data)

      } catch (error) {

      }
    }
    getFollowing()
  }, [id])
  // console.log(followingUser,"following user");

  const handleFollow = async () => {
    const body = { user: id };
    if (Follow === "Follow") {
      // { user: `${user.other._id}` }
      await fetch(`http://localhost:5000/api/user/follow/${id}`, { method: 'PUT', headers: { 'Content-Type': "appliction/Json", token: accesstoken }, body: JSON.stringify(body) })
      setFollow("Unfollow");

    } else {
      await fetch(`http://localhost:5000/api/user/follow/${id}`, { method: 'PUT', headers: { 'Content-Type': "appliction/Json", token: accesstoken }, body: JSON.stringify(body) })
      setFollow("Follow");
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
            .patch(`http://localhost:5000/api/user/users/${user?.other?._id}/profile`, { profile: downloadURL }, config)
            .then((response) => {
              console.log(response.data);

              // Update user's profile image on the frontend
              const updatedUser = { ...user, profile: downloadURL };
              
              dispatch(updateProfile(updatedUser));

              setModalPrfile(false)
            })
            .catch((error) => {
              console.error(error);
            });
        });
      }
    );
  };
  return (
    <div className='ProfileLeftbar'>
      <div className='notificationContainers'>
        <img src={`${image}`} alt="" className='ProfilePagecover' />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img src={`${profile}`} alt="" className='ProfilePageimage' onClick={handleEditProfile} />
          <Modal isOpen={modalProfile} onRequestClose={() => setModalPrfile(false)} style={customStyles}>
            {

              <img src={imag === null ? `${profile}` : `${imag}`} alt="" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} />

            }


            <input type="file" name="file" id="file" className='inputText' style={{ display: "none" }} onChange={(e) => [setFiles(e.target.files[0]), setImag(URL.createObjectURL(e.target.files[0]))]} />
            <label htmlFor="file" className='inputText' style={{ cursor: "pointer" }} >
              <AddPhotoAlternateIcon />
            </label>
            <button style={{ height: "27px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} onClick={handleProfileUpdate}>Update</button>
            <button style={{ height: "27px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} onClick={() => setModalPrfile(false)}>cancel</button>
          </Modal>
          <div>
            <p style={{ marginLeft: 6, marginTop: 25, color: "black", textAlign: "start" }}>{username}</p>
            <p style={{ marginLeft: 6, color: "black", textAlign: "start", marginTop: -16, fontSize: 11 }}>user details</p>
          </div>
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
          <p style={{ color: "black", fontSize: "12px", textAlign: "start", marginLeft: "10px" }}>I would rather be despised of who I am, rather than loved by who I am not.</p>
        </div>
        {user?.other?._id !== id ? <div onClick={handleFollow}><button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }}>{Follow}</button></div> : <div><button style={{ width: "100%", paddingTop: 7, paddingBottom: 7, border: "none", backgroundColor: "green", color: "white" }} onClick={hanldeEditOpen}>Edit Bio</button></div>}
        <Modal isOpen={modelIsOpen} onRequestClose={() => setModelIsOpen(false)} style={customStyles}>
          <input type="text" defaultValue={username} />
          <button style={{ height: "27px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} >Update</button>
          <button style={{ height: "27px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} onClick={() => setModelIsOpen(false)}>cancel</button>
        </Modal>

        {/* onChange={(e) => setNewTitle(e.target.value)}  */}
      </div>
      <div className='notificationContainer'>
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
      </div>
    </div>
  )
}

export default ProfileLeftbar
