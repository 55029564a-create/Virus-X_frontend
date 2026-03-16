import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeaderContainer, Logo, Nav, NavButton } from './Header.styles';

function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [currentUser, setCurrentUser] = useState(null);

  // 💡 주소(페이지)가 바뀔 때마다 브라우저 금고에 'userId' 이름표가 있는지 쓱 확인합니다.
  useEffect(() => {
    const user = localStorage.getItem('userId');
    setCurrentUser(user); // 이름표가 있으면 그 이메일을 저장, 없으면 null
  }, [location.pathname]);

  // 💡 로그아웃을 누르면 금고에서 이름표를 찢어버립니다.
  const handleLogout = () => {
    localStorage.removeItem('userId'); 
    setCurrentUser(null);
    navigate('/'); // 메인으로 쫓아내기
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>
        Virus<span>X</span>
      </Logo>
      <Nav>
        {/* 💡 currentUser(이름표)가 있으면 환영인사, 없으면 로그인/가입 버튼! */}
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#5f6368' }}>
              <span style={{ color: '#1a73e8' }}>{currentUser.split('@')[0]}</span>님 환영합니다
            </span>
            {/* 👇 로그인한 유저만 누를 수 있는 기록 버튼 추가! */}
            <NavButton onClick={() => navigate('/history')}>내 기록</NavButton>
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