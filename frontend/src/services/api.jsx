import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Signup endpoint
export async function signupUser(data) {
  try {
    const response = await api.post("/signup/", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
}

// Login endpoint
export async function loginUser(data) {
  try {
    const response = await api.post("/login/", {
      username: data.username,
      password: data.password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
}

// Get current user (protected endpoint)
export async function getCurrentUser() {
  try {
    const response = await api.get("/user/");
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message 
    };
  }
}

// Logout
export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
}

export default api;
