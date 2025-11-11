import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const medicalAPI = {
  // Authentication
  login: (credentials) => api.post("/api/v1/auth/login", credentials),

  // Predictions
  predict: (formData) =>
    api.post("/api/v1/predict", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Model info
  getModelInfo: () => api.get("/api/v1/model-info"),

  // Health check
  healthCheck: () => api.get("/health"),

  // Patient records (you'll need to implement these in backend)
  getPatients: () => api.get("/api/v1/patients"),
  createPatient: (data) => api.post("/api/v1/patients", data),
  updatePatient: (id, data) => api.put(`/api/v1/patients/${id}`, data),
  deletePatient: (id) => api.delete(`/api/v1/patients/${id}`),
};

export default api;
