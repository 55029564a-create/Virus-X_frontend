import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
`;

export const AuthCard = styled.div`
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #202124;
  margin-bottom: 30px;
  
  span {
    color: #1a73e8;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border: 2px solid #1a73e8;
    padding: 13px 15px; /* 테두리 두꺼워질 때 레이아웃 밀림 방지 */
  }
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`;

export const ToggleText = styled.p`
  margin-top: 24px;
  color: #5f6368;
  font-size: 0.95rem;

  span {
    color: #1a73e8;
    font-weight: 600;
    cursor: pointer;
    margin-left: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;