import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import UploadPage from "./pages/UploadPage";
import HistoryPage from "./pages/HistoryPage";
import ResultPage from "./pages/ResultPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const globalStyles = {
    fontFamily:
      "'Pretendard', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#0B1120",
    color: "#F8FAFC",
    minHeight: "100vh",
  };

  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyles = {
    flex: 1,
    width: "100%",
    margin: "0 auto",
  };

  return (
    <Router>
      <div style={globalStyles}>
        <div style={containerStyles}>
          <Header />

          <main style={contentStyles}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/scan" element={<UploadPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>

          {/* ✨ 최하단 푸터 */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
