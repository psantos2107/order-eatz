import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import FoodShowPage from "./pages/FoodShowPage";
import UserProfilePage from "./pages/UserProfilePage";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div>
        {/* <HomeNav /> Render HomeNav component for navigation */}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
          <Route path="/food" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/food/:id" element={<FoodShowPage />} />
          {/* Render FoodDetailsComponent for the food details route */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
