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
  const { selectChat } = useSelector((state) => state.chatReducer);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { backGroundColorMsg } = useSelector(state => state.loader);

  useEffect(() => {
    socket.emit("join-room", user._id);
    socket.emit("came-online", user._id);

    socket.on("online-users", (users) => {
      setOnlineUsers(users)
    })
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
          onlineUsers={onlineUsers}
        />
      </div>

      {
        selectChat ? (<div className='w-full '>
          <ChatArea
            socket={socket}
          />
        </div>
        ) : (
          <div className='w-full'>
            <div className={`${backGroundColorMsg ? "bg-white" : "bg-gray-700"} border rounded-2xl h-[90vh] items-center flex justify-center flex-col`}>
              {/* <div className='bg-gray-800 border rounded-2xl h-[90vh] items-center flex justify-center flex-col'> */}
              <img
                // src='/image/Speech-Chat-Icon-Transparent-PNG.png'
                src='/image/Chat-Icon-PNG-Pic.png'
                alt=''
                className='w-80 h-80'
              />
              {/* <h1 className='text-3xl font-semibold text-gray-500'>
                Select a user to chat
              </h1> */}
              <h1 className='text-4xl font-semibold text-gray-500'>Welcome</h1>
              <p className='text-2xl  font-semibold text-gray-500'>Ready? Set. Chat! Let's jump right into things.</p>
            </div>
          </div>
        )
      }


    </div>
  )
}

export default Home