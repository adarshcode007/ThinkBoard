import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5001/api",
  baseURL: "https://think-board-dun.vercel.app/",
});

export default api;
