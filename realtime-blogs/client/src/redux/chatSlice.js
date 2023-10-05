import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({

    name: 'chat',
    initialState: {
        allChats: [],
        selectChat: null
    },
    reducers: {

        SetAllChats: (state, action) => {
            state.allChats = action.payload;
        },
        SetSelectChat: (state, action) => {
            state.selectChat = action.payload;
        }
    }

})

export const { SetAllChats, SetSelectChat } = chatSlice.actions;
export default chatSlice.reducer