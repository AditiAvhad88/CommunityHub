import API from "./authService";

export const getQuestions = () => API.get("/questions");

export const askQuestion = (data, token) =>
  API.post("/questions", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });