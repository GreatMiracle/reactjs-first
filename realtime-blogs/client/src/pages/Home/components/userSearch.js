import { useSelector } from "react-redux";

function UserSearch({ searchKey, setSearchKey }) {
    const { backGroundColorMsg } = useSelector(state => state.loader);
    return (
        <div className="relative">
            <input type='text'
                placeholder='Search users / chats'
                className={`${backGroundColorMsg ? "bg-white" : "bg-gray-200"} rounded-full w-full border-gray-300 pl-10 text-gray-500 h-13`}
                // className='rounded-full w-full border-gray-300 pl-10 text-gray-500 h-13'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <i className="ri-search-line absolute top-2 left-4"></i>

        </div>
    )
}

export default UserSearch