import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        userDetails:""
    },
    reducers:{
        userSetDetails:(state,action) =>{
            state.userDetails=action.payload
        },
        userRemoveDetails(){
            return{}
        },
        userNameUpdate:(state,action)=>{
            state.userDetails.name=action.payload
        }
    }
})

export const {userSetDetails, userRemoveDetails,userNameUpdate} = userSlice.actions