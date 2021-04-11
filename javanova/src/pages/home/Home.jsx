import React, { useContext, useEffect, useState } from 'react';
import logoutUser from '../../util/helperFunctions';
import Container, { Row, Col } from '../../styledComponents/Grid.styled';
import { UserProfileContext } from '../../contexts/UserProfileContext';
import useRequest from '../../hooks/useRequest';
import AddPost from './AddPost';
import AllPosts from './AllPosts';
import Applet from '../../components/Applet';

const baseUrl = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

const Home = () => {
 
  return (
    <Container>
  test
    </Container>
  );
};

export default Home;
