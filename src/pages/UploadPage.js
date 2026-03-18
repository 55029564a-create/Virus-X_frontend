import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { scanMalware } from '../api/scanner';

// 💡 방금 분리한 스타일 파일에서 껍데기들을 싹 다 불러옵니다!
import { 
  Container, UploadCard, Title, Subtitle, DropZone, 
  SelectedFileBox, ScanButton, Spinner 
} from './UploadPage.styles';

function UploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FILE_SIZE = 32 * 1024 * 1024;

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error',
        title: '용량 초과!',
        text: '32MB 이하의 파일만 업로드 가능합니다.',
        confirmButtonColor: '#1a73e8'
      });
      return false; 
    }
    setSelectedFile(file); 
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
      const resultData = await scanMalware(selectedFile);
      navigate('/result', { state: resultData });

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