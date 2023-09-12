import React from 'react'; // nạp thư viện react
// import ReactDOM from 'react-dom'; // nạp thư viện react-dom17
import ReactDOM from 'react-dom/client'; // nạp thư viện react-dom18

function App() {
  return (
    <div>
      <h1>Xin chào</h1>
    </div>
  );
}

//React@17
// ReactDOM.render(<App />, document.getElementById('root'));

// const root = createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
