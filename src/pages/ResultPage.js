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
  AIBodyWrapper,
  AIBody,
  AIDetailRow,
  AITag,
  AINormalTag,
  ReasonList,
  LockedOverlay,
  LockIcon,
  LockText,
  UnlockButton,
  BackButton,
} from "./ResultPage.styles";

const getActionGuide = (isMalicious, threatType, inputType) => {
  if (!isMalicious)
    return [
      "VEXIT 종합 분석 결과, 안전한 것으로 판단됩니다.",
      "평소처럼 정상적으로 해당 파일을 사용하셔도 좋습니다.",
    ];

  if (inputType === "url")
    return [
      "해당 링크에 개인정보나 비밀번호를 절대 입력하지 마십시오.",
      "브라우저 탭을 즉시 닫고 접속 기록을 삭제하는 것을 권장합니다.",
    ];

  return [
    "보안 위협이 감지되었습니다. 파일을 절대 실행하지 마십시오.",
    "해당 파일을 즉시 영구 삭제(Shift+Delete) 하십시오.",
    "네트워크를 분리하고 VEXIT 전용 백신으로 PC 정밀 검사를 수행하세요.",
  ];
};

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isMember = !!localStorage.getItem("accessToken");

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

  // 1. 전체 종합 결과 데이터 (상단용)
  const scanData = location.state.resultData;
  const isMalicious = scanData.is_malware;
  const riskScore = scanData.risk_score || (isMalicious ? 98 : 5);
  const inputType = scanData.input_type || "file";
  const overallThreatType =
    scanData.threat_type || (isMalicious ? "Trojan" : "Clean");
  const actionGuideSteps = getActionGuide(
    isMalicious,
    overallThreatType,
    inputType,
  );

  // 2. ✨ 백엔드 DTO 규격에 맞춘 개별 AI 분석 리스트 (하단용)
  // 실제 백엔드 연동 시: const aiAnalysisList = scanData.ai_results;
  // 현재는 테스트용 가짜 데이터 삽입
  const aiAnalysisList = scanData.ai_results || [
    {
      modelName: "AI-1 : 정적 구조 및 시그니처 검사",
      riskScore: 12.0,
      verdict: "Clean",
      threatType: "None",
      reasons: [
        "PE 구조가 정상적이며 알려진 악성 시그니처가 탐지되지 않았습니다.",
      ],
      scanTimeMs: 120,
    },
    {
      modelName: "AI-2 : 심층 행위 특징(IAT) 추출 알고리즘",
      riskScore: 92.5,
      verdict: "Malicious",
      threatType: "Trojan",
      reasons: [
        "비정상적인 프로세스 인젝션 API(VirtualAllocEx) 호출 패턴이 발견되었습니다.",
        "정상 파일 대비 암호화 및 네트워크 통신 관련 API 호출 빈도가 과다합니다.",
      ],
      scanTimeMs: 450,
    },
    {
      modelName: "AI-3 : LLM 기반 교차 검증 및 행동 예측",
      riskScore: 98.0,
      verdict: "Malicious",
      threatType: "Trojan/Ransomware",
      reasons: [
        "AI-1과 AI-2의 분석 결과를 종합할 때, 전형적인 트로이목마 행위가 예상됩니다.",
        "실행 시 외부 서버와 백도어 통신을 맺고 추가 악성 페이로드를 다운로드할 위험성이 매우 높습니다.",
      ],
      scanTimeMs: 1250,
    },
  ];

  return (
    <Container>
      <HeaderTitle>Scan Report</HeaderTitle>

      <ResultCard>
        {/* --- 상단 영역: 종합 판단 결과 --- */}
        <TopSection>
          <ScoreGauge $score={riskScore} $isMalicious={isMalicious}>
            <ScoreText>
              <ScoreNumber $isMalicious={isMalicious}>{riskScore}</ScoreNumber>
              <ScoreLabel>Risk Score</ScoreLabel>
            </ScoreText>
          </ScoreGauge>

          <SummarySection>
            <TargetName>
              {scanData.target_name || "Unknown_Target.exe"}
              <ThreatTypeBadge $isMalicious={isMalicious}>
                {isMalicious ? `🦠 ${overallThreatType}` : "🛡️ Safe"}
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

        {/* --- 하단 영역: 백엔드 DTO 기반 개별 AI 분석 결과 --- */}
        <BottomSection>
          <SectionTitle>🔍 VEXIT 3단계 개별 분석 데이터</SectionTitle>

          {aiAnalysisList.map((ai, index) => {
            // 비회원이면 AI-2, AI-3(index 1, 2)는 잠금 처리
            const isLocked = !isMember && index > 0;
            const isAiMalicious = ai.verdict.toLowerCase() === "malicious";

            return (
              <AICard key={index}>
                <AIHeader>
                  <h4>
                    <span>
                      {index === 0 ? "⚙️" : index === 1 ? "🧬" : "🤖"}
                    </span>{" "}
                    {ai.modelName}
                  </h4>
                  <span>{ai.scanTimeMs}ms</span>
                </AIHeader>

                {/* 💡 AIBodyWrapper가 자물쇠의 크기를 카드 내부에 딱 맞게 고정합니다. */}
                <AIBodyWrapper>
                  <AIBody $isLocked={isLocked}>
                    {/* DTO 점수, 결과, 타입 표시 */}
                    <AIDetailRow>
                      <AITag $isMalicious={isAiMalicious}>
                        {isAiMalicious ? "🚨 위험" : "✅ 안전"} (Score:{" "}
                        {ai.riskScore})
                      </AITag>
                      {ai.threatType && ai.threatType !== "None" && (
                        <AINormalTag>분류: {ai.threatType}</AINormalTag>
                      )}
                    </AIDetailRow>

                    {/* DTO 근거(Reasons) 표시 */}
                    <strong>분석 근거:</strong>
                    <ReasonList style={{ marginTop: "10px" }}>
                      {ai.reasons.map((reason, rIdx) => (
                        <li key={rIdx}>{reason}</li>
                      ))}
                    </ReasonList>
                  </AIBody>

                  {/* 💡 비회원일 경우 자물쇠 오버레이 덮기 */}
                  {isLocked && (
                    <LockedOverlay>
                      <LockIcon>🔒</LockIcon>
                      <LockText>
                        AI가 분석한 <span>상세 판별 근거</span>는 회원에게만
                        제공됩니다.
                      </LockText>
                      <UnlockButton
                        onClick={() =>
                          navigate(index === 1 ? "/signup" : "/login")
                        }
                      >
                        {index === 1
                          ? "3초 만에 무료가입하고 확인하기"
                          : "로그인하고 전체 리포트 보기"}
                      </UnlockButton>
                    </LockedOverlay>
                  )}
                </AIBodyWrapper>
              </AICard>
            );
          })}
        </BottomSection>
      </ResultCard>

      <BackButton onClick={() => navigate("/scan")}>
        + 새로운 파일/URL 검사하기
      </BackButton>
    </Container>
  );
}

export default ResultPage;
