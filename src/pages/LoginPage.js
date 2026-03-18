import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';

// 💡 우리가 만든 '자동 검문소' 불러오기
import axios from '../api/axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email && password) {
      setIsLoading(true);

      try {
        const loginData = {
          email: email,
          password: password,
          device_info: navigator.userAgent
        };
        
        console.log("🚀 서버로 보낼 로그인 데이터:", loginData);

        /* ==========================================================
           🚧 [백엔드 연결 시 주석 해제할 부분 시작] 🚧
           서버가 준비되면 아래 가짜 통신 코드를 지우고 이 부분을 푸세요!
        ========================================================== */
        
        // const response = await axios.post('/api/login', loginData);
        // const { accessToken } = response.data; // 서버가 주는 토큰 이름에 맞춰 수정 필요
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('userId', email);

        /* ========================================================== */

        /* ----------------------------------------------------------
           ⬇️ [현재 작동 중인 가짜(Mock) 통신 코드] ⬇️ 
           백엔드 연결 전까지 에러 안 나게 임시로 시간 끌고 넘겨주는 역할
        ---------------------------------------------------------- */
        
        // 1초 대기 (서버 통신하는 척)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 임시 가짜 토큰 저장 (검문소 테스트용)
        localStorage.setItem('accessToken', 'mock-fake-jwt-token-123');
        localStorage.setItem('userId', email);
        
        /* ---------------------------------------------------------- */

        Swal.fire({ icon: 'success', title: '로그인 성공!', showConfirmButton: false, timer: 1500 });
        navigate('/');
        
      } catch (error) {
        // 실제 통신 시 서버에서 보내주는 에러 메시지 잡기
        const errorMessage = error.response?.data?.message || '서버와 통신 중 에러가 발생했습니다.';
        Swal.fire({ icon: 'error', title: '로그인 실패', text: errorMessage });
      } finally {
        setIsLoading(false);
      }

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