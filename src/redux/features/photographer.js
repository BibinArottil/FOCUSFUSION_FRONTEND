import {createSlice} from "@reduxjs/toolkit"

export const photographerSlice = createSlice({
    name:"photographer",
    initialState:{
        photographerDetails:""
    },
    reducers:{
        setDetails:(state,action) =>{
            state.photographerDetails= action.payload
        },
        removeDetails(){
            return{}
        }
    }
})

export const {setDetails,removeDetails} = photographerSlice.actions