import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  padding: 60px 20px;
  background:
    radial-gradient(
      circle at top,
      rgba(56, 189, 248, 0.08) 0%,
      transparent 30%
    ),
    linear-gradient(180deg, #0b1120 0%, #0f172a 100%);
  box-sizing: border-box;
`;

export const ResultCard = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  background: rgba(17, 24, 39, 0.94);
  border: 1px solid #1e293b;
  border-radius: 22px;
  padding: 40px 32px;
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.38);
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 28px 18px;
    border-radius: 18px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  color: #f8fafc;
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 900;
  text-align: center;
  letter-spacing: -0.8px;
`;

export const Subtitle = styled.p`
  margin: 0 0 32px;
  text-align: center;
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.7;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const SummaryCard = styled.div`
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 18px;
  box-sizing: border-box;
`;

export const SummaryLabel = styled.div`
  margin-bottom: 8px;
  color: #94a3b8;
  font-size: 0.92rem;
  font-weight: 600;
`;

export const SummaryValue = styled.div`
  color: #f8fafc;
  font-size: 1.02rem;
  font-weight: 800;
  word-break: break-all;
  line-height: 1.5;
`;

export const VerdictBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 800;
  border: 1px solid
    ${(props) =>
      props.$type === "danger"
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(16, 185, 129, 0.3)"};
  background: ${(props) =>
    props.$type === "danger"
      ? "rgba(239, 68, 68, 0.12)"
      : "rgba(16, 185, 129, 0.12)"};
  color: ${(props) => (props.$type === "danger" ? "#f87171" : "#34d399")};
`;

export const ActionGuideBox = styled.div`
  margin-bottom: 36px;
  padding: 20px 22px;
  border-radius: 16px;
  border: 1px solid
    ${(props) =>
      props.$danger ? "rgba(239, 68, 68, 0.25)" : "rgba(56, 189, 248, 0.2)"};
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "rgba(56, 189, 248, 0.07)"};
`;

export const ActionGuideTitle = styled.h3`
  margin: 0 0 10px;
  color: #f8fafc;
  font-size: 1.15rem;
  font-weight: 800;
`;

export const ActionGuideText = styled.p`
  margin: 0;
  color: #cbd5e1;
  line-height: 1.75;
  font-size: 0.97rem;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 20px;
  color: #f8fafc;
  font-size: 1.5rem;
  font-weight: 800;
`;

export const AiResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const AiResultCard = styled.div`
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 20px;
  box-sizing: border-box;
`;

export const AiResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ModelName = styled.h3`
  margin: 0 0 8px;
  color: #f8fafc;
  font-size: 1.08rem;
  font-weight: 800;
`;

export const ScoreBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 68px;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 800;
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.12)" : "rgba(16, 185, 129, 0.12)"};
  color: ${(props) => (props.$danger ? "#f87171" : "#34d399")};
  border: 1px solid
    ${(props) =>
      props.$danger ? "rgba(239, 68, 68, 0.24)" : "rgba(16, 185, 129, 0.24)"};
`;

export const VerdictText = styled.div`
  margin-bottom: 12px;
  color: ${(props) => (props.$danger ? "#f87171" : "#34d399")};
  font-size: 0.96rem;
  font-weight: 800;
`;

export const ThreatType = styled.div`
  color: #94a3b8;
  font-size: 0.92rem;
  font-weight: 600;
`;

export const ReasonList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #e2e8f0;
`;

export const ReasonItem = styled.li`
  margin-bottom: 8px;
  line-height: 1.7;
  color: #cbd5e1;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EmptyBox = styled.div`
  padding: 18px;
  border-radius: 14px;
  background: rgba(30, 41, 59, 0.55);
  border: 1px dashed #334155;
  color: #94a3b8;
  text-align: center;
  line-height: 1.7;
`;

export const UpgradeSection = styled.div`
  margin-top: 38px;
  padding: 40px 20px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(56, 189, 248, 0.08),
    rgba(29, 78, 216, 0.08)
  );
  border: 1px solid #1e293b;
  border-radius: 16px;
`;

export const UpgradeTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 1.5rem;
  font-weight: 800;
  color: #f8fafc;
`;

export const UpgradeDesc = styled.p`
  margin: 0 0 28px;
  color: #94a3b8;
  line-height: 1.7;
`;

export const UpgradeButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const UpgradeButton = styled.button`
  padding: 12px 22px;
  border-radius: 10px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) =>
    props.$secondary
      ? "transparent"
      : "linear-gradient(135deg, #38BDF8, #1D4ED8)"};
  color: ${(props) => (props.$secondary ? "#38BDF8" : "#ffffff")};
  border: ${(props) => (props.$secondary ? "1px solid #38BDF8" : "none")};
  box-shadow: ${(props) =>
    props.$secondary ? "none" : "0 10px 24px rgba(56, 189, 248, 0.22)"};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

export const BackButton = styled.button`
  width: 100%;
  margin-top: 28px;
  padding: 15px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.22);

  &:hover {
    background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(56, 189, 248, 0.3);
  }
`;

export const HistoryNotice = styled.div`
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  text-align: center;
  color: #94a3b8;
`;
