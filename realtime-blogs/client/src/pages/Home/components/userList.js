import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewChatApi, getDetailChatApi } from '../../../services/chatService';
import { SetAllChats, SetSelectChat } from '../../../redux/chatSlice';
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';
import TruncateText from '../../../common/truncateText';
import moment from 'moment';


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
  const { allChats, selectChat } = useSelector(state => state.chatReducer);

  const getUserData = () => {
    return allUsers
      .filter((u) => {
        return (
          u.name.toLowerCase().includes(searchKey.toLowerCase())
          // && searchKey
        )
          || allChats.some((chat) => chat.members.map((mem) => mem._id).includes(u._id))
      })
  }

  const checkExistChat = (idCurrentUser) => {
    const isExistChat = !allChats.map((chat) => chat.members.map((m) => (m._id)))
      .find((memC) => memC.includes(idCurrentUser));
    return isExistChat;
  }

  const createNewChat = async (receipentUserId) => {
    dispatch(ShowLoader());
    const response = await createNewChatApi([user._id, receipentUserId]);
    dispatch(HideLoader());
    if (response.success) {
      const newChatId = response.data._id;

      const newChat = await getDetailChatApi(newChatId);
      const updateChats = [...allChats, newChat.data];
      dispatch(SetAllChats(updateChats));
      dispatch(SetSelectChat(newChat.data));
    }
  }

  const openChat = async (receipentUserId) => {
    // console.log("receipentUserId", receipentUserId);
    // console.log("allChats", allChats);
    const chat = allChats.map((chat) => chat.members.map((m) => (m._id)))
      .find((memC) => {
        return (
          memC.includes(user._id) && memC.includes(receipentUserId)
        )
      });

    const chat1 = allChats.find((chat) => {
      return chat.members.map((m) => (m._id)).includes(receipentUserId)
    });

    console.log("chat1", chat1);
    console.log("chat", chat);
    if (chat1) {
      dispatch(SetSelectChat(chat1))
    } else {
      createNewChat(receipentUserId);
    }
  }

  const getSelectChatOrNot = (receipentUserId) => {
    if (selectChat) {
      return selectChat.members.map((m) => m._id).includes(receipentUserId);
    }
    return false;
  }

  const getLastMessage = (receipentUserId) => {

    const chaterWithCurrenUser = hasChatWithReceipent(receipentUserId);
    if (!chaterWithCurrenUser) {
      return "";
    } else {
      // console.log("chaterWithCurrenUser.lastMessage", chaterWithCurrenUser);
      if (chaterWithCurrenUser.lastMessage) {

        const personSendLastMsg = chaterWithCurrenUser.lastMessage.sender === user._id ? "You: " : "";
        // console.log("chaterWithCurrenUser.lastMessage.text", chaterWithCurrenUser.lastMessage.text);

        const text = chaterWithCurrenUser.lastMessage.text;
        const lastMsgShow = TruncateText({ text });
        // return `${personSendLastMsg} ${lastMsgShow} `;
        return (
          <div className='flex justify-between w-72'>
            <h1 className='text-gray-500 text-sm'>
              {`${personSendLastMsg} ${lastMsgShow}`}
            </h1>
            <h1 className='text-gray-500 text-sm mr-2' >
              {moment(chaterWithCurrenUser.createdAt).format("hh:mm A")}
            </h1>
          </div>

        );
      } else {
        return "";
      }

    }
  }

  const getUnreadMessage = (receipentUserId) => {
    const chaterWithCurrenUser = hasChatWithReceipent(receipentUserId);
    console.log("chaterWithCurrenUser", chaterWithCurrenUser);
    if (chaterWithCurrenUser && chaterWithCurrenUser.unreadMessages) {
      return (
        <div className='bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
          {chaterWithCurrenUser.unreadMessages}

        </div>
      )
    }

  }

  console.log("getUserData", getUserData());
  console.log("allChats", allChats);
  return (
    <div className='flex flex-col gap-3 mt-5 w-96'>
      {getUserData()
        .map((userItem) => {

          return (
            <div
              key={userItem._id}
              className={`shadow-sm border p-3 rounded-2xl bg-white flex justify-between items-center  cursor-pointer w-full 
              ${getSelectChatOrNot(userItem._id) && 'border-primary border-2'}
              `}
              onClick={() => openChat(userItem._id)}
            >
              <div className='flex gap-3 items-center w-full'>
                {userItem.profilePic && (
                  <img src={userItem.profilePic}
                    alt='profile Pic'
                    className='w-10 h-10 rounded-full'
                  />
                )}
                {!userItem.profilePic && (
                  <div
                    className={`${getRandomColor()} text-white rounded-full w-10 h-10 flex items-center justify-center mx-1`} >
                    <h1 className='uppercase text-4xl font-semibold'>{userItem.name[0]} </h1>
                  </div>
                )}

                <div className='flex flex-col'>
                  <div className='flex gap-2'>
                    <h1>{userItem.name}</h1>
                    {getUnreadMessage(userItem._id)}
                  </div>


                  {!checkExistChat(userItem._id)
                    && (
                      getLastMessage(userItem._id)
                        ? getLastMessage(userItem._id)
                        : <h1 className='text-gray-500 text-sm'> {`Say hello to ${userItem.name}`}</h1>
                    )}
                </div>

              </div>
              {
                checkExistChat(userItem._id)
                && (
                  <button className='border-gray-300 bg-white px-3 py-1 rounded-md text-gray-400'
                    onClick={(e) => {
                      e.stopPropagation();
                      createNewChat(userItem._id);
                    }}
                  >
                    Start a conversation
                  </button>
                )
              }


            </div>)
        })}

    </div >
  )

  function hasChatWithReceipent(receipentUserId) {
    return allChats.find((chat) => {
      return chat.members.map((m) => (m._id)).includes(receipentUserId);
    });
  }
}

export default UserList