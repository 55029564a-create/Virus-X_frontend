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
} from "./History.styles";

function HistoryPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [dbStatus, setDbStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const loginUser = localStorage.getItem("loginUser");
    const userId = localStorage.getItem("userId");

    // 비로그인 사용자는 접근 차단
    if (!token) {
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

    // 화면 제목에 표시할 사용자명만 세팅
    try {
      if (loginUser) {
        const parsedUser = JSON.parse(loginUser);

        if (parsedUser && parsedUser.email) {
          setCurrentUser(parsedUser.email);
        } else if (parsedUser && parsedUser.userId) {
          setCurrentUser(parsedUser.userId);
        } else if (userId) {
          setCurrentUser(userId);
        } else {
          setCurrentUser("사용자");
        }
      } else if (userId) {
        setCurrentUser(userId);
      } else {
        setCurrentUser("사용자");
      }
    } catch (e) {
      if (userId) {
        setCurrentUser(userId);
      } else {
        setCurrentUser("사용자");
      }
    }

    const fetchHistory = async () => {
      try {
        // userId를 params로 보내지 않음
        const response = await api.get("/api/history");

        setDbStatus("connected");
        setHistoryList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("검사 기록 조회 에러:", error);

        // 인증 실패면 로그인 페이지 이동
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("loginUser");
          localStorage.removeItem("userId");

          Swal.fire({
            icon: "warning",
            title: "세션 만료",
            text: "다시 로그인해주세요.",
            confirmButtonColor: "#38BDF8",
            background: "#111827",
            color: "#F8FAFC",
          }).then(() => {
            navigate("/login");
          });
          return;
        }

        setDbStatus("disconnected");
      }
    };

    fetchHistory();
  }, [navigate]);

  if (!currentUser) return null;

  const displayName =
    typeof currentUser === "string" && currentUser.includes("@")
      ? currentUser.split("@")[0]
      : currentUser;

  const formatDateTime = (value) => {
    if (!value) return "-";

    try {
      const date = new Date(value);

      if (isNaN(date.getTime())) {
        return value;
      }

      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");

      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    } catch (e) {
      return value;
    }
  };

  return (
    <Container>
      <ContentCard>
        <Title>📋 {displayName}님의 검사 내역</Title>

        {dbStatus === "loading" && (
          <EmptyMessage>⏳ 검사 기록을 불러오는 중입니다...</EmptyMessage>
        )}

        {dbStatus === "disconnected" && (
          <EmptyMessage style={{ color: "#EF4444" }}>
            🚨 검사 기록을 불러오지 못했습니다. 백엔드 서버를 확인해주세요.
          </EmptyMessage>
        )}

        {dbStatus === "connected" && historyList.length === 0 && (
          <EmptyMessage style={{ color: "#10B981" }}>
            ✅ 저장된 검사 내역이 없습니다.
          </EmptyMessage>
        )}

        {dbStatus === "connected" && historyList.length > 0 && (
          <HistoryTable>
            <thead>
              <tr>
                <th>검사 일시</th>
                <th>파일명</th>
                <th>SHA256</th>
                <th>파일 크기</th>
                <th>위험 점수</th>
                <th>판정</th>
                <th>위협 유형</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => {
                const isMalicious =
                  String(item.verdict).toUpperCase() === "MALICIOUS";

                return (
                  <tr key={`${item.sha256 || "history"}-${index}`}>
                    <td style={{ color: "#94A3B8" }}>
                      {formatDateTime(item.createdAt)}
                    </td>

                    <td style={{ maxWidth: "300px", fontWeight: "500" }}>
                      {item.fileName || "-"}
                    </td>

                    <td style={{ color: "#CBD5E1", wordBreak: "break-all" }}>
                      {item.sha256 || "-"}
                    </td>

                    <td>{item.fileSize != null ? item.fileSize : "-"}</td>

                    <td
                      style={{
                        color: item.riskScore >= 50 ? "#EF4444" : "#10B981",
                        fontWeight: "700",
                      }}
                    >
                      {item.riskScore != null ? item.riskScore : "-"}
                    </td>

                    <td>
                      <StatusBadge $isMalicious={isMalicious}>
                        {isMalicious ? "🚨 악성" : "✅ 안전"}
                      </StatusBadge>
                    </td>

                    <td>{item.threatType || "-"}</td>
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