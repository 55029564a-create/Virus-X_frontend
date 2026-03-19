import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
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
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5); /* 묵직한 그림자 */
  width: 100%;
  max-width: 900px; /* 스플릿 뷰를 위해 넓게 설정 */
  overflow: hidden; 
  padding: 40px;
  box-sizing: border-box;
`;

/* 💡 상단: 도넛 차트와 요약 정보 (와이어프레임 상단 스플릿) */
export const TopSection = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  padding-bottom: 40px;
  border-bottom: 1px solid #1E293B;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

/* 💡 좌측: 네온 도넛 차트 (직관적인 위험도 퍼센트) */
export const ScoreGauge = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  /* 점수에 따라 블러드 레드 또는 사이버 그린이 차오름 */
  background: conic-gradient(
    ${props => props.$isMalicious ? '#EF4444' : '#10B981'} ${props => props.$score}%, 
    #1E293B ${props => props.$score}%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  /* 뿜어져 나오는 네온 그림자 효과 */
  box-shadow: 0 0 30px ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'};
  flex-shrink: 0;

  /* 중앙에 구멍을 뚫어 도넛 형태로 만듦 */
  &::before {
    content: "";
    position: absolute;
    width: 170px;
    height: 170px;
    background-color: #111827; /* 카드 배경색과 동일하게 */
    border-radius: 50%;
    /* 구멍 안쪽 그림자로 입체감 극대화 */
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
  color: ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  line-height: 1;
  /* 회원님이 좋아하시는 텍스트 글로우 적용! */
  text-shadow: 0 0 15px ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.5)' : 'rgba(16, 185, 129, 0.5)'};
`;

export const ScoreLabel = styled.span`
  font-size: 0.9rem;
  color: #94A3B8;
  margin-top: 8px;
  font-weight: 600;
  letter-spacing: 1px;
`;

/* 💡 우측: 요약 영역 (와이어프레임 '간단한 설명') */
export const SummarySection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TargetName = styled.h2`
  font-size: 1.6rem;
  color: #F8FAFC;
  margin: 20px 0 10px 0;
  word-break: break-all;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;


// export const QuickReason = styled.div`
//   background: #0F172A; /* 움푹 파인 느낌의 박스 */
//   padding: 20px;
//   border: 1px solid #1E293B;
//   border-radius: 8px;
//   color: #CBD5E1;
//   font-size: 1.05rem;
//   line-height: 1.6;
  
//   span {
//     color: #38BDF8; /* 일렉트릭 블루 강조 */
//     font-weight: 700;
//     text-shadow: 0 0 8px rgba(56, 189, 248, 0.4);
//   }
// `;

/* 💡 [추가] AI-2가 판별한 구체적인 위협 종류(Type)를 보여주는 뱃지 */
export const ThreatTypeBadge = styled.span`
  font-size: 0.9rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 6px;
  background-color: ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'};
  color: ${props => props.$isMalicious ? '#F87171' : '#34D399'};
  border: 1px solid ${props => props.$isMalicious ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)'};
  text-shadow: none;
  letter-spacing: 0.5px;
`;

/* 💡 [추가] 멘토 피드백 방어용: 맞춤형 사후 대처 가이드 박스 */
export const ActionGuideBox = styled.div`
  margin-top: 15px;
  background: #0F172A; 
  padding: 20px 25px;
  border-radius: 8px;
  /* 악성일 경우 좌측에 빨간색 포인트 라인을 주어 경고 느낌 강조 */
  border-left: 4px solid ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  border-top: 1px solid #1E293B;
  border-right: 1px solid #1E293B;
  border-bottom: 1px solid #1E293B;
  box-shadow: ${props => props.$isMalicious ? '0 4px 15px rgba(239, 68, 68, 0.05)' : 'none'};
`;

export const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 800;
  color: ${props => props.$isMalicious ? '#F8FAFC' : '#F8FAFC'};
  margin-bottom: 12px;
  
  span {
    color: ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  }
`;

export const ActionList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #CBD5E1;
  font-size: 1rem;
  
  li {
    margin-bottom: 8px;
    line-height: 1.5;
    
    strong {
      color: #38BDF8; /* 일렉트릭 블루 강조 */
    }
  }
  
  li:last-child {
    margin-bottom: 0;
  }
`;

