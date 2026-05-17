// src/services/api.js
const API_URL = "http://localhost:8080/api";

export const authService = {
  register: async (username, email, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });
    return response.json();
  },

  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.accessToken) {
      localStorage.setItem("user", JSON.stringify(data));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  }
};

export const testService = {
  getPublic: async () => {
    const response = await fetch(`${API_URL}/test/all`);
    return response.text();
  },

  getUserContent: async (token) => {
    const response = await fetch(`${API_URL}/test/user`, {
      headers: { "x-access-token": token }
    });
    return response.text();
  },

  getModContent: async (token) => {
    const response = await fetch(`${API_URL}/test/mod`, {
      headers: { "x-access-token": token }
    });
    return response.text();
  },

  getAdminContent: async (token) => {
    const response = await fetch(`${API_URL}/test/admin`, {
      headers: { "x-access-token": token }
    });
    return response.text();
  }
};
