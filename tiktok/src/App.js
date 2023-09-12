import { useState } from 'react';
import Content1 from './Content';
import React from 'react';

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
function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => setShow(!show)}>Todo</button>
      {show && <Content1 />}
    </div>
  );
}

export default App;
