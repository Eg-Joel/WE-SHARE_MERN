import { createSlice } from '@reduxjs/toolkit'

export const adminReducer = createSlice({
    name:"Admin" ,
    initialState:{
        admin: null,

        isadminFetching:false,
        error:false,
        isAdmin:false 
    },
    reducers:{
        AdminloginStart:(state)=>{
            state.isadminFetching= true
        },
        AdminloginSucces:(state , action)=>{
            state.isadminFetching=false
            state.admin = action.payload;
        },
        AdminloginFailure:(state)=>{
            state.isadminFetching = false
            state.error = true
        },
        Adminlogout:(state)=>{
            state.admin = null;
        }
    }
})

export const {AdminloginStart,AdminloginSucces,AdminloginFailure,Adminlogout} = adminReducer.actions;
export default adminReducer.reducer;