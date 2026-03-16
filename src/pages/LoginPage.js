import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 💡 1. 로딩 상태 추가 (다중 클릭 방지용)
  const [isLoading, setIsLoading] = useState(false);

  // 💡 2. 나중에 서버 통신을 위해 async를 붙여줍니다.
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (email && password) {
      setIsLoading(true); // 버튼 비활성화 시작!

      try {
        // 💡 3. 백엔드 MongoDB 로그 저장을 위한 데이터 포장!
        const loginData = {
          email: email,
          password: password,
          device_info: navigator.userAgent // 접속한 브라우저/기기 정보 쓱 얹어주기
        };
        
        // 백엔드가 어떻게 받을지 미리 콘솔로 확인해봅시다.
        console.log("🚀 서버로 보낼 로그인 데이터:", loginData);

        // (나중에 여기에 await axios.post('/api/login', loginData); 가 들어갑니다)
        
        // 서버 통신하는 척 1초 정도 기다려주기 (로딩 스피너 확인용)
        await new Promise(resolve => setTimeout(resolve, 1000));

        localStorage.setItem('userId', email);

        Swal.fire({ icon: 'success', title: '로그인 성공!', showConfirmButton: false, timer: 1500 });
        navigate('/');
      } catch (error) {
        Swal.fire({ icon: 'error', title: '로그인 실패', text: '서버와 통신 중 에러가 발생했습니다.' });
      } finally {
        setIsLoading(false); // 성공하든 실패하든 통신 끝나면 버튼 다시 활성화
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
          {/* 💡 4. 로딩 중일 때는 버튼 클릭을 막고 텍스트를 바꿔줍니다 */}
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