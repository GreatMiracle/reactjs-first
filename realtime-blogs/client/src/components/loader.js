import React from 'react'

function Loader() {
  return (
    <div className="absolute inset-0  bg-black opacity-70 flex items-center justify-center">
      <div className="h-10 w-10 border-4 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
    </div>


  )
}

export default Loader