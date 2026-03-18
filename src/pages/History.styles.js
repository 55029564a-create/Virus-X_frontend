import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #0B1120; /* 딥블루 배경 통일 */
  box-sizing: border-box;
`;

export const ContentCard = styled.div`
  background: #111827; /* 다크 네이비 카드 */
  padding: 40px;
  border: 1px solid #1E293B; /* 은은한 경계선 */
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 900px; /* 테이블에 URL까지 들어가면 좁을 수 있어서 800->900으로 살짝 넓힘 */
  box-sizing: border-box;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #F8FAFC;
  margin-bottom: 30px;
  border-bottom: 2px solid #1E293B;
  padding-bottom: 15px;
  letter-spacing: -0.5px;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background-color: #0F172A; /* 헤더는 조금 더 깊은 색으로 눌러줌 */
    color: #94A3B8;
    font-weight: 600;
    padding: 16px;
    border-bottom: 2px solid #1E293B;
    text-transform: uppercase; /* 영어일 경우 대문자로 세련되게 */
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #1E293B;
    color: #F1F5F9;
    vertical-align: middle;
    font-size: 1.05rem;
  }

  tr {
    transition: background-color 0.2s ease;
  }

  tr:hover {
    background-color: rgba(56, 189, 248, 0.05); /* 마우스 올리면 스카이블루 네온 빛이 살짝 돔 */
  }
`;

export const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  
  /* 💡 촌스러운 쨍한 배경 대신, 반투명 배경 + 테두리 + 은은한 그림자로 해커 느낌 극대화 */
  background-color: ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
  color: ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  border: 1px solid ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'};
  box-shadow: ${props => props.$isMalicious ? '0 0 10px rgba(239, 68, 68, 0.1)' : '0 0 10px rgba(16, 185, 129, 0.1)'};
`;

/* 💡 나중에 추가될 URL을 위한 전용 스타일! (표 뚫고 나가는 거 방어 + 네온 호버 효과) */
export const UrlText = styled.a`
  color: #38BDF8;
  text-decoration: none;
  word-break: break-all; /* 긴 URL이 표를 박살내지 않게 강제로 줄바꿈 */
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #7DD3FC;
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
    text-decoration: underline;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #64748B;
  font-size: 1.1rem;
  font-weight: 500;
`;