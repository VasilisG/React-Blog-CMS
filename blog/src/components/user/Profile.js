import React from "react";
import ProfileForm from "./ProfileForm";

const Profile = () => {

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <hr />
      <div className="profile-container container">
        <ProfileForm/>
      </div>
    </div>
  );
};

export default Profile;
