import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from 'material-ui-audio-player';
import Applet from '../../../components/Applet';
import StyledAudioPlayer from '../../../styledComponents/AudioPlayer.styled';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    loopIcon: {
      color: '#3f51b5',
      '&.selected': {
        color: '#0921a9',
      },
      '&:hover': {
        color: '#7986cb',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    playIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'unset',
      },
    },
    pauseIcon: {

      color: '#f50057',
      '&:hover': {
        color: 'unset',
      },
    },
    volumeIcon: {
      color: 'rgba(0, 0, 0, 0.54)',
    },

    volumeSlider: {
      color: 'black',
    },
    progressTime: {
      color: 'rgba(0, 0, 0, 0.54)',
    },
    mainSlider: {

      color: '#3f51b5',
      '& .MuiSlider-rail': {
        color: '#7986cb',
      },
      '& .MuiSlider-track': {
        color: '#3f51b5',
      },
      '& .MuiSlider-thumb': {
        color: '#303f9f',
      },
    },
  }),
);

const MyAudioPlayer = () => {
  let lastKnownPosition = 0;
  let ticking = false;
  function doSomething(scrollPosition) {
    const audioPlayer = document.getElementById('audioPlayer');
    if (scrollPosition >= 333) {
      audioPlayer.style.position = 'fixed';
      audioPlayer.style.width = '540px';
      audioPlayer.style.top = '85px';
    } else if (scrollPosition <= 333) {
      audioPlayer.style.position = 'unset';
      audioPlayer.style.width = '100%';
      audioPlayer.style.top = 'unset';
    }
  }

  window.addEventListener('scroll', (e) => {
    lastKnownPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(lastKnownPosition);
        ticking = false;
      });

      ticking = true;
    }
  });

  const src = [
    'https://www.youtube.com/watch?v=JFm7YDVlqnI',
  ];
  return (
    <div
      id="audioPlayer"
      style={{
        zIndex: '100',
      }}
    >

      <Applet
        width="100%"
        height="70px"
      >
        <StyledAudioPlayer>
          <AudioPlayer
            useStyles={useStyles}
            elevation={1}
            width="100%"
            variation="default"
            spacing={3}
            download
            autoplay
            order="standart"
            preload="auto"
            loop
            src={src}
          />
        </StyledAudioPlayer>

      </Applet>
    </div>

  );
};

export default MyAudioPlayer;
