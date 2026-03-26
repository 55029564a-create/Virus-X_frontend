import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  LeftGroup,
  Logo,
  MenuNav,
  MenuLink,
  Nav,
  UserInfo,
  NavButton,
} from "./Header.styles";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("userId");
    setCurrentUser(user);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/");
  };

  const currentPath = location.pathname;

  return (
    <HeaderContainer>
      {/* 좌측 영역 */}
      <LeftGroup>
        <Logo onClick={() => navigate("/")}>
          VX<span>.</span>
        </Logo>

        <MenuNav>
          <MenuLink $active={currentPath === "/"} onClick={() => navigate("/")}>
            서비스 소개
          </MenuLink>

          <MenuLink
            $active={currentPath === "/scan"}
            onClick={() => navigate("/scan")}
          >
            검사하기
          </MenuLink>

          {currentUser && (
            <MenuLink
              $active={currentPath === "/history"}
              onClick={() => navigate("/history")}
            >
              내 검사 기록
            </MenuLink>
          )}
        </MenuNav>
      </LeftGroup>

      {/* 우측 영역 */}
      <Nav>
        {currentUser ? (
          <>
            <UserInfo>
              <span>{currentUser.split("@")[0]}</span>님
            </UserInfo>

            <NavButton onClick={handleLogout}>Log out</NavButton>
          </>
        ) : (
          <>
            <NavButton onClick={() => navigate("/login")}>Log in</NavButton>

            <NavButton $primary onClick={() => navigate("/signup")}>
              Sign up
            </NavButton>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
