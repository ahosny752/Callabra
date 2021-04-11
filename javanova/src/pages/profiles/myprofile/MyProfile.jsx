import React, { useContext } from 'react';
import {

  useParams,
} from 'react-router-dom';
import MyProfileWidget from './MyProfile.widget';
import MyFeedWidget from './MyFeed.widget';
import MyTracksWidget from './MyTracks.widget';
import SoundCloudWidget from '../../../components/SoundCloud.widget';
import { Row, Col } from '../../../styledComponents/Grid.styled';
import { UserProfileContext } from '../../../contexts/UserProfileContext';
import Applet from '../../../components/Applet';

const MyProfile = () => {
  const [profile] = useContext(UserProfileContext);

  return (
    <>
      <Row>

        <Col lg={6} md={12} sm={12}>

          <Row>
            <Col lg={12}>
              <MyProfileWidget
                profile={profile}
              />

            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <SoundCloudWidget
                profile={profile}
              />
            </Col>
          </Row>
          {/* <Row>
            <Col lg={12}>
              <MyTracksWidget
                profile={profile}
              />
            </Col>
          </Row> */}

        </Col>

        <Col lg={6} md={12} sm={12}>
          <MyFeedWidget
            profile={profile}
          />

        </Col>

      </Row>

    </>
  );
};

export default MyProfile;
