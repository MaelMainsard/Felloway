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


export const NoConv = () => {
  return (
    <Player
    className="w-40"
    autoplay
    loop
    src="https://lottie.host/84666113-9828-4ba6-8be2-08afd8c5d1e0/gbCauPb9il.json"
  >
  </Player>
  );
};

