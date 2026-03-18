// import axios from 'axios';
// import Swal from 'sweetalert2';

// // 1. 기본 설정이 된 axios 인스턴스 생성
// const api = axios.create({
//   // 나중에 실제 백엔드 주소로 바꾸세요! (예: http://localhost:8080)
//   baseURL: 'http://localhost:5000', 
//   timeout: 5000,
// });

// // 2. 🚀 요청(Request) 검문소: 서버로 출발하기 '직전'에 가로챔
// api.interceptors.request.use(
//   (config) => {
//     // 로컬 스토리지에서 JWT 토큰을 꺼내옵니다.
//     const token = localStorage.getItem('accessToken');
    
//     // 토큰이 있으면 무조건 헤더에 'Bearer {토큰}' 형태로 꽂아서 보냅니다. (JWT 국룰)
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 3. 🛡️ 응답(Response) 검문소: 서버에서 데이터가 도착하자마자 가로챔
// api.interceptors.response.use(
//   (response) => {
//     return response; // 정상 응답이면 그대로 통과
//   },
//   (error) => {
//     // 백엔드에서 "너 토큰 이상해(401)" 또는 "권한 없어(403)"라고 튕겨냈을 때의 처리
//     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//       console.warn("🚨 [Auth Error] 토큰이 만료되었거나 유효하지 않습니다.");
      
//       // 썩은 토큰은 버리고
//       localStorage.removeItem('accessToken');
      
//       // 경고창 띄우고 로그인 페이지로 강제 추방
//       Swal.fire({
//         icon: 'error',
//         title: '세션 만료',
//         text: '로그인이 만료되었습니다. 다시 로그인해주세요.',
//         confirmButtonColor: '#EF4444'
//       }).then(() => {
//         window.location.href = '/login'; 
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;