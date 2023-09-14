import { ADD_TODO_INPUT, SET_TODO_INPUT } from './constants';

const initState = {
  todos: [],
  todoInput: '',
};

function reducer(state, action) {
  switch (action.type) {
    case SET_TODO_INPUT:
      console.log('set todo ');
      return {
        ...state,
        todoInput: action.payload,
      };
    case ADD_TODO_INPUT:
      console.log('add todo ');
      return {
        todos: [...state.todos, action.payload ],
        todoInput: '',
      };
    default:
        throw new Error('Invalid...')
  }
}

export { initState };
export default reducer;
