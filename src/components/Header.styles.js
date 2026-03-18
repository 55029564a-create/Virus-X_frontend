import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 💡 위아래 패딩을 16px -> 10px로 줄여서 훨씬 슬림하고 날렵하게! */
  padding: 10px 40px; 
  
  background-color: rgba(11, 17, 32, 0.85); 
  backdrop-filter: blur(12px); 
  border-bottom: 1px solid #1E293B; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); 
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  font-size: 1.8rem; /* 로고 사이즈 살짝 키움 */
  font-weight: 800;
  color: #F8FAFC; /* 텍스트 흰색 */
  cursor: pointer;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;

  span {
    color: #38BDF8; /* 일렉트릭 블루 네온 포인트! */
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.4); 
  }

  &:hover {
    transform: scale(1.02); /* 마우스 올리면 살짝 커지는 디테일 */
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 16px; /* 버튼 사이 간격 시원하게 확보 */
`;

export const NavButton = styled.button`
  /* 💡 $primary 여부에 따라 '색칠된 버튼'과 '테두리만 있는 버튼(고스트)'으로 나뉨 */
  background: ${props => 
    props.$primary 
      ? 'linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%)' /* 메인 버튼은 그라데이션 */
      : 'transparent' /* 서브 버튼은 투명하게 */
  };
  
  color: ${props => props.$primary ? '#ffffff' : '#38BDF8'};
  border: ${props => props.$primary ? 'none' : '1px solid #38BDF8'};
  
  padding: 10px 24px;
  /* 기존 20px의 둥근 모서리 버리고, 로그인/업로드 창과 통일감 있게 6px로 수정 */
  border-radius: 6px; 
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  box-shadow: ${props => 
    props.$primary ? '0 4px 15px rgba(56, 189, 248, 0.2)' : 'none'
  };

  &:hover {
    /* 메인 버튼: 묵직하게 가라앉으며 네온 빛 발산 */
    /* 서브 버튼: 투명했던 배경에 스카이블루 색상이 살짝 깔림 */
    background: ${props => 
      props.$primary 
        ? 'linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)' 
        : 'rgba(56, 189, 248, 0.1)'
    };
    
    box-shadow: ${props => 
      props.$primary ? '0 6px 20px rgba(56, 189, 248, 0.5)' : 'none'
    };
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;