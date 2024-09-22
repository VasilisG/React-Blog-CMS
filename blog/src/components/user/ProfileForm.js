import { React, useState, useEffect } from "react";
import ImageField from "../fields/form/ImageField";
import TextField from "../fields/form/TextField";
import TextAreaField from "../fields/form/TextAreaField";
import { PROFILE_INITIAL_STATE } from "./Constants";
import { BASE_DIR } from "../../config/env";
import API from "../../utils/api";
import LoadingSpinner from "../loading-spinner/LoadingSpinner";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../store";

const ProfileForm = () => {

  const [profileData, setProfileData] = useState(PROFILE_INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfileData();
  };

  const handleChange = (key) => event => {
    switch(key){
      case 'image':
        setProfileData({
          ...profileData,
          [key]: event.target.files ? event.target.files[0] : null
        });
        break;

      default:
        setProfileData({ 
          ...profileData, 
          [key]: event.target.value 
        });
        break;
    }
  }

  const getProfileImage = () => {
    if(profileData.image !== '' && typeof profileData.image != 'object'){
      return BASE_DIR + profileData.image;
    }
    else return '';
  }

  const updateProfileData = async () => {
    setIsLoading(true);
    const response = await API.putForm(`profile`, profileData);
    const profile = response.data;
    await dispatch(fetchProfile());
    setProfileData(profile.data);
    setIsLoading(false);
  }

  useEffect(() => {

    const fetchProfileData = async () => {
      setIsLoading(true);
      const response = await API.get(`profile`);
      const profile = response.data;
      setProfileData(profile.data);
      setIsLoading(false);
    }

    fetchProfileData();

  }, []);

  return (
    <div className="profile-form-container form-wrapper">
      <form 
        className="profile-form" 
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <ImageField 
          name="image" 
          label="Profile Image" 
          id="image" 
          smallText="Upload user image."
          imageValue={getProfileImage()}
          changeCallback={handleChange('image')}
        />
        <TextField 
          name="fullname" 
          label="Full Name" 
          id="fullname" 
          smallText="Add full name."
          required={true}
          value={profileData.fullname}
          changeCallback={handleChange('fullname')}
        />
        <TextAreaField 
          name="description" 
          label="Description" 
          id="description" 
          smallText="Add description."
          value={profileData.description}
          changeCallback={handleChange('description')}
        />
        <div className="form-group d-flex justify-content-end my-4">
          <button
            type="submit"
            className="btn user-action update-user"
            value="save"
          >
            Save
          </button>
        </div>
      </form>
      { isLoading ? <LoadingSpinner/> : null }
    </div>
  );
};

export default ProfileForm;
