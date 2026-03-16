import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContainer, AuthCard, Title, Form, Input, SubmitButton, ToggleText } from './Auth.styles';

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    Swal.fire({ icon: 'success', title: '가입 환영합니다!', showConfirmButton: false, timer: 1500 });
    navigate('/login');
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
            onChange={(e) => setName(e.target.value)} required 
          />
          <Input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} required 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} required 
          />
          <SubmitButton type="submit">Sign Up</SubmitButton>
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