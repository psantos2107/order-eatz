import React from 'react';
import UserProfile from '../components/UserProfile'; // Import the UserProfile component

function UserProfilePage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-10">Profile Page</h1>
      <UserProfile /> 
    </div>
  );
}

export default UserProfilePage;
