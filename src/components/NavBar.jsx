import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="bg-black py-6 justify-between flex fixed w-full top-0 left-0">
        <div className='text-white mx-4'>
            Order Eatz
        </div>
        <div className='text-white'>
            <Link className='mx-4' to="/home">Home</Link>
            <Link className='mx-4' to="/user"> My Profile</Link>
            <Link className='mx-4' to="/order">Order Now</Link>
        </div>
    </div>
  )
}

export default NavBar