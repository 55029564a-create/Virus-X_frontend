import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #0b1120;
  box-sizing: border-box;
`;

export const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  text-shadow: 0 0 10px rgba(248, 250, 252, 0.1);
`;

export const ResultCard = styled.div`
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 1000px;
  padding: 40px;
  box-sizing: border-box;
`;

/* 상단 영역 (점수 및 행동 지침) */
export const TopSection = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  padding-bottom: 40px;
  border-bottom: 1px solid #1e293b;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ScoreGauge = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    ${(props) => (props.$isMalicious ? "#EF4444" : "#10B981")}
      ${(props) => props.$score}%,
    #1e293b ${(props) => props.$score}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px
    ${(props) =>
      props.$isMalicious
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(16, 185, 129, 0.3)"};
  flex-shrink: 0;

  &::before {
    content: "";
    position: absolute;
    width: 170px;
    height: 170px;
    background-color: #111827;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  }
`;

export const ScoreText = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ScoreNumber = styled.span`
  font-size: 3.5rem;
  font-weight: 800;
  color: ${(props) => (props.$isMalicious ? "#EF4444" : "#10B981")};
  line-height: 1;
  text-shadow: 0 0 15px
    ${(props) =>
      props.$isMalicious
        ? "rgba(239, 68, 68, 0.5)"
        : "rgba(16, 185, 129, 0.5)"};
`;

export const ScoreLabel = styled.span`
  font-size: 0.9rem;
  color: #94a3b8;
  margin-top: 8px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const SummarySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TargetName = styled.h2`
  font-size: 1.6rem;
  color: #f8fafc;
  margin: 20px 0 10px 0;
  word-break: break-all;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ThreatTypeBadge = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.$isMalicious
      ? "rgba(239, 68, 68, 0.15)"
      : "rgba(16, 185, 129, 0.15)"};
  color: ${(props) => (props.$isMalicious ? "#F87171" : "#34D399")};
  border: 1px solid
    ${(props) =>
      props.$isMalicious
        ? "rgba(239, 68, 68, 0.4)"
        : "rgba(16, 185, 129, 0.4)"};
  letter-spacing: 0.5px;
`;

export const ActionGuideBox = styled.div`
  margin-top: 15px;
  background: #0f172a;
  padding: 20px 25px;
  border-radius: 8px;
  border-left: 4px solid
    ${(props) => (props.$isMalicious ? "#EF4444" : "#10B981")};
  border-top: 1px solid #1e293b;
  border-right: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
`;

export const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 12px;
`;

export const ActionList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #cbd5e1;
  font-size: 1rem;

  li {
    margin-bottom: 8px;
    line-height: 1.5;
    strong {
      color: #38bdf8;
    }
  }
`;

export const BackButton = styled.button`
  margin-top: 40px;
  background: transparent;
  color: #38bdf8;
  border: 1px solid #38bdf8;
  border-radius: 6px;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(56, 189, 248, 0.1);
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
    transform: translateY(-2px);
  }
`;

/* 💡 하단: AI 개별 검사 결과 영역 (신규 추가) */
export const BottomSection = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SectionTitle = styled.h3`
  color: #f8fafc;
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AICard = styled.div`
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 12px;
  overflow: hidden;
  position: relative; /* 자물쇠 오버레이를 위해 필수 */
`;

export const AIHeader = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 16px 24px;
  border-bottom: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0;
    color: #f8fafc;
    font-size: 1.1rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  span {
    font-size: 0.9rem;
    color: #94a3b8;
  }
`;

export const AIBody = styled.div`
  padding: 24px;
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;

  /* 비회원일 때 컨텐츠를 흐리게 만듦 */
  filter: ${(props) => (props.$isLocked ? "blur(6px)" : "none")};
  transition: filter 0.3s ease;
  user-select: ${(props) => (props.$isLocked ? "none" : "auto")};
`;

/* 💡 자물쇠 오버레이 UI (회원가입 유도) */
export const LockedOverlay = styled.div`
  position: absolute;
  top: 60px; /* 헤더 아래부터 덮음 */
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  background: rgba(11, 17, 32, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  z-index: 10;
  text-align: center;
  padding: 20px;
`;

export const LockIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(56, 189, 248, 0.5));
`;

export const LockText = styled.p`
  margin: 0;
  color: #f8fafc;
  font-size: 1.05rem;
  font-weight: 600;

  span {
    color: #38bdf8;
  }
`;

export const UnlockButton = styled.button`
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5);
  }
`;

export const FeatureTag = styled.span`
  display: inline-block;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  margin: 4px;
  font-weight: 600;
`;
