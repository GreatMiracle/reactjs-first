import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleBtnLogin = () => {
    console.log('btn register !!!', user);
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
            to="/register"
            className="text-center text-primary underline text-xs/[5px]"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}


export default Login;
