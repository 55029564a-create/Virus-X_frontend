import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled,{ keyframes} from 'styled-components'; // 스타일드 컴포넌트 불러오기
import axios from 'axios';
import Swal from 'sweetalert2';

// --- 🎨 여기서부터 스타일이 입혀진 나만의 컴포넌트(태그)를 만듭니다 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  padding: 20px;
`;

const UploadCard = styled.div`
  background: #ffffff;
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
  max-width: 650px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 8px;
  letter-spacing: -1px;

  /* 글자 안의 span 태그만 파란색으로! */
  span {
    color: #1a73e8;
  }
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #5f6368;
  margin-bottom: 40px;
`;

// 💡 스타일드 컴포넌트의 꽃: 상태(props)에 따라 스타일을 바꿀 수 있습니다!
const DropZone = styled.div`
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

const SelectedFileBox = styled.div`
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

const ScanButton = styled.button`
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
  
  /* 💡 스피너와 글자를 가로로 완벽하게 정렬하는 비법 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* 스피너와 글자 사이의 간격 */
  
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
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

// --- ⚙️ 여기서부터는 실제 화면을 그리는 리액트 컴포넌트입니다 ---

function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FILE_SIZE = 32 * 1024 * 1024;

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      // 2번 퀘스트: 못생긴 alert 대신 예쁜 Swal 팝업 띄우기!
      Swal.fire({
        icon: 'error',
        title: '용량 초과!',
        text: '32MB 이하의 파일만 업로드 가능합니다.',
        confirmButtonColor: '#1a73e8'
      });
      return false; // 통과 실패
    }
    setSelectedFile(file); // 통과하면 파일 저장
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      validateAndSetFile(file);
      event.target.value = '';
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    try { 
      // 백엔드 완성시 주석 풀기/////////////////////////////////////////////
      // const formData = new FormData();
      // formData.append('file', selectedFile);
      // const response = await axios.post('http://localhost:8000/api/scan', formData);
      // const resultData = response.data;
      //////////////////////////////////////////////////////////////

      await new Promise(resolve => setTimeout(resolve,3000));

      const mockResultData = { 
        status: selectedFile.name.includes('exe') ? 'malicious' : 'clean',
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        aiScore: selectedFile.name.includes('exe') ? '98%' : '2%',
        vtDetections: selectedFile.name.includes('exe') ? '53 / 72' : '0 / 72',
      };
      
      navigate('/result', {state: mockResultData});
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '서버 에러',
        text: '서버와 통신 중 문제가 발생했습니다.',
        confirmButtonColor : '#1a73e8'
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <UploadCard>
        <Title>Virus<span>X</span></Title>
        <Subtitle>Analyze suspicious files to detect malware</Subtitle>

        {/* $isDragActive 라는 이름으로 현재 드래그 상태를 전달합니다 */}
        <DropZone
          $isDragActive={isDragActive}
          onClick={() => document.getElementById('fileInput').click()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄</div>
          <h3 style={{ margin: '0 0 8px 0', color: '#202124' }}>Choose file</h3>
          <p style={{ margin: 0, color: '#5f6368' }}>or drop it here</p>
          
          <input 
            id="fileInput"
            type="file" 
            style={{ display: 'none' }}
            onChange={handleFileChange} 
          />
        </DropZone>

        {selectedFile && (
          <SelectedFileBox>
            <span>📎</span> {selectedFile.name}
          </SelectedFileBox>
        )}

        <ScanButton onClick={handleScan} disabled={!selectedFile || isLoading}>
          {isLoading ? (
            <>
              <Spinner /> <span>Scanning...</span>
            </>
          ) : (
            'Confirm upload'
          )}
        </ScanButton>
      </UploadCard>
    </Container>
  );
}

export default UploadPage;