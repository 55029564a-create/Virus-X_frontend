import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import Footer from './components/Footer';

function App() {
  const globalStyles = {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f9fafb', // 밝은 회색 배경
    color: '#333',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyles = {
    flex: 1,
    maxWidth: '1200px', // 중앙 컨텐츠 최대 너비 제한
    width: '100%',
    margin: '0 auto', // 중앙 정렬
    padding: '40px 20px',
  };

  return (
    <Router>
      <div style={globalStyles}>
        <div style={containerStyles}>
          <main style={contentStyles}>
            <Routes>
              {/* 1. 파일 첨부 메인 페이지 */}
              <Route path="/" element={<UploadPage />} />
              {/* 2. 판별 결과 페이지 */}
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;