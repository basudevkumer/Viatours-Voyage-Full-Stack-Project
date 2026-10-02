"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { login as loginService, logout as logoutService } from "@/services/authService";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("unauthenticated");
  const login = useCallback(async (credentials) => {
    setStatus("loading");
    try {
      const result = await loginService(credentials);
      if (!result.success) { setStatus("unauthenticated"); return result; }
      setUser(result.data.user); setStatus("authenticated"); return result;
    } catch (error) { setStatus("unauthenticated"); return { success: false, message: error.message || "Unable to sign in.", errors: [] }; }
  }, []);
  const logout = useCallback(async () => { await logoutService(); setUser(null); setStatus("unauthenticated"); }, []);
  const value = useMemo(() => ({ user, status, login, logout }), [user, status, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
