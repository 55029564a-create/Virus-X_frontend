import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// 앞서 분리한 스타일들을 가져옵니다.
import { 
  Container, HeaderTitle, ResultCard, StatusBanner, 
  StatusIcon, StatusText, TargetName, DetailSection, 
  DetailRow, Label, Value, ReasonList, BackButton 
} from './ResultPage.styles';

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자가 메인 페이지(스캔)를 거치지 않고 주소창으로 직접 들어왔을 때 튕겨냅니다.
  if (!location.state) {
    return (
      <Container>
        <HeaderTitle>잘못된 접근입니다.</HeaderTitle>
        <p>파일을 먼저 업로드하여 스캔을 진행해주세요.</p>
        <BackButton onClick={() => navigate('/')}>메인으로 돌아가기</BackButton>
      </Container>
    );
  }

  // UploadPage에서 넘겨준 스캔 결과 데이터입니다.
  const scanData = location.state;
  
  // 상태값이 'VEXIT'(위험)인지 확인합니다.
  const isMalicious = scanData.status === 'VEXIT';

  return (
    <Container>
      <HeaderTitle>Scan Report</HeaderTitle>
      
      <ResultCard>
        {/* 상단 배너: isMalicious 값에 따라 빨강/초록으로 자동 변경됨 */}
        <StatusBanner $isMalicious={isMalicious}>
          <StatusIcon>{isMalicious ? '❌' : '✅'}</StatusIcon>
          <StatusText>
            {isMalicious ? 'VEXIT (위험 차단)' : 'Verified (안전)'}
          </StatusText>
          <TargetName>{scanData.target_name}</TargetName>
        </StatusBanner>

        <DetailSection>
          <DetailRow>
            <Label>AI 위험도 분석 (Risk Score)</Label>
            <Value $isMalicious={isMalicious}>{scanData.risk_score}%</Value>
          </DetailRow>
          
          <DetailRow>
            <Label>스캔 소요 시간</Label>
            <Value>{scanData.scan_time}</Value>
          </DetailRow>

          <DetailRow style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <Label style={{ marginBottom: '10px' }}>주요 판별 근거 (AI Analysis)</Label>
            {/* AI가 분석한 이유들을 리스트 형태로 보여줍니다 */}
            <ReasonList>
              {scanData.ai_reasons && scanData.ai_reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ReasonList>
          </DetailRow>

          <DetailRow style={{ borderBottom: 'none', marginTop: '20px' }}>
            <Label>권장 조치 (Action)</Label>
            <Value $isMalicious={isMalicious}>{scanData.action}</Value>
          </DetailRow>
        </DetailSection>
      </ResultCard>

      <BackButton onClick={() => navigate('/')}>
        + 새로운 파일/URL 검사하기
      </BackButton>
    </Container>
  );
}

export default ResultPage;