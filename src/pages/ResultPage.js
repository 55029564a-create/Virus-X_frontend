import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  HeaderTitle,
  ResultCard,
  TopSection,
  ScoreGauge,
  ScoreText,
  ScoreNumber,
  ScoreLabel,
  SummarySection,
  TargetName,
  ThreatTypeBadge,
  ActionGuideBox,
  ActionHeader,
  ActionList,
  BottomSection,
  SectionTitle,
  AICard,
  AIHeader,
  AIBody,
  LockedOverlay,
  LockIcon,
  LockText,
  UnlockButton,
  FeatureTag,
  BackButton,
} from "./ResultPage.styles";

// 위협 종류에 따른 맞춤형 행동 지침
const getActionGuide = (isMalicious, threatType, inputType) => {
  if (!isMalicious) {
    return [
      "VEXIT 3단계 AI 교차 검증 결과, 안전한 것으로 판단됩니다.",
      "평소처럼 정상적으로 해당 대상(URL/파일)을 사용하셔도 좋습니다.",
    ];
  }

  if (inputType === "url") {
    return [
      "해당 링크에 개인정보나 비밀번호를 절대 입력하지 마십시오.",
      "브라우저 탭을 즉시 닫고 접속 기록을 삭제하는 것을 권장합니다.",
    ];
  }

  switch (threatType.toLowerCase()) {
    case "ransomware":
      return [
        "네트워크(Wi-Fi, LAN) 연결을 즉시 해제하여 내부망 감염을 차단하십시오.",
        "해당 파일을 절대 실행하지 말고 즉시 영구 삭제(Shift+Delete) 하십시오.",
      ];
    default:
      return [
        "보안 위협이 감지되었습니다. 파일을 실행하지 마십시오.",
        "해당 파일을 즉시 삭제하고, VEXIT 전용 백신으로 PC 정밀 검사를 수행하세요.",
      ];
  }
};

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 💡 [핵심] 현재 접속자가 회원인지 확인 (토큰 유무)
  const isMember = !!localStorage.getItem("accessToken");

  // 예외 처리: 비정상 접근 시
  if (!location.state) {
    return (
      <Container>
        <HeaderTitle>잘못된 접근입니다.</HeaderTitle>
        <ResultCard style={{ textAlign: "center" }}>
          <p style={{ color: "#94A3B8" }}>
            파일을 먼저 업로드하여 스캔을 진행해주세요.
          </p>
          <BackButton onClick={() => navigate("/")}>
            메인으로 돌아가기
          </BackButton>
        </ResultCard>
      </Container>
    );
  }

  // 데이터 파싱 (백엔드 규격이 바뀌어도 터지지 않도록 방어 코드 작성)
  const scanData = location.state.resultData;
  const isMalicious = scanData.is_malware;
  const riskScore = isMalicious ? 95 : 10;
  const inputType = scanData.input_type || "file";
  const threatType =
    scanData.threat_type || (isMalicious ? "Trojan/Generic" : "Clean");
  const actionGuideSteps = getActionGuide(isMalicious, threatType, inputType);

  // AI 개별 데이터 (추후 백엔드에서 분리해서 보내줄 데이터를 미리 세팅)
  const ai1Result = "파일 헤더 및 정적 시그니처 검사 결과 이상 없음.";
  const ai2Features = scanData.features || {
    VirtualAlloc: 1,
    CreateRemoteThread: 1,
  };
  const ai3Report = scanData.ai_report || "상세 리포트를 생성할 수 없습니다.";

  return (
    <Container>
      <HeaderTitle>Scan Report</HeaderTitle>

      <ResultCard>
        {/* --- 1. 상단 영역: 모두에게 공개되는 핵심 결과 & 행동 지침 --- */}
        <TopSection>
          <ScoreGauge $score={riskScore} $isMalicious={isMalicious}>
            <ScoreText>
              <ScoreNumber $isMalicious={isMalicious}>{riskScore}</ScoreNumber>
              <ScoreLabel>Risk Score</ScoreLabel>
            </ScoreText>
          </ScoreGauge>

          <SummarySection>
            <TargetName>
              {scanData.filename || scanData.target_name || "Unknown Target"}
              <ThreatTypeBadge $isMalicious={isMalicious}>
                {isMalicious ? `🦠 ${threatType}` : "🛡️ Safe"}
              </ThreatTypeBadge>
            </TargetName>

            <ActionGuideBox $isMalicious={isMalicious}>
              <ActionHeader>
                <span>{isMalicious ? "🚨" : "✅"}</span> 즉각 조치 및 행동 지침
              </ActionHeader>
              <ActionList>
                {actionGuideSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ActionList>
            </ActionGuideBox>
          </SummarySection>
        </TopSection>

        {/* --- 2. 하단 영역: AI 개별 분석 결과 (회원/비회원 분기) --- */}
        <BottomSection>
          <SectionTitle>🔍 VEXIT 3단계 개별 분석 데이터</SectionTitle>

          {/* AI-1: 정적 분석 (비회원도 볼 수 있음) */}
          <AICard>
            <AIHeader>
              <h4>
                <span>⚙️</span> AI-1 : 정적 구조 및 시그니처 검사
              </h4>
              <span>Basic Scan</span>
            </AIHeader>
            <AIBody $isLocked={false}>
              파일의 기본적인 구조와 알려진 악성 시그니처를 대조한 결과입니다.
              <br />
              <span style={{ color: "#94A3B8" }}>{ai1Result}</span>
            </AIBody>
          </AICard>

          {/* AI-2: IAT 특징 추출 (비회원은 잠김) */}
          <AICard>
            <AIHeader>
              <h4>
                <span>🧬</span> AI-2 : 심층 행위 특징(IAT) 추출 알고리즘
              </h4>
              <span>Deep Features</span>
            </AIHeader>
            <AIBody $isLocked={!isMember}>
              정상 파일 대비 비정상적으로 높게 호출된 API 함수 목록입니다.
              <br />
              <div style={{ marginTop: "10px" }}>
                {Object.keys(ai2Features).length > 0 ? (
                  Object.keys(ai2Features).map((key) => (
                    <FeatureTag key={key}>{key}</FeatureTag>
                  ))
                ) : (
                  <span>특이점 없음</span>
                )}
              </div>
            </AIBody>

            {/* 비회원용 오버레이 */}
            {!isMember && (
              <LockedOverlay>
                <LockIcon>🔒</LockIcon>
                <LockText>
                  AI가 추출한 <span>심층 특징점(Features)</span>은 회원에게만
                  제공됩니다.
                </LockText>
                <UnlockButton onClick={() => navigate("/signup")}>
                  3초 만에 무료가입하고 확인하기
                </UnlockButton>
              </LockedOverlay>
            )}
          </AICard>

          {/* AI-3: LLM 행동 예측 (비회원은 잠김) */}
          <AICard>
            <AIHeader>
              <h4>
                <span>🤖</span> AI-3 : LLM 기반 크로스체크 및 최종 판별
              </h4>
              <span>Expert Report</span>
            </AIHeader>
            <AIBody $isLocked={!isMember}>
              AI-1과 AI-2의 데이터를 종합하여 판단한 보안 전문가 수준의 상세
              리포트입니다.
              <br />
              <br />
              <span style={{ color: "#F8FAFC", whiteSpace: "pre-wrap" }}>
                {ai3Report}
              </span>
            </AIBody>

            {/* 비회원용 오버레이 */}
            {!isMember && (
              <LockedOverlay>
                <LockIcon>🔒</LockIcon>
                <LockText>
                  제미나이가 작성한 <span>전문가 수준의 리포트</span>는
                  회원에게만 제공됩니다.
                </LockText>
                <UnlockButton onClick={() => navigate("/login")}>
                  로그인하고 전체 리포트 보기
                </UnlockButton>
              </LockedOverlay>
            )}
          </AICard>
        </BottomSection>
      </ResultCard>

      <BackButton onClick={() => navigate("/")}>
        + 새로운 파일/URL 검사하기
      </BackButton>
    </Container>
  );
}

export default ResultPage;
