import { ADD_TODO_ACTION } from './constants';

export const initState = {
  filter: {
    search: '',
    status: 'all',
    priority: [],
  },
  todoList: [
    {
      id: 1,
      name: 'React JS',
      completed: true,
      priority: 'Hight',
    },
    {
      id: 2,
      name: 'Vue JS 3',
      completed: false,
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'Angular',
      completed: false,
      priority: 'Low',
    },
  ],
};

const rootReducer = (state = initState, action) => {
  /*   type: todoList/addTodoInput,
    payload:  {
        id: 5,
        name: 'JavaScript',
        completed: false,
        priority: 'Hight',
      }, */
  console.log(state, action);

  switch (action.type) {
    case ADD_TODO_ACTION:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    default:
    // throw new Error('Invalid...')
  }
};

export default rootReducer;
