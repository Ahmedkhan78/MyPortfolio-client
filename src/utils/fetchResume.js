import api from "./api";

export const fetchResume = async (file) => {
  try {
    const response = await api.get(`/resume/${file}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch resume:", error);
    throw error;
  }
};
