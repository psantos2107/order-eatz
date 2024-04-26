import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black py-3 justify-between flex fixed w-full top-0 left-0">
      <div className="text-white ml-4 text-2xl font-bold">
      <img src="https://i.imgur.com/8JuGwUt.jpg" alt="" style={{ width: "410px", height: "60px"}}/>
      </div>
      <div className="text-white">
        <Link className="mx-4" to="/home">
          Home
        </Link>
        <Link className="mx-4" to="/user/:id">
          {" "}
          My Profile
        </Link>
        <Link className="mx-4" to="/food">
          Menu
        </Link>
        <Link className="mx-4" to="/order">
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default Header;
