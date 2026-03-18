import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 85vh에서 100vh로 화면 꽉 채우게 변경 */
  width: 100%;
  background-color: #0B1120; /* 로그인 페이지랑 똑같은 딥블루 블랙 */
  padding: 20px;
  box-sizing: border-box;
`;

export const UploadCard = styled.div`
  background: #111827; /* 카드도 다크 네이비로 묵직하게 */
  padding: 60px 40px;
  border: 1px solid #1E293B; /* 은은한 경계선 */
  border-radius: 8px; /* 너무 둥글지 않게 날렵한 각 살림 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5); /* 그림자도 딥하게 */
  text-align: center;
  width: 100%;
  max-width: 650px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #F8FAFC; /* 흰색에 가까운 텍스트 */
  margin-bottom: 8px;
  letter-spacing: -1px;

  span {
    color: #38BDF8; /* 일렉트릭 블루 포인트 */
    text-shadow: 0 0 12px rgba(56, 189, 248, 0.4); /* X에서 뿜어져 나오는 네온 효과 */
  }
`;

export const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #94A3B8; /* 세련된 그레이블루 */
  margin-bottom: 40px;
`;

export const DropZone = styled.div`
  /* 파일 올리는 영역도 다크 & 네온 감성으로 */
  border: 2px dashed ${props => (props.$isDragActive ? '#38BDF8' : '#334155')};
  background-color: ${props => (props.$isDragActive ? 'rgba(56, 189, 248, 0.05)' : '#0F172A')};
  border-radius: 12px;
  padding: 60px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #38BDF8;
    background-color: rgba(56, 189, 248, 0.05);
    box-shadow: inset 0 0 20px rgba(56, 189, 248, 0.05);
  }

  /* 💡 UploadPage.js에 인라인으로 박혀있는 텍스트 색상을 강제로 덮어씌움 */
  h3 { color: #F1F5F9 !important; }
  p { color: #64748B !important; }
`;

export const SelectedFileBox = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: rgba(56, 189, 248, 0.1); /* 스카이블루 빛이 살짝 감도는 배경 */
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 8px;
  color: #38BDF8; 
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #ffffff; 
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 1s linear infinite;
`;

export const ScanButton = styled.button`
  margin-top: 30px;
  /* 로그인 버튼과 동일한 고급스러운 그라데이션 적용 */
  background: linear-gradient(135deg, #38BDF8 0%, #1D4ED8 100%);
  color: white;
  border: none;
  border-radius: 6px; 
  padding: 16px 40px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  
  margin-left: auto;
  margin-right: auto;

  &:hover:not(:disabled) {
    /* 마우스 올렸을 때 묵직하게 가라앉으면서 빛나게 (허옇게 뜨는 거 방지) */
    background: linear-gradient(135deg, #0EA5E9 0%, #1E40AF 100%); 
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    background: #1E293B;
    color: #475569;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;