/* 💡 하단: 상세 검사 결과 (와이어프레임 하단 스플릿) */
/* 💡 하단: 탭 컨테이너 및 섹션 */
export const BottomSection = styled.div`
  padding-top: 40px;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  border-bottom: 2px solid #1E293B; /* 탭 아래의 은은한 기준선 */
`;

export const TabButton = styled.button`
  background: transparent;
  color: ${props => props.$active ? '#38BDF8' : '#64748B'};
  border: none;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  padding: 10px 10px 15px 10px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.$active ? '#38BDF8' : '#94A3B8'};
  }

  /* 💡 선택된 탭 아래에 네온 빛이 나는 밑줄 효과 */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px; /* 기준선 위에 딱 맞게 덮기 */
    left: 0;
    width: 100%;
    height: 3px;
    background: ${props => props.$active ? '#38BDF8' : 'transparent'};
    box-shadow: ${props => props.$active ? '0 0 12px rgba(56, 189, 248, 0.8)' : 'none'};
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease;
  }
`;

export const SectionTitle = styled.h3`
  color: #F8FAFC;
  font-size: 1.25rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReasonList = styled.ul`
  background: #0F172A;
  padding: 25px 25px 25px 45px;
  border: 1px solid #1E293B;
  border-radius: 8px;
  color: #94A3B8;
  
  li {
    margin-bottom: 15px;
    line-height: 1.6;
    color: #CBD5E1;
    font-size: 1.05rem;
  }
`;

export const EngineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const EngineCard = styled.div`
  background: #0F172A;
  border: 1px solid ${props => 
    props.$isOurEngine 
      ? 'rgba(56, 189, 248, 0.5)'  /* 우리 엔진: 파란 테두리 */
      : props.$isMalicious ? 'rgba(239, 68, 68, 0.4)' : '#1E293B' /* 타 엔진: 악성이면 붉은 테두리 */
  };
  border-radius: 8px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  
  box-shadow: ${props => 
    props.$isOurEngine 
      ? 'inset 0 0 15px rgba(56, 189, 248, 0.1)'
      : props.$isMalicious ? '0 0 15px rgba(239, 68, 68, 0.1)' : 'none'
  };

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const EngineName = styled.span`
  color: ${props => props.$isOurEngine ? '#38BDF8' : '#94A3B8'};
  font-weight: ${props => props.$isOurEngine ? '800' : '600'};
  font-size: 1rem;
  text-shadow: ${props => props.$isOurEngine ? '0 0 8px rgba(56, 189, 248, 0.4)' : 'none'};
`;

export const EngineResult = styled.span`
  font-size: 0.95rem;
  font-weight: 800;
  color: ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  text-shadow: ${props => props.$isMalicious ? '0 0 8px rgba(239, 68, 68, 0.4)' : 'none'};
`;

export const BackButton = styled.button`
  margin-top: 40px;
  background: transparent;
  color: #38BDF8;
  border: 1px solid #38BDF8;
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

/* 💡 [추가] 탭 1 내부: 자사/타사 좌우 분할 레이아웃 */
export const ResultSplitView = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

/* 💡 [추가] 좌측: 자사(Virus-X) 메인 엔진 섹션 */
export const OurEngineSection = styled.div`
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
`;

export const MainEngineCard = styled.div`
  background: rgba(56, 189, 248, 0.05);
  border: 1px solid rgba(56, 189, 248, 0.5);
  border-radius: 12px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; 
  box-shadow: inset 0 0 25px rgba(56, 189, 248, 0.1);
  text-align: center;
  gap: 20px;
`;

export const MainEngineName = styled.div`
  color: #38BDF8;
  font-weight: 800;
  font-size: 1.4rem;
  text-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  
  span {
    font-size: 2.5rem; /* 로봇 아이콘 크게 */
  }
`;

export const MainEngineResult = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${props => props.$isMalicious ? '#EF4444' : '#10B981'};
  text-shadow: ${props => props.$isMalicious ? '0 0 15px rgba(239, 68, 68, 0.5)' : 'none'};
`;

/* 💡 [추가] 우측: 타사 엔진 섹션 */
export const OtherEnginesSection = styled.div`
  flex: 1;
`;