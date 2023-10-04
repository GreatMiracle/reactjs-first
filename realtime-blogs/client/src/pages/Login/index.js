import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAPICall, storeToken } from '../../services/authService';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';


function Login() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/')
    }
  }, [])

  const handleBtnLogin = async () => {
    try {
      dispatch(ShowLoader());
      const response = await loginAPICall(user.email, user.password);
      dispatch(HideLoader());
      const { message, success, token } = response.data;
      if (success) {
        storeToken(token);
        toast.success(message);
        navigate('/')
      } else {
        toast.success(message);
      }
    } catch (error) {
      dispatch(HideLoader());
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="bg-white p-5 w-[400px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            {' '}
            Login - BlogsChat
          </h1>
          <input
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button className="primary-contained-btn" onClick={handleBtnLogin}>
            Đăng kí
          </button>
          <Link
            to="/auth/register"
            className="text-center text-primary underline text-xs/[5px]"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Login;
