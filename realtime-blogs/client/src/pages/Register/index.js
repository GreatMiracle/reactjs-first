import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPICall } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { HideLoader, ShowLoader } from '../../redux/loaderSlice';

function Register() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate('/')
    }
  }, []);

  const handleBtnRegister = async () => {
    try {
      dispatch(ShowLoader());
      const response = await registerAPICall(user);
      dispatch(HideLoader());
      const { message, success } = response.data;
      if (success) {
        console.log(response);
        alert(message);
        navigate('/auth/login')
      } else {
        console.log(response);
        alert(message);
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        HideLoader()
      );
    }
  };

  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="bg-white p-5 w-[400px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">
            {' '}
            Register - BlogsChat
          </h1>
          <input
            type="text"
            placeholder="Enter your name..."
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />

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

          <button className="primary-contained-btn" onClick={handleBtnRegister}>
            Đăng kí
          </button>
          <Link
            to="/auth/login"
            className="text-center text-primary underline text-xs/[5px]"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
