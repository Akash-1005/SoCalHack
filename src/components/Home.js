// Home.js
import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AppContainer = styled.div`
  text-align: center;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad0c4, #ff9a9e);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  animation: ${fadeInDown} 2s;
`;

const Video = styled.video`
  width: 80%;
  max-width: 600px;
  border: 5px solid white;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.05);
  }
`;

const TextView = styled.div`
  width: 80%;
  max-width: 600px;
  height: ${(props) => props.height}px;
  border: 2px solid white;
  border-radius: 5px;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

function Home({ setIsAuthenticated }) {
  const videoRef = useRef(null);
  const [textViewHeight, setTextViewHeight] = useState(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    // Access the user's webcam when the component is mounted
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
      <Button onClick={handleLogout}>Sign Out</Button>
    </AppContainer>
  );
}

export default Home;
