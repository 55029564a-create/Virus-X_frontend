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
  ClickableRow,
  HashText,
  FileNameText,
  ScoreText,
  ViewButton,
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

    try {
      if (loginUser) {
        const parsedUser = JSON.parse(loginUser);

        if (parsedUser?.email) {
          setCurrentUser(parsedUser.email);
        } else if (parsedUser?.userId) {
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
        const response = await api.get("/api/history");
        setDbStatus("connected");
        setHistoryList(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("검사 기록 조회 에러:", error);

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

  const formatFileSize = (bytes) => {
    if (bytes == null || Number.isNaN(Number(bytes))) return "-";

    const size = Number(bytes);

    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleViewResult = (item) => {
    const isMalicious =
      String(item.verdict || "").toUpperCase() === "MALICIOUS";

    const mappedResultData = {
      is_malware: isMalicious,
      risk_score: item.riskScore ?? 0,
      target_name: item.fileName || "Unknown File",
      input_type: "file",
      threat_type: item.threatType || "Unknown",
      from_history: true,
      ai_results: [
        {
          modelName: "저장된 검사 기록",
          riskScore: item.riskScore ?? 0,
          verdict: isMalicious ? "Malicious" : "Clean",
          threatType: item.threatType || "Unknown",
          reasons: [
            `검사 일시: ${formatDateTime(item.createdAt)}`,
            `파일명: ${item.fileName || "-"}`,
            `SHA256: ${item.sha256 || "-"}`,
            `파일 크기: ${formatFileSize(item.fileSize)}`,
            `최종 판정: ${isMalicious ? "악성" : "안전"}`,
            "이 화면은 저장된 검사 이력을 기반으로 다시 구성된 결과입니다.",
          ],
        },
      ],
    };

    navigate("/result", {
      state: { resultData: mappedResultData },
    });
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
                <th>보기</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => {
                const isMalicious =
                  String(item.verdict || "").toUpperCase() === "MALICIOUS";

                return (
                  <ClickableRow
                    key={`${item.sha256 || "history"}-${index}`}
                    onClick={() => handleViewResult(item)}
                  >
                    <td style={{ color: "#94A3B8" }}>
                      {formatDateTime(item.createdAt)}
                    </td>

                    <td>
                      <FileNameText title={item.fileName || "-"}>
                        {item.fileName || "-"}
                      </FileNameText>
                    </td>

                    <td>
                      <HashText title={item.sha256 || "-"}>
                        {item.sha256 || "-"}
                      </HashText>
                    </td>

                    <td>{formatFileSize(item.fileSize)}</td>

                    <td>
                      <ScoreText $danger={(item.riskScore ?? 0) >= 50}>
                        {item.riskScore != null ? item.riskScore : "-"}
                      </ScoreText>
                    </td>

                    <td>
                      <StatusBadge $isMalicious={isMalicious}>
                        {isMalicious ? "🚨 악성" : "✅ 안전"}
                      </StatusBadge>
                    </td>

                    <td>{item.threatType || "-"}</td>

                    <td>
                      <ViewButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewResult(item);
                        }}
                      >
                        결과 보기
                      </ViewButton>
                    </td>
                  </ClickableRow>
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
