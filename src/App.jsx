import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuComponent from "./components/AllFoodMenu";
import FoodDetailsComponent from "./components/FoodDetails";
import HomeNav from "./components/HomeNav";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <div>
        <HomeNav /> {/* Render HomeNav component for navigation */}
        <Routes>
          <Route path="/" element={<Welcome />} />{" "}
          {/* Render WelcomePage for the home route */}
          <Route path="/food" element={<MenuComponent />} />{" "}
          {/* Render MenuComponent for the menu route */}
          <Route path="/food/:id" element={<FoodDetailsComponent />} />{" "}
          {/* Render FoodDetailsComponent for the food details route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
