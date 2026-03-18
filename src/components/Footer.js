import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 32px 20px;
  /* 💡 메인 배경보다 살짝 더 어두운 찐 딥블루로 바닥을 무겁게 눌러줌 */
  background-color: #080D1A; 
  border-top: 1px solid #1E293B; /* 헤더랑 똑같은 은은한 경계선 */
  text-align: center;
  box-sizing: border-box;
`;

const Copyright = styled.p`
  margin: 0 0 8px 0;
  color: #94A3B8; /* 너무 밝지 않은 세련된 그레이블루 */
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
`;

const Disclaimer = styled.small`
  display: block;
  color: #475569; /* 저작권보다 한 톤 더 죽여서 은은하게 깔아줌 */
  font-size: 0.85rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

function Footer() {
  return (
    <FooterContainer>
      <Copyright>© 2026 VirusX Team. All rights reserved.</Copyright>
      <Disclaimer>
        본 서비스의 결과는 AI 모델 및 VirusTotal API를 기반으로 제공되며, 실제 악성코드 여부와 100% 일치하지 않을 수 있습니다. 
        최종 판단의 책임은 사용자에게 있습니다.
      </Disclaimer>
    </FooterContainer>
  );
}

export default Footer;