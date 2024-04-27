import React from "react";
import Login from "../components/Login"; // Import the Login component
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-page-container flex flex-col justify-center items-center min-h-screen">
      <header className="login-header text-center mb-4">
        <h1 className="text-2xl font-bold">Welcome to Order-Eatz</h1>
        <p className="text-md">
          Your favorite food delivered fast at your door.
        </p>
      </header>
      <Login /> {/* Embedding the Login component */}
      <footer className="login-footer mt-4">
        <p className="text-sm">
          Not registered yet?
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            {" "}
            Sign up here
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default LoginPage;
