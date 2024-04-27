import React from "react";

const OrderEatzDescription = () => {
  return (
    <div className="w-1/2 flex flex-col items-center justify-center mr-10 bg-white border-black border-solid border-2 p-6 overflow-auto">
      <h2 className="text-6xl text-center mb-6">
        <strong>WELCOME TO ORDER EATZ!!!!!</strong>
      </h2>
      <p className="text-xl tracking-wider leading-10">
        OrderEatz is an application that takes pride in delivering its customers
        delicious food, diverse cuisine, and quality tastes that can make any
        food enthusiast's mouth water. Established in 2024, order-eatz makes
        ordering food fun, easy, and seamless! You may go directly to the order
        page if you want to order your food ASAP, but if you make an account,
        you may save your orders to reference for next time. Join our community,
        but more importantly, enjoy our food! Bon appetit, mes amis!
      </p>
      <img
        src="https://i.pinimg.com/474x/1c/f4/d2/1cf4d2bbbe24da897566c7c755a6e75f.jpg"
        className="block w-1/2 border-black border-solid border-2"
      />
    </div>
  );
};

export default OrderEatzDescription;
