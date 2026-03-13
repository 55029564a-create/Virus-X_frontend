import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 32px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #dadce0;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
`;

const Copyright = styled.p`
  margin: 0 0 8px 0;
  color: #5f6368;
  font-weight: 600;
  font-size: 0.95rem;
`;

const Disclaimer = styled.small`
  display: block;
  color: #80868b;
  font-size: 0.85rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
`;

function Footer() {
  return (
    <FooterContainer>
      <Copyright>© 2026 Virus-X Team. All rights reserved.</Copyright>
      <Disclaimer>
        본 서비스의 결과는 AI 모델 및 VirusTotal API를 기반으로 제공되며, 실제 악성코드 여부와 100% 일치하지 않을 수 있습니다. 
        최종 판단의 책임은 사용자에게 있습니다.
      </Disclaimer>
    </FooterContainer>
  );
}

export default Footer;