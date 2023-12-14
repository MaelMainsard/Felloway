import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';

export const BellIcon = () => {
  return (
    <Player
    className="w-8"
    autoplay
    keepLastFrameTime
    src="https://lottie.host/7b27fbbb-0ed7-4ab4-bbc1-88e2059126b6/96kH8SQeKQ.json"
  >
  </Player>
  );
};

export const PulseLoader = () => {
  return (
    <Player
    className="w-8"
    autoplay
    loop
    src="https://lottie.host/b1b59991-34a6-4740-ab42-6a1fabc35d5f/zgYg7gzlGL.json"
  >
  </Player>
  );
};

export const CircleLoader = () => {
  return (
    <Player
    className="w-12"
    autoplay
    loop
    src="https://lottie.host/327e72f5-6408-4bd7-b9ba-70100de20c67/nMnBJbCOlp.json"
  >
  </Player>
  );
};

