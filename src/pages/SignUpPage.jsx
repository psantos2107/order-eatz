import React from 'react';
import SignUp from '../components/SignUp';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate('/complete-profile');
  };

  return (
    <div className="sign-up-page-container">
      <h1 className="text-3xl font-bold text-center my-8">Sign Up to Start Ordering</h1>
      <SignUp onSignUpSuccess={handleSignUpSuccess} />
    </div>
  );
}

export default SignUpPage;
