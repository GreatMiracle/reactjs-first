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

  const [isResponseReceived, setIsResponseReceived] = useState(false);
  // Thêm biến cờ fix Lỗi màn hình home xuất hiện 
  // trong một khoảng thời gian ngắn trước khi chuyển đến trang login

  useEffect(() => {
    if (localStorage.getItem("token")) {
      currentUserInfo();
    } else {
      navigate("/auth/login");
    }
  }, [])

  const currentUserInfo = async () => {
    try {
      dispatch(loaderSlice.actions.ShowLoader());
      const response = await getCurrentUser();
      dispatch(loaderSlice.actions.HideLoader());

      if (response.success) {
        dispatch(loaderSlice.actions.ShowLoader());
        const responseAllUsers = await getAllUser();
        const responseAllChats = await getAllChats();
        dispatch(loaderSlice.actions.HideLoader());

        // console.log("curent User", response.data);
        dispatch(SetUser(response.data));
        dispatch(SetAllUser(responseAllUsers.data))
        dispatch(SetAllChats(responseAllChats.data))

        setIsResponseReceived(true);

      } else {
        setIsResponseReceived(false);
        dispatch(loaderSlice.actions.HideLoader());
        navigate("/auth/login");
      }
    } catch (error) {
      setIsResponseReceived(false);
      dispatch(loaderSlice.actions.HideLoader());
      navigate("/auth/login");
    }
  }

  if (!isResponseReceived) {
    return null;
  }

  return (
    <div className="bg-gray-100 p-2 min-h-screen">
      <div className='flex justify-between p-2 bg-primary rounded'>
        <div className='flex items-center gap-1'>
          <i className="ri-message-3-line text-3xl text-white"></i>
          <h1 className='text-white text-3xl font-bold'
            onClick={() => navigate("/")}>ChatBOT</h1>
        </div>
        <div className='flex gap-1 text-2xl items-center'>
          {user?.profilePic &&
            <img src={user?.profilePic}
              alt='profile'
              className='h-8 w-8 rounded-full object-cover' />
          }
          {!user?.profilePic && <i className="ri-shield-user-line text-2xl text-white"></i>}
          {/* <i className="ri-shield-user-line text-2xl text-white"></i> */}
          <h1 className="underline text-white"
            onClick={() => navigate("/profile")}
          >{user?.name}</h1>
          <div className='group relative'>
            <i className="ri-logout-circle-r-line text-2xl pl-5 cursor-pointer text-white"
              onClick={() => {
                logout();
                navigate("/auth/login")

              }}
            >
            </i>
          </div>

        </div>
      </div>

      <div className='p-2'>
        {children}
      </div>

    </div>
  )
}

export default ProtectedRouter