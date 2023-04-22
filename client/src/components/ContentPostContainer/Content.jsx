import React from 'react'
import "./contentpost.css"
import imageIcon from "../Images/gallery.png"
import emojiIcon from "../Images/cat-face.png"
import videoIcon from "../Images/video.png"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {ToastContainer,toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function Content() {

  const userDetails = useSelector((state)=>state.user);
  let user = userDetails?.user
  
  let id = user?.other?._id;
  const [File , setFile] = useState(null) 
  const [File2,setFile2] = useState(null)
  const [title , setTitle] = useState('')
  
  const [imagePre , setImagePre] = useState(null)
  const [videoPre , setVideoPre] = useState(null)
  const accessToken = user.accessToken

  const handlePost = (e)=>{
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Please enter a title for your post')
      return;
    }
    if ((File && File.type.split('/')[0] !== 'image') || (File2 && File2.type.split('/')[0] !== 'video')) {
      toast.error('Please upload either an image or a video file')
      return;
    }
    if( File !== null) 
    {
    const fileName = new Date().getTime()+ File?.name
    const storage = getStorage(app)
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef, File);

    uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/... 
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      fetch('http://localhost:5000/api/post/user/post', {method:"POST" , headers:{'Content-Type':"application/JSON",token: accessToken},body:JSON.stringify({title:title , image:downloadURL,video:''})}).then((data)=>{
        toast.success('Your Post upload successful')
        window.location.reload(true)
      
      })
    });
  }
);
    }else if(File2 !== null){
      const fileName = new Date().getTime()+ File2?.name
      const storage = getStorage(app)
      const storageRef = ref(storage , fileName)
      const uploadTask = uploadBytesResumable(storageRef, File2);
  
      uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       fetch('http://localhost:5000/api/post/user/post', {method:"POST" , headers:{'Content-Type':"application/JSON",token: accessToken},body:JSON.stringify({title:title , video:downloadURL , image:''})}).then((data)=>{
        toast.success('Your Post upload successful')
        window.location.reload(true)
      }) 
      });
    }
  );
    }else{
      fetch('http://localhost:5000/api/post/user/post', {method:"POST" , headers:{'Content-Type':"application/JSON",token: accessToken},body:JSON.stringify({title:title ,  image:'', video:'' })}).then((data)=>{
        toast.success('Your Post upload successful')
        window.location.reload(true)
      }) 
    }
    
  }
  const handleCancel = () => {
    setTitle('');
    setImagePre(null);
    setVideoPre(null);
  };
  return (
    <div>
      <div className='contentcontainer'>
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <img src={`${user?.other?.profile}`} className="profileImage" alt="" />
          <input type="text" className='contentpost' placeholder='write your thoughts'value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div style={{  marginLeft: "10px" }}>
          {
            imagePre !== null ? <img src={imagePre} style={{width:"410px", height:"250px",objectFit:"cover",borderRadius:"10px"}} alt="" /> : videoPre !== null ? <video style={{width:"410px", height:"250px",borderRadius:"10px"}}    controls>
            <source src={videoPre} type="video/mp4"/>
           </video>:''
          }
           <ToastContainer />
          <div style={{display:"flex",justifyContent:'space-between'}}>
          <div >
            <label htmlFor='file'>
            <img src={`${imageIcon}`} className="icons" alt="" />
            <input type="file" name='file' id='file' style={{display:'none'}} accept="image/png,image/jpeg,image/jpg,image/gif" onChange={(e)=>[setFile(e.target.files[0]),setImagePre(URL.createObjectURL(e.target.files[0]))]} />
            </label>
          
          {/* <img src={`${emojiIcon}`} className="icons" alt="" /> */}

          <label htmlFor='file2'>
          <img src={`${videoIcon}`} className="icons" alt="" />
            <input type="file" name='file2' id='file2' style={{display:'none'}} accept="video/*" onChange={(e)=>[setFile2(e.target.files[0]),setVideoPre(URL.createObjectURL(e.target.files[0]))]}/>
            </label>
            </div>
            <div>
          {title|| imagePre || videoPre ?  <button style={{height:"27px" ,marginBottom:"5px",paddingLeft:"20px" , paddingRight:"20px" , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer",marginTop:"50px",marginRight:"5px"}} onClick={handleCancel}>cancel</button> : ""}
          <button style={{height:"27px" ,marginBottom:"5px",paddingLeft:"20px" , paddingRight:"20px" , border:"none" , backgroundColor:"black" , color:"white" , borderRadius:"5px" , cursor:"pointer",marginTop:"50px",marginRight:"10px"}} onClick={handlePost}>Post</button>
         
            </div>
          
          </div>
        </div>

      </div>
    </div>
  )
}

export default Content