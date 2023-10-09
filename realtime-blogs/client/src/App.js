import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast'
import ProtectedRouter from './components/protectedRouter';
import { useSelector } from 'react-redux';
import Loader from './components/loader';
import 'remixicon/fonts/remixicon.css'

function App() {

  const { loader } = useSelector(state => state.loader)
  // console.log(loader);

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {loader && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRouter >
              <Home />
            </ProtectedRouter>

          }></Route>
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
