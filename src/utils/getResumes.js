import api from "./api";

export const getResumes = async () => {
  try {
    const response = await api.get("/resumes");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch resume List:", error);
    throw error;
  }
};
