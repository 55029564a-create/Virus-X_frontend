import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'; // 💡 백엔드와 통신하기 위해 axios 추가!
import { Container, ContentCard, Title, HistoryTable, StatusBadge, EmptyMessage } from './History.styles';

function HistoryPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [historyList, setHistoryList] = useState([]); // 가짜 데이터 대신 진짜 데이터를 담을 빈 배열
  
  // 💡 DB 연결 상태를 관리하는 변수 ('loading': 확인중, 'connected': 연결됨, 'disconnected': 연결실패)
  const [dbStatus, setDbStatus] = useState('loading'); 

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '접근 제한',
        text: '로그인한 회원만 볼 수 있는 내역입니다.',
        confirmButtonColor: '#1a73e8'
      }).then(() => {
        navigate('/login');
      });
      return;
    } 
    
    setCurrentUser(user);

    // 🚀 백엔드(DB)에 내역을 달라고 요청해보는 함수
    const fetchHistory = async () => {
      try {
        // 백엔드 API로 요청을 보냅니다. (나중에 실제 백엔드 주소로 맞추면 됩니다)
        // param으로 현재 로그인한 유저의 아이디를 같이 보냅니다.
        const response = await axios.get('http://localhost:8000/api/history', {
          params: { userId: user }
        });

        // 🟢 catch로 안 빠지고 여기까지 왔다는 건 DB 연결이 성공했다는 뜻!
        setDbStatus('connected');
        setHistoryList(response.data); // 백엔드가 준 데이터를 저장 (없으면 빈 배열이 저장됨)

      } catch (error) {
        // 🔴 백엔드 서버가 안 켜져 있거나 연결에 실패하면 이쪽으로 빠집니다.
        console.error("DB 연결 에러:", error);
        setDbStatus('disconnected');
      }
    };

    fetchHistory();
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <Container>
      <ContentCard>
        <Title>📋 {currentUser.split('@')[0]}님의 검사 내역</Title>
        
        {/* 💡 DB 상태에 따라 화면을 다르게 보여줍니다! */}
        {dbStatus === 'loading' && (
          <EmptyMessage>⏳ DB와 연결을 확인하는 중입니다...</EmptyMessage>
        )}

        {dbStatus === 'disconnected' && (
          <EmptyMessage style={{ color: '#d93025' }}>
            🚨 DB 연결 안됨 (백엔드 서버를 확인해주세요)
          </EmptyMessage>
        )}

        {dbStatus === 'connected' && historyList.length === 0 && (
          <EmptyMessage style={{ color: '#1e8e3e' }}>
            ✅ DB랑 연결은 됐지만 내역이 없음
          </EmptyMessage>
        )}

        {dbStatus === 'connected' && historyList.length > 0 && (
          <HistoryTable>
            <thead>
              <tr>
                <th>검사 날짜</th>
                <th>파일명</th>
                <th>탐지 엔진</th>
                <th>결과</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => (
                // DB에서 주는 고유 ID가 있다면 item.id를 쓰고, 없다면 임시로 index를 씁니다.
                <tr key={item.id || index}>
                  <td style={{ color: '#5f6368' }}>{item.date}</td>
                  <td style={{ fontWeight: '500' }}>{item.fileName}</td>
                  <td>{item.vtScore}</td>
                  <td>
                    <StatusBadge $isMalicious={item.status === 'malicious'}>
                      {item.status === 'malicious' ? '🚨 악성 (Malicious)' : '✅ 안전 (Clean)'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </HistoryTable>
        )}

      </ContentCard>
    </Container>
  );
}

export default HistoryPage;