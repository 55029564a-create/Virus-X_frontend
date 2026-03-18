import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 80vh;
  background-color: #0B1120; /* 전체 다크 배경 통일 */
  box-sizing: border-box;
`;

export const HeaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #F8FAFC;
  margin-bottom: 30px;
  letter-spacing: -0.5px;
  text-shadow: 0 0 10px rgba(248, 250, 252, 0.1);
`;

export const ResultCard = styled.div`
  background: #111827; /* 다크 네이비 카드 */
  border: 1px solid #1E293B; /* 은은한 경계선 */
  border-radius: 12px; /* 헤더, 버튼과 어울리게 살짝만 둥글림 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5); /* 묵직한 그림자 */
  width: 100%;
  max-width: 700px;
  overflow: hidden; 
`;

/* 💡 핵심: 촌스러운 단색을 빼고, 위험도에 따른 고급스러운 '그라데이션 + 네온 글로우' 적용 */
export const StatusBanner = styled.div`
  background: ${props => 
    props.$isMalicious 
      ? 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)' /* 악성: 블러드 레드 */
      : 'linear-gradient(135deg, #10B981 0%, #047857 100%)' /* 정상: 사이버 그린 */
  };
  box-shadow: ${props => 
    props.$isMalicious 
      ? 'inset 0 0 20px rgba(239, 68, 68, 0.5)' 
      : 'inset 0 0 20px rgba(16, 185, 129, 0.5)'
  };
  color: white;
  padding: 40px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease;
`;

export const StatusIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 15px;
  line-height: 1;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3)); /* 이모티콘에도 그림자 부여 */
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
  color: rgba(255, 255, 255, 0.8);
`;

export const DetailSection = styled.div`
  padding: 40px;
  background-color: #111827; /* 카드 배경과 동일하게 맞춤 */
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #1E293B; /* 은은한 선 */
  font-size: 1.1rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const Label = styled.span`
  color: #64748B; /* 세련된 그레이블루 텍스트 */
  font-weight: 600;
`;

/* 💡 숫자 텍스트도 악성이면 핏빛 붉은색에 글로우 효과 뿜뿜 */
export const Value = styled.span`
  font-weight: 800;
  font-size: 1.2rem;
  color: ${props => (props.$isMalicious ? '#EF4444' : '#F8FAFC')};
  text-shadow: ${props => (props.$isMalicious ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none')};
`;

export const ReasonList = styled.ul`
  background: #0F172A; /* 카드보다 살짝 더 어두운 박스로 파묻힌 느낌 주기 */
  padding: 20px 20px 20px 40px;
  border: 1px solid #1E293B;
  border-radius: 8px;
  margin-top: 20px;
  color: #94A3B8;
  
  li {
    margin-bottom: 8px;
    line-height: 1.5;
    color: #CBD5E1; /* 리스트 내용은 조금 더 밝게 해서 가독성 확보 */
  }
`;

/* 💡 돌아가기 버튼은 헤더의 '로그인(Ghost) 버튼' 스타일과 통일! */
export const BackButton = styled.button`
  margin-top: 40px;
  background: transparent;
  color: #38BDF8; /* 스카이블루 */
  border: 1px solid #38BDF8;
  border-radius: 6px;
  padding: 14px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(56, 189, 248, 0.1); /* 살짝 파란빛 감돌게 */
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;