import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewMessage, getAllMessages } from '../../../services/messageService';
import toast from "react-hot-toast";
import { HideLoader, ShowLoader } from '../../../redux/loaderSlice';
import moment from "moment"
import { clearChatMessageApi } from '../../../services/chatService';
import { SetAllChats } from '../../../redux/chatSlice';
import store from '../../../redux/store';
import getDateInRegualarFormat from '../../../common/dateCommon';
import EmojiPicker from 'emoji-picker-react';


function ChatArea({ socket }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { allChats, selectChat } = useSelector((state) => state.chatReducer);
    const { user } = useSelector((state) => state.userReducer);
    const messageInputRef = useRef(null);
    const [newMessage, setNewMessage] = useState("");
    const [message, setMessage] = useState([]);
    const dispatch = useDispatch();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [isReceipentTyping, setIsReceipentTyping] = useState(false);

    const [image, setImage] = useState("");

    const receipentUserId = selectChat?.members.find((m) => m._id !== user._id);

    useEffect(() => {

        if (selectChat) {
            setNewMessage('');

            // Xóa các sự kiện socket cũ trước khi thêm sự kiện mới
            // socket.off("received-msg");
            // socket.off("unread-message-cleared");
            // socket.off("started-typing");

            fetchAllMessages();
            clearUnreadMessage();

            console.log("selectChatselectChatselectChat", selectChat);
            //receive message from server using socker
            socket.off("received-msg").on("received-msg", (msg) => {
                console.log("socket-received-message-BEFORE", msg);
                const tempSelectChat = store.getState().chatReducer.selectChat;

                if (tempSelectChat._id === msg.chat) {
                    setMessage((mess) => [...mess, msg])
                    console.log("message.sender", msg.sender);
                    console.log("msg.sender", msg.sender);
                    console.log("tempSelectChat", tempSelectChat);
                    console.log("msg", msg);
                    if (user._id !== msg.sender) {
                        clearUnreadMessage();
                    }
                }
            });

            //clear unread message from server using socker
            socket.off("unread-message-cleared").on("unread-message-cleared", (data) => {
                console.log("socket-unMsg-BEFORE", data);
                const tempSelectChat = store.getState().chatReducer.selectChat;
                const tempAllChats = store.getState().chatReducer.allChats;

                if (data.chat === tempSelectChat._id && data.sender !== user._id) {
                    const updateChats = tempAllChats.map((chat) => {
                        if (chat._id === data.chat) {
                            return {
                                ...chat,
                                unreadMessages: 0,
                            }
                        } else {
                            return chat;
                        }
                    });

                    dispatch(SetAllChats(updateChats));

                    setMessage(prevMess => {
                        return prevMess.map((mess) => {
                            return {
                                ...mess,
                                read: true
                            }
                        })
                    });
                }
            });

            socket.on("started-typing", (data) => {
                console.log("started-typing", data);
                const tempSelectChat = store.getState().chatReducer.selectChat;

                if (data.chat === tempSelectChat._id && data.sender !== user._id) {

                    setIsReceipentTyping(true)
                }

                setTimeout(() => {
                    setIsReceipentTyping(false);
                }, 3000);

            });
        };

    }, [selectChat]);

    useEffect(() => {
        if (message) {
            const messageContainer = document.getElementById("lastMessageId");
            if (messageContainer) {
                messageContainer.scrollTop = messageContainer.scrollHeight + 100;
            }
        }
    }, [message, isReceipentTyping]);




    const fetchAllMessages = async () => {
        try {
            dispatch(ShowLoader());
            const response = await getAllMessages(selectChat?._id);
            dispatch(HideLoader());
            console.log("responseAllM", response);
            if (response.success) {
                console.log("response.data", response.data);
                setMessage(response.data);

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
            console.log("image===========>", image);
            const messageSend = {
                chat: selectChat._id,
                sender: user._id,
                text: newMessage,
                image: image ? image : ""
            }

            //send message to server using soket
            console.log("message kien", message);
            console.log("selectChat kien", selectChat);
            console.log("selectChat message", message);

            // socket.emit("send-msg", {
            //     ...messageSend,
            //     members: selectChat.members.map((m) => m._id),
            //     createdAt: moment().format("DD-MM-YYYY hh:mm:ss"),
            //     read: false
            // })

            //store message in db
            const response = await createNewMessage(messageSend);
            dispatch(HideLoader());
            // console.log(response);
            if (response.success) {
                socket.emit("send-msg", {
                    ...response.data,
                    members: selectChat.members.map((m) => m._id),
                    createdAt: moment().format("DD-MM-YYYY hh:mm:ss"),
                    read: false
                })

                // Xóa nội dung tin nhắn trong input và tập trung vào ô input
                setIsButtonDisabled(true)
                setNewMessage('');
                setShowEmojiPicker(false)

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



            // socket.emit("clear-unread-message", {
            //     chat: selectChat._id,
            //     members: selectChat.members.map((mem) => mem._id)
            // })

            // dispatch(ShowLoader());
            // console.log("-------------------clearUnreadMessage--------------");
            const response = await clearChatMessageApi(selectChat?._id);
            // console.log(" clearUnreadMessage response", response);
            // dispatch(HideLoader());

            if (response.success) {
                const updateChats = allChats.map((chat) => {
                    if (chat._id === selectChat?._id) {
                        socket.emit("clear-unread-message", {
                            ...response.data
                        })
                        return response.data;
                    }
                    return chat;
                });
                dispatch(SetAllChats(updateChats));
                // console.log("updateChats", allChats);
            }
        } catch (error) {
            // dispatch(HideLoader());
            toast.error(error.message)
        }
    }
    console.log("message", message);

    const onSendImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = async () => {
            console.log("Image>>>>>>>>", reader.result);
            setImage(reader.result);
            // handleSendMessage(reader.result)

        }
        console.log("file", file);
    }
    console.log("image=1==========>", image);

    return (
        <>
            {/* ------------------------------------------------HEADER-----------------------------------         */}
            <div className='bg-white border rounded-2xl h-[90vh]'>
                {selectChat ? (
                    <div className='h-[90vh] flex flex-col justify-between p-5'>
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
                                    message?.map((msg, index) => {
                                        const isCurrentUserSendText = msg.sender === user._id;
                                        return (
                                            <div key={msg._id} className={`flex ${isCurrentUserSendText && "justify-end"}`}>
                                                <div className='flex flex-col gap-0'>
                                                    <h1 className={`
                                                            ${isCurrentUserSendText ?
                                                            "bg-primary text-white rounded-bl-none"
                                                            : "bg-gray-200 text-primary rounded-tr-none"
                                                        } p-2 rounded-xl
                                                        `}
                                                    >{msg.text}</h1>
                                                    {msg.image && (
                                                        <img
                                                            src={msg.image}
                                                            alt=""
                                                            className="w-24 h-24 rounded-xl"
                                                        />
                                                    )}
                                                    <h1 className='text-gray-500 text-sm'>{
                                                        // moment(msg.createdAt).format("hh:mm A")
                                                        getDateInRegualarFormat(msg.createdAt)
                                                    }</h1>
                                                </div>
                                                {
                                                    isCurrentUserSendText &&
                                                    <div className='flex flex-col top-10 justify-center items-center'>
                                                        <i
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
                                    })
                                }

                                {isReceipentTyping && (
                                    <div className='pb-10'>
                                        <h1 className='bg-gray-300 text-gray-500 p-2 rounded-xl w-max'>
                                            typing...
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div >

                        {/* ---------------INPUT------------------------------------- */}
                        < div >
                            <div className='h-12 rounded-xl flex justify-between flex-grow gap-2 ' >
                                {showEmojiPicker &&
                                    <div className='absolute bottom-7 left-20'>
                                        {/* <div className='absolute top-96 left-20'> */}
                                        <EmojiPicker
                                            height={350}
                                            onEmojiClick={(e) => {
                                                setNewMessage(newMessage + " " + e.emoji)
                                                setIsButtonDisabled(false)
                                                setShowEmojiPicker(false)
                                            }} />
                                    </div>}


                                <div className='flex gap-2'>

                                    <label for="file" >
                                        <i class="ri-folder-image-line cursor-pointer text-3xl items-center justify-center"
                                            typeof='file' />
                                        <input type='file'
                                            id='file'
                                            style={{ display: 'none' }}
                                            accept='image/gift,image/jpeg,image/png,image/jpg'
                                            onChange={onSendImage}
                                        >
                                        </input>

                                    </label>
                                    <i className="ri-emoji-sticker-line cursor-pointer text-3xl items-center justify-center"
                                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}></i>
                                </div>


                                <input
                                    ref={messageInputRef}
                                    type='text'
                                    placeholder="Type a message"
                                    className='flex-grow h-full rounded-xl border-gray-500 shadow border'
                                    value={newMessage}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                    onChange={(e) => {
                                        if (e.target.value.trim() !== "") {
                                            setNewMessage(e.target.value);
                                            setIsButtonDisabled(false); // Bỏ vô hiệu hóa nút khi có nội dung
                                        } else {
                                            setIsButtonDisabled(true); // Vô hiệu hóa nút khi trống nội dung
                                            setNewMessage("");
                                        };
                                        // console.log("selectChat", selectChat);
                                        const messageContainer = document.getElementById("lastMessageId");
                                        if (messageContainer) {
                                            messageContainer.scrollTop = messageContainer.scrollHeight + 100;
                                        }
                                        socket.emit("typing", {
                                            chat: selectChat._id,
                                            members: selectChat.members.map((mem) => mem._id),
                                            sender: user._id
                                        });
                                    }}
                                />
                                {isButtonDisabled === false ?
                                    (<button
                                        className='bg-primary text-white p-2 rounded py-1 px-5'
                                        disabled={isButtonDisabled}
                                        onClick={handleSendMessage}
                                    >
                                        <i className="ri-send-plane-2-line text-2xl text-white"></i>
                                    </button>
                                    ) :
                                    (<button
                                        className='bg-gray-500 text-white p-2 rounded py-1 px-5'
                                        disabled={isButtonDisabled}
                                        onClick={handleSendMessage}
                                    >
                                        <i className="ri-send-plane-2-line text-2xl text-white"></i>
                                    </button>
                                    )
                                }
                            </div>
                        </div >
                    </div >
                ) : (
                    <div className="relative flex flex-col justify-center items-center text-center top-1/3">
                        <h1 className='text-4xl'>Welcome</h1>
                        <p className='text-2xl'>Ready? Set. Chat! Let's jump right into things.</p>
                    </div>
                )}
            </div >
        </>
    );
}

export default ChatArea