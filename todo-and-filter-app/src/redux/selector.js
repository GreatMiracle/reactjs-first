import { createSelector } from 'reselect';

// export const todoListInitSelector = (state) => {
//   const containOfSearch = searchTextSelector(state);
//   const todosRemaining = state.todoList.filter((todo) =>
//     todo.name.includes(containOfSearch)
//   );

//   return todosRemaining;
// };
// export const searchTextSelector = (state) => state.filters.search;

export const todoListInitSelector = (state) => state.todoList;

export const searchTextSelector = (state) => state.filters.search;
export const searchStatusSelector = (state) => state.filters.status;
export const searchPrioritySelector = (state) => state.filters.priority;

export const todosRemainingSelector = createSelector(
  todoListInitSelector,
  searchTextSelector,
  searchStatusSelector,
  searchPrioritySelector,
  (todoList, searchText, searchStatus, searchPriority) => {
    return todoList.filter((todo) => {
      if (searchStatus !== 'All') {
        const statusBooleanChange = searchStatus === 'Completed' ? true : false;
        return (
          todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
          todo.completed === statusBooleanChange && 
          (searchPriority.length > 0
            ? searchPriority.includes(todo.priority)
            : true)
        );
      }

      return (
        todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (searchPriority.length > 0
          ? searchPriority.includes(todo.priority)
          : true)
      );
    });
  }
);
