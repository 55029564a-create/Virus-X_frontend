import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px' }}>
      <h1>Virus-X: AI Malware Detector</h1>
      <p>분석할 파일을 업로드하세요.</p>
      <input type="file" style={{ margin: '20px' }} />
      <br />
      {/* 나중에 기능을 넣으면 파일 전송 후 이동하게 바뀝니다 */}
      <button onClick={() => navigate('/result')} style={{ padding: '10px 20px' }}>
        판별 실행하기
      </button>
    </div>
  );
}
export default UploadPage;