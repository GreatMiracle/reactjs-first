import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProtectedRouter({ children }) {

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const currentUserInfo = async () => {
    console.log("currentUserInfo start");
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setUser(response.data)
      } else {
        toast.error(response.message);
        navigate("/auth/login");
      }
    } catch (error) {
      navigate("/auth/login");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      currentUserInfo();
    } else {
      navigate("/auth/login");
    }

  }, [])


  return (
    <div>
      {user.name}

      {children}</div>
  )
}

export default ProtectedRouter