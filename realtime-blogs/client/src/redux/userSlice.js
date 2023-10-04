import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({

    name: 'user',
    initialState: {
        user: [],
        allUsers: []
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        },

        SetAllUser: (state, action) => {
            state.allUsers = action.payload;
        }
    }

})

export const { SetUser, SetAllUser } = userSlice.actions;
export default userSlice.reducer