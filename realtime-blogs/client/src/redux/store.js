import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./loaderSlice";


const store = configureStore({
    reducer: {
        loader: loaderReducer.reducer,
    }
})

export default store;