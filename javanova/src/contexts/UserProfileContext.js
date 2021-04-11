import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import useRequest from '../hooks/useRequest';

const UserProfileContext = React.createContext([{}, () => {}]);
const baseUrl = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    handle: '',
    email: '',
    userId: '',
    isAuthenticated: false,
  });

  // const { data } = useRequest('/user');

  // console.log('user profile', data);

  useEffect(() => {
    const options = {
      url: `${baseUrl}/user`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('FBIdToken')}`,
      },
    };
    if (profile.isAuthenticated) {
      axios.get(options.url, options)
        .then((response) => {
          const { handle, email, userId } = response.data.profile;

          setProfile(() => ({
            ...profile, handle, email, userId,
          }));
        });
    }
  }, [profile.isAuthenticated]);

  console.log(profile, 'profile');

  return (
    <UserProfileContext.Provider value={[profile, setProfile]}>
      {children}
    </UserProfileContext.Provider>
  );
};

UserProfileProvider.defaultProps = {
  children: <div />,
};

export {
  UserProfileContext,
  UserProfileProvider,
};
