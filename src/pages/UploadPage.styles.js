import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  background:
    radial-gradient(
      circle at top,
      rgba(56, 189, 248, 0.08) 0%,
      transparent 30%
    ),
    linear-gradient(180deg, #0b1120 0%, #0f172a 100%);
  box-sizing: border-box;
`;

export const UploadCard = styled.div`
  width: 100%;
  max-width: 760px;
  background: rgba(17, 24, 39, 0.94);
  border: 1px solid #1e293b;
  border-radius: 22px;
  padding: 42px 34px;
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.38);
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 30px 20px;
    border-radius: 18px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  color: #f8fafc;
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 900;
  text-align: center;
  letter-spacing: -0.8px;

  span {
    color: #38bdf8;
    text-shadow: 0 0 14px rgba(56, 189, 248, 0.35);
  }
`;

export const Subtitle = styled.p`
  margin: 0 0 8px;
  text-align: center;
  color: #e2e8f0;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.7;
`;

export const GuideText = styled.p`
  margin: 0 0 30px;
  text-align: center;
  color: #94a3b8;
  font-size: 0.96rem;
  line-height: 1.7;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$active ? "#38BDF8" : "#334155")};
  background: ${(props) =>
    props.$active ? "rgba(56, 189, 248, 0.12)" : "#0F172A"};
  color: ${(props) => (props.$active ? "#F8FAFC" : "#94A3B8")};
  font-size: 0.98rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    border-color: #38bdf8;
    color: #f8fafc;
  }
`;

export const DropZone = styled.div`
  border: 2px dashed ${(props) => (props.$isDragActive ? "#38BDF8" : "#334155")};
  background: ${(props) =>
    props.$isDragActive ? "rgba(56, 189, 248, 0.08)" : "#0F172A"};
  border-radius: 18px;
  padding: 48px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
  box-sizing: border-box;

  &:hover {
    border-color: #38bdf8;
    background: rgba(56, 189, 248, 0.06);
  }

  @media (max-width: 640px) {
    padding: 38px 16px;
  }
`;

export const DropIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
`;

export const DropTitle = styled.h3`
  margin: 0 0 10px;
  color: #f8fafc;
  font-size: 1.2rem;
  font-weight: 800;
`;

export const DropDescription = styled.p`
  margin: 0;
  color: #94a3b8;
  font-size: 0.96rem;
  line-height: 1.6;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UrlInputContainer = styled.div`
  margin-bottom: 10px;
`;

export const UrlInput = styled.input`
  width: 100%;
  padding: 16px 18px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 12px;
  color: #f8fafc;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
  }

  &::placeholder {
    color: #64748b;
  }
`;

export const SelectedFileBox = styled.div`
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  background: #0f172a;
  border: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #e2e8f0;
  font-weight: 600;
  word-break: break-all;

  span {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const FileMeta = styled.span`
  color: #64748b;
  font-size: 0.88rem;
  font-weight: 500;
`;

export const RemoveButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: rgba(239, 68, 68, 0.08);
  color: #f87171;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.16);
    transform: scale(1.06);
  }
`;

export const NoticeText = styled.p`
  margin: 22px 0 0;
  text-align: center;
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.6;
`;

export const ScanButton = styled.button`
  width: 100%;
  margin-top: 22px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #38bdf8 0%, #1d4ed8 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.22);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%);
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(56, 189, 248, 0.3);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.28);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
