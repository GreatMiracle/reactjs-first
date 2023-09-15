import videoDoMixi from './vaytien-domixi.mp4';
import React, { useImperativeHandle, useRef } from 'react';
import { forwardRef } from 'react';

function Video(props, ref) {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },

    pause() {
      videoRef.current.pause();
    },
  }));

  return <video ref={videoRef} src={videoDoMixi} width={200} />;
}

export default forwardRef(Video);
