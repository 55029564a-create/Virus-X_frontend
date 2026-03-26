import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background-color: #0b1120;
  box-sizing: border-box;
`;

export const ContentCard = styled.div`
  background: #111827;
  padding: 40px;
  border: 1px solid #1e293b;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  overflow-x: auto;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 30px;
  border-bottom: 2px solid #1e293b;
  padding-bottom: 15px;
  letter-spacing: -0.5px;
`;

export const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 980px;

  th {
    background-color: #0f172a;
    color: #94a3b8;
    font-weight: 600;
    padding: 16px;
    border-bottom: 2px solid #1e293b;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 1px;
    white-space: nowrap;
  }

  td {
    padding: 16px;
    border-bottom: 1px solid #1e293b;
    color: #f1f5f9;
    vertical-align: middle;
    font-size: 1rem;
  }
`;

export const ClickableRow = styled.tr`
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: rgba(56, 189, 248, 0.05);
  }
`;

export const FileNameText = styled.div`
  max-width: 220px;
  font-weight: 600;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const HashText = styled.div`
  max-width: 260px;
  color: #cbd5e1;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 0.92rem;
  word-break: break-all;
  line-height: 1.5;
`;

export const ScoreText = styled.span`
  color: ${(props) => (props.$danger ? "#EF4444" : "#10B981")};
  font-weight: 700;
`;

export const StatusBadge = styled.span`
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background-color: ${(props) =>
    props.$isMalicious ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)"};
  color: ${(props) => (props.$isMalicious ? "#EF4444" : "#10B981")};
  border: 1px solid
    ${(props) =>
      props.$isMalicious
        ? "rgba(239, 68, 68, 0.3)"
        : "rgba(16, 185, 129, 0.3)"};
  box-shadow: ${(props) =>
    props.$isMalicious
      ? "0 0 10px rgba(239, 68, 68, 0.1)"
      : "0 0 10px rgba(16, 185, 129, 0.1)"};
`;

export const UrlText = styled.a`
  color: #38bdf8;
  text-decoration: none;
  word-break: break-all;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: #7dd3fc;
    text-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
    text-decoration: underline;
  }
`;

export const ViewButton = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(56, 189, 248, 0.28);
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 0;
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`;
