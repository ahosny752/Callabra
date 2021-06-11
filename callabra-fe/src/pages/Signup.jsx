import React, { useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Link,
  useHistory,
} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

import { Row, Col } from '../styledComponents/Grid.styled';
import LoginContainer, { LoginTextFieldContainer } from '../styledComponents/Login.styled';

import useRequest from '../hooks/useRequest';

import { UserProfileContext } from '../contexts/UserProfileContext';

const Signup = () => {
  const history = useHistory();
  const [profile, setProfile] = useContext(UserProfileContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [handle, setHandle] = useState('');

  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: false,

  };

  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const {
    post,
    postData,
    postError,
    postIsLoading,
    data,
    mutate,
  } = useRequest(`${baseURL}/signup`, swrOptions);

  const handleLogin = () => {
    const userData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    post(userData);
  };

  useEffect(() => {
    if (postData) {
      mutate(data, true);
      const { token } = postData;
      if (token) {
        history.push(`/${handle}`);
        localStorage.setItem('FBIdToken', token);
        setProfile(() => ({
          ...profile, handle, email, isAuthenticated: true,
        }));
      }
    }
  }, [postData, data, email, history, mutate, profile, setProfile]);

  return (
    <LoginContainer>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <div>
              Sign Up
            </div>
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <TextField
              error={!!(postError && postError.email)}
              id="outlined-error-helper-text"
              label="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
              helperText={postError && postError.email ? postError.email : ''}
              variant="outlined"
            />
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <TextField
              error={!!(postError && postError.password)}
              id="outlined-error-helper-text"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              defaultValue={password}
              helperText={postError && postError.password ? postError.password : ''}
              variant="outlined"
              type="password"
            />
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <TextField
              error={!!(postError && postError.confirmPassword)}
              id="outlined-error-helper-text"
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              defaultValue={confirmPassword}
              helperText={postError && postError.confirmPassword ? postError.confirmPassword : ''}
              variant="outlined"
              type="password"
            />
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <TextField
              error={!!(postError && postError.handle)}
              id="outlined-error-helper-text"
              label="Handle"
              onChange={(e) => setHandle(e.target.value)}
              defaultValue={handle}
              helperText={postError && postError.handle ? postError.handle : ''}
              variant="outlined"
            />
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <Button
              variant="primary"
              disabled={postIsLoading === true}
              onClick={postIsLoading === false ? handleLogin : null}
            >
              {postIsLoading === true ? 'Creating acount...' : 'Create Account'}
            </Button>
          </LoginTextFieldContainer>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <LoginTextFieldContainer>
            <div>
              <span style={{ paddingRight: '6px' }}>Already have an Account?</span>
              <Link to="/login">Log in</Link>
              <span style={{ paddingLeft: '6px' }}>here!</span>
            </div>
          </LoginTextFieldContainer>

        </Col>
      </Row>

    </LoginContainer>

  );
};

export default Signup;
