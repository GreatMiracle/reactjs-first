import React, { useEffect, useState } from 'react'
import UserSearch from './components/userSearch'
import ChatArea from './components/chatArea'
import UserList from './components/userList';
import { io } from "socket.io-client"
import { AUTH_REST_API_BASE_URL } from '../../common/utilsCommon';
import { useSelector } from 'react-redux';

const socket = io(AUTH_REST_API_BASE_URL);


function Home() {

  const [searchKey, setSearchKey] = useState("");
  const { user } = useSelector((state) => state.userReducer);
  useEffect(() => {
    socket.emit("join-room", user._id);
  }, [user])

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     // Tạo một hàm để thực hiện việc làm mới trang
  //     window.location.reload();
  //   }, 5000); // 5000 milliseconds = 5 giây

  //   // Cleanup function để ngăn việc setTimeout được gọi nếu component bị hủy trước khi nó hoàn thành
  //   return () => clearTimeout(timeoutId);
  // }, []);

  return (
    <div className='flex gap-5 '>

      <div className='w-96 '>
        <UserSearch
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />

        <UserList
          searchKey={searchKey}
          socket={socket}
        />
      </div>


      <div className='w-full'>
        <ChatArea
          socket={socket}
        />
      </div>

    </div>
  )
}

export default Home