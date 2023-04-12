import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name:"User" ,
    initialState:{
        user:null,

        isFetching:false,
        error:null,
        
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching= true
        },
        loginSucces:(state , action)=>{
            state.isFetching=false
            state.user = action.payload
            
        },
        loginFailure:(state,action)=>{
            state.isFetching = false
            state.error = action.payload
        },
        logout:(state)=>{
            state.user = null
             
        },
        updateProfile: (state, action) => {
            state.user = { ...state.user, other: { ...state.user.other, profile: action.payload } };
           
        },
        updateProfiles: (state, action) => {
            state.user = {
              ...state.user,
              username: action.payload.username,
              other: { ...state.user.other, bio: action.payload.bio }
            };
        } ,
        setUserss: (state, action) => {
            state.user = {...state.user,other:{ ...state.user.other, ...action.payload } };
          }
    }
})

export const {loginStart,loginSucces,loginFailure,logout,updateProfile,updateProfiles,setUserss} = userReducer.actions;
export default userReducer.reducer;