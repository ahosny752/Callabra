import React, { useContext, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import {

  Link,
  useHistory,
} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Applet from '../components/Applet';

import { Row, Col } from '../styledComponents/Grid.styled';
import LoginContainer, { LoginTextFieldContainer } from '../styledComponents/Login.styled';

import useRequest from '../hooks/useRequest';

import { UserProfileContext } from '../contexts/UserProfileContext';

const Login = () => {
  const history = useHistory();
  const [profile, setProfile] = useContext(UserProfileContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  } = useRequest(`${baseURL}/login`, swrOptions);

  const handleLogin = async () => {
    const body = {
      email,
      password,
    };
    await post(body);
    
  };

  useEffect(() => {
    if (postData) {
      mutate(data, true);
      const { token, handle } = postData;
      if (token) {
        localStorage.setItem('FBIdToken', token);
        setProfile(() => ({ ...profile, isAuthenticated: true }));
        history.push(`/${handle}`);
      }
    }
  }, [postData, data, email, history, profile, setProfile, mutate]);

  return (
    <div>
      <Applet
        width="330px"
        height="360px"
        marginTop="150px"
        loading
      >
        <LoginTextFieldContainer>
          <h1 style={{ textAlign: 'center' }}>
            Log In
          </h1>
          <TextField
            error={!!(postError && postError.email)}
            id="outlined-error-helper-text"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
            helperText={postError && postError.email ? postError.email : ''}
            variant="outlined"
          />
          <br />
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
          <br />
          <Button
            variant="primary"
            disabled={postIsLoading === true}
            onClick={postIsLoading === false ? handleLogin : null}
          >
            {postIsLoading === true ? 'Loggin in...' : 'Log in'}
          </Button>
          <br />
          <div style={{ textAlign: 'center' }}>
            <span style={{ paddingRight: '6px' }}>Dont have an Account?</span>
            <Link to="/signup">Sign up</Link>
            <span style={{ paddingLeft: '6px' }}>here!</span>
          </div>
        </LoginTextFieldContainer>
      </Applet>
    </div>
  );
};

export default Login;
