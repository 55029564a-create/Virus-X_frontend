import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { scanMalware } from '../api/scanner';

import { 
  Container, UploadCard, Title, Subtitle, DropZone, 
  ScanButton, Spinner, TabContainer, TabButton, UrlInputContainer, UrlInput,
  // 💡 수정된 컴포넌트들 불러오기
  SelectedFileBox, FileInfo, RemoveButton 
} from './UploadPage.styles';

function UploadPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('file'); 
  const [urlValue, setUrlValue] = useState(''); 
  
  // ✨ 다시 단일 파일 상태로 복구
  const [selectedFile, setSelectedFile] = useState(null); 
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FILE_SIZE = 32 * 1024 * 1024;

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: 'error', title: '용량 초과!', text: '32MB 이하의 파일만 업로드 가능합니다.',
        confirmButtonColor: '#38BDF8', background: '#111827', color: '#F8FAFC'
      });
      return false; 
    }
    setSelectedFile(file); 
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) { validateAndSetFile(file); event.target.value = ''; }
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation(); setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragEnter = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); setIsDragActive(false); };

  // ✨ 파일 취소 로직 (X 버튼 클릭 시 실행)
  const handleRemoveFile = (e) => {
    e.stopPropagation(); // 클릭 이벤트가 부모로 번지는 것 방지
    setSelectedFile(null); // 파일을 비워버림
  };

const handleScan = async () => {
    if (activeTab === 'file' && !selectedFile) return;
    if (activeTab === 'url' && !urlValue.trim()) return;

    setIsLoading(true);
    
    try { 
      const payload = activeTab === 'file' ? selectedFile : urlValue;
    
      const resultData = await scanMalware(payload, activeTab);
      
      navigate('/result', { state: resultData });
    } catch (error) {
      Swal.fire({ 
        icon: 'error', title: '서버 에러', text: '서버와 통신 중 문제가 발생했습니다.', 
        confirmButtonColor : '#38BDF8', background: '#111827', color: '#F8FAFC' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled = isLoading || (activeTab === 'file' ? !selectedFile : !urlValue.trim());

  return (
    <Container>
      <UploadCard>
        <Title>Virus<span>X</span></Title>
        <Subtitle>Analyze suspicious files and URLs to detect malware</Subtitle>

        <TabContainer>
          <TabButton $active={activeTab === 'file'} onClick={() => setActiveTab('file')}>File Scan</TabButton>
          <TabButton $active={activeTab === 'url'} onClick={() => setActiveTab('url')}>URL Scan</TabButton>
        </TabContainer>

        {activeTab === 'file' ? (
          <>
            <DropZone
              $isDragActive={isDragActive}
              onClick={() => document.getElementById('fileInput').click()}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📄</div>
              <h3>Choose file</h3>
              <p>or drop it here</p>
              
              <input 
                id="fileInput" type="file" style={{ display: 'none' }}
                onChange={handleFileChange} 
              />
            </DropZone>

            {/* ✨ 선택된 파일이 있을 때 예쁜 박스와 취소(X) 버튼 렌더링 */}
            {selectedFile && (
              <SelectedFileBox>
                <FileInfo><span>📎</span> {selectedFile.name}</FileInfo>
                <RemoveButton onClick={handleRemoveFile} title="업로드 취소">✕</RemoveButton>
              </SelectedFileBox>
            )}
          </>
        ) : (
          <UrlInputContainer>
            <UrlInput 
              type="text" placeholder="e.g., https://suspicious-website.com" 
              value={urlValue} onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isButtonDisabled && handleScan()}
            />
          </UrlInputContainer>
        )}

        <ScanButton onClick={handleScan} disabled={isButtonDisabled}>
          {isLoading ? <><Spinner /> <span>Scanning...</span></> : 'Scan Now'}
        </ScanButton>
      </UploadCard>
    </Container>
  );
}

export default UploadPage;