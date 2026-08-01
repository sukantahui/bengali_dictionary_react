import api from "../api/api";

export const login = (data) => api.post("/login", data);
export const logout = () => api.post("/logout");
export const profile = () => api.get("/profile");
export const register = (data) => api.post("/register", data);
export const updatePassword = (data) => api.put("/update-password", data);