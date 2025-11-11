const AUTH_TOKEN_KEY = "authToken";
const USER_KEY = "user";

export const authService = {
  // Simple login with hardcoded credentials for demo
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "admin") {
          const user = {
            id: 1,
            username: "admin",
            name: "Administrator",
            role: "admin",
            avatar: "/doctor-avatar.png",
          };

          localStorage.setItem(AUTH_TOKEN_KEY, "demo-token-12345");
          localStorage.setItem(USER_KEY, JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid credentials. Use admin/admin for demo."));
        }
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.location.href = "/login";
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  },

  getAuthToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },
};
