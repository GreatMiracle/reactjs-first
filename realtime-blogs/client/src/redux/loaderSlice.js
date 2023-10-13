import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({

    name: "loader",
    initialState: {
        loader: false,
        backGroundColorMsg: true
    },

    reducers: {
        ShowLoader: (state) => {
            state.loader = true;
        },

        HideLoader: (state) => {
            state.loader = false;
        },

        LightBgLoader: (state) => {
            state.backGroundColorMsg = true;
        },


        DarkBgLoader: (state) => {
            state.backGroundColorMsg = false;
        }
    }

});

export const { ShowLoader, HideLoader, LightBgLoader, DarkBgLoader } = loaderSlice.actions;
export default loaderSlice;