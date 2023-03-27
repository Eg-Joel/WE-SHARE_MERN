import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./signup.css"
import { signup } from '../../components/ReduxContainer/apicall'
import {ToastContainer ,Toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'
import app from "../../firebase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function Signup() {

  const dispatch = useDispatch()
 
  const {isFetching, error} =useSelector((state)=>state.user)
  
  const user =useSelector((state)=>state.user)
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phonenumber,setPhonenumber] = useState('')
  const [password,setPassword] = useState('')
  const [file ,setFile] =useState(null)
 

  const userDetails= user.user
  const navigator = useNavigate()
  const [usernameErr, setusernameErr] = useState("")
  const [emailErr, setemailErr] = useState("")
  const [phonenumberErr, setphonenumberErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
  const [imagePre , setImagePre] = useState(null)
  
  function validateUsername(){
    if (!username) {
      setusernameErr("username is required");
      return false;
    }else if (username.length < 3) {
      setusernameErr("username have minimum 3 character");
      return false;
    } 
    setusernameErr(null);  
    return true;
  }

  function validatePhoneNumber(){
    if (!phonenumber) {
      setphonenumberErr("phone Number is required");
      return false;
    }else if (phonenumber.length !== 10) {
      setphonenumberErr("Phone Number must 10 digit");
      return false;
    } 
    setphonenumberErr(null);  
    return true;
  }




  function validateEmail(){
    if (!email) {
      setemailErr("Email is required");
      return false;
    } else if (!email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
      setemailErr("Enter a valid email");
      return false;
    } 
    setemailErr(null); 
    return true;
  }

  function validatePassword(){
    if (!password) {
      setPasswordErr("Password is required");
      return false;
    }
     else if (password.length < 6) {
      setPasswordErr("Password at least 6 character");
      return false;
    } 
    setPasswordErr(null); 
    return true;
  }
 



  const handleClick = (e)=>{
    e.preventDefault()
    
    const fileName = new Date().getTime()+ file?.name
    const storage = getStorage(app)
    const storageRef = ref(storage , fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

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
    
      signup(dispatch ,{email,password,username,phonenumber,profile:downloadURL})
        
      
      })
    });
    if(!validateUsername()||!validateEmail()||!validatePhoneNumber()||!validatePassword()) return ;
    
    
  }
  console.log(userDetails?.Status)
  if(userDetails?.Status==='pending'){
    navigator("/verify/email");
  }

  
  return (
    <div className='signupContainer'>
        <div className='subSignupContainer'>
            <div style={{flex:1,marginLeft:150,marginBottom:"170px"}}>
              <p className='logoText'>WE SHARE</p>
              <p className='introText'>Share your thoughts and connect your friends</p>
            </div>
            <div style={{flex:3}}>
              <p className='createaccount'>Create New Account</p>
              {/* <input type="file" name="file" id="file" onChange={(e)=>setFile(e.target.files[0])} /> */}
              {
            imagePre !== null ? <img src={imagePre} className='inputText' style={{width:"100px", height:"100px",objectFit:"cover",borderRadius:"50%"}} alt="" /> :""  
            
          }
             

          <input type="file" name="file" id="file"className='inputText'  style={{ display: "none" }} onChange={(e) => [setFile(e.target.files[0]),setImagePre(URL.createObjectURL(e.target.files[0]))]} />
          <label htmlFor="file" className='inputText' style={{ cursor:"pointer" }} >
          <AddPhotoAlternateIcon /> <span>Add Photo</span>
          </label>
       
        
              <input type="text" placeholder='Username' onChange={(e)=>setUsername(e.target.value)} className='inputText'/>
              {usernameErr && <div style={{color:"white"}}> {usernameErr}</div>}

              <input type="text" placeholder='Phone no' onChange={(e)=>setPhonenumber(e.target.value)} className='inputText'/>
              {phonenumberErr && <div style={{color:"white"}}> {phonenumberErr}</div>}

              <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='inputText'/>
              {emailErr && <div style={{color:"white"}}> {emailErr}</div>}

              <input type="password" placeholder='******' onChange={(e)=>setPassword(e.target.value)} className='inputText'/>
              {passwordErr && <div style={{color:"white"}}> {passwordErr}</div>} 

              

              <button className='signupbtn ' onClick={handleClick}>Signup</button>
             
              <p style={{textAlign:"start",marginLeft:"30%"}}>Alteady have a account <Link to={"/login"}><span style={{color:"white"}}>Login</span></Link></p>
            </div>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default Signup