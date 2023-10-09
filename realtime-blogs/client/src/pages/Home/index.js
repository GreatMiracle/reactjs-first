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

    // socket.emit("send-msg", {
    //   text: "alo Quan, 123 alo alo",
    //   sender: user._id,
    //   receipent: "651fb46fd2a3e3a697ec755a"
    // })

    // // // Lắng nghe tin nhắn từ máy chủ
    // socket.on('received-msg', (data) => {
    //   console.log('message from server:', data);
    // });
  }, [user])


  return (
    <div className='flex gap-5 '>

      <div className='w-96 '>
        <UserSearch
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />

        <UserList
          searchKey={searchKey}
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