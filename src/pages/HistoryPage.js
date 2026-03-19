import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
// 💡 만들어두신 UrlText 스타일 컴포넌트를 추가로 불러옵니다!
import { Container, ContentCard, Title, HistoryTable, StatusBadge, EmptyMessage, UrlText } from './History.styles';

function HistoryPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [historyList, setHistoryList] = useState([]); 
  const [dbStatus, setDbStatus] = useState('loading'); 

  useEffect(() => {
    const user = localStorage.getItem('userId');
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '접근 제한',
        text: '로그인한 회원만 볼 수 있는 내역입니다.',
        confirmButtonColor: '#38BDF8', // 💡 다크 테마에 맞춘 네온 블루 버튼
        background: '#111827',
        color: '#F8FAFC'
      }).then(() => {
        navigate('/login');
      });
      return;
    } 
    
    setCurrentUser(user);

    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/history', {
          params: { userId: user }
        });

        setDbStatus('connected');
        setHistoryList(response.data); 

      } catch (error) {
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
        
        {dbStatus === 'loading' && (
          <EmptyMessage>⏳ DB와 연결을 확인하는 중입니다...</EmptyMessage>
        )}

        {dbStatus === 'disconnected' && (
          <EmptyMessage style={{ color: '#EF4444' }}>
            🚨 DB 연결 안됨 (백엔드 서버를 확인해주세요)
          </EmptyMessage>
        )}

        {dbStatus === 'connected' && historyList.length === 0 && (
          <EmptyMessage style={{ color: '#10B981' }}>
            ✅ DB랑 연결은 됐지만 내역이 없음
          </EmptyMessage>
        )}

        {dbStatus === 'connected' && historyList.length > 0 && (
          <HistoryTable>
            <thead>
              <tr>
                <th>검사 일시</th>
                <th>유형</th>
                <th>검사 대상 (파일명 / URL)</th>
                <th>AI 위험도</th>
                <th>결과</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => (
                <tr key={item.scan_id || index}>
                  {/* 1. 날짜 (예: 2026-03-20 14:30) */}
                  <td style={{ color: '#94A3B8' }}>
                    {item.created_at ? item.created_at.substring(0, 16) : '-'}
                  </td>
                  
                  {/* 2. 유형 (URL인지 FILE인지 텍스트로 표시) */}
                  <td style={{ fontWeight: '600', color: item.input_type === 'URL' ? '#38BDF8' : '#F8FAFC' }}>
                    {item.input_type === 'URL' ? '🔗 URL' : '📄 FILE'}
                  </td>

                  {/* 3. 검사 대상 (💡 유형이 URL이면 UrlText 스타일 적용, 아니면 일반 텍스트) */}
                  <td style={{ maxWidth: '300px' }}>
                    {item.input_type === 'URL' ? (
                      <UrlText href={item.target_value} target="_blank" rel="noopener noreferrer">
                        {item.target_value}
                      </UrlText>
                    ) : (
                      <span style={{ fontWeight: '500' }}>{item.target_value}</span>
                    )}
                  </td>

                  {/* 4. AI 위험도 점수 (50%가 넘으면 붉은색 경고) */}
                  <td style={{ color: item.risk_score >= 50 ? '#EF4444' : '#10B981', fontWeight: '700' }}>
                    {item.risk_score}%
                  </td>

                  {/* 5. 최종 결과 뱃지 */}
                  <td>
                    <StatusBadge $isMalicious={item.final_status === 'X' || item.final_status === 'VEXIT'}>
                      {(item.final_status === 'X' || item.final_status === 'VEXIT') 
                        ? '🚨 차단 (VEXIT)' 
                        : '✅ 안전 (Clean)'}
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