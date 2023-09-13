import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import reducer from './reducer';
import { initState } from './reducer';
import { addJob, setJob, deleteJob } from './actions';
import React from 'react';

function TodoApp() {
  const [todo, dispatch] = useReducer(reducer, initState);
  const inputRef = useRef();

  const handleSubmit = () => {
    dispatch(addJob(todo.job));
    dispatch(setJob(''));
    inputRef.current.focus();
  };

  // console.log(todo.job);
  return (
    <div style={{ padding: '0 20px' }}>
      <h3>Todo</h3>
      <input
      ref={inputRef}
        type="text"
        value={todo.job}
        placeholder="Enter todo..."
        onChange={(e) => dispatch(setJob(e.target.value))}
      ></input>
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {todo.jobs.map((item, index) => {
          return (
            <li key={index}>
              {item}

              <span onClick={() => dispatch(deleteJob(index))}> x</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ============================================================================
export default TodoApp;
