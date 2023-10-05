import React, { useState } from 'react'
import UserSearch from './components/userSearch'
import ChatArea from './components/chatArea'
import UserList from './components/userList';

function Home() {
  const [searchKey, setSearchKey] = useState("");
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


      <div>
        <ChatArea />
      </div>

    </div>
  )
}

export default Home