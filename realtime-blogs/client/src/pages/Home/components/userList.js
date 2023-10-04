import React from 'react'
import { useSelector } from 'react-redux';


const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'amber', 'lime', 'sky'];
function getRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomNumber = Math.floor(Math.random() * 8) + 1; // Số ngẫu nhiên từ 1 đến 8
  const roundedNumber = randomNumber * 100; // Số cuối cùng tròn trăm
  console.log(`bg-${randomColor}-${roundedNumber}`);
  return `bg-${randomColor}-${roundedNumber}`;
}

function UserList() {

  const { allUsers } = useSelector(state => state.userReducer);

  return (
    <div>
      {allUsers.map((item) => {
        return (
          <div className='shadow border p-5'>
            <div className='flex gap-5 items-center '>
              {item.profilePic && (
                <img src={item.profilePic}
                  alt='profile Pic'
                  className='w-10 h-10 rounded-full'
                />
              )}
              {!item.profilePic && (
                <div className={`${getRandomColor()} text-white rounded-full`} >
                  <h1 className='uppercase text-4xl font-semibold'>{item.name[0]} </h1>
                </div>
              )}


              <h1>{item.name}</h1>
            </div>

          </div>)
      })}

    </div>
  )
}

export default UserList