import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderContainer, LeftGroup, Logo, MenuNav, MenuLink, Nav, NavButton } from './Header.styles';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('userId');
    setCurrentUser(user);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId'); 
    setCurrentUser(null);
    navigate('/'); 
  };

  // 💡 현재 경로를 확인하는 변수 (밑줄 활성화용)
  const currentPath = location.pathname;

  return (
    <HeaderContainer>
      
      {/* 💡 왼쪽 그룹: 로고 + 페이지 이동 메뉴바 */}
      <LeftGroup>
        <Logo onClick={() => navigate('/')}>
          VX<span>.</span>
        </Logo>
        
        <MenuNav>
          <MenuLink 
            $active={currentPath === '/'} 
            onClick={() => navigate('/')}
          >
            About
          </MenuLink>
          <MenuLink 
            $active={currentPath === '/scan'} 
            onClick={() => navigate('/scan')}
          >
            Scanner
          </MenuLink>
          
          {/* 로그인한 사용자에게만 '검사 기록' 메뉴 노출 */}
          {currentUser && (
            <MenuLink 
              $active={currentPath === '/history'} 
              onClick={() => navigate('/history')}
            >
              내 검사 기록
            </MenuLink>
          )}
        </MenuNav>
      </LeftGroup>

      {/* 💡 오른쪽 그룹: 유저 정보 및 로그인/로그아웃 버튼 */}
      <Nav>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#94A3B8' }}>
              <span style={{ color: '#F8FAFC' }}>{currentUser.split('@')[0]}</span>님
            </span>
            <NavButton onClick={handleLogout}>Log out</NavButton>
          </div>
        ) : (
          <>
            <NavButton onClick={() => navigate('/login')}>Log in</NavButton>
            <NavButton $primary onClick={() => navigate('/signup')}>Sign up</NavButton>
          </>
        )}
      </Nav>
      
    </HeaderContainer>
  );
}

export default Header;