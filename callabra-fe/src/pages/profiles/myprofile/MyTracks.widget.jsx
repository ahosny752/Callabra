import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Applet from '../../../components/Applet';
import ProfileLoadingSkeletons from '../../../components/LoadingSkeletons';
import useRequest from '../../../hooks/useRequest';

const MyTracksWidget = ({
  profile,
  setTrackID,
}) => {
  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
  };
  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const { handle } = profile;
  const [track, setTrack] = useState({});
  const { 
    data,
     error, 
     isValidating 
    } = useRequest(`${baseURL}/${handle}/tracks`, swrOptions);

  const tracks = data || [];
  const trackData = tracks[0] || [];

  const trackArray = trackData.tracks;
  const trackArrayDummyData = [
    {
      trackName: "The Wolf of Ball Street",
      trackNumber: 795759691
    },
    {
      trackName: "Perfect",
      trackNumber: 605088942
    },
    {
      trackName: "Isaiah Brisco Freestyle",
      trackNumber: 196376899
    }
]

// const {

  //   avatarUrl,
  //   createdAt,
  //   email,
  //   firstName,
  //   friends,
  //   genre,
  //   handle,
  //   instrument,
  //   lastName,

  // } = userData.profile || {};

  const handleClick = (idx, trackName, trackNumber) => {
    setTrack({
      id: idx,
      trackName,
      trackNumber,
    });

    setTrackID(trackNumber);
  };

  console.log('selected track', track);
  if (!data) {
    return <Applet> somthing went wrong</Applet>;
  }
  return (
    <Applet
      width="100%"
    >
      {trackArrayDummyData ? trackArrayDummyData.map((item, idx) => {
        return (
<div>
          <span>{item.trackName}</span>
          <span><button onClick={() => handleClick(idx, item.trackName, item.trackNumber)} type="button">play</button></span>
        </div>

        )
      }
        
        
       ) : ''}
    </Applet>
  );
};
export default MyTracksWidget;
