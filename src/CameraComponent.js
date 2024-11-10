// CameraComponent.js
import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Include your styled components and keyframes here

function CameraComponent({ onSignOut }) {
  const videoRef = useRef(null);
  const [textViewHeight, setTextViewHeight] = useState(0);

  useEffect(() => {
    // Access the user's webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Update video dimensions after metadata is loaded
          videoRef.current.onloadedmetadata = () => {
            const videoHeight = videoRef.current.videoHeight;
            const videoWidth = videoRef.current.videoWidth;

            // Calculate the displayed video height based on CSS
            const displayedVideoWidth = videoRef.current.clientWidth;
            const displayedVideoHeight =
              (videoHeight / videoWidth) * displayedVideoWidth;

            // Set text view height to 25% of the displayed video height
            setTextViewHeight(displayedVideoHeight * 0.25);
          };
        }
      })
      .catch((err) => {
        console.error('Error accessing webcam: ', err);
      });
  }, []);

  return (
    <AppContainer>
      <Title>Camera Clone</Title>
      <Video ref={videoRef} autoPlay playsInline />
      <TextView height={textViewHeight}>
        <p>This is your text view content.</p>
      </TextView>
      <Button onClick={onSignOut}>Sign Out</Button>
    </AppContainer>
  );
}

export default CameraComponent;
