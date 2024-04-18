import React from "react";

const Footer = () => {
  return (
    <div className="bg-black py-4 w-full fixed bottom-0">
      <div className="text-center text-white">
      Created by: Paul Santos, Evonte Bennett, Sinan Yilmaz, Brandon Alvarado <br></br>
        &copy; {new Date().getFullYear()} Order-Eatz
      </div>
    </div>
  );
};

export default Footer;