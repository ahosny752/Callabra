import React, { useContext } from 'react';
import {

  useParams,
} from 'react-router-dom';
import MyProfileWidget from './MyProfile.widget';
import { Row, Col } from '../../../styledComponents/Grid.styled';
import { UserProfileContext } from '../../../contexts/UserProfileContext';
import Applet from '../../../components/Applet';

const MyFeedWidget = ({
  profile,
}) => {
//
  const { email, handle } = profile;
  return (
    <>

      <div style={{
        width: '35%',
        position: 'fixed',

      }}
      >

        <Applet
          marginTop="7px"
          height="800px"
          width="100%"
          className="left_contentlist"
        >

          My Feed
          <div
            className="itemconfiguration"
            id="scrollTest"
            style={{
              height: '800px',
              overflowY: 'auto',
              textAlign: 'center',

            }}
          >

            <div>
              test

            </div>
          </div>
        </Applet>
      </div>
    </>
  );
};

export default MyFeedWidget;
