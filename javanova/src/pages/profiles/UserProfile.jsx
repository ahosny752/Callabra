import React, { useContext } from 'react';
import {

  useParams,
} from 'react-router-dom';
import { UserProfileContext } from '../../contexts/UserProfileContext';

const UserProfile = () => {
  const [profile] = useContext(UserProfileContext);

  const { handle } = useParams();

  return (
    <div>
      <div>
        { profile && profile.handle ? (
          <div>
            <div>{`Welcome to, ${handle}'s page`}</div>
          </div>
        ) : ''}
      </div>
    </div>
  );
};

export default UserProfile;
