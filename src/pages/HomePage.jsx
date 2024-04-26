import React from "react";
import HomeNav from "../components/HomeNav";
import OrderEatzDescription from "../components/OrderEatzDescription";

const HomePage = () => {
  return (
    <div className="w-5/6 flex py-28 ml-auto mr-auto gap-18 mb-12">
      <OrderEatzDescription />
      <HomeNav />
    </div>
  );
};

export default HomePage;
