import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api/axios";
import {
  Container,
  ContentCard,
  Title,
  HistoryTable,
  StatusBadge,
  EmptyMessage,
  UrlText,
} from "./History.styles";

function HistoryPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [dbStatus, setDbStatus] = useState("loading");

  useEffect(() => {
    const user = localStorage.getItem("userId");

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "접근 제한",
        text: "로그인한 회원만 볼 수 있는 내역입니다.",
        confirmButtonColor: "#38BDF8",
        background: "#111827",
        color: "#F8FAFC",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    setCurrentUser(user);

    const fetchHistory = async () => {
      try {
        const response = await api.get("/api/history", {
          params: { userId: user },
        });

        setDbStatus("connected");
        setHistoryList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("DB 연결 에러:", error);
        setDbStatus("disconnected");
      }
    };

    fetchHistory();
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <Container>
      <ContentCard>
        <Title>📋 {currentUser.split("@")[0]}님의 검사 내역</Title>

        {dbStatus === "loading" && (
          <EmptyMessage>⏳ DB와 연결을 확인하는 중입니다...</EmptyMessage>
        )}

        {dbStatus === "disconnected" && (
          <EmptyMessage style={{ color: "#EF4444" }}>
            🚨 DB 연결 안됨 (백엔드 서버를 확인해주세요)
          </EmptyMessage>
        )}

        {dbStatus === "connected" && historyList.length === 0 && (
          <EmptyMessage style={{ color: "#10B981" }}>
            ✅ DB랑 연결은 됐지만 내역이 없음
          </EmptyMessage>
        )}

        {dbStatus === "connected" && historyList.length > 0 && (
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
              {historyList.map((item, index) => {
                const isUrl = item.input_type === "URL";
                const isMalicious =
                  item.final_status === "X" || item.final_status === "VEXIT";

                return (
                  <tr key={item.scan_id || index}>
                    <td style={{ color: "#94A3B8" }}>
                      {item.created_at ? item.created_at.substring(0, 16) : "-"}
                    </td>
                    <td
                      style={{
                        fontWeight: "600",
                        color: isUrl ? "#38BDF8" : "#F8FAFC",
                      }}
                    >
                      {isUrl ? "🔗 URL" : "📄 FILE"}
                    </td>
                    <td style={{ maxWidth: "300px" }}>
                      {isUrl ? (
                        <UrlText
                          href={item.target_value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.target_value}
                        </UrlText>
                      ) : (
                        <span style={{ fontWeight: "500" }}>
                          {item.target_value}
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        color: item.risk_score >= 50 ? "#EF4444" : "#10B981",
                        fontWeight: "700",
                      }}
                    >
                      {item.risk_score}%
                    </td>
                    <td>
                      <StatusBadge $isMalicious={isMalicious}>
                        {isMalicious ? "🚨 차단 (VEXIT)" : "✅ 안전 (Clean)"}
                      </StatusBadge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </HistoryTable>
        )}
      </ContentCard>
    </Container>
  );
}

export default HistoryPage;
