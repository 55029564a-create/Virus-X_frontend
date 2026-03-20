import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container, HeaderTitle, ResultCard, TopSection, ScoreGauge, ScoreText,
  ScoreNumber, ScoreLabel, SummarySection, TargetName,
  BottomSection, TabContainer, TabButton, SectionTitle, ReasonList,
  EngineGrid, EngineCard, EngineName, EngineResult, BackButton,
  ResultSplitView, OurEngineSection, MainEngineCard, MainEngineName,
  MainEngineResult, OtherEnginesSection,
  ThreatTypeBadge, ActionGuideBox, ActionHeader, ActionList
} from './ResultPage.styles';
import { StatusBadge } from './History.styles';

// ✨ 위협 종류에 따른 맞춤형 행동 지침을 반환하는 함수
const getActionGuide = (isMalicious, threatType, inputType) => {
  if (!isMalicious) {
    return [
      "알려진 보안 위협 엔진과 AI 교차 검증 결과, 안전한 것으로 판단됩니다.",
      "평소처럼 정상적으로 해당 대상(URL/파일)을 사용하셔도 좋습니다."
    ];
  }

  // URL (피싱 등) 판별 시 행동 지침
  if (inputType === 'url') {
    return [
      "해당 링크에 개인정보, 비밀번호, 금융 정보를 절대 입력하지 마십시오.",
      "실수로 정보를 입력했다면, 즉시 동일한 비밀번호를 사용하는 타 사이트의 계정 정보를 변경하십시오.",
      "브라우저 탭을 즉시 닫고 접속 기록을 삭제하는 것을 권장합니다."
    ];
  }

  // File 판별 시 행동 지침 (AI-2가 분류한 타입에 따라 세분화)
  switch (threatType.toLowerCase()) {
    case 'ransomware':
      return [
        "네트워크(Wi-Fi, LAN 선) 연결을 즉시 해제하여 내부망 감염을 차단하십시오.",
        "중요한 문서를 외부 저장소(USB 등)로 백업하는 행위를 즉각 중단하십시오.",
        "해당 파일을 즉시 영구 삭제(Shift+Delete) 하십시오."
      ];
    case 'trojan':
    case 'malware':
      return [
        "해당 파일(.exe, .dll 등)을 절대 실행(더블클릭)하지 마십시오.",
        "이미 실행했다면 PC 전원을 끄거나 네트워크를 차단한 후 전용 백신으로 정밀 검사를 수행하십시오.",
        "해당 파일을 즉시 영구 삭제하십시오."
      ];
    default:
      return [
        "보안 위협이 감지되었습니다. 파일을 실행하지 마십시오.",
        "해당 파일을 즉시 영구 삭제(Shift+Delete)하는 것을 권장합니다."
      ];
  }
};

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('result');

  // 💡 에러가 났던 부분을 전달해주신 해결 코드로 완벽하게 교체했습니다!
  if (!location.state) {
    return (
      <Container>
        <HeaderTitle>잘못된 접근입니다.</HeaderTitle>
        <ResultCard style={{ textAlign: 'center' }}>
          <p style={{ color: '#94A3B8' }}>파일을 먼저 업로드하여 스캔을 진행해주세요.</p>
          <BackButton onClick={() => navigate('/')}>메인으로 돌아가기</BackButton>
        </ResultCard>
      </Container>
    );
  }

  // 💡 기존 코드를 이렇게 수정하세요 (변수명 매칭)
  const scanData = location.state.resultData; // 보따리 통째로 가져오기
  const isMalicious = scanData.is_malware; // 파이썬이 보낸 true/false
  const riskScore = isMalicious ? 95 : 10; // 점수가 없다면 판정에 따라 임시 부여
  const targetName = scanData.filename; // 파일명
  const aiReport = scanData.ai_report; // ⭐️ 이게 바로 제미나이 리포트!

  // 백엔드에서 받아올 데이터 구조 시뮬레이션
  const inputType = scanData.input_type || 'file'; // 'file' 또는 'url'
  const threatType = scanData.threat_type || (isMalicious ? 'Ransomware' : 'Clean');
  const actionGuideSteps = getActionGuide(isMalicious, threatType, inputType);

  const ourEngine = { name: 'Virus-X AI', isMalicious: isMalicious };
  const otherEngines = scanData.vt_engines || [
    { name: 'Google Safebrowsing', isMalicious: isMalicious },
    { name: 'Kaspersky', isMalicious: false },
    { name: 'McAfee', isMalicious: isMalicious },
    { name: 'Fortinet', isMalicious: false },
    { name: 'BitDefender', isMalicious: false },
  ];

  return (
    <Container>
      <HeaderTitle>Scan Report</HeaderTitle>

      <ResultCard>
        {/* --- 1. 상단 영역: 도넛 차트 & 요약 정보 --- */}
        <TopSection>
          <ScoreGauge $score={riskScore} $isMalicious={isMalicious}>
            <ScoreText>
              <ScoreNumber $isMalicious={isMalicious}>{riskScore}</ScoreNumber>
              <ScoreLabel>Risk Score</ScoreLabel>
            </ScoreText>
          </ScoreGauge>

          <SummarySection>
            <div>
              <StatusBadge $isMalicious={isMalicious}>
                {isMalicious ? '🚨 VEXIT (위험 차단)' : '✅ Verified (안전)'}
              </StatusBadge>
            </div>

            <TargetName>
              {scanData.target_name}
              {/* AI-2가 판별한 구체적인 위협 종류 뱃지 표시 */}
              <ThreatTypeBadge $isMalicious={isMalicious}>
                {isMalicious ? `🦠 ${threatType}` : '🛡️ Safe'}
              </ThreatTypeBadge>
            </TargetName>

            {/* 멘토 피드백 반영: 구체적인 사후 대처 가이드라인 박스 */}
            <ActionGuideBox $isMalicious={isMalicious}>
              <ActionHeader $isMalicious={isMalicious}>
                <span>{isMalicious ? '🚨' : '✅'}</span>
                AI 정밀 분석 리포트
              </ActionHeader>
              <div style={{
                padding: '15px',
                lineHeight: '1.6',
                color: '#F8FAFC',
                whiteSpace: 'pre-wrap',
                fontSize: '0.95rem'
              }}>
                {aiReport}
              </div>
            </ActionGuideBox>
          </SummarySection>
        </TopSection>

        {/* --- 2. 하단 영역: 탭(Tab) 메뉴 적용 --- */}
        <BottomSection>
          <TabContainer>
            <TabButton $active={activeTab === 'result'} onClick={() => setActiveTab('result')}>
              종합 판별 결과
            </TabButton>
            <TabButton $active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
              상세 분석 사유
            </TabButton>
          </TabContainer>

          {activeTab === 'result' ? (
            // [탭 1] 종합 판별 결과: 자사(좌) / 타사(우) 스플릿 뷰
            <ResultSplitView>
              {/* 좌측: 우리 AI 큼직한 강조 카드 */}
              <OurEngineSection>
                <div>
                  <SectionTitle>✨ Virus-X AI 상세 분석</SectionTitle>
                  <div style={{ color: '#94A3B8', padding: '10px', backgroundColor: '#1E293B', borderRadius: '8px' }}>
                    <p style={{ color: '#F8FAFC', whiteSpace: 'pre-wrap' }}>{aiReport}</p>
                  </div>
                </div>
                <MainEngineCard>
                  <MainEngineName>
                    <span>🤖</span>
                    {ourEngine.name}
                  </MainEngineName>
                  <MainEngineResult $isMalicious={ourEngine.isMalicious}>
                    {ourEngine.isMalicious ? 'MALICIOUS' : 'CLEAN'}
                  </MainEngineResult>
                  <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0 }}>자체 머신러닝 분석 결과</p>
                </MainEngineCard>
              </OurEngineSection>

              {/* 우측: 타사 API 엔진 리스트 */}
              <OtherEnginesSection>
                <SectionTitle>🛡️ Third-party Vendors</SectionTitle>
                <EngineGrid>
                  {otherEngines.map((engine, index) => (
                    <EngineCard key={index} $isMalicious={engine.isMalicious}>
                      <EngineName>{engine.name}</EngineName>
                      <EngineResult $isMalicious={engine.isMalicious}>
                        {engine.isMalicious ? 'Malicious' : 'Clean'}
                      </EngineResult>
                    </EngineCard>
                  ))}
                </EngineGrid>
              </OtherEnginesSection>
            </ResultSplitView>

          ) : (
            // [탭 2] 상세 분석 사유: 기존 리스트 뷰
            <div>
              <SectionTitle>✨ Virus-X AI 상세 판별 근거</SectionTitle>
              <ReasonList>
                {scanData.ai_reasons && scanData.ai_reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}

                <li style={{ color: '#64748B', marginTop: '20px', listStyle: 'none' }}>
                  <strong>Scan Time:</strong> {scanData.scan_time || '0.14s'} <br />
                  {scanData.file_hash && `MD5 Hash: ${scanData.file_hash}`}
                </li>
              </ReasonList>
            </div>
          )}
        </BottomSection>
      </ResultCard>

      <BackButton onClick={() => navigate('/')}>
        + 새로운 파일/URL 검사하기
      </BackButton>
    </Container>
  );
}

export default ResultPage;