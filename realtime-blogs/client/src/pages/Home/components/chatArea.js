import React from 'react'
import { useSelector } from 'react-redux'

function ChatArea() {

    const { selectChat } = useSelector((state) => state.chatReducer)

    console.log("selectChat", selectChat);

    return (
        <div>
            {selectChat &&
                <h1>{selectChat._id}</h1>
            }
        </div>
    )
}

export default ChatArea