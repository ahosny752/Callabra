import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AudioPlayer from 'material-ui-audio-player';
import Applet from '../../../components/Applet';

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
        color: '#ff4081',
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
  const classes = useStyles();
  const theme = useTheme();
  const src = [
    "https://00e9e64bac0075c3f65c35ee3bd217e4c6bb2e5cc5d57889b8-apidata.googleusercontent.com/download/storage/v1/b/songs752/o/I%20can't%20help%20you%20master%201.wav?qk=AD5uMEvBJ1OvAN19_iN47za5TSLYO3PEH7eMABwH46FtwZ15Cy49UZSbC5jQzsacKrqldBx6dbpCqwUSF95nhe-uVDBE1D-JU_fQ2MuDossx2Ie57kMJ6qncaPtEhIjKoAcG_PPdjE78bTrGmGQ_wyKNplb9fxo7qQzqf5JaXm2L4-qi4mvd9oqnCYFOie5rG4MbkrQp5XUisnZntag-iEQ81XT2rJPVxp9fLpsPN_H6bup7b65w6d1OmuwGdHJIlzC27hpRZlwg-mlQWOx_8J0hJM7098lhUbekpTG3YH8xT24QR1K4apo4fSFrtw2iG12k4aPWtMqGzWLgTT0ESu6aMtVWg2AEYSwrm4s3OyxfyESH5r27N8CDyS4S0vn8RLnLsbyP5eVRNCWx0h3oFYrU7BW8LzwkfDGVXZIOqfa8ZQYV06l4LZ93nhM5kghk1xDSIGZI9j-AUhqo1OIU74CKC7pLjUvvFbNqiZT4tQglgUXUvmfDAxA27sn5FaReSf_Xa7RhXqxpMBEVfV6B4N01HMv3vOI3utyzgRGJvdUeKqrkrIrOZLvnOww5vMEguQrRjt9ouxDdzoIPD4ZkXAzqlcl3QkNRes9AIR2d489ZV9-juALALpcRnEQpgOWUYBu4Q9gmC9YJxXIfZaKe4TnrkCR4JLl3EZY-EhLfsUCtLoQXfka2jM5MX8OmpT_u-PX2bzwYBTm5fwnKSN4jWxPoSgUuB1d_pPg-yJWBOX_HQQThr2-76WlA_32ayK8wIbFxBsFlinWd6hzgKJA3V87tJNSIWCZ8qmzusWl_88jQJLHC8RTI6tWl8cp1JWlsGHEkxmY-_gUL&isca=1",
  ];
  return (

    <Applet
      width="100%"
      height="300px"
    >
      <AudioPlayer
        useStyles={useStyles}
        elevation={1}
        width="100%"
        variation="default"
        spacing={3}
        download
        // autoplay
        order="standart"
        preload="auto"
        loop
        src={src}

      />

    </Applet>

  );
};

export default MyAudioPlayer;
