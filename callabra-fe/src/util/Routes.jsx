import React, { useContext, useEffect } from 'react';
import JwtDecode from 'jwt-decode';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { UserProfileContext } from '../contexts/UserProfileContext';
import logoutUser from './helperFunctions';

import Profiles from '../pages/profiles/Profiles';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Home from '../pages/home/Home';
import Header from '../components/Header';
import UserProfile from '../pages/profiles/UserProfile';
import MyProfile from '../pages/profiles/myprofile/MyProfile';
import Container from '../styledComponents/Grid.styled';
import Navbar from '../pages/Navbar';
import GridContainer from '../components/GridContainer';
// testy

const Routes = () => {
  const [profile, setProfile] = useContext(UserProfileContext);
  const { handle } = profile;

  const token = localStorage.FBIdToken || null;

  useEffect(() => {
    if (token) {
      const decodedToken = JwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) { // token is expired
        logoutUser();
        setProfile({ ...profile, isAuthenticated: false });
      }
      setProfile({ ...profile, isAuthenticated: true });
    }
  }, [token, setProfile]);

  const { isAuthenticated } = profile;

  return (

    <Router>
      <div
        style={{
          position: 'fixed',
          zIndex: '100',
          width: '100%',
        }}
      >
        { isAuthenticated ? <Navbar /> : ''}
      </div>
      <Container>
        <GridContainer>
          <Switch>
            <Route exact path="/login">
              {isAuthenticated ? <Home /> : <Login />}
            </Route>
            <Route exact path="/signup">
              {isAuthenticated ? <Home /> : <Signup /> }
            </Route>
            <Route exact path="/home">
              {isAuthenticated ? <Home /> : <Login /> }
            </Route>

            <Route exact path="/:handle">
              {isAuthenticated ? <Profiles /> : <div>Unuthorized, must have an account</div>}
            </Route>
            <Route exact path="/:notAuthHandle">
              {/* {isAuthenticated ? <UserProfile /> : <div>Unuthorized, must have an account</div>} */}
            </Route>
            <Route exact path="/">
              {isAuthenticated ? <Home /> : <Login />}
            </Route>
            <Route>
              <div>page not found</div>
            </Route>
          </Switch>
        </GridContainer>
      </Container>
    </Router>
  );
};

export default Routes;
