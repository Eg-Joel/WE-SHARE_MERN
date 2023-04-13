import axios from "axios"
import { loginStart,loginSucces,loginFailure,logout } from "./useReducer"
import { AdminloginStart,AdminloginSucces,AdminloginFailure,Adminlogout } from "./adminReducer"


export const login = async(dispatch, user)=>{
 
    dispatch(loginStart())
    
    try {
        const res = await axios.post('http://localhost:5000/api/user/login',user)
    console.log(res,"api");
        dispatch(loginSucces(res.data))
       
    
    } catch (error) {
      console.log(error,"p");
      if ( error.response.data.msg ) {
        
        dispatch(loginFailure(error.response.data.msg))
    } else {
        dispatch(loginFailure("An error occurred while logging in. Please try again later."))
    }
     }
}

export const Adminlogin = async (dispatch, admin) => {
    dispatch(AdminloginStart());
    try {
     
      const res = await axios.post("http://localhost:5000/api/admin/admin-login", admin);
      
      if (res.data.other.isAdmin) {
     
   
        dispatch(AdminloginSucces(res.data));
      } else {
      
        dispatch(AdminloginFailure());
      }
    } catch (error) {
      dispatch(AdminloginFailure());
    }
  };
export const VerifyEmail = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post('http://localhost:5000/api/user/verify/email',user)
        dispatch(loginSucces(res.data))
        
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const signup = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post('http://localhost:5000/api/user/create/user',user)
        dispatch(loginSucces(res.data))
        
    } catch (error) {
        dispatch(loginFailure())
    }
}