// import axios from "axios";

// export const scanMalware = async (file) => {
//     const formData = new FormData();

//     formData.append('file', file);

//     const response = await axios.post('/api/scan', formData, {
//         headers:{
//             'Content-Type': 'multipart/form-data',
//         },
//     });
//     return response.data;
// }

// 나중에 백엔드가 연결되면 axios 로직으로 다시 교체할 예정입니다.
export const scanMalware = async (file) => {
    // 1. 서버 통신하는 척 2초(2000ms) 기다리기
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. 백엔드가 돌려줄 것이라 예상되는 JSON 구조 (위험 상태 테스트용)
    return {
        status: "SAFE", // VEXIT(위험) 또는 SAFE(안전)로 바꿔보며 테스트하세요.
        risk_score: 98.7,
        target_name: file.name,
        scan_time: "0.14s",
        ai_reasons: [
            "알려진 피싱 도메인 패턴 일치",
            "비정상적인 권한 탈취 스크립트 발견",
            "알려지지 않은 서명 확인"
        ],
        action: "해당 파일 실행을 즉시 취소하고 영구 삭제하십시오."
    };
}