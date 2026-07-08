import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, setToken, getToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // При загрузке — если есть токен, подтягиваем текущего пользователя.
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => {
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await api.post("/auth/login", { username, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const register = useCallback(async (username, password) => {
    const data = await api.post("/auth/register", { username, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  // Обновить данные пользователя (например, баланс после открытия кейса).
  const refreshUser = useCallback(async () => {
    const data = await api.get("/auth/me");
    setUser(data.user);
    return data.user;
  }, []);

  // Локально поправить баланс без запроса (когда сервер вернул новый баланс).
  const setBalance = useCallback((balance) => {
    setUser((prev) => (prev ? { ...prev, balance } : prev));
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    login,
    register,
    logout,
    refreshUser,
    setBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth должен использоваться внутри AuthProvider");
  return ctx;
}
