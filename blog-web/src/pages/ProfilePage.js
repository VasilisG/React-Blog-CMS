import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/profile';
import { BASE_MEDIA_URL } from '../config/env';

const ProfilePage = () => {

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfileData = async () => {
      const data = await getProfile();
      setProfile(data);
    }
    getProfileData();
  }, []);

  return profile ? (
    <div className="profile-page">
      <h2 className="profile-header">About me</h2>
      <div className="profile-details">
        <img className="profile-image" src={`${BASE_MEDIA_URL}${profile.image}`} alt='Profile'/>
        <h3 className="profile-name">{profile.fullname}</h3>
        <p className="profile-info">{profile.description}</p>
      </div>
    </div>
  ) : null;
}

export default ProfilePage;