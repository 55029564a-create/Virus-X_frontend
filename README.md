# Virus-X

클라우드 악성코드 예측 감지 시스템입니다.  
파일 및 URL 검사 결과를 AI 분석 모델과 연동하여 사용자에게 직관적인 보안 검사 결과를 제공하는 웹 기반 보안 서비스입니다.

## My Role

프론트엔드 / UI 설계 / API 연동

- 메인 대시보드와 스캐너 페이지 구조 분리
- 토큰 기반 회원/비회원 권한 분기 UI 설계
- 로그인 상태에 따른 헤더, 푸터, 접근 가능 화면 구성
- 파일 검사 및 URL 검사 화면 UI 구현
- 백엔드 API 연동을 통한 검사 결과 화면 표시
- 검사 결과 데이터 시각화 및 사용자 인터랙션 구성
- 사용자가 검사 결과를 직관적으로 이해할 수 있도록 UI/UX 개선

## Tech Stack

- Frontend: React, JavaScript, Node.js
- Backend: Spring Boot, Java, JWT
- Database: MongoDB
- AI/ML: Python, scikit-learn, LightGBM
- Tools: Git, GitHub, Figma, Notion, Discord

## 주요 기능

### 1. 파일 검사

- 사용자가 업로드한 파일을 AI 분석 서버로 전달
- 악성 여부 및 위험도 결과 표시
- 검사 결과를 사용자가 이해하기 쉬운 형태로 시각화

### 2. URL 검사

- 의심 URL 입력 후 위험 여부 검사
- 검사 결과를 안전/위험 상태로 구분하여 제공
- 직관적인 결과 UI를 통해 즉시 판단 가능하도록 구성

### 3. 회원 / 비회원 권한 분기

- 비회원은 기본 검사 기능 사용 가능
- 회원은 검사 이력 조회 등 추가 기능 사용 가능
- 로그인 상태에 따라 접근 가능한 화면과 UI를 분리

### 4. 검사 결과 페이지

- AI 분석 결과를 새로운 결과 화면에서 확인
- 위험도, 악성 여부, 상세 분석 사유를 시각적으로 제공
- 사용자가 보안 전문 지식 없이도 결과를 이해할 수 있도록 구성

### 5. 검사 이력 관리

- 사용자별 검사 기록 저장 및 조회
- MongoDB 기반 검사 결과 Document 저장 구조 활용
- 향후 통계 및 대시보드 확장 가능성 고려

## 프로젝트에서 중점적으로 해결한 문제

### 사용자 진입 장벽 최소화

기존 보안 서비스는 복잡한 로그와 전문 용어로 인해 사용자가 결과를 이해하기 어렵다는 문제가 있었습니다. Virus-X는 파일 또는 URL을 입력하면 안전 여부를 직관적으로 확인할 수 있도록 화면 구조를 단순화했습니다.

### 회원 / 비회원 기능 분리

토큰 기반 로그인 상태에 따라 사용할 수 있는 기능을 구분했습니다. 비회원은 기본 검사를 사용할 수 있고, 회원은 검사 이력과 추가 기능을 사용할 수 있도록 UI 흐름을 분리했습니다.

### 검사 결과 시각화

AI 분석 결과를 단순 JSON 형태로 보여주는 것이 아니라, 위험도와 판단 결과를 사용자가 이해하기 쉬운 화면으로 구성했습니다. 이를 통해 비전문가도 검사 결과를 빠르게 파악할 수 있도록 개선했습니다.

## 프로젝트를 통해 배운 점

- 보안 서비스에서는 기능 구현뿐 아니라 사용자가 결과를 신뢰하고 이해할 수 있는 UI 구성이 중요하다는 점을 배웠습니다.
- 로그인 상태와 권한에 따라 화면 흐름을 다르게 구성하는 방법을 경험했습니다.
- AI 분석 결과를 프론트엔드에서 사용자 친화적인 정보로 변환해 보여주는 과정의 중요성을 이해했습니다.
- 백엔드 API와 프론트엔드 UI를 연결하며 데이터 흐름과 상태 관리의 중요성을 체감했습니다.

## Related Repositories

| 구분 | 저장소 |
|---|---|
| Frontend | 현재 저장소 |
| Backend | [Virus-X_backend](https://github.com/55029564a-create/Virus-X_backend) |
| AI Model 1 | [Virus-X_AI-model1](https://github.com/55029564a-create/Virus-X_AI-model1) |
| AI Model 2 | [Virus-X_AI2-SUB-MODEL](https://github.com/55029564a-create/Virus-X_AI2-SUB-MODEL) |
| AI Model 3 | [Virus-X_AI3-SUB-MODEL](https://github.com/55029564a-create/Virus-X_AI3-SUB-MODEL) |

---

# 🚀 프로젝트 로컬 환경 세팅 가이드

> 진행 환경: VS Code 터미널 / Command Prompt 기준

## 🎨 1. 프론트엔드

### 1. 레포지토리 클론

```bash
git clone https://github.com/55029564a-create/Virus-X_frontend.git
```

### 2. 프로젝트 폴더로 이동

```bash
cd Virus-X_frontend
```

### 3. 패키지 설치

```bash
npm install
```

### 4. 프로젝트 실행

```bash
npm start
```

또는 Vite 기반 프로젝트인 경우:

```bash
npm run dev
```

---

## ⚙️ 2. 백엔드

### 1. 레포지토리 클론

```bash
git clone https://github.com/55029564a-create/Virus-X_backend.git
```

### 2. 프로젝트 폴더로 이동

```bash
cd Virus-X_backend
```

### 3. 프로젝트 실행

Spring Boot 프로젝트 실행 방식에 맞게 실행합니다.

```bash
./gradlew bootRun
```

또는 IDE에서 `Application` 파일을 실행합니다.

---

## 🤖 3. AI 모델

### AI Model 1

```bash
git clone https://github.com/55029564a-create/Virus-X_AI-model1.git
```

### AI Model 2

```bash
git clone https://github.com/55029564a-create/Virus-X_AI2-SUB-MODEL.git
```

### AI Model 3

```bash
git clone https://github.com/55029564a-create/Virus-X_AI3-SUB-MODEL.git
```

각 AI 모델 레포 내부의 실행 방식에 따라 필요한 패키지를 설치한 후 실행합니다.

```bash
pip install -r requirements.txt
python app.py
```

---

## 🗄️ 4. 데이터베이스

- MongoDB 사용
- 사용자 정보, 검사 이력, AI 분석 결과 Document 저장
- 사용자별 검사 기록 조회 및 향후 통계 분석 확장을 고려한 구조
