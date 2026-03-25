import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #0b1120;
  padding: 0;
  box-sizing: border-box;
`;

export const HeroSection = styled.div`
  /* 모니터 1화면(100vh)에 꽉 차게 설정 */
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  text-align: center;
  max-width: 850px;
  margin-bottom: 200px;
  animation: fadeInDown 1s ease-out;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #f8fafc;
  margin-bottom: 50px;
  letter-spacing: -1px;
  line-height: 1.3;

  span {
    background: linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.8;
  margin-bottom: 150px;
  max-width: 800px;
`;

export const StartButton = styled.button`
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 20px 150px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(56, 189, 248, 0.25);

  &:hover {
    background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
    box-shadow: 0 12px 30px rgba(56, 189, 248, 0.4);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const DashboardWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding: 0 20px 200px 20px;
  box-sizing: border-box;
`;

export const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 80px;
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    font-size: 1.8rem;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
`;

export const StatCard = styled.div`
  background: #111827;
  border: 1px solid #1e293b;
  border-radius: 16px;
  padding: 30px 24px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 15px 40px rgba(56, 189, 248, 0.15);
  }

  h3 {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 12px 0;
    color: #f8fafc;
    letter-spacing: -0.5px;
  }

  p {
    color: #94a3b8;
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
  }
`;

export const ThreatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ThreatListItem = styled.div`
  background: #0f172a;
  border-left: 4px solid ${(props) => props.$color || "#38BDF8"};
  border-top: 1px solid #1e293b;
  border-right: 1px solid #1e293b;
  border-bottom: 1px solid #1e293b;
  border-radius: 12px;
  padding: 24px 30px;
  display: flex;
  align-items: center;
  gap: 40px;
  transition: all 0.2s ease;

  &:hover {
    background: #111827;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ThreatListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
  width: 250px;

  h4 {
    margin: 0;
    color: #f8fafc;
    font-weight: 800;
  }

  span {
    background: rgba(255, 255, 255, 0.05);
    color: ${(props) => props.$color || "#94A3B8"};
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    display: inline-block;
    width: fit-content;
  }
`;

export const ThreatListDesc = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.95rem;
  line-height: 1.7;
  border-left: 1px solid #1e293b;
  padding-left: 40px;
  flex: 1;

  @media (max-width: 768px) {
    border-left: none;
    padding-left: 0;
    padding-top: 16px;
    border-top: 1px solid #1e293b;
  }
`;
