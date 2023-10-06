import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewMessage, getAllMessages } from '../../../services/messageService';
import toast from "react-hot-toast";
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';
import moment from "moment"

function ChatArea() {

    const { selectChat } = useSelector((state) => state.chatReducer);
    const { user } = useSelector((state) => state.userReducer);
    const messageInputRef = useRef(null);
    const [newMessage, SetNewMessage] = useState("");
    const [message = [], SetMessage] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllMessages();
    }, [selectChat])

    const fetchAllMessages = async () => {
        try {
            dispatch(ShowLoader());
            const response = await getAllMessages(selectChat?._id);
            dispatch(HideLoader());
            console.log("responseAllM", response);
            if (response.success) {
                SetMessage(response.data);
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }
    };

    const receipentUserId = selectChat?.members.find((m) => m._id !== user._id);
    // console.log("user", user);
    // console.log("receipentUserId", receipentUserId);
    // console.log("selectChat", selectChat);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage(event)
            messageInputRef.current.focus();
        }
    };

    const handleSendMessage = async () => {
        console.log('Send message:', newMessage);
        // Thực hiện xử lý logic gửi tin nhắn ở đây

        try {
            dispatch(ShowLoader());
            const messageSend = {
                chat: selectChat._id,
                sender: user._id,
                text: newMessage,
            }

            const response = await createNewMessage(messageSend);
            dispatch(HideLoader());
            console.log(response);
            if (response.success) {
                // Xóa nội dung tin nhắn trong input và tập trung vào ô input
                SetNewMessage('');
                messageInputRef.current.focus();
            }
        } catch (error) {
            dispatch(HideLoader());
            toast.error(error.message)
        }
    };

    // console.log("message123", message);

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

                        <div className='h-[60vh] overflow-y-scroll p-5'>
                            <div className='flex flex-col gap-2 '>
                                {message?.map((msg) => {
                                    const isCurrentUserSendText = msg.sender === user._id;

                                    return (
                                        <div
                                            key={msg._id}
                                            className={`flex ${isCurrentUserSendText && "justify-end"}`}>
                                            <div className='flex flex-col gap-0'>

                                                <h1
                                                    className={`
                                            ${isCurrentUserSendText ?
                                                            "bg-primary text-white rounded-bl-none"
                                                            : "bg-gray-200 text-primary rounded-tr-none"
                                                        } p-2 rounded-xl 
                                            `}

                                                >{msg.text}</h1>
                                                <h1 className='text-gray-500 text-sm'>{

                                                    moment(msg.createdAt).format("hh:mm A")

                                                }</h1>
                                            </div>


                                        </div>
                                    )



                                })}
                            </div>
                        </div>


                        {/* ---------------INPUT------------------------------------- */}
                        <div>
                            <div className='h-12 rounded-xl flex justify-between flex-grow gap-2 ' >
                                <input

                                    ref={messageInputRef}
                                    type='text'
                                    placeholder="Type a message"
                                    className='flex-grow h-full rounded-xl border-gray-500 shadow border'
                                    value={newMessage}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={(e) => SetNewMessage(e.target.value)}
                                />
                                <button
                                    className='bg-primary text-white p-2 rounded py-1 px-5'
                                    onClick={handleSendMessage}
                                >
                                    <i className="ri-send-plane-2-line text-2xl text-white"></i>
                                    {/* SEND */}
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center text-center">
                        <h1 className='text-4xl'>Welcome</h1>
                        <p className='text-2xl'>Ready? Set. Chat! Let's jump right into things.</p>
                    </div>
                )}
            </div >



        </>
    );
}

export default ChatArea