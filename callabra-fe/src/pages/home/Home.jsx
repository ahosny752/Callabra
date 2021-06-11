import React, { useContext, useEffect, useState } from 'react';
import logoutUser from '../../util/helperFunctions';
import Container, { Row, Col } from '../../styledComponents/Grid.styled';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import useRequest from '../../hooks/useRequest';
import AddPost from './AddPost';
import AllPosts from './AllPosts';
import Applet from '../../components/Applet';

const Home = () => {
  const [profile, setProfile] = useContext(UserProfileContext);
  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
  };
  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const {
    data: allPostData,
    mutate: allPostMutate,
  } = useRequest(`${baseURL}/posts`, swrOptions);

  const allBlogs = allPostData || [];

  return (
    <Container>
      <Row>
        <Col lg={5}>

          <div style={{ position: 'fixed' }}>
            <Applet
              width="100%"
              marginTop="60px"
            >
              test

            </Applet>
          </div>
        </Col>
        <Col lg={5}>
          <div style={{ position: 'fixed' }}>
            <Applet
              width="100%"
              marginTop="60px"
            >
              test

            </Applet>
          </div>
        </Col>
        <Col lg={2} md={2} sm={2}>
          <div style={{ position: 'fixed' }}>
            <Applet
              width="100%"
              marginTop="60px"
            >
              test

            </Applet>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
