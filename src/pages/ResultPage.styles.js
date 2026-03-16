import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 80vh;
`;

export const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 30px;
`;

export const ResultCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 700px;
  overflow: hidden; /* 배너가 둥근 모서리를 튀어나오지 않게 */
`;

/* 💡 핵심: props.$isMalicious 값에 따라 배경색이 빨강/초록으로 바뀝니다! */
export const StatusBanner = styled.div`
  background-color: ${props => (props.$isMalicious ? '#FF3B30' : '#4CD964')};
  color: white;
  padding: 40px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.4s ease;
`;

export const StatusIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 15px;
  line-height: 1;
`;

export const StatusText = styled.div`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

export const TargetName = styled.div`
  margin-top: 10px;
  font-size: 1.1rem;
  opacity: 0.9;
  font-weight: 500;
`;

export const DetailSection = styled.div`
  padding: 40px;
  background-color: #ffffff;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f1f3f4;
  font-size: 1.1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  color: #5f6368;
  font-weight: 600;
`;

/* 점수 숫자도 위험도에 따라 빨간색으로 경고를 줍니다 */
export const Value = styled.span`
  font-weight: 800;
  font-size: 1.2rem;
  color: ${props => (props.$isMalicious ? '#FF3B30' : '#202124')};
`;

export const ReasonList = styled.ul`
  background: #f8f9fa;
  padding: 20px 20px 20px 40px;
  border-radius: 8px;
  margin-top: 20px;
  color: #5f6368;
  
  li {
    margin-bottom: 8px;
    line-height: 1.5;
  }
`;

export const BackButton = styled.button`
  margin-top: 40px;
  background-color: #ffffff;
  color: #0A2551; /* VX Cobalt Blue */
  border: 2px solid #0A2551;
  border-radius: 24px;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #0A2551;
    color: #ffffff;
  }
`;