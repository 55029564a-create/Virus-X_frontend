import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';
import api from '../api/axios';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      Swal.fire({ icon: 'error', title: '비밀번호 불일치', text: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    if (password.length < 6) {
      Swal.fire({ icon: 'warning', title: '보안 취약', text: '비밀번호는 6자리 이상이어야 합니다.' });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/api/signup', {
        name,
        email,
        password,
        passwordConfirm,
      });

      Swal.fire({ icon: 'success', title: '가입 환영합니다!', showConfirmButton: false, timer: 1500 });
      navigate('/login');
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        '회원가입 중 문제가 발생했습니다.';

      Swal.fire({ icon: 'error', title: '회원가입 실패', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Join Virus<span>X</span></Title>
        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? '가입 중...' : 'Sign Up'}
          </SubmitButton>
        </Form>
        <ToggleText>
          이미 계정이 있으신가요?
          <span onClick={() => navigate('/login')}>로그인</span>
        </ToggleText>
      </AuthCard>
    </AuthContainer>
  );
}

export default SignupPage;
