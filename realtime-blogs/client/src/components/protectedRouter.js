import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import loaderSlice from '../redux/loaderSlice';

function ProtectedRouter({ children }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const currentUserInfo = async () => {
    console.log("currentUserInfo start");
    try {
      dispatch(loaderSlice.actions.ShowLoader());
      const response = await getCurrentUser();
      dispatch(loaderSlice.actions.HideLoader());
      if (response.success) {
        setUser(response.data)
      } else {
        toast.error(response.message);
        navigate("/auth/login");
      }
    } catch (error) {
      dispatch(loaderSlice.actions.HideLoader());
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