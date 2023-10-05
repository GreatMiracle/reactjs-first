import React, { useEffect, useState } from 'react'
import { getAllUser, getCurrentUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import loaderSlice from '../redux/loaderSlice';
import { useSelector } from 'react-redux';
import { SetAllUser, SetUser } from '../redux/userSlice';
import { logout } from '../services/authService';
import { getAllChats } from '../services/chatService';
import { SetAllChats } from '../redux/chatSlice';

function ProtectedRouter({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  // const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const currentUserInfo = async () => {
    try {
      dispatch(loaderSlice.actions.ShowLoader());
      const response = await getCurrentUser();
      const responseAllUsers = await getAllUser();
      const responseAllChats = await getAllChats();
      console.log("responseAllChats", responseAllChats);
      dispatch(loaderSlice.actions.HideLoader());

      if (response.success) {
        console.log("curent User", response.data);
        dispatch(SetUser(response.data));
        dispatch(SetAllUser(responseAllUsers.data))

        dispatch(SetAllChats(responseAllChats.data))

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
      currentUserInfo();
    } else {
      navigate("/auth/login");
    }
  }, [])

  return (
    <div className="bg-gray-100 p-2 min-h-screen">
      <div className='flex justify-between p-2'>
        <div className='flex items-center gap-1'>
          <i className="ri-message-3-line text-3xl"></i>
          <h1 className='text-primary text-3xl font-bold'>ChatBOT</h1>
        </div>
        <div className='flex gap-1 text-2xl items-center'>
          <i className="ri-shield-user-line text-2xl"></i>
          <h1 className="underline">{user?.name}</h1>
          <div className='group relative'>
            <i className="ri-logout-circle-r-line text-2xl pl-5 cursor-pointer"
              onClick={() => {
                logout();
                navigate("/auth/login")

              }}
            >
            </i>
          </div>

        </div>
      </div>

      <div className='p-5'>
        {children}
      </div>

    </div>
  )
}

export default ProtectedRouter