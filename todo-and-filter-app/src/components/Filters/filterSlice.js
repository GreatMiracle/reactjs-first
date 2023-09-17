/* import {
  ACTION_PRIORITY,
  ACTION_SEARCH,
  ACTION_STATUS,
} from '../../redux/constants';

const initState = {
  search: '',
  status: 'All',
  priority: [],
};

const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ACTION_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case ACTION_PRIORITY:
      return {
        ...state,
        priority:  action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer; */

import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    search: '',
    status: 'All',
    priority: [],
  },
  reducers: {
    searchTodo: (state, action) => {
      state.search = action.payload;
    },
    statusTodo: (state, action) => {
      state.status = action.payload;
    },
    priorityTodo: (state, action) => {
      state.priority = action.payload;
    },
  },
});

export default filterSlice;
