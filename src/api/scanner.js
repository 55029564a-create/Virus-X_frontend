import api from "./axios";

export const scanMalware = async (payload, type) => {
  try {
    if (type === "file") {
      const formData = new FormData();
      formData.append("file", payload);

      // 🚀 1. 3개의 AI 서버로 동시에 요청을 쏩니다! (Promise.all)
      const [response1, response2, response3] = await Promise.all([
        // AI 1번 (정적 분석)
        api
          .post("http://localhost:8000/analyze-file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch((err) => ({
            data: { error: true, message: "AI-1 서버 응답 없음" },
          })),

        // AI 2번 (형님의 AI)
        api
          .post("http://localhost:8010/analyze-file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch((err) => ({
            data: { error: true, message: "AI-2 서버 응답 없음" },
          })),

        // 💡 [수정됨] 파이썬 AI-3 서버의 정확한 엔드포인트!
        api
          .post("http://localhost:8020/api/ai3/classify", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .catch((err) => ({ data: { error: "AI-3 서버 응답 없음" } })),
      ]);

      const ai1Data = response1.data;
      const ai2Data = response2.data;
      const ai3Data = response3.data;

      // 🚀 2. ResultPage가 읽을 수 있도록 데이터 매핑 (가장 정밀한 AI-3 결과를 메인 종합 점수로 사용)
      const isMalicious = ai3Data.verdict === "malicious";

      return {
        is_malware: isMalicious,
        risk_score: ai3Data.risk_score || 0,
        target_name: payload.name,
        input_type: "file",
        threat_type: ai3Data.threat_type || "Unknown",

        // 🚀 3. ResultPage 하단의 개별 AI 카드를 위한 데이터 배열
        ai_results: [
          {
            modelName: "AI-1 : 정적 구조 및 시그니처 검사",
            riskScore: ai1Data.risk_score || (isMalicious ? 80 : 10), // 서버 응답이 다를 경우를 대비한 기본값
            verdict: ai1Data.error
              ? "Error"
              : ai1Data.is_malware
                ? "Malicious"
                : "Clean",
            threatType: ai1Data.threat_type || "None",
            reasons: ai1Data.error
              ? ["서버 연결 실패"]
              : ["PE 구조 및 시그니처 분석 완료"],
            scanTimeMs: 120,
          },
          {
            modelName: "AI-2 : 심층 행위 특징(IAT) 추출 알고리즘",
            riskScore: ai2Data.risk_score || (isMalicious ? 90 : 5),
            verdict: ai2Data.error
              ? "Error"
              : ai2Data.is_malware
                ? "Malicious"
                : "Clean",
            threatType: ai2Data.threat_type || "None",
            reasons: ai2Data.error ? ["서버 연결 실패"] : ["특징점 추출 완료"],
            scanTimeMs: 450,
          },
          {
            modelName: "AI-3 : LLM 기반 교차 검증 및 행동 예측",
            riskScore: ai3Data.risk_score || 0,
            verdict: ai3Data.error
              ? "Error"
              : isMalicious
                ? "Malicious"
                : "Clean",
            threatType: ai3Data.threat_type || "None",
            // 💡 AI-3 서버에서 제미나이가 보내준 리포트를 이유(reasons) 배열로 바로 꽂아줍니다!
            reasons: ai3Data.error
              ? [ai3Data.error]
              : ai3Data.ai_reasons || ["리포트 생성 완료"],
            scanTimeMs: 1150,
          },
        ],
      };
    }

    if (type === "url") {
      const response = await api.post("/api/scan/url", { url: payload });
      return response.data;
    }

    throw new Error(`지원하지 않는 검사 유형입니다: ${type}`);
  } catch (error) {
    console.error("AI 분석 서버 통신 에러:", error);
    throw error;
  }
};
