import React from "react";
import { useState } from "react";
import { Adminlogin } from '../../components/ReduxContainer/apicall'
import { useDispatch, useSelector } from "react-redux";



function AdminLogin() {
    const dispatch = useDispatch()
    //  const { isadminFetching, error } = useSelector((state) => state.user);
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
        Adminlogin(dispatch ,{email , password})
        
      }

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
                alt="Image"
                className="img-fluid"
              />
            </div>
            <div className="col-md-6 contents" style={{ marginTop: "5vh" }}>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3>Admin Login</h3>
                  </div>
                  <p className="text-danger text-center"></p>
                  
                    <div className="form-group first">
                      <label htmlFor="username">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)}
                      />
                      <span className="text-danger">
                      {emailErr && <div style={{color:"white"}}> {emailErr}</div>}
                      </span>
                    </div>
                    <div className="form-group last mb-4">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                         
                      
                      <span className="text-danger">
                      {passwordErr && <div style={{color:"white"}}> {passwordErr}</div>}
                      </span>
                    </div>

                    <button className='signupbtn btn btn-block btn-primary' onClick={handleClick}>Login</button>
                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminLogin