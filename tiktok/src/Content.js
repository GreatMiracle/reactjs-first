import { useEffect, useState } from 'react';

const tab = ['posts', 'todos', 'albums'];

function Content(mapping) {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(tab[0]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((item) => setTodo(item));
    console.log(type);
  }, [type]);

  useEffect(() => {
    window.addEventListener('scroll', () => {

      if (window.scrollY > 60 && window.scrollY < 800) {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
      } else if (window.scrollY > 800) {
        document.body.style.backgroundColor = 'red';
        document.body.style.color = 'green';
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
      }
    });
  });

  //   return <h1>hello ae từ content</h1>;
  return (
    <div>
      <div>
        {tab.map((tab) => (
          <button
            key={tab}
            style={
              type === tab
                ? {
                    color: '#fff',
                    backgroundColor: '#333',
                  }
                : {}
            }
            onClick={() => setType(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>

      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
