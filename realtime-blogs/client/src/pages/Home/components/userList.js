import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewChat, createNewChatApi } from '../../../services/chatService';
import { SetAllChats, SetSelectChat } from '../../../redux/chatSlice';
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';


// const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'amber', 'lime', 'sky'];
// function getRandomColor() {
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   const randomNumber = Math.floor(Math.random() * 8) + 1; // Số ngẫu nhiên từ 1 đến 8
//   const roundedNumber = randomNumber * 100; // Số cuối cùng tròn trăm
//   console.log(`bg-${randomColor}-${roundedNumber}`);
//   return `bg-${randomColor}-${roundedNumber}`;
// }

const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-lime-500'
  , 'bg-amber-500', 'bg-sky-500', 'bg-orange-500', 'bg-violet-500', 'bg-gray-500', 'bg-teal-500'];
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}


function UserList({ searchKey }) {
  const dispatch = useDispatch();
  const { allUsers, user } = useSelector(state => state.userReducer);
  const { allChats } = useSelector(state => state.chatReducer);
  console.log(allChats);
  const createNewChat = async (receipentUserId) => {
    console.log("button");
    dispatch(ShowLoader());
    const response = await createNewChatApi([user._id, receipentUserId]);
    dispatch(HideLoader());
    if (response.success) {
      const newChat = response.data;
      console.log("newChat", newChat);
      const updateChats = [...allChats, newChat];
      dispatch(SetAllChats(updateChats));
      dispatch(SetSelectChat(newChat));
    }
  }

  const openChat = async (receipentUserId) => {
    console.log(allChats);

    const chat = allChats.find(
      (chat) => {
        return (
          chat.members.includes(user._id)
          && chat.members.includes(receipentUserId)
        )

      }
    );
    console.log("chat----------------------", chat);
    if (chat) {
      dispatch(SetSelectChat(chat))
    } else {
      createNewChat(receipentUserId);
    }
  }

  return (
    <div className='flex flex-col gap-3 mt-5'>
      {allUsers
        .filter((u) => {
          return u.name.toLowerCase().includes(searchKey.toLowerCase())
        })
        .map((item) => {

          return (
            <div
              key={item._id}
              className='shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center'
              onClick={() => openChat(item._id)}
            >
              <div className='flex gap-5 items-center'>
                {item.profilePic && (
                  <img src={item.profilePic}
                    alt='profile Pic'
                    className='w-10 h-10 rounded-full'
                  />
                )}
                {!item.profilePic && (
                  <div
                    className={`${getRandomColor()} text-white rounded-full w-10 h-10 flex items-center justify-center mx-1`} >
                    <h1 className='uppercase text-4xl font-semibold'>{item.name[0]} </h1>
                  </div>
                )}


                <h1>{item.name}</h1>
              </div>
              <div>
                {!allChats.find((chat) => chat.members.includes(item._id)) && (
                  <button className='border-gray-300 bg-white px-3 py-1 rounded-md text-gray-400'
                    onClick={(e) => {
                      e.stopPropagation();
                      createNewChat(item._id);
                    }}
                  >
                    Start a conversation
                  </button>
                )}

              </div>

            </div>)
        })}

    </div >
  )
}

export default UserList