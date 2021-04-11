import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import deepPurple from '@material-ui/core/colors/deepPurple';
import lime from '@material-ui/core/colors/lime';
import { UserProfileProvider } from './contexts/UserProfileContext';
import Routes from './util/Routes';

const theme = createMuiTheme({
  palette: {
    // primary: deepPurple,
    secondary: lime,
  },
});
function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <UserProfileProvider>
          <Routes />
        </UserProfileProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
