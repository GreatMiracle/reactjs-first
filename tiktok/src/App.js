import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import Content1 from './Content';
import React from 'react';
import TodoApp from './Todo';
import ContextApp from './ContextApp';
import themeContextBase from './ContextApp/createContextBase';

// function App() {
//   const [counter, setCounter] = useState(1);

//   const handleIncrease = () => setCounter(counter + 1);
//   return (
//     <div className="App">
//       <h1>{counter}</h1>
//       <button onClick={handleIncrease}> Increase</button>
//       <Test1 />
//     </div>
//   );
// }
// ============================================================================
// ex1:
//  const gifts = ['CPU i9', 'RAM 32GB', 'RGB KeyBoard', 'mouse logi', 'dell'];

// function App() {
//   const noGift = 'Chưa có phần thưởng';
//   const [gift, setGift] = useState(noGift);

//   const receiveGift = () => {
//     const index = Math.floor(Math.random() * gifts.length);
//     console.log(index);
//     const ramdomGift = gifts[index];
//     return setGift(() => ramdomGift);
//   };

//   return (
//     <div style={{ padding: 32 }}>
//       <h1>{gift}</h1>
//       <button onClick={receiveGift}>Lấy thưởng</button>
//     </div>
//   );
// }
// ============================================================================
// function App() {
//   const [name, setName] = useState('');

//   const handleChange = (e) => {
//     setName(e.target.value);
//   };

//   return (
//     <div style={{ padding: 32 }}>
//       <input type="text" value={name} onChange={handleChange}></input>
//       <p>Giá trị nhập vào: {name}</p>
//     </div>
//   );
// }
// ============================================================================
// const radioOut = [
//   {
//     id: 1,
//     name: 'HTML, CSS',
//   },
//   {
//     id: 2,
//     name: 'JS',
//   },
//   {
//     id: 3,
//     name: 'SQL',
//   },
// ];
// function App() {
//   const [checked, setChecked] = useState();
//   console.log(checked);
//   const handleSubmit = () => {
//     console.log({id: checked});
//   };

//   return (
//     <div style={{ padding: 32 }}>
//       {radioOut.map((course) => {
//         return (
//           <div key={course.id}>
//             <input type="radio"
//             checked= {checked === course.id}
//             onChange={() => setChecked(course.id)}
//             />

//             <span>{course.name}</span>
//           </div>
//         );
//       })}
//       <button onClick={handleSubmit}>ClickRadio</button>
//     </div>
//   );
// }

// function App() {
//   const [checked, setChecked] = useState([]);
//   console.log(checked);
//   const handleSubmit = () => {
//     console.log({ id: checked });
//   };

//   const checkTick = (idCourse) => {
//     const isExist = checked.includes(idCourse);
//     if (isExist) {
//       const newChecked = checked.filter((id) => id !== idCourse);
//       setChecked([...newChecked]);
//     } else {
//       setChecked([...checked, idCourse]);
//     }
//   };

//   return (
//     <div style={{ padding: 32 }}>
//       {radioOut.map((course) => {
//         return (
//           <div key={course.id}>
//             <input
//               type="checkbox"
//               checked={checked.includes(course.id)}
//               onChange={() => checkTick(course.id)}
//             />

//             <span>{course.name}</span>
//           </div>
//         );
//       })}
//       <button onClick={handleSubmit}>ClickRadio</button>
//     </div>
//   );
// }
// ============================================================================

// function App() {
//   const [todo, setTodo] = useState('');
//   const [todoSub, setTodoSub] = useState(() => {
//     const localStorage1 = JSON.parse(localStorage.getItem('addLS'));
//     return localStorage1 ?? []
//   });

//   const handleChange = (e) => {
//     const todoEnter = e.target.value;

//     setTodo(todoEnter);
//   };

//   const handleSubmit = () => {
//     if (todoSub.includes(todo)) {
//     } else {
//       const updatedTodoSub = [...todoSub, todo];
//        setTodoSub(updatedTodoSub);
//       localStorage.setItem('addLS', JSON.stringify(updatedTodoSub));
//     }
//     setTodo('');
//   };

//   return (
//     <div style={{ padding: 32 }}>
//       <input
//         type="text"
//         value={todo}
//         onChange={handleChange}
//         placeholder="Enter Todo List"
//       />

//       <button onClick={handleSubmit}>ClickRadio</button>

