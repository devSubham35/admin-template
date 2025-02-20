import React from 'react'
import isAuth from "../../utils/isAuth";

const ProfilePage = () => {
  return (
    <div>
        <h1 className='font-bold text-xl'>User Profile</h1>
    </div>
  )
}

export default isAuth(ProfilePage)