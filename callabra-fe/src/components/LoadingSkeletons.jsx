import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
import Applet from './Applet';

const ProfileLoadingSkeletons = () => (
  <Applet
    width="100%"
  >
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circle" width={140} height={140} />
        }

        // action={(
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        //   )}
      title={

        <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />

        }
      subheader={(
        <div>
          <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="40%" />
          <Skeleton animation="wave" height={10} width="40%" />
        </div>
)}
    />

    <CardContent>
      <>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />

        <Skeleton animation="wave" height={10} width="80%" />
      </>

    </CardContent>
  </Applet>
);
export default ProfileLoadingSkeletons;
