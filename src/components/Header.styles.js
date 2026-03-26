import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 64px;
  padding: 0 40px;

  background: rgba(11, 17, 32, 0.85);
  backdrop-filter: blur(12px);

  border-bottom: 1px solid #1e293b;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 42px;
`;

export const Logo = styled.div`
  font-size: 1.7rem;
  font-weight: 900;
  color: #f8fafc;
  cursor: pointer;
  letter-spacing: -0.5px;
  transition: all 0.25s ease;

  span {
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.45);
  }

  &:hover {
    transform: scale(1.03);
  }
`;

export const MenuNav = styled.nav`
  display: flex;
  gap: 26px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuLink = styled.span`
  position: relative;
  font-size: 0.95rem;
  font-weight: ${(props) => (props.$active ? "800" : "600")};
  color: ${(props) => (props.$active ? "#F8FAFC" : "#94A3B8")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #38bdf8;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -18px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 3px;

    background: ${(props) => (props.$active ? "#38BDF8" : "transparent")};

    box-shadow: ${(props) =>
      props.$active ? "0 -2px 10px rgba(56, 189, 248, 0.5)" : "none"};
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserInfo = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #94a3b8;

  span {
    color: #f8fafc;
    margin-right: 4px;
  }
`;

export const NavButton = styled.button`
  padding: 8px 18px;
  border-radius: 8px;

  font-size: 0.9rem;
  font-weight: 700;

  cursor: pointer;
  transition: all 0.25s ease;

  background: ${(props) =>
    props.$primary
      ? "linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%)"
      : "transparent"};

  color: ${(props) => (props.$primary ? "#ffffff" : "#38BDF8")};

  border: ${(props) => (props.$primary ? "none" : "1px solid #38BDF8")};

  box-shadow: ${(props) =>
    props.$primary ? "0 4px 14px rgba(56, 189, 248, 0.25)" : "none"};

  &:hover {
    background: ${(props) =>
      props.$primary
        ? "linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%)"
        : "rgba(56, 189, 248, 0.12)"};

    transform: translateY(-1px);

    box-shadow: ${(props) =>
      props.$primary ? "0 6px 18px rgba(56, 189, 248, 0.45)" : "none"};
  }

  &:active {
    transform: translateY(1px);
  }
`;
