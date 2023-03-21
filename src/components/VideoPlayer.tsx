import React from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '315',
  width: '560',
  playerVars: {
    autoplay: 1,
    controls: 0,
    showinfo: 1,
    modestbranding: 0,
  },
};

const VideoPlayer = ({ videoId }) => (
  <YouTube videoId={videoId} opts={opts} showTitle={true} />
);

export default VideoPlayer