import React, { useState } from 'react';
import Applet from './Applet';
import { StyledSoundCloudWidget } from '../styledComponents/AudioPlayer.styled';
import MyTracksWidget from '../pages/profiles/myprofile/MyTracks.widget';

const SoundCloudWidget = ({
  profile,
}) => {
  let lastKnownPosition = 0;
  let ticking = false;
  function doSomething(scrollPosition) {
    const audioPlayer = document.getElementById('soundcloud-applet');
    if (audioPlayer && scrollPosition >= 333) {
      audioPlayer.style.position = 'fixed';
      audioPlayer.style.width = '540px';
      audioPlayer.style.top = '85px';
    } else if (audioPlayer && scrollPosition <= 333) {
      audioPlayer.style.position = 'unset';
      audioPlayer.style.width = '100%';
      audioPlayer.style.top = 'static';
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
  const [trackID, setTrackID] = useState(724229374);
  //   const trackID = 724229374;
  const shouldAutoPlay = false;

  return (
    <StyledSoundCloudWidget>

      <div
        id="soundcloud-applet"
        style={{
          zIndex: '100',
        }}
      >
        <Applet
          width="100%"
          height="150px"
        >

          <iframe
            id="testWidget"
            title="SOUNDCLOUD"
            style={{
              width: '100%',
              height: '100%',
            }}
            scrolling="no"
            frameBorder="yes"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackID}&color=%23ff5500&auto_play=${shouldAutoPlay}&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
          />

        </Applet>

        <MyTracksWidget
          profile={profile}
          setTrackID={setTrackID}
        />
      </div>
    </StyledSoundCloudWidget>

  );
};

export default SoundCloudWidget;
