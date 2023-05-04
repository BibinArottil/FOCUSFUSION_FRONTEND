import {configureStore,combineReducers} from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import {photographerSlice} from "./features/photographer"
import {userSlice} from "./features/user"

const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    photographer:photographerSlice.reducer,
    user:userSlice.reducer
})

const persistReduhcer = persistReducer(persistConfig,reducer)

export default configureStore({
    reducer:persistReduhcer
})
