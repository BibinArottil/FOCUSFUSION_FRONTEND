import {createSlice} from "@reduxjs/toolkit"

export const alertSlice = createSlice({
    name:"alerts",
    initialState:{
        loadings:false
    },
    reducers:{
        showLoading:(state) =>{
            state.loadings = true
        },
        hideLoading:(state) =>{
            state.loadings = false
        }
    }
})

export const {showLoading,hideLoading} = alertSlice.actions