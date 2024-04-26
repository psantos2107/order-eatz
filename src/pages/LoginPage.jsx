import React from 'react';
import Login from '../components/Login'; // Import the Login component

function LoginPage() {
    return (
        <div className="login-page-container">
            <header className="login-header">
                <h1>Welcome to Order-Eatz</h1>
                <p>Your favorite food delivered fast at your door.</p>
            </header>
            <Login />  {/* Embedding the Login component */}
            <footer className="login-footer">
                <p>Not registered yet? <a href="/signup">Sign up here</a></p>
            </footer>
        </div>
    );
}

export default LoginPage;
