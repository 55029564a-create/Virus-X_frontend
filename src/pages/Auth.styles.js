import styled from 'styled-components';

export const AuthContainer = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0B1120; /* 단순한 검은색이 아닌, 아주 깊은 심해 같은 블루블랙 */
  box-sizing: border-box;
  font-family: 'Pretendard', sans-serif;
`;

export const AuthCard = styled.div`
  background: #111827; /* 배경보다 살짝 밝은 다크 네이비/그레이 톤 */
  padding: 40px 30px; 
  border: 1px solid #1E293B; /* 은은하고 고급스러운 경계선 */
  border-radius: 8px; /* 너무 각지지도 둥글지도 않은 딱 세련된 느낌 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  color: #F8FAFC;
  font-size: 32px;
  margin-bottom: 40px;
  font-weight: 800;
  letter-spacing: 1px;

  /* X 부분에 시원하고 쨍한 스카이/일렉트릭 블루 포인트 */
  span {
    color: #38BDF8; 
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.4); /* 은은하게 빛나는 효과 */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px;
  background: #0F172A; /* 인풋창은 카드보다 살짝 더 어두운 톤으로 눌러줌 */
  border: 1px solid #334155;
  border-radius: 6px;
  color: #F1F5F9;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;

  &:focus {
    border-color: #38BDF8; /* 포커스 시 시원한 블루 테두리 */
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15); /* 부드러운 글로우 효과 */
  }

  &::placeholder {
    color: #64748B;
  }
/* 💡 추가할 치트키: 구글 자동완성 흰색 배경 암살하기 */
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px #0F172A inset !important; /* 우리가 정한 딥블루 배경색으로 꽉 채워서 덮어버림 */
    -webkit-text-fill-color: #F1F5F9 !important; /* 글자색도 원래 우리가 쓰던 흰색으로 고정 */
    transition: background-color 5000s ease-in-out 0s; /* 크롬이 배경색 바꾸려는 걸 5000초 지연시켜서 막아버림 ㅋㅋㅋ */
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  /* 💡 촌스러운 단색 버리고, 로고색(스카이블루)에서 딥블루로 이어지는 세련된 그라데이션 */
  background: linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px; /* 글자 간격 살짝 넓혀서 시원하게 */
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2); /* 은은한 로고색 그림자 */

  &:hover {
    /* 💡 허옇게 변하는 거 삭제! 더 깊고 진한 바다색으로 톤을 잡고 네온 빛만 발산 */
    background: linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%); 
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5); /* 빛 번짐 효과만 살짝 줌 */
    transform: translateY(-2px); 
  }

  &:active {
    transform: translateY(1px); /* 클릭하면 꾹 눌림 */
  }

  &:disabled {
    background: #1E293B;
    color: #475569;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const ToggleText = styled.p`
  margin-top: 24px;
  color: #64748B; /* 기존보다 살짝 더 딥하고 고급진 회색 */
  font-size: 14px;
  font-weight: 400;

  span {
    color: #F8FAFC; /* 완전 흰색에 가까운 색으로 확 튀게 */
    font-weight: 600;
    cursor: pointer;
    margin-left: 8px;
    padding-bottom: 2px;
    border-bottom: 1px solid transparent; /* 기본적으론 밑줄 숨김 */
    transition: all 0.3s ease;

    &:hover {
      color: #38BDF8; /* 마우스 올리면 로고 포인트 컬러로 변함! */
      border-bottom: 1px solid #38BDF8; /* 밑줄 쫙 그어지면서 강조 */
    }
  }
`;