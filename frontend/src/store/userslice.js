import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        setuserdetails:(state,action)=>{
            state.user=action.payload;
        }
    }
});

export const {setuserdetails}=userslice.actions;

export default userslice.reducer;
