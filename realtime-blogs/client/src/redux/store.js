import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";


const store = configureStore({
    reducer: {
        loader: loaderReducer.reducer,
        userReducer,
        chatReducer
    }
})

export default store;