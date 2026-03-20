import api from './axios';

export const scanMalware = async (payload, type) => {
  try {
    if (type === 'file') {
      const formData = new FormData();
      formData.append('file', payload); // 질문자님 FastAPI 서버의 파라미터 이름과 일치!

      // 👇 [중요] 팀원이 만든 가짜 주소 대신, 질문자님의 실제 AI 서버 주소를 넣습니다.
      // 0.0.0.0으로 띄운 질문자님의 IP 주소입니다.
      const response = await api.post('http://localhost:8080/api/scan/file', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

      return response.data; // { status, is_malware, ai_report }가 리액트로 넘어갑니다.
    }

    if (type === 'url') {
      // URL 검사 기능은 아직 질문자님 서버에 없으므로 일단 유지하거나 에러 처리
      const response = await api.post('/api/scan/url', {
        url: payload,
      });
      return response.data;
    }

    throw new Error(`지원하지 않는 검사 유형입니다: ${type}`);
  } catch (error) {
    console.error('AI 분석 서버 통신 에러:', error);
    throw error;
  }
};