import React from "react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

export const LoaderConversation = () => {
  return (
    <div className="loader">
        <Player
        className="loader"
        autoplay
        loop
        src="https://lottie.host/63738fdd-e51e-4c3a-885c-bcf79a6cad22/BfqpVU0Rlt.json"
        style={{ height: '150px', width: '150px' }}
      >
      </Player>
    </div>
  );
};

export const EmptyConversation = () => {
    return (
      <div className="loader">
          <Player
          className="loader"
          autoplay
          loop
          src="https://lottie.host/8a4c1cbc-2397-4eca-8336-c82f083be7c3/k3WKxTFTeo.json"
          style={{ height: '150px', width: '150px' }}
        >
        </Player>
      </div>
    );
};

export const LoaderMesssagePreview = () => {
    return (
        <Player
          autoplay
          loop
          src="https://lottie.host/670f62d4-5e94-4ab5-b583-8cd08321075e/RTEQuYM6Zj.json"
          style={{ height: '50px', width: '50px' }}
        >
        </Player>
    );
};

export const LoaderNoAvatarDM = () => {
  return (
    <Player
      autoplay
      keepLastFrame
      src="https://lottie.host/e05f89c1-039e-4e4c-a654-0031e5df6418/2bjNSZP7UU.json"
      style={{ height: '60px', width: '60px' }}
    >
    </Player>
  );
};

export const LoaderNoAvatarGroup = () => {
  return (
    <Player
      autoplay
      keepLastFrame
      src="https://lottie.host/217d736d-34b9-4ed9-a9c2-bde382d3fcb6/R5di0rGgYR.json"
      style={{ height: '60px', width: '60px' }}
    >
    </Player>
  );
};

export const AddMessageIcon = () => {
  return (
    <Player
      autoplay
      keepLastFrame
      src="https://lottie.host/e6b0e9c7-cecf-40ce-96a1-4305325f0352/1S1RBwOS1x.json"
      style={{ height: '45px', width: '45px' }}
    >
    </Player>
  );
};

