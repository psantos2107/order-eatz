import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignUp from '../components/SignUp';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="sign-up-page-container">
      <h1>Sign Up</h1>
      <SignUp onSignUpSuccess={handleSignUpSuccess} />
    </div>
  );
}

export default SignUpPage;
