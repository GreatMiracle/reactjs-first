import filterReducer from '../components/Filters/filterSlice';
import todoReducer from '../components/TodoList/todoSlice';
import { combineReducers } from 'redux';

// const rootReducer = (state = {}, action) => {
//   return {
//     filters: filterReducer(state.filters, action),
//     todoList: todoReducer(state.todoList, action),
//   };
// };

const rootReducer = combineReducers({
  filters: filterReducer,
  todoList: todoReducer,
});

export default rootReducer;
