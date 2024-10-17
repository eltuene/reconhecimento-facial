// styles.js
import styled, { keyframes } from "styled-components";

export const SpinnerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Fundo escuro semitransparente
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; // Para sobrepor outros elementos
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 80vh;
  background-color: #282c34;
  color: white;
  overflow: hidden;
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1f23;
  padding: 20px;
  box-sizing: border-box;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 70%;
`;

export const Label = styled.label`
  margin: 10px 0 5px;
  font-weight: bold;
  color: #9acd32;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  margin-bottom: 15px;
  padding: 8px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 15px 75px;
  background-color: #9acd32;
  color: #1b1f23;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #76b900;
  }
`;

export const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1f23;
  padding: 20px;
  box-sizing: border-box;
`;

export const Video = styled.video`
  width: 100%;
  max-width: 860px;
  height: auto;
  transform: scaleX(-1); /* Espelhar horizontalmente */
  border: 3px solid #9acd32;
  border-radius: 8px;
`;

export const CapturedImageContainer = styled.div`
  text-align: center;
  flex: 1;
`;

export const CapturedImage = styled.img`
  max-width: 100%;
  height: auto;
  transform: scaleX(-1);
  border-radius: 8px;
`;

export const CaptureButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CaptureAnotherButton = styled(Button)`
  padding: 15px 75px;
  background-color: #9acd32;
  color: #1b1f23;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #76b900;
  }
`;

export const Title = styled.h2`
  color: #9acd32;
  text-align: center;
  width: 100%;
  font-size: 24px;
`;

export const InfoMessage = styled.div`
  background-color: #282c34;
  border: 1px solid #9acd32;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const MessageText = styled.p`
  color: #fff;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
`;

export const AlertBox = styled.div`
  background-color: #282c34;
  border: 1px solid #9acd32;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const InfoIcon = styled.span`
  font-size: 20px;
  color: #9acd32;
  margin-right: 10px;
`;
