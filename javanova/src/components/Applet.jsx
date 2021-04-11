import React, { useState } from 'react';
import styled from 'styled-components';
// import styled from 'styled-components';
// import { Row, Col, GridSection } from '../styledComponents/Grid.styled';

const AppletContainer = styled.div`
background-color: white;
box-shadow: 0 16px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
padding: 16px;
border-radius: 10px;
width: ${(props) => props.width || ''};
height: ${(props) => props.height || ''};
margin-top: ${(props) => props.marginTop || ''};
margin-left: ${(props) => props.marginLeft || ''};
margin-right: ${(props) => props.marginRight || ''};
`;
const Applet = ({
  children,
  width,
  height,
  marginTop,
  marginLeft,
  marginRight,
  error,
  padding,

}) => {
  if (error) {
    return (
      <>
        <div style={{
          display: 'flex',

        }}
        >
          <AppletContainer
            error={error}
            width={width}
            height={height}
            marginTop={marginTop}
            marginLeft={marginLeft}
            marginRight={marginRight}

          >
            Something went wrong...
          </AppletContainer>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <AppletContainer
          error={error}
          width={width}
          height={height}
          marginTop={marginTop}
        >
          {children}
        </AppletContainer>
      </div>
    </>
  );
};

export default Applet;
