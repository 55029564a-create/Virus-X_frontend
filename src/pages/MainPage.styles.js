import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background:
    radial-gradient(
      circle at top,
      rgba(56, 189, 248, 0.08) 0%,
      transparent 30%
    ),
    linear-gradient(180deg, #0b1120 0%, #0f172a 100%);
  color: #f8fafc;
  box-sizing: border-box;
`;

export const HeroSection = styled.section`
  padding: 110px 20px 90px;
  text-align: center;
  max-width: 1100px;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  margin: 0 0 24px;
  font-size: clamp(2.3rem, 5vw, 4.2rem);
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: -1px;
  color: #f8fafc;

  span {
    background: linear-gradient(135deg, #38bdf8 0%, #60a5fa 45%, #2563eb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 24px rgba(56, 189, 248, 0.12);
  }
`;

export const HeroSubtitle = styled.p`
  margin: 0 auto 36px;
  max-width: 850px;
  font-size: 1.08rem;
  line-height: 1.9;
  color: #94a3b8;
  font-weight: 500;
`;

export const StartButton = styled.button`
  padding: 16px 34px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 12px 30px rgba(56, 189, 248, 0.22);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(56, 189, 248, 0.32);
    background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const CapabilitySection = styled.section`
  max-width: 1150px;
  margin: 0 auto;
  padding: 20px 20px 90px;
  text-align: center;
`;

export const CapabilityTitle = styled.h2`
  margin: 0 0 14px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: #f8fafc;
`;

export const CapabilitySubtitle = styled.p`
  margin: 0 auto 34px;
  max-width: 780px;
  color: #94a3b8;
  font-size: 1rem;
  line-height: 1.8;
`;

export const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const CapabilityBadge = styled.div`
  padding: 18px 16px;
  background: rgba(15, 23, 42, 0.88);
  border: 1px solid #1e293b;
  border-radius: 14px;
  color: #e2e8f0;
  font-weight: 700;
  font-size: 0.98rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.22);
  transition: all 0.25s ease;

  span {
    margin-right: 8px;
    font-size: 1.1rem;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(56, 189, 248, 0.5);
    box-shadow: 0 14px 30px rgba(56, 189, 248, 0.12);
  }
`;

export const DashboardWrapper = styled.section`
  max-width: 1150px;
  margin: 0 auto;
  padding: 0 20px 40px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 22px;
  font-size: 1.6rem;
  font-weight: 800;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    font-size: 1.4rem;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 70px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const StatCard = styled.div`
  background: rgba(17, 24, 39, 0.92);
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 28px 22px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.28);
  transition: all 0.25s ease;

  h3 {
    margin: 0 0 10px;
    font-size: 2rem;
    font-weight: 900;
    color: #f8fafc;
    letter-spacing: -0.8px;
  }

  p {
    margin: 0;
    color: #94a3b8;
    font-size: 0.98rem;
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(56, 189, 248, 0.45);
  }
`;

export const ThreatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ThreatListItem = styled.div`
  background: rgba(17, 24, 39, 0.92);
  border: 1px solid #1e293b;
  border-left: 4px solid ${(props) => props.$color || "#38bdf8"};
  border-radius: 16px;
  padding: 24px 22px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.24);
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(56, 189, 248, 0.25);
  }
`;

export const ThreatListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;

  h4 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 800;
    color: #f8fafc;
  }

  span {
    color: ${(props) => props.$color || "#38bdf8"};
    font-size: 0.92rem;
    font-weight: 800;
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ThreatListDesc = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.98rem;
  line-height: 1.8;
`;

export const CtaSection = styled.section`
  margin-top: 80px;
  padding: 60px 20px;
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(56, 189, 248, 0.08),
    rgba(29, 78, 216, 0.08)
  );
  border-top: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
`;

export const CtaTitle = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 800;
  color: #f8fafc;
`;

export const CtaDescription = styled.p`
  margin: 0 auto 32px;
  max-width: 760px;
  color: #94a3b8;
  line-height: 1.8;
  font-size: 1rem;
`;
