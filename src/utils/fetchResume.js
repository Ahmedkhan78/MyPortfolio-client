import api from "./api";

export const fetchResume = async () => {
  try {
    const response = await api.get("/resume", {
      responseType: "blob", // important for PDF
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    throw error;
  }
};
