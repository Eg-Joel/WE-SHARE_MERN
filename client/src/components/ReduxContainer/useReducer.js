import { createSlice } from '@reduxjs/toolkit'

export const userReducer = createSlice({
    name:"User" ,
    initialState:{
        user:null,

        isFetching:false,
        error:false,
        
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching= true
        },
        loginSucces:(state , action)=>{
            state.isFetching=false
            state.user = action.payload
            
        },
        loginFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        logout:(state)=>{
            state.user = null
             
        },
        updateProfile: (state, action) => {
            state.user = action.payload;
          },
    }
})

export const {loginStart,loginSucces,loginFailure,logout,updateProfile} = userReducer.actions;
export default userReducer.reducer;