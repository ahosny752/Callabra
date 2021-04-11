import React, { useContext } from 'react';
import {
  useParams,
} from 'react-router-dom';
import UserProfile from './UserProfile';
import MyProfile from './myprofile/MyProfile';
import { UserProfileContext } from '../../contexts/UserProfileContext';

const Profiles = () => {
  const [profile] = useContext(UserProfileContext);
  const { handle: paramsHandle } = useParams();
  console.log('params', paramsHandle);
  console.log('handle', profile.handle);

  if (paramsHandle === profile.handle) {
    return (
      <div>
        <MyProfile />
      </div>
    );
  }

  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profiles;
