// import {composeWithDevTools} from 'redux-devtools-extension'
// import {createStore} from 'redux'

// import rootReducer from './reducer';

// const composeEnhncers = composeWithDevTools()

// const store = createStore(rootReducer, composeEnhncers);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../components/Filters/filterSlice';
import todoReducer from '../components/TodoList/todoSlice';

const store = configureStore({
  reducer: {
    filters: filterReducer.reducer,
    todoList: todoReducer.reducer,
  },
});

export default store;
