import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// --- 🎨 스타일드 컴포넌트 정의 ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 80vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
`;

const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 30px;
`;

const ResultCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  overflow: hidden; /* 상단 띠 바깥으로 안 튀어나오게 */
`;

// props.$isMalicious 상태에 따라 상단 띠 색상이 바뀝니다!
const StatusBanner = styled.div`
  background-color: ${props => (props.$isMalicious ? '#d93025' : '#188038')};
  color: white;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const StatusText = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
`;

const DetailSection = styled.div`
  padding: 40px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f4;
  font-size: 1.1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #5f6368;
  font-weight: 500;
`;

// 점수도 상태에 따라 색상이 바뀝니다
const Value = styled.span`
  font-weight: 700;
  color: ${props => (props.$isMalicious ? '#d93025' : '#202124')};
`;

const BackButton = styled.button`
  margin-top: 40px;
  background-color: transparent;
  color: #1a73e8;
  border: 2px solid #1a73e8;
  border-radius: 24px;
  padding: 12px 32px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f4f8fe;
  }
`;

// --- ⚙️ 실제 화면 렌더링 ---

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    return (
      <Container>
        <h2>잘못된 접근입니다. 파일을 먼저 업로드해주세요.</h2>
        <BackButton onClick={() => navigate('/')}>메인으로 돌아가기</BackButton>
      </Container>
    )
  }

  // 💡 임시 데이터 (나중에 백엔드에서 받아올 데이터 구조)
  // status를 'malicious'로 바꿔보시면 화면이 빨간색으로 확 변합니다!
  const scanData = location.state;
  const isMalicious = scanData.status === 'malicious';

  return (
    <Container>
      <HeaderTitle>Analysis Report</HeaderTitle>
      
      <ResultCard>
        {/* 상단 상태 배너 (빨간색 or 초록색) */}
        <StatusBanner $isMalicious={isMalicious}>
          <StatusIcon>{isMalicious ? '⚠️' : '✅'}</StatusIcon>
          <StatusText>
            {isMalicious ? 'Malicious Activity Detected' : 'No security vendors flagged this file'}
          </StatusText>
          <div style={{ marginTop: '10px', opacity: 0.9 }}>{scanData.fileName}</div>
        </StatusBanner>

        {/* 하단 상세 정보 */}
        <DetailSection>
          <DetailRow>
            <Label>File Size</Label>
            <Value>{scanData.fileSize}</Value>
          </DetailRow>
          <DetailRow>
            <Label>Virus-X AI Confidence</Label>
            <Value $isMalicious={isMalicious}>{scanData.aiScore}</Value>
          </DetailRow>
          <DetailRow>
            <Label>VirusTotal Engines</Label>
            <Value $isMalicious={isMalicious}>{scanData.vtDetections}</Value>
          </DetailRow>
        </DetailSection>
      </ResultCard>

      <BackButton onClick={() => navigate('/')}>
        Analyze another file
      </BackButton>
    </Container>
  );
}

export default ResultPage;