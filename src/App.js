import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // 헤더 추가
import Footer from './components/Footer';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';   // 로그인 추가
import SignupPage from './pages/SignupPage'; // 회원가입 추가

function App() {
  const globalStyles = {
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: '#f9fafb',
    color: '#333',
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const contentStyles = {
    flex: 1,
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '40px 20px',
  };

  return (
    <Router>
      <div style={globalStyles}>
        <div style={containerStyles}>
          {/* ✨ 화면 최상단에 헤더 배치 */}
          <Header /> 
          
          <main style={contentStyles}>
            <Routes>
              <Route path="/" element={<UploadPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;