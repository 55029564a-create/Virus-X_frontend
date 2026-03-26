import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  ResultCard,
  Title,
  Subtitle,
  HistoryNotice,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  VerdictBadge,
  SectionTitle,
  AiResultList,
  AiResultCard,
  AiResultHeader,
  ModelName,
  ScoreBadge,
  VerdictText,
  ThreatType,
  ReasonList,
  ReasonItem,
  EmptyBox,
  ActionGuideBox,
  ActionGuideTitle,
  ActionGuideText,
  UpgradeSection,
  UpgradeTitle,
  UpgradeDesc,
  UpgradeButtonGroup,
  UpgradeButton,
  BackButton,
} from "./ResultPage.styles";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.resultData;
  const isLoggedIn = !!localStorage.getItem("accessToken");

  if (!resultData) {
    return (
      <Container>
        <ResultCard>
          <EmptyBox>
            검사 결과가 없습니다.
            <br />
            다시 검사해주세요.
          </EmptyBox>

          <BackButton onClick={() => navigate("/scan")}>
            검사 페이지로 이동
          </BackButton>
        </ResultCard>
      </Container>
    );
  }

  const {
    is_malware,
    risk_score,
    target_name,
    input_type,
    threat_type,
    ai_results = [],
    from_history,
  } = resultData;

  const finalVerdictColor = is_malware ? "danger" : "safe";

  const getGuide = () => {
    if (is_malware) {
      return {
        title: "즉시 조치 필요 🚨",
        text: "파일 실행을 중단하고 격리 및 추가 보안 검사를 진행하세요.",
      };
    }

    if (risk_score >= 40) {
      return {
        title: "주의 필요 ⚠️",
        text: "완전 안전하지 않을 수 있으니 재검사를 권장합니다.",
      };
    }

    return {
      title: "안전 수준 ✔",
      text: "현재 기준 위험 요소는 발견되지 않았습니다.",
    };
  };

  const guide = getGuide();

  return (
    <Container>
      <ResultCard>
        <Title>AI 검사 결과</Title>

        <Subtitle>{input_type === "file" ? "파일" : "URL"} 분석 결과</Subtitle>

        {/* 히스토리 안내 */}
        {from_history && (
          <HistoryNotice>
            이 결과는 저장된 검사 이력을 기반으로 구성되었습니다.
          </HistoryNotice>
        )}

        {/* 요약 */}
        <SummaryGrid>
          <SummaryCard>
            <SummaryLabel>검사 대상</SummaryLabel>
            <SummaryValue>{target_name}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>위험 점수</SummaryLabel>
            <SummaryValue>{risk_score}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>판정</SummaryLabel>
            <SummaryValue>
              <VerdictBadge $type={finalVerdictColor}>
                {is_malware ? "🚨 악성" : "✅ 안전"}
              </VerdictBadge>
            </SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>위협 유형</SummaryLabel>
            <SummaryValue>{threat_type}</SummaryValue>
          </SummaryCard>
        </SummaryGrid>

        {/* 가이드 */}
        <ActionGuideBox $danger={is_malware}>
          <ActionGuideTitle>{guide.title}</ActionGuideTitle>
          <ActionGuideText>{guide.text}</ActionGuideText>
        </ActionGuideBox>

        {/* AI 상세 */}
        <SectionTitle>AI 상세 분석</SectionTitle>

        <AiResultList>
          {ai_results.map((ai, index) => {
            const isRestricted = !isLoggedIn && !from_history && index >= 1;

            return (
              <AiResultCard key={index}>
                <AiResultHeader>
                  <ModelName>{ai.modelName}</ModelName>

                  <ScoreBadge $danger={ai.riskScore >= 50}>
                    {ai.riskScore}
                  </ScoreBadge>
                </AiResultHeader>

                <VerdictText $danger={ai.verdict === "Malicious"}>
                  {ai.verdict}
                </VerdictText>

                <ThreatType>{ai.threatType}</ThreatType>

                {isRestricted ? (
                  <EmptyBox>로그인 후 상세 분석 확인 가능</EmptyBox>
                ) : (
                  <ReasonList>
                    {ai.reasons.map((r, i) => (
                      <ReasonItem key={i}>{r}</ReasonItem>
                    ))}
                  </ReasonList>
                )}
              </AiResultCard>
            );
          })}
        </AiResultList>

        {/* 회원 유도 */}
        {!isLoggedIn && !from_history && (
          <UpgradeSection>
            <UpgradeTitle>더 많은 분석 확인 🔒</UpgradeTitle>
            <UpgradeDesc>
              로그인하면 검사 기록 저장 및 상세 분석을 확인할 수 있습니다.
            </UpgradeDesc>

            <UpgradeButtonGroup>
              <UpgradeButton onClick={() => navigate("/signup")}>
                회원가입
              </UpgradeButton>

              <UpgradeButton $secondary onClick={() => navigate("/login")}>
                로그인
              </UpgradeButton>
            </UpgradeButtonGroup>
          </UpgradeSection>
        )}

        {/* 버튼 */}
        <BackButton onClick={() => navigate("/scan")}>다시 검사하기</BackButton>
      </ResultCard>
    </Container>
  );
}

export default ResultPage;
