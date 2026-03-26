import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  ResultCard,
  Title,
  Subtitle,
  HistoryNotice,
  TabContainer,
  TabButton,
  SummaryGrid,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  VerdictBadge,
  ActionGuideBox,
  ActionGuideTitle,
  ActionGuideText,
  SectionTitle,
  BriefSection,
  BriefCard,
  BriefCardTitle,
  BriefCardText,
  ExternalResultBox,
  ExternalResultTitle,
  ExternalResultText,
  AiResultList,
  AiResultCard,
  AiResultHeader,
  ModelName,
  ScoreBadge,
  VerdictText,
  ThreatType,
  ReasonList,
  ReasonItem,
  LockOverlayBox,
  EmptyBox,
  UpgradeSection,
  UpgradeTitle,
  UpgradeDesc,
  UpgradeButtonGroup,
  UpgradeButton,
  BottomButtonGroup,
  BackButton,
  SecondaryButton,
} from "./ResultPage.styles";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state?.resultData;
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const [activeTab, setActiveTab] = useState("brief");

  const {
    is_malware = false,
    risk_score = 0,
    target_name = "-",
    input_type = "file",
    threat_type = "Unknown",
    ai_results = [],
    from_history = false,

    // 선택적으로 들어올 수 있는 값들
    action,
    llm_explanation,
    virustotal,
    external_results,
  } = resultData || {};

  const externalAnalysis = useMemo(() => {
    // 백엔드 응답이 아직 확정되지 않았으니 다양한 형태를 흡수
    if (virustotal) return virustotal;
    if (external_results) return external_results;
    return null;
  }, [virustotal, external_results]);

  if (!resultData) {
    return (
      <Container>
        <ResultCard>
          <EmptyBox>
            검사 결과가 없습니다.
            <br />
            파일 또는 URL을 다시 검사해주세요.
          </EmptyBox>

          <BackButton onClick={() => navigate("/scan")}>
            검사 페이지로 이동
          </BackButton>
        </ResultCard>
      </Container>
    );
  }

  const finalVerdictColor = is_malware ? "danger" : "safe";

  const getActionGuide = () => {
    if (action && String(action).trim()) {
      return {
        title: "권장 조치",
        text: action,
      };
    }

    if (is_malware) {
      return {
        title: "즉시 조치가 필요합니다",
        text: "해당 파일 또는 URL 실행을 중단하고, 시스템 격리 및 추가 백신 검사 또는 보안 담당자 확인을 권장합니다.",
      };
    }

    if (risk_score >= 40) {
      return {
        title: "주의가 필요합니다",
        text: "즉시 악성으로 판정되지는 않았지만, 추가 검증 또는 재검사를 권장합니다.",
      };
    }

    return {
      title: "현재 기준 안전으로 판단됩니다",
      text: "현재 분석 결과 위험 징후는 낮지만, 출처가 불분명한 파일이나 URL은 계속 주의해서 다루는 것이 좋습니다.",
    };
  };

  const actionGuide = getActionGuide();

  const renderExternalAnalysis = () => {
    if (!externalAnalysis) {
      return (
        <ExternalResultBox>
          <ExternalResultTitle>타사 분석 결과</ExternalResultTitle>
          <ExternalResultText>
            연동된 외부 분석 결과가 아직 없습니다.
          </ExternalResultText>
        </ExternalResultBox>
      );
    }

    if (typeof externalAnalysis === "string") {
      return (
        <ExternalResultBox>
          <ExternalResultTitle>타사 분석 결과</ExternalResultTitle>
          <ExternalResultText>{externalAnalysis}</ExternalResultText>
        </ExternalResultBox>
      );
    }

    if (Array.isArray(externalAnalysis)) {
      return (
        <ExternalResultBox>
          <ExternalResultTitle>타사 분석 결과</ExternalResultTitle>
          <ReasonList>
            {externalAnalysis.map((item, index) => (
              <ReasonItem key={index}>
                {typeof item === "string" ? item : JSON.stringify(item)}
              </ReasonItem>
            ))}
          </ReasonList>
        </ExternalResultBox>
      );
    }

    return (
      <ExternalResultBox>
        <ExternalResultTitle>타사 분석 결과</ExternalResultTitle>
        <ReasonList>
          {Object.entries(externalAnalysis).map(([key, value]) => (
            <ReasonItem key={key}>
              <strong>{key}</strong>:{" "}
              {typeof value === "object"
                ? JSON.stringify(value)
                : String(value)}
            </ReasonItem>
          ))}
        </ReasonList>
      </ExternalResultBox>
    );
  };

  return (
    <Container>
      <ResultCard>
        <Title>AI 검사 결과</Title>
        <Subtitle>
          업로드된 {input_type === "file" ? "파일" : "URL"}에 대한 종합 분석
          결과입니다.
        </Subtitle>

        {from_history && (
          <HistoryNotice>
            이 결과는 저장된 검사 이력을 기반으로 다시 구성한 화면입니다.
          </HistoryNotice>
        )}

        <SummaryGrid>
          <SummaryCard>
            <SummaryLabel>검사 대상</SummaryLabel>
            <SummaryValue title={target_name}>{target_name}</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>검사 유형</SummaryLabel>
            <SummaryValue>
              {input_type === "file" ? "파일 검사" : "URL 검사"}
            </SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>종합 판정</SummaryLabel>
            <SummaryValue>
              <VerdictBadge $type={finalVerdictColor}>
                {is_malware ? "🚨 악성 의심" : "✅ 안전"}
              </VerdictBadge>
            </SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>위험도 점수</SummaryLabel>
            <SummaryValue>{risk_score ?? 0}점</SummaryValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryLabel>위협 유형</SummaryLabel>
            <SummaryValue>{threat_type || "Unknown"}</SummaryValue>
          </SummaryCard>
        </SummaryGrid>

        <ActionGuideBox $danger={is_malware}>
          <ActionGuideTitle>{actionGuide.title}</ActionGuideTitle>
          <ActionGuideText>{actionGuide.text}</ActionGuideText>
        </ActionGuideBox>

        <TabContainer>
          <TabButton
            $active={activeTab === "brief"}
            onClick={() => setActiveTab("brief")}
          >
            간략 분석 내용
          </TabButton>
          <TabButton
            $active={activeTab === "detail"}
            onClick={() => setActiveTab("detail")}
          >
            상세 분석 내용
          </TabButton>
        </TabContainer>

        {activeTab === "brief" && (
          <BriefSection>
            <SectionTitle>간략 분석 요약</SectionTitle>

            <BriefCard>
              <BriefCardTitle>종합 해석</BriefCardTitle>
              <BriefCardText>
                {llm_explanation && String(llm_explanation).trim()
                  ? llm_explanation
                  : is_malware
                    ? "이 파일 또는 URL은 악성 가능성이 높으며, 실행 또는 접근을 즉시 중단하는 것이 좋습니다."
                    : "현재 분석 기준으로는 위험 징후가 낮지만, 출처가 불분명하다면 추가 확인을 권장합니다."}
              </BriefCardText>
            </BriefCard>

            <BriefCard>
              <BriefCardTitle>즉시 행동 지침</BriefCardTitle>
              <BriefCardText>{actionGuide.text}</BriefCardText>
            </BriefCard>

            {renderExternalAnalysis()}
          </BriefSection>
        )}

        {activeTab === "detail" && (
          <>
            <SectionTitle>AI 상세 분석 결과</SectionTitle>

            <AiResultList>
              {ai_results.length === 0 ? (
                <EmptyBox>세부 AI 분석 결과가 없습니다.</EmptyBox>
              ) : (
                ai_results.map((ai, index) => {
                  const isRestricted = !isLoggedIn && index >= 1;

                  return (
                    <AiResultCard key={`${ai.modelName || "AI"}-${index}`}>
                      <AiResultHeader>
                        <div>
                          <ModelName>
                            {ai.modelName || `AI-${index + 1}`}
                          </ModelName>
                          <ThreatType>
                            위협 유형:{" "}
                            {ai.threatType || ai.threat_type || "None"}
                          </ThreatType>
                        </div>

                        <ScoreBadge $danger={(ai.riskScore || 0) >= 50}>
                          {ai.riskScore || 0}점
                        </ScoreBadge>
                      </AiResultHeader>

                      <VerdictText
                        $danger={
                          ai.verdict === "Malicious" ||
                          ai.verdict === "Error" ||
                          String(ai.verdict || "").toLowerCase() === "malicious"
                        }
                      >
                        판정:{" "}
                        {ai.verdict === "Malicious" ||
                        String(ai.verdict || "").toLowerCase() === "malicious"
                          ? "악성 의심"
                          : ai.verdict === "Clean" ||
                              String(ai.verdict || "").toLowerCase() === "clean"
                            ? "안전"
                            : ai.verdict === "Error"
                              ? "분석 실패"
                              : ai.verdict || "-"}
                      </VerdictText>

                      {isRestricted ? (
                        <LockOverlayBox>
                          🔒 회원 전용 상세 분석입니다.
                          <br />
                          로그인 후 AI 교차 검증 근거와 상세 판단 내용을 확인할
                          수 있습니다.
                        </LockOverlayBox>
                      ) : (
                        <ReasonList>
                          {(ai.reasons || ai.ai_reasons || []).length > 0 ? (
                            (ai.reasons || ai.ai_reasons || []).map(
                              (reason, reasonIndex) => (
                                <ReasonItem key={reasonIndex}>
                                  {reason}
                                </ReasonItem>
                              ),
                            )
                          ) : (
                            <ReasonItem>상세 판단 근거가 없습니다.</ReasonItem>
                          )}
                        </ReasonList>
                      )}
                    </AiResultCard>
                  );
                })
              )}
            </AiResultList>

            {!isLoggedIn && (
              <UpgradeSection>
                <UpgradeTitle>🔒 더 많은 분석 결과를 확인해보세요</UpgradeTitle>
                <UpgradeDesc>
                  회원 가입 시 AI 상세 분석 결과, 판단 근거, 검사 기록 저장
                  기능을 이용할 수 있습니다.
                </UpgradeDesc>

                <UpgradeButtonGroup>
                  <UpgradeButton onClick={() => navigate("/signup")}>
                    무료 회원가입
                  </UpgradeButton>
                  <UpgradeButton $secondary onClick={() => navigate("/login")}>
                    로그인
                  </UpgradeButton>
                </UpgradeButtonGroup>
              </UpgradeSection>
            )}
          </>
        )}

        <BottomButtonGroup>
          <SecondaryButton onClick={() => navigate("/")}>
            메인으로 가기
          </SecondaryButton>
          <BackButton onClick={() => navigate("/scan")}>
            다시 검사하기
          </BackButton>
        </BottomButtonGroup>
      </ResultCard>
    </Container>
  );
}

export default ResultPage;
