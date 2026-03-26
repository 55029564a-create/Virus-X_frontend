import api from "./axios"; 

export const scanMalware = async (payload, type) => {
  try {
    if (type === "file") {
      const formData = new FormData();
      formData.append("file", payload);

      const response = await api.post(
        "/api/scan/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    }

    if (type === "url") {
      const response = await api.post(
        "/api/scan/url",
        { url: payload }
      );

      return response.data;
    }
  } catch (error) {
    console.error("scanMalware error:", error);
    throw error;
  }
};