import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 20px;
`;

export const UploadCard = styled.div`
  background: #ffffff;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
  max-width: 650px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 8px;
  letter-spacing: -1px;

  span {
    color: #1a73e8;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #5f6368;
  margin-bottom: 40px;
`;

export const DropZone = styled.div`
  border: 2px dashed ${props => (props.$isDragActive ? '#1a73e8' : '#dadce0')};
  background-color: ${props => (props.$isDragActive ? '#f4f8fe' : '#ffffff')};
  border-radius: 12px;
  padding: 60px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #1a73e8;
    background-color: #f4f8fe;
  }
`;

export const SelectedFileBox = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #e8f0fe;
  border: 1px solid #d2e3fc;
  border-radius: 8px;
  color: #1967d2;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const ScanButton = styled.button`
  margin-top: 30px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  
  margin-left: auto;
  margin-right: auto;

  &:hover:not(:disabled) {
    background-color: #1557b0;
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #dadce0;
    color: #9aa0a6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;