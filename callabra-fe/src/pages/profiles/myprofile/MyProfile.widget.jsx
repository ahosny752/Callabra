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

const MyProfileWidget = ({
  profile,
}) => {
  const swrOptions = {
    shouldRetryOnError: false,
    revalidateOnFocus: true,
  };
  const baseURL = 'https://us-central1-fir-react-9c5f4.cloudfunctions.net/api'

  const { data, error, isValidating } = useRequest(`${baseURL}/user`, swrOptions);

  const userData = data || {};

  console.log(userData, 'data');

  const {

    avatarUrl,
    createdAt,
    email,
    firstName,
    friends,
    genre,
    handle,
    instrument,
    lastName,

  } = userData.profile || {};

  const instrumentOptions = instrument || [];
  const genreOptions = genre || [];
  console.log('instruments i can play');
  if (!data) {
    return <ProfileLoadingSkeletons />;
  }
  return (
    <Applet
      width="100%"
    >
      <CardHeader
        avatar={(
          <Avatar
            style={{
              width: '140px',
              height: '140px',
            }}
            alt="Remy Sharp"
            src={avatarUrl}
          />
        )}
        action={(
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          )}
        title={(
          <div>
            <Typography
              variantMapping="h1"
            >

              <span style={{
                fontWeight: 'bold',
              }}
              >
                {`${firstName} ${lastName}` }

              </span>

              <span style={{
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              >
                {' '}
                (@
                {handle}
                )
                {' '}

              </span>

            </Typography>
          </div>
              )}

        subheader={(
          <div>
            <div>{email}</div>
            <div>
              lives in:  
            </div>
            <hr
              style={{
                marginTop: ' 6px',
                marginBottom: '0px',
              }}
            />
            <div style={{ marginTop: '5px' }}>

              <div>
                <span style={{
                  paddingRight: '6px',
                }}
                >
                  Instruments:
                </span>
                { instrumentOptions.map((item) => {
                  if (item.canPlay === true) {
                    return (
                      <>
                        <span style={{
                          height: '3px',
                          width: '3px',
                          backgroundColor: 'black',
                          borderRadius: '50%',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        }}
                        />
                        <span
                          style={{
                            paddingLeft: '6px',
                            paddingRight: '6px',
                          }}
                        >
                          {item.name}
                        </span>
                      </>

                    );
                  }
                  return null;
                })}

              </div>

              <div>
                <span style={{
                  paddingRight: '6px',

                }}
                >
                  Genres:
                </span>
                { genreOptions.map((item) => {
                  if (item.canPlay === true) {
                    return (
                      <>
                        <span style={{
                          height: '3px',
                          width: '3px',
                          backgroundColor: 'black',
                          borderRadius: '50%',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        }}
                        />
                        <span
                          style={{
                            paddingLeft: '6px',
                            paddingRight: '6px',
                          }}
                        >
                          {item.name}
                        </span>
                      </>

                    );
                  }
                  return null;
                })}

              </div>
              <hr
                style={{
                  marginTop: ' 6px',
                  marginBottom: '0px',
                }}
              />
              <div style={{
                marginTop: '8px',
                marginRight: '8px',
              }}
              >

                {'Artist\'s I sound like:'}

                <span style={{
                  paddingLeft: '8px',
                }}
                >
                  Flex Luthor
                </span>
              </div>

            </div>
          </div>

)}

      />

      <CardContent>
        <>

          <div>
            <Typography>
            My bio will go here

            </Typography>
          </div>
        </>

      </CardContent>
    </Applet>
  );
};
export default MyProfileWidget;
