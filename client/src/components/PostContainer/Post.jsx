import React, { useState, useEffect, useRef } from 'react'
import "./post.css"
import profileImage from "../Images/Profile.png"
import Likebtn from "../Images/like.png"
import Likedbtn from "../Images/setLike.png"
import commentBtn from "../Images/speech-bubble.png"
import optionIcon from "../Images/more.png"
import { useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import Modal from 'react-modal'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import axios from '../../utils/axios'
import * as timeago from 'timeago.js';
import Stack from '@mui/material/Stack';


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
function Post({ post }) {

  const userDetails = useSelector((state) => state.user);
  let currentUser = userDetails?.user
  const [user, setUser] = useState([])
  const [open, setOpen] = useState(false)
  const menuRef = useRef()
  const imgRef = useRef()
  // const queryClient = useQueryClient();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== imgRef.current) {
      setOpen(false)
    }
  })

  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(`user/post/user/details/${post.user}`)
        setUser(res.data)
      } catch (error) {
        console.log("some error occured");
      }
    }
    getuser()
  }, [])


  const userId = currentUser?.other?._id;
  const accesstoken = currentUser.accessToken
  const [Like, setLike] = useState(post.like.includes(userId) ? Likedbtn : Likebtn)
  const [Count, setCount] = useState(post.like.length)
  const [Comments, SetComments] = useState(post.comments)
  const [Commentadded, setCommentadded] = useState('')
  const [Show, setShow] = useState(false)
  const [shows, setShows] = useState(false)
  const [modelIsOpen, setModelIsOpen] = useState(false)
  const [modelReportOpen, setModelReportOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [posts, setPosts] = useState(post)
  const [report, setReport] = useState('other')
  const [err, setErr] = useState(null)
  const [desc, setDesc] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false);
  const sortedComments = [...Comments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  let subtitle;
  const token = accesstoken

  const config = {
    headers: { token: ` ${token}` }
  }
  // console.log(post);

  const handleLike = async () => {
    if (Like == Likebtn) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accesstoken } })
      setLike(Likedbtn)
      setCount(Count + 1)

    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/dislike`, { method: "PUT", headers: { 'Content-Type': 'application/Json', token: accesstoken } })
      setLike(Likebtn)
      setCount(Count - 1)

    }
  }

  const [likedUsers, SetLikedUsers] = useState([])
  useEffect(() => {
    const getLikedUsres = async () => {
      try {
        const res = await axios.get(`post/likedUsers/${post._id}`, config)
        SetLikedUsers(res.data)
      } catch (error) {

      }
    }
    getLikedUsres()
  }, [])

  const addCommeent = async () => {

    if (Commentadded.trim() !== '') {
      const comment = {
        "postid": `${post._id}`,
        "username": `${currentUser.other.username}`,
        "comment": `${Commentadded}`,
        "profile": `${currentUser.other?.profile}`
      }
      const updatedComments = [...Comments, comment];
      setCommentadded('');



      // console.log(currentUser.other?.profile,"jjij");

      await fetch(`http://localhost:5000/api/post/comment/post`, { method: "PUT", headers: { 'Content-Type': 'application/Json', token: accesstoken }, body: JSON.stringify(comment) })


      SetComments(updatedComments);

      toast.success('comment added')

    } else {
      toast.warning('wirte any thing')
    }

  }

  const handleComment = () => {
    addCommeent()
    setCommentadded('');
  }


  const handleShow = () => {
    if (Show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const handleLikeShow = () => {
    if (shows === false) {
      setShows(true)

    } else {
      setShows(false)
    }
  }
  const hanldeEditOpen = () => {
    setModelIsOpen(true)
  }
  const deleteMutation = useMutation(

    (postId) =>
      fetch(`http://localhost:5000/api/post/deletepost/${postId}`, { method: "delete", headers: { 'Content-Type': 'application/Json', token: accesstoken } }),
    {
      onSuccess: () => {
        setIsDeleted(true);
        // Invalidate and refetch
        // queryClient.invalidateQueries(["posts"]);
        // const updatedData = queryClient.getQueryData("posts").filter(post => post._id !== postId);
        // queryClient.setQueryData("posts", updatedData);
        toast.success('Post Deleted')
      },
    }
  );
  const hanldeDeleteOpen = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(post._id);
      }
    })


  }
  const hanldeReportOpen = () => {
    setModelReportOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModelReportOpen(false);
  }
  const handleEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/post/update/post/${post._id}`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accesstoken }, body: JSON.stringify({ title: newTitle }) })
      const updatedPost = await response.json();
      setPosts(updatedPost)
      setNewTitle(updatedPost.title)
      setModelIsOpen(false)

      toast.success('Post Edited')
    } catch (error) {
      console.error(error)
    }


  }
  const handleReports = () => {
    // e.preventDefault()
    if (report == "other" && desc.trim().length !== 0 && desc != null) {

      axios.put(`post/${post._id}/report`, { reason: desc }, config).then((res) => {

        Swal.fire({
          title: 'Reported!',
          text: 'Thanks for reporting',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        closeModal()
        setDesc("")
        // setMenuOpen(false)
        setErr(null)
      }).catch((err) => {
        setErr(err.response.data)
      })
    } else if (report !== "other") {
      axios.put(`post/${post._id}/report`, { reason: report }, config).then((res) => {
        Swal.fire({
          title: 'Reported!',
          text: 'Thanks for reporting',
          icon: 'success',
          confirmButtonText: 'ok'
        })
        closeModal()
        setDesc("")
        // setMenuOpen(false)
        setErr(false)
      }).catch((err) => {
        setErr(err.response.data)
      })

    }
    else {
      setErr("Please specify reason")
    }
  }
  if (isDeleted) {
    return null;
  }
  const handleDeleteComment = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.put(`post/${post._id}/deleteComment`, { _id }, config).then((res) => {
          console.log(res, "lo");
          toast.success('Post Deleted')
          const newComments = Comments.filter(comment => comment._id !== _id);
          SetComments(newComments);
        }).catch((err) => { console.log(err); })
      }
    })

  }
  // console.log(Comments);
  return (
    <div className='postContainer'>
      <div className='subPostContainer'>
        <div className='postProfi' >
          <div>
            {user.profile == "" ? <img src={`${profileImage}`} className="postProfile" alt="" /> : <img src={`${user.profile}`} className="postProfile" alt="" />}

          </div>

          <div className='optt'>
            <p style={{ marginLeft: "5px", textAlign: "start", marginTop: "3px", marginBottom: "0" }}>{user.username}</p>

            <p style={{ marginLeft: "5px", textAlign: "start", color: "gray", marginBottom: "0" }}><ReactTimeAgo date={Date.parse(post.createdAt)} locale="en-US" /> </p>

          </div>

          <div className='optt'>

            {
              <img
                ref={imgRef}
                src={`${optionIcon}`} onClick={() => setOpen(!open)} className="option" alt="" />}

            {
              open && (
                <div
                  ref={menuRef}
                  className='dropt'>
                  <ul className='uldrop'>
                    {
                      //  Menu.map((menu)=>(
                      //    <li
                      //    onClick={()=> setOpen(false)} 
                      //    className='lidrop' key ={menu}>
                      //      {menu} 
                      //    </li>
                      //  ))
                      <div>

                        <li className={userId == user._id ? 'lidrop' : "linotdrop"} onClick={hanldeEditOpen}> Edit</li>
                        <li className={userId == user._id ? 'lidrop' : "linotdrop"} onClick={hanldeDeleteOpen}>Delete</li>
                        <li className={userId == user._id ? 'linotdrop' : "lidrop"} onClick={hanldeReportOpen}>Report</li>
                      </div>
                    }
                  </ul>

                </div>)
            }

          </div>

        </div>
        <div>

          <Modal isOpen={modelIsOpen} onRequestClose={() => setModelIsOpen(false)} style={customStyles}>
            <input type="text" defaultValue={posts.title} onChange={(e) => setNewTitle(e.target.value)} style={{ display: "block" }} />
            <Stack direction="row" spacing={2} className='mt-3'>
              <Button variant="outlined" color="error" onClick={() => setModelIsOpen(false)}>Cancel </Button>
              <Button variant="contained" color="success" onClick={handleEdit} >Update </Button>

            </Stack>
          </Modal>

          <Modal
            isOpen={modelReportOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Report</h2>
            <CloseIcon onClick={closeModal} className="close" />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Please specify reason</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="other"
                name="radio-buttons-group"
              >
                <FormControlLabel value="spam" control={<Radio />} label="spam" onChange={e => { setReport(e.target.value) }} />
                <FormControlLabel value="fraud" control={<Radio />} label="fraud" onChange={e => setReport(e.target.value)} />
                <FormControlLabel value="false information" control={<Radio />} label="false information" onClick={e => setReport(e.target.value)} />
                <FormControlLabel value="other" control={<Radio />} label="other" onClick={e => setReport(e.target.value)} />
              </RadioGroup>
              {report === "other" && <TextField id="standard-basic" label="please say more about it" variant="standard" onChange={e => setDesc(e.target.value)} />}
              {err && <span style={{ top: "2rem", color: "red" }} className="err">{err}</span>}
              <Button variant="contained" endIcon={<SendIcon />} className="sendButton" onClick={handleReports}>Send</Button>
            </FormControl>
          </Modal>

        </div>
        <p style={{ textAlign: "start", width: "96%", marginLeft: 10, marginTop: "5px" }}>{posts.title} </p>
        {post.image !== "" ?
          <img src={`${post.image}`} className="postImage" alt="" /> : post.video !== '' ? <video width="80%" height="400" className="postImage" controls>
            <source src={`${post.video}`} type="video/mp4" />
          </video> : ''
        }


        <div style={{ display: "flex" }}>
          <div style={{ display: 'flex', marginLeft: '10px', marginTop: "5px", }}>
            <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>

              <img src={`${Like}`} className="LikeComments" onClick={handleLike} alt="" />
              {/* <p style={{ marginLeft: "6px" }}>{ Count} Likes</p> */}
              {Count > 0 && <span style={{ marginLeft: "6px" }} onClick={handleLikeShow}>{Count} Likes</span>}
            </div>

            <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
              <img src={`${commentBtn}`} className="LikeComments" onClick={handleShow} alt="" />
              {/* <p style={{ marginLeft: "6px" }}>{Comments.length}Comments</p> */}
              {Comments.length > 0 && <span style={{ marginLeft: "6px" }}>{Comments.length} Comments</span>}
            </div>
          </div>
          {/*{post.Comments.length} */}
        </div>
        {
          shows === true ?
            <div style={{ padding: "10px" }}>

              {likedUsers.map((items, index) => (
                <div style={{ alignItems: "center" }} key={index}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={`${items.profile}`} className="postProfile" alt="" />
                    <p style={{ marginLeft: "6px", marginTop: 7, fontSize: 18 }}> {items.username}</p>


                  </div>
                </div>
              ))}
            </div> : ""
        }
        {Show === true ?
          <div style={{ padding: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={`${currentUser?.other?.profile}`} className="postProfile" alt="" />
              {/* <p style={{marginLeft:"6px"}}> user</p> */}
              <input type="text" className='commentbox' placeholder='Add a comment' onChange={(e) => setCommentadded(e.target.value)} value={Commentadded} />
              <button className='comentbtn' onClick={handleComment}>Post</button>
              <ToastContainer />

            </div>
            {sortedComments.map((items, index) => (
              <div style={{ alignItems: "center" }} key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={`${items.profile}`} className="postProfile" alt="" />
                  <p style={{ marginLeft: "6px", marginTop: 7, fontSize: 18 }}> {items.username}</p>

                  <p style={{ marginLeft: "5px", textAlign: "start", color: "gray", marginTop: -7, fontSize: 12, marginBottom: "0" }}>{timeago.format(items?.createdAt)} </p>
                </div>


                <p style={{ display: "flex", marginLeft: "56px", alignItems: "start", marginTop: -16 }}>{items.comment}</p>

                {userId === items.user ? <p style={{ display: "flex", marginLeft: "56px", alignItems: "start", marginTop: -16, color: "#aaa", fontSize: 12, cursor: "pointer" }} onClick={() => { handleDeleteComment(items._id) }}>Delete</p> : ""}
              </div>
            ))}
          </div> : ""
        }



      </div>
    </div>
  )
}

export default Post