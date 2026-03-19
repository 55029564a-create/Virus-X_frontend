import axios from "axios";
const API_BASE_URL = "http://localhost:8080";

// 💡 userId 파라미터 추가!
export const scanMalware = async (payload, type, userId) => { 
  try {
    let response;

    if (type === 'file') {
      const formData = new FormData();
      formData.append('file', payload);
      // 💡 파일과 함께 유저 ID도 폼 데이터에 담아 보냅니다. (비로그인이면 null)
      if (userId) formData.append('user_id', userId); 

      response = await axios.post(`${API_BASE_URL}/api/scan/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } 
    else if (type === 'url') {
      response = await axios.post(`${API_BASE_URL}/api/scan/url`, { 
        url: payload,
        user_id: userId // 💡 JSON에 유저 ID 추가
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return response.data;
  } catch (error) {
    console.error("API 통신 에러:", error);
    throw error;
  }
}

// // 나중에 백엔드가 연결되면 axios 로직으로 다시 교체할 예정입니다.
// // payload: 파일 객체 또는 URL 텍스트 / type: 'file' 또는 'url'
// export const scanMalware = async (payload, type) => {
//     // 1. 서버 통신하는 척 2초(2000ms) 기다리기
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     // 2. 검사 대상 이름 추출 (파일이면 파일명, URL이면 URL 텍스트 그대로)
//     const targetName = type === 'file' ? payload.name : payload;

//     // 3. 백엔드가 돌려줄 것이라 예상되는 JSON 구조
//     return {
//         status: "VEXIT", // VEXIT(위험) 또는 SAFE(안전)로 바꿔보며 테스트하세요.
//         risk_score: 98.7,
//         target_name: targetName, // ✨ 여기에 파일명이나 URL이 꽂힙니다.
//         scan_time: "0.14s",
//         ai_reasons: [
//             "알려진 피싱 도메인 패턴 일치",
//             "비정상적인 권한 탈취 스크립트 발견",
//             "알려지지 않은 서명 확인"
//         ],
//         action: "해당 사이트 접속 및 파일 실행을 즉시 취소하고 영구 삭제하십시오."
//     };
// }