import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* 💡 위아래 패딩을 8px로 대폭 줄여서 헤더를 아주 슬림하게 만듦! */
  padding: 8px 40px;
  height: 60px; /* 헤더 전체 높이를 고정해서 날렵함 유지 */

  background-color: rgba(11, 17, 32, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1e293b;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 100;
  box-sizing: border-box;
`;

/* 💡 로고와 메뉴바를 하나로 묶어주는 그룹 */
export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* 로고와 메뉴 사이의 간격 */
`;

export const Logo = styled.div`
  font-size: 1.6rem; /* 헤더가 얇아졌으니 로고도 살짝 다이어트 */
  font-weight: 900;
  color: #f8fafc;
  cursor: pointer;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;

  span {
    color: #38bdf8;
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
  }

  &:hover {
    transform: scale(1.02);
  }
`;

/* 💡 메인 메뉴 링크 (텍스트 형태의 깔끔한 버튼) */
export const MenuNav = styled.nav`
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    display: none; /* 모바일 화면에서는 공간이 좁아 숨김 처리 (필요시 햄버거 메뉴로 대체) */
  }
`;

export const MenuLink = styled.span`
  color: ${(props) => (props.$active ? "#F8FAFC" : "#94A3B8")};
  font-size: 0.95rem;
  font-weight: ${(props) => (props.$active ? "800" : "600")};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    color: #38bdf8;
  }

  /* 💡 현재 위치한 메뉴 아래에 예쁜 네온 밑줄 긋기 */
  &::after {
    content: "";
    position: absolute;
    bottom: -20px; /* 헤더 바닥에 딱 붙게 */
    left: 0;
    width: 100%;
    height: 3px;
    background: ${(props) => (props.$active ? "#38BDF8" : "transparent")};
    box-shadow: ${(props) =>
      props.$active ? "0 -2px 10px rgba(56, 189, 248, 0.5)" : "none"};
    border-radius: 3px 3px 0 0;
    transition: all 0.2s ease;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px; /* 버튼 사이 간격 살짝 좁힘 */
`;

export const NavButton = styled.button`
  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%)"
      : "transparent"};

  color: ${(props) => (props.$primary ? "#ffffff" : "#38BDF8")};
  border: ${(props) => (props.$primary ? "none" : "1px solid #38BDF8")};

  /* 💡 버튼 여백도 줄여서 헤더 높이를 침범하지 않게 함 */
  padding: 8px 18px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;

  box-shadow: ${(props) =>
    props.$primary ? "0 4px 15px rgba(56, 189, 248, 0.2)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$primary
        ? "linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)"
        : "rgba(56, 189, 248, 0.1)"};
    box-shadow: ${(props) =>
      props.$primary ? "0 6px 20px rgba(56, 189, 248, 0.5)" : "none"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;
