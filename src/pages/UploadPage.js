import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { scanMalware } from "../api/scanner";

import {
  Container,
  UploadCard,
  Title,
  Subtitle,
  GuideText,
  TabContainer,
  TabButton,
  DropZone,
  DropIcon,
  DropTitle,
  DropDescription,
  HiddenInput,
  UrlInputContainer,
  UrlInput,
  SelectedFileBox,
  FileInfo,
  FileMeta,
  RemoveButton,
  ScanButton,
  Spinner,
  NoticeText,
} from "./UploadPage.styles";

function UploadPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("file");
  const [urlValue, setUrlValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE_SIZE = 32 * 1024 * 1024;

  const validateAndSetFile = (file) => {
    if (file.size > MAX_FILE_SIZE) {
      Swal.fire({
        icon: "error",
        title: "용량 초과",
        text: "32MB 이하의 파일만 업로드 가능합니다.",
        confirmButtonColor: "#38BDF8",
        background: "#111827",
        color: "#F8FAFC",
      });
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      validateAndSetFile(file);
      event.target.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleScan = async () => {
    if (activeTab === "file" && !selectedFile) return;
    if (activeTab === "url" && !urlValue.trim()) return;

    setIsLoading(true);

    try {
      const payload = activeTab === "file" ? selectedFile : urlValue;
      const resultData = await scanMalware(payload, activeTab);

      navigate("/result", { state: { resultData } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "서버 에러",
        text: "AI 분석 서버와 연결할 수 없습니다. 서버 상태를 확인해주세요.",
        confirmButtonColor: "#38BDF8",
        background: "#111827",
        color: "#F8FAFC",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    isLoading || (activeTab === "file" ? !selectedFile : !urlValue.trim());

  return (
    <Container>
      <UploadCard>
        <Title>
          AI 악성코드 <span>검사</span>
        </Title>

        <Subtitle>
          파일 또는 URL을 업로드하여 AI 기반 악성 여부 분석을 시작하세요
        </Subtitle>

        <GuideText>
          3단계 AI 교차 검증으로 위험도, 위협 유형, 세부 분석 결과를 제공합니다.
        </GuideText>

        <TabContainer>
          <TabButton
            $active={activeTab === "file"}
            onClick={() => setActiveTab("file")}
          >
            File Scan
          </TabButton>

          <TabButton
            $active={activeTab === "url"}
            onClick={() => setActiveTab("url")}
          >
            URL Scan
          </TabButton>
        </TabContainer>

        {activeTab === "file" ? (
          <>
            <DropZone
              $isDragActive={isDragActive}
              onClick={() => document.getElementById("fileInput").click()}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <DropIcon>📄</DropIcon>
              <DropTitle>검사할 파일 선택</DropTitle>
              <DropDescription>
                클릭하여 업로드하거나 파일을 여기로 드래그하세요
              </DropDescription>

              <HiddenInput
                id="fileInput"
                type="file"
                onChange={handleFileChange}
              />
            </DropZone>

            {selectedFile && (
              <SelectedFileBox>
                <FileInfo>
                  <span>📎</span>
                  <div>
                    <div>{selectedFile.name}</div>
                    <FileMeta>
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </FileMeta>
                  </div>
                </FileInfo>

                <RemoveButton onClick={handleRemoveFile} title="업로드 취소">
                  ✕
                </RemoveButton>
              </SelectedFileBox>
            )}
          </>
        ) : (
          <UrlInputContainer>
            <UrlInput
              type="text"
              placeholder="예: https://suspicious-website.com"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !isButtonDisabled && handleScan()
              }
            />
          </UrlInputContainer>
        )}

        <NoticeText>
          회원은 검사 결과 저장 및 내 검사 기록 조회 기능을 이용할 수 있습니다.
        </NoticeText>

        <ScanButton onClick={handleScan} disabled={isButtonDisabled}>
          {isLoading ? (
            <>
              <Spinner />
              <span>Scanning...</span>
            </>
          ) : (
            "검사 시작"
          )}
        </ScanButton>
      </UploadCard>
    </Container>
  );
}

export default UploadPage;
