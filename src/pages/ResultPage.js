import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h2>분석 결과 리포트</h2>
      <div style={{ border: '1px solid #ccc', padding: '50px', margin: '20px' }}>
        {/* 나중에 여기에 AI 예측값과 VirusTotal API 결과가 들어갑니다 */}
        <p>분석 완료: 해당 파일은 <strong>정상</strong>일 확률이 높습니다.</p>
      </div>
      <button onClick={() => navigate('/')}>메인으로 돌아가기</button>
    </div>
  );
}
export default ResultPage;