//       <ul>
//         {todoSub.map((todoName, index) => {
//           return <li key={index}>{todoName}</li>;
//         })}
//       </ul>
//     </div>
//   );
// }
// ============================================================================

// function App() {
//   const [show, setShow] = useState(false);

//   return (
//     <div style={{ padding: 32 }}>
//       <button onClick={() => setShow(!show)}>Toggle</button>
//       {show && <Content1 />}
//     </div>
//   );
// }
// ============================================================================
// function App() {
//   const [show, setShow] = useState(false);

//   return (
//     <div style={{ padding: 32 }}>
//       <button onClick={() => setShow(!show)}>Todo</button>
//       {show && <Content1 />}
//     </div>
//   );
// }
// ============================================================================

// function App() {
//   const [count, setCount] = useState(0);

//   const handleIncrease = useCallback(() => {
//     setCount(count + 1)}, [])
//   ;

//   return (
//     <div style={{ padding: 20 }}>
//       <Content1 onIncrease ={handleIncrease}/>
//       <h1>{count}</h1>

//     </div>
//   );
// }
// ============================================================================

// function App() {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [products, setProducts] = useState([]);

//   const nameRef = useRef();

//   const handleSubmit = () => {
//     setProducts([
//       ...products,
//       {
//         name,
//         price: parseInt(price),
//       },
//     ]);

//     setName('');
//     setPrice('');
//     nameRef.current.focus();
//   };

//   const total = useMemo(() => {
//     const resultsTotal = products.reduce((accumulator, currentValue) => {
//       console.log('caculating...');
//       return accumulator + currentValue.price;
//     }, 0);
//     return resultsTotal;
//   }, [products]);

//   return (
//     <div style={{ padding: '10px 32px' }}>
//       <input
//         ref={nameRef}
//         value={name}
//         placeholder="Enter name..."
//         onChange={(e) => setName(e.target.value)}
//       />
//       <br />
//       <input
//         value={price}
//         placeholder="Enter price..."
//         onChange={(e) => setPrice(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSubmit}>Add</button>
//       <br />
//       <span>Total:</span>
//       <ul>
//         {products.map((product, index) => (
//           <li key={index}>
//             {product.name} -{product.price}
//           </li>
//         ))}
//         {products && <li>-----------------------</li>}
//         {total || <li>{total}</li>}
//       </ul>
//     </div>
//   );
// }

// ============================================================================
// const initState = 0;
// const UP_ACTION = 'up';
// const DOWN_ACTION = 'down';

// const reducer = (state, action) => {
//   switch (action) {
//     case UP_ACTION:
//       return state + 1;
//     case DOWN_ACTION:
//       return state - 1;
//     default:
//       throw new Error('Invalid.....');
//   }
// };

// function App() {
//   const [count, dispatch] = useReducer(reducer, initState);

//   return (
//     <div style={{ padding: '0 20px' }}>
//       <h1>{count}</h1>
//       <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
//       <button onClick={() => dispatch(UP_ACTION)}>Up</button>
//     </div>
//   );
// }

// ============================================================================

// function App() {
//   return <TodoApp />;
// }
// ============================================================================

// console.log(themeContextBase);

// function App() {
//   const [theme, setTheme] = useState('dark');
//   const toggleTheme = () => {
//     setTheme(theme === 'dark' ? 'light' : 'dark');
//   };

//   return (
//     <themeContextBase.Provider value={theme}>
//       <div style={{ padding: 20 }}>
//         <button onClick={toggleTheme}>Toggle Theme</button>
//         <ContextApp />
//       </div>
//     </themeContextBase.Provider>
//   );
// }

// ============================================================================

// import { useStore, setTodoInput, addTodoInput } from './Store';
// function App() {
//   const [state, dispatch] = useStore();

//   const handleSubmit = () => {
//     dispatch(addTodoInput(state.todoInput));
//   };
//   console.log(state.todos);
//   return (
//     <div style={{padding: 30}}>
//       <input
//         value={state.todoInput}
//         placeholder="Nhập vào đây ...."
//         onChange={(e) => {
//           dispatch(setTodoInput(e.target.value));
//         }}
//       />
//       <button onClick={handleSubmit}>Add</button>

//       <br />
//       {state.todos.map((item, index) => (
//         <li key={index}>{item}</li>
//       ))}
//     </div>
//   );
// }

// ============================================================================

import {Video} from './VideoApp';
function App() {
  return (
    <div>
      <Video />
      <br></br>
      <button>Play</button>
      <button>Pause</button>
    </div>
  );
}
export default App;
