import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #202124;
  cursor: pointer;
  letter-spacing: -0.5px;

  span {
    color: #1a73e8;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 12px;
`;

export const NavButton = styled.button`
  background: ${props => props.$primary ? '#1a73e8' : 'transparent'};
  color: ${props => props.$primary ? 'white' : '#1a73e8'};
  border: ${props => props.$primary ? 'none' : '1px solid #1a73e8'};
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$primary ? '#1557b0' : '#f4f8fe'};
  }
`;