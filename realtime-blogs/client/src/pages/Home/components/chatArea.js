import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewMessage, getAllMessages } from '../../../services/messageService';
import toast from "react-hot-toast";
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';
import moment from "moment"
import { clearChatMessageApi } from '../../../services/chatService';
import { SetAllChats } from '../../../redux/chatSlice';

function ChatArea({ socket }) {

    const { allChats, selectChat } = useSelector((state) => state.chatReducer);
    const { user } = useSelector((state) => state.userReducer);
    const messageInputRef = useRef(null);
    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState([]);
    const dispatch = useDispatch();
    const receipentUserId = selectChat?.members.find((m) => m._id !== user._id);
    // console.log("user", user);
    // console.log("receipentUserId", receipentUserId);
    // console.log("selectChat", selectChat);

    useEffect(() => {
        fetchAllMessages();
        clearUnreadMessage();

        if (selectChat) {
            //receive message from server using socker
            socket.on("received-msg", (msg) => {
                console.log("messagePrev-BEFORE", msg);
                setMessage((prev) => [...prev, msg])
                console.log("messagePrev- AFTER", message);

            })
        }

    }, [selectChat]);

    useEffect(() => {
        if (message) {
            const messageContainer = document.getElementById("lastMessageId");
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight;
            }

        }

    }, [message]);

    const fetchAllMessages = async () => {
        try {
            dispatch(ShowLoader());
            const response = await getAllMessages(selectChat?._id);
            dispatch(HideLoader());
            // console.log("responseAllM", response);
            if (response.success) {
                console.log("response.data", response.data);
                setMessage(response.data);
                console.log("response.data message", message);

            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage(event)
            messageInputRef.current.focus();
        }
    };

    const handleSendMessage = async () => {
        try {
            dispatch(ShowLoader());
            const messageSend = {
                chat: selectChat._id,
                sender: user._id,
                text: newMessage,
            }

            //send message to server using soket
            console.log("message kien", message);
            console.log("selectChat kien", selectChat);
            console.log("selectChat message", message);

            socket.emit("send-msg", {
                ...messageSend,
                members: selectChat.members.map((m) => m._id),
                createdAt: moment().format("DD-MM-YYYY hh:mm:ss"),
                read: false
            })

            //store message in db
            const response = await createNewMessage(messageSend);
            dispatch(HideLoader());
            // console.log(response);
            if (response.success) {
                // Xóa nội dung tin nhắn trong input và tập trung vào ô input
                setNewMessage('');
                // fetchAllMessages();
                messageInputRef.current.focus();
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }
    };

    const clearUnreadMessage = async () => {
        try {
            dispatch(ShowLoader());
            // console.log("-------------------clearUnreadMessage--------------");
            const response = await clearChatMessageApi(selectChat?._id);
            // console.log(" clearUnreadMessage response", response);
            dispatch(HideLoader());

            if (response.success) {
                const updateChats = allChats.map((chat) => {
                    if (chat._id === selectChat?._id) {
                        return response.data;
                    }
                    return chat;
                });
                dispatch(SetAllChats(updateChats));
                // console.log("updateChats", allChats);
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }
    }

    return (
        <>
            {/* ------------------------------------------------HEADER-----------------------------------         */}
            <div className='bg-white border rounded-2xl h-screen'>
                {selectChat ? (
                    <div className='h-[80vh] flex flex-col justify-between p-5'>
                        <div>
                            <div className='flex gap-5 items-center mb-2'>
                                {receipentUserId.profilePic && (
                                    <img src={receipentUserId.profilePic}
                                        alt='profile Pic'
                                        className='w-10 h-10 rounded-full'
                                    />
                                )}
                                {!receipentUserId.profilePic && (
                                    <div
                                        className={`bg-green-300 text-white rounded-full w-10 h-10 flex items-center justify-center mx-1 mb-2`} >
                                        <h1 className='uppercase text-4xl font-semibold'>{receipentUserId.name[0]} </h1>
                                    </div>
                                )}

                                <h1 className='uppercase'>{receipentUserId.name}</h1>
                            </div>
                            <hr />
                        </div>

                        {/* -------------------------------------------MESSAGE--------------------------------- */}

                        <div className='h-[60vh] overflow-y-scroll p-5'
                            id="lastMessageId">
                            <div className='flex flex-col gap-2 ' >
                                {
                                    // console.log("message_Vuwowngj", message)
                                    message?.map((msg) => {
                                        const isCurrentUserSendText = msg.sender === user._id;

                                        return (
                                            <div
                                                key={msg._id}
                                                className={`flex ${isCurrentUserSendText && "justify-end"}`}>
                                                <div className='flex flex-col gap-0'>

                                                    <h1 className={`
                                                            ${isCurrentUserSendText ?
                                                            "bg-primary text-white rounded-bl-none"
                                                            : "bg-gray-200 text-primary rounded-tr-none"
                                                        } p-2 rounded-xl
                                                        `}
                                                    >{msg.text}- {msg._id}</h1>
                                                    <h1 className='text-gray-500 text-sm'>{
                                                        moment(msg.createdAt).format("hh:mm A")
                                                    }</h1>
                                                </div>
                                                {
                                                    !isCurrentUserSendText &&
                                                    <div className='flex flex-col top-10 justify-center items-center'>
                                                        <i
                                                            // className={`ri-check-double-line text-xl
                                                            className={`ri-checkbox-circle-line text-sm
                                                            ${msg.read
                                                                    ? "text-blue-500"
                                                                    : "text-gray-400"
                                                                }`
                                                            }></i>

                                                    </div>
                                                }


                                            </div>
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div >


                        {/* ---------------INPUT------------------------------------- */}
                        < div >
                            <div className='h-12 rounded-xl flex justify-between flex-grow gap-2 ' >
                                <input

                                    ref={messageInputRef}
                                    type='text'
                                    placeholder="Type a message"
                                    className='flex-grow h-full rounded-xl border-gray-500 shadow border'
                                    value={newMessage}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    className='bg-primary text-white p-2 rounded py-1 px-5'
                                    onClick={handleSendMessage}
                                >
                                    <i className="ri-send-plane-2-line text-2xl text-white"></i>
                                    {/* SEND */}
                                </button>
                            </div>

                        </div >
                    </div >
                ) : (
                    <div className="relative flex flex-col justify-center items-center text-center top-1/3">
                        <h1 className='text-4xl'>Welcome</h1>
                        <p className='text-2xl'>Ready? Set. Chat! Let's jump right into things.</p>
                    </div>
                )
                }
            </div >



        </>
    );
}

export default ChatArea