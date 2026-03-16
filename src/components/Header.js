import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, Nav, NavButton } from './Header.styles';

function Header() {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        Virus<span>X</span>
      </Logo>
      <Nav>
        <NavButton onClick={() => navigate('/login')}>Log in</NavButton>
        <NavButton $primary onClick={() => navigate('/signup')}>Sign up</NavButton>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;