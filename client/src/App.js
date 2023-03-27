
import './App.css';
import Home from './pages/Home/Home';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import { useSelector } from 'react-redux';
import Profile from './pages/profile/Profile';
import AdminLogin from './pages/Admin/AdminLogin'
import Forgotpassword from './pages/ForgotPassword/ForgotPassword';
import Resetpassword from './pages/ResetPassword/ResetPassword';
import Verifyemail from './pages/VerfiyEmail/VerifyEmail';
import AdminDashborad from './pages/Admin/AdminDashborad/AdminDashborad'
import Chat from './pages/Chat/Chat';
import UserMangement from './pages/Admin/AdminDashborad/UserMangement';
import PostManagement from './pages/Admin/AdminDashborad/PostManagement';
import Report from './pages/Admin/AdminDashborad/Report';


function App() {
  const userDetails =useSelector((state)=>state.user)
  const adminDetails = useSelector((state) => state.admin);
 
  let user = userDetails?.user
  
  let admin=adminDetails?.admin

    
  // // let admin=adminDetails?.data
  // console.log(user?.other,"user apps");
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={ user?.other?.verfied === true ?  <Home /> : <Navigate to={"/login"} replace={true}/> }></Route>
      <Route path="/login" element={ user?.other?.verfied === true ? <Navigate to={"/"} replace={true}/> : <Login />}></Route>
      <Route path="/signup" element={  <Signup />}></Route>
      <Route path="/Profile/:id" element={user?.other?.verfied === true ? <Profile/> : <Navigate to={"/login"} replace={true}/>}></Route>
      <Route path="/verify/email" element={user?.Status === "pending" ? <Verifyemail/> :user?.other?.verfied === true ? <Navigate to={"/"} replace={true}/> : <Login/> }></Route>
      <Route path="/forgot/password" element={<Forgotpassword/>}></Route>
      <Route path="/reset/password" element={<Resetpassword/>}></Route>
      <Route path="chat" element={user? <Chat/> : <Navigate to={"/"} replace={true}/>}> </Route>

      <Route exact path="/admin" element={  admin ? <AdminDashborad /> :  <AdminLogin /> }></Route>
      <Route path="/users" element={  admin ? <UserMangement /> :  <AdminLogin /> }></Route>
      <Route path="/posts" element={  admin ? <PostManagement /> :  <AdminLogin /> }></Route>
      <Route path="/reports" element={  admin ? <Report /> :  <AdminLogin /> }></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
