import { useEffect, useLayoutEffect, useRef, useState, memo } from 'react';
import React from 'react';

// const tab = ['posts', 'todos', 'albums'];

// function Content(mapping) {
//   const [todo, setTodo] = useState([]);
//   const [title, setTitle] = useState('');
//   const [type, setType] = useState(tab[0]);

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/${type}`)
//       .then((res) => res.json())
//       .then((item) => setTodo(item));
//     console.log(type);
//   }, [type]);

//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       if (window.scrollY > 60 && window.scrollY < 800) {
//         document.body.style.backgroundColor = 'black';
//         document.body.style.color = 'white';
//       } else if (window.scrollY > 800) {
//         document.body.style.backgroundColor = 'red';
//         document.body.style.color = 'green';
//       } else {
//         document.body.style.backgroundColor = 'white';
//         document.body.style.color = 'black';
//       }
//     });
//   });

//   //   return <h1>hello ae từ content</h1>;
//   return (
//     <div>
//       <div>
//         {tab.map((tab) => (
//           <button
//             key={tab}
//             style={
//               type === tab
//                 ? {
//                     color: '#fff',
//                     backgroundColor: '#333',
//                   }
//                 : {}
//             }
//             onClick={() => setType(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       ></input>

//       <ul>
//         {todo.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// ========================================
// hiển thị độ rộng của browser
// function Content() {
//   const [withChrom, setWithChrom] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = ()=> {
//       setWithChrom(window.innerWidth)
//     }

//     window.addEventListener('resize', handleResize )

//   }, [])

//   return (
//     <div>
//       <h1>{withChrom}</h1>
//     </div>
//   );
// }

// ========================================
// function Content() {
//   const [countDown, setCountDown] = useState(180);

//   // useEffect(() => {
//   //   setTimeout(() => setCountDown(countDown - 1), 1000)
//   // })

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setCountDown((prevState) => prevState - 1);
//       console.log("countDown");
//     }, 1000);

//     return ()=>clearInterval(timerId);
//   }, []);

//   return (
//     <div>
//       <h1>{countDown}</h1>
//     </div>
//   );
// }

// ========================================

// function Content() {
//   const [count, setCount] = useState(1);

//   // useEffect(() => {
//   //   setTimeout(() => setCountDown(countDown - 1), 1000)
//   // })

//   useEffect(() => {
//     console.log(count);

//     return () => console.log("clean");;
//   }, [count]);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Click me!</button>
//     </div>
//   );
// }

// ========================================

// function Content() {
//   const [avatar, setAvatar] = useState();

//   // useEffect(() => {
//   //   return () => avatar && URL.revokeObjectURL(avatar.preview);
//   // }, [avatar]);

//   const handlePreviewAvatar = (e) => {
//     const file = e.target.files[0];
//     file.preview = URL.createObjectURL(file);
//     console.dir(file);
//     setAvatar(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handlePreviewAvatar} />
//       {avatar && <img src={avatar.preview} alt="" width="80px"></img>}
//     </div>
//   );
// }

// ========================================

// const lessions = [
//   {
//     id: 1,
//     name: 'Bài 1',
//   },
//   {
//     id: 2,
//     name: 'Bài 2',
//   },
//   {
//     id: 3,
//     name: 'Bài 3',
//   },
// ];

// function Content() {
//   const [lessionId, setLessionId] = useState(1);
//   const [first, setfirst] = useState("second")

//   useEffect(() => {
//     const cusEvent = (e) => {
//       console.log(e.detail);
//     };

//     window.addEventListener(`ipv-${lessionId}`, cusEvent);

//     return() => window.removeEventListener(`ipv-${lessionId}`, cusEvent);
//   }, [lessionId]);

//   return (
//     <div>
//       <ul>
//         {lessions.map((l) => (
//           <li
//             key={l.id}
//             style={{
//               color: lessionId === l.id ? 'red' : '#333',
//             }}
//             onClick={() => setLessionId(l.id)}
//           >
//             {l.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// ========================================

// function Content() {
//   const [count, setCount] = useState(1);

//   useLayoutEffect(() => {
//     if (count > 3) {
//       setCount(0);
//     }
//     console.log(count);

//     return () => console.log('clean');
//   }, [count]);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Click me!</button>
//     </div>
//   );
// }

// ========================================

// function Content() {
//   const [count, setCount] = useState(60);

//   const timerId = useRef(60);

//   const handleStart = () => {
//     timerId.current = setInterval(() => setCount(prev => prev- 1), 1000);

//     console.log('start:' +timerId.current);

//   };

//   const handleStop = () => {
//     clearInterval(timerId);
//     setCount(60)
//     console.log('stop:' +timerId.current);

//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>{count}</h1>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// }

// ========================================

function Content({ onIncrease }) {
  console.log('memo');
  return (
    <>
      <h2>ABC</h2>
      <button onClick={onIncrease}>Click me!</button>
    </>
  );
}

export default memo(Content);

// useLayoutEffect gần giống useEffect chỉ khác là nó render lên giao diện cuối cùng
//useRef: lưu giá trị qua một tham chiếu bên ngoài
