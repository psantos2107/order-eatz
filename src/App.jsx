import React from "react";
import { Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import FoodShowPage from "./pages/FoodShowPage";
import UserProfilePage from "./pages/UserProfilePage";
import SignUpPage from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CompleteProfilePage from './pages/CompleteProfilePage';
import Logout from './components/Logout';
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/:id" element={<UserProfilePage />} />
        <Route path="/food" element={<MenuPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/food/:id" element={<FoodShowPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/complete-profile" element={<PrivateRoute><CompleteProfilePage /></PrivateRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/user-profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
