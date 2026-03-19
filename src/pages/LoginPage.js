import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';
import api from '../api/axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: '입력 오류',
        text: '이메일과 비밀번호를 입력해주세요.'
      });
      return;
    }

    setIsLoading(true);

    try {
      const loginData = {
        email,
        password,
        device_info: navigator.userAgent,
      };

      const response = await api.post('/api/login', loginData);
      const data = response.data;

      if (!data?.accessToken) {
        throw new Error('accessToken이 응답에 없습니다.');
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userId || data.email || email);

      Swal.fire({
        icon: 'success',
        title: '로그인 성공!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        '서버와 통신 중 에러가 발생했습니다.';

      Swal.fire({
        icon: 'error',
        title: '로그인 실패',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
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
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : 'Log In'}
          </SubmitButton>
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
