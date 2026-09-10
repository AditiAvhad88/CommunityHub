import API from "./authService";

export const getPosts = () => API.get("/posts");

export const createPost = (data, token) =>
  API.post("/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

