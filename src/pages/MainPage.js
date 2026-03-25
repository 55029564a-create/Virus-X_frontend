import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 💡 framer-motion 추가!
import {
  Container,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  StartButton,
  DashboardWrapper,
  SectionTitle,
  StatGrid,
  StatCard,
  ThreatList,
  ThreatListItem,
  ThreatListHeader,
  ThreatListDesc,
} from "./MainPage.styles";

function MainPage() {
  const navigate = useNavigate();

  // ✨ 애니메이션 설정 (아래에서 위로 부드럽게 스르륵)
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // ✨ 시간차 애니메이션 (자식 요소들이 0.2초 간격으로 등장)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <Container>
      {/* 1. 히어로 섹션 (화면 진입 시 즉시 실행) */}
      <HeroSection>
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible" // 히어로는 스크롤 대기 없이 바로 보이게
        >
          <HeroTitle>
            AI 보안 관제 플랫폼 <br />
            <span>Virus EXIT Security Intelligence</span>
          </HeroTitle>
          <HeroSubtitle>
            단일 백신의 탐지 한계를 극복한 3단계 AI 앙상블 교차 검증 알고리즘.
            <br />
            정적 분석부터 심층 행위 예측까지, 진화하는 제로데이(Zero-Day) 위협을
            가장 빠르고 정확하게 식별합니다.
          </HeroSubtitle>

          <StartButton onClick={() => navigate("/scan")}>
            VX 스캔 시작
          </StartButton>
        </motion.div>
      </HeroSection>

      {/* 2. 대시보드 영역 */}
      <DashboardWrapper>
        {/* 라이브 관제 통계 (스크롤 시 등장) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible" // 💡 스크롤해서 화면에 보일 때 실행!
          viewport={{ once: true, amount: 0.3 }} // 💡 30% 정도 보였을 때 딱 한 번만 실행
        >
          <motion.div variants={fadeUpVariant}>
            <SectionTitle>
              <span>📊</span> VX Live Intelligence
            </SectionTitle>
          </motion.div>

          <StatGrid>
            <motion.div variants={fadeUpVariant}>
              <StatCard>
                <h3>8,452</h3>
                <p>누적 검사 완료</p>
              </StatCard>
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <StatCard>
                <h3 style={{ color: "#EF4444" }}>1,230</h3>
                <p>위협 차단 (VEXIT)</p>
              </StatCard>
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <StatCard>
                <h3 style={{ color: "#10B981" }}>7,222</h3>
                <p>안전 확인 (Clean)</p>
              </StatCard>
            </motion.div>
            <motion.div variants={fadeUpVariant}>
              <StatCard>
                <h3 style={{ color: "#38BDF8" }}>0.8s</h3>
                <p>평균 진단 소요 시간</p>
              </StatCard>
            </motion.div>
          </StatGrid>
        </motion.div>

        {/* 유행하는 악성코드 TOP 5 (스크롤 시 등장) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUpVariant}>
            <SectionTitle>
              <span>🦠</span> VX Top 5
            </SectionTitle>
          </motion.div>

          <ThreatList>
            <motion.div variants={fadeUpVariant}>
              <ThreatListItem $color="#EF4444">
                <ThreatListHeader $color="#EF4444">
                  <h4>Ransomware (랜섬웨어)</h4>
                  <span>#위험도_최상</span>
                </ThreatListHeader>
                <ThreatListDesc>
                  사용자의 문서나 사진 등 중요 파일을 암호화하여 인질로 잡고,
                  복구의 대가로 금전을 요구하는 치명적인 악성코드입니다.
                </ThreatListDesc>
              </ThreatListItem>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <ThreatListItem $color="#F97316">
                <ThreatListHeader $color="#F97316">
                  <h4>Trojan (트로이목마)</h4>
                  <span>#백도어_생성</span>
                </ThreatListHeader>
                <ThreatListDesc>
                  정상적인 유틸리티나 게임으로 위장하여 침투한 뒤, 해커가 PC를
                  원격 조종할 수 있는 뒷문(Backdoor)을 뚫어놓습니다.
                </ThreatListDesc>
              </ThreatListItem>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <ThreatListItem $color="#EAB308">
                <ThreatListHeader $color="#EAB308">
                  <h4>Adware (애드웨어)</h4>
                  <span>#PC_성능저하</span>
                </ThreatListHeader>
                <ThreatListDesc>
                  사용자 동의 없이 무분별하게 광고 창을 띄우거나, 검색 결과를
                  조작하여 인터넷 속도와 PC 성능을 심각하게 저하시킵니다.
                </ThreatListDesc>
              </ThreatListItem>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <ThreatListItem $color="#8B5CF6">
                <ThreatListHeader $color="#8B5CF6">
                  <h4>Spyware (스파이웨어)</h4>
                  <span>#정보_유출</span>
                </ThreatListHeader>
                <ThreatListDesc>
                  키보드 입력(키로깅), 화면 캡처 등을 통해 사용자의 아이디,
                  비밀번호, 금융 정보 등을 몰래 빼돌리는 스파이 프로그램입니다.
                </ThreatListDesc>
              </ThreatListItem>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <ThreatListItem $color="#3B82F6">
                <ThreatListHeader $color="#3B82F6">
                  <h4>Worm (웜 바이러스)</h4>
                  <span>#자기_복제</span>
                </ThreatListHeader>
                <ThreatListDesc>
                  숙주 파일 없이도 혼자서 복제되며, 네트워크를 타고 연결된 다른
                  PC들까지 순식간에 감염시켜 시스템을 마비시킵니다.
                </ThreatListDesc>
              </ThreatListItem>
            </motion.div>
          </ThreatList>
        </motion.div>
      </DashboardWrapper>
    </Container>
  );
}

export default MainPage;
