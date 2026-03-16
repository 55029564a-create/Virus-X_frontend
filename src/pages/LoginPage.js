import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
// 스타일 파일에서 필요한 컴포넌트만 쏙쏙 빼옵니다!
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 💡 실제 백엔드 연동 전 가짜 로그인 처리
    if (email && password) {
      Swal.fire({ icon: 'success', title: '로그인 성공!', showConfirmButton: false, timer: 1500 });
      navigate('/');
    } else {
      Swal.fire({ icon: 'warning', title: '입력 오류', text: '이메일과 비밀번호를 입력해주세요.' });
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Virus<span>X</span> Login</Title>
        <Form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Log In</SubmitButton>
        </Form>
        <ToggleText>
          계정이 없으신가요? 
          <span onClick={() => navigate('/signup')}>회원가입</span>
        </ToggleText>
      </AuthCard>
    </AuthContainer>
  );
}

export default LoginPage;