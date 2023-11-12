import React from 'react'

const HomeAdmin = () => {

    const handleLogout = ()=>{
        localStorage.clear()
        window.location.reload()
    }
  return (
    <div>
        <h1 className='text-xl text-center '>HomeAdmin</h1>
        <h1 className="text-xl text-center bg-red-200 cursor-pointer "  onClick={handleLogout}>ออกจากระบบ</h1>

    </div>
  )
}

export default HomeAdmin