import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => Cookies.get("token") || null);

  // Check token on every render
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken !== token) {
      setTokenState(storedToken || null);
    }
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      Cookies.set("token", newToken, { 
        secure: import.meta.env.PROD,
        sameSite: 'lax'
      });
    } else {
      Cookies.remove("token");
    }
  };

  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
