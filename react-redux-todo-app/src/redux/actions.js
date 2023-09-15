export const addTodoAction = (data) => {
  return {
    type: 'todoList/addTodo',
    payload: data,
  };
};
