import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./login.css"
import { useState } from 'react'
import { login } from '../../components/ReduxContainer/apicall'
import { ToastContainer, toast } from 'react-toastify';

function Login() {
  const dispatch = useDispatch()
  const userDetails =useSelector((state)=>state.user)
  const [email , setEmail]=useState('')
  const [password,setPassword] = useState('')

  const [emailErr, setemailErr] = useState("")
  const [passwordErr, setPasswordErr] = useState("")
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
    if(!validateEmail()||!validatePassword()) return ;
        login(dispatch ,{email , password})
        if (userDetails.error) {
          toast.warning(userDetails.error);
       }  
  }
  
  return (
    <div className='signupContainer'>
        <div className='subSignupContainer'>
            <div style={{flex:1,marginLeft:150,marginBottom:"170px"}}>
              <p className='logoText'>WE SHARE</p>
              <p className='introText'>Share your thoughts and connect your friends</p>
            </div>
            <div style={{flex:3}}>
              <p className='createaccount'>Login Account</p>
              
              <input type="email" placeholder='Email' id='email' onChange={(e)=>setEmail(e.target.value)} className='inputText' />
              {emailErr && <div style={{color:"white"}} className='inputText'> {emailErr}</div>}
              <ToastContainer />
              <input type="password" id='password' placeholder='******' onChange={(e)=>setPassword(e.target.value)} className='inputText'/>
              {passwordErr && <div style={{color:"white"}} className='inputText'> {passwordErr}</div>} 
             
              <button className='signupbtn' onClick={handleClick}>Login</button>
              <Link to={"/forgot/password"}>
          <p style={{textAlign:'start' , marginLeft:"30.6%",color:"white" }}>Forgot password</p>
          </Link>
              
          <p style={{textAlign:'start' , marginLeft:"30.6%" ,textDecoration:"none",color:"white" }}>Create New <Link to={"/signup"}><span style={{color:"white"}}>Account </span>  </Link></p>
        
            </div>
        </div>
    </div>
  )
}

export default Login