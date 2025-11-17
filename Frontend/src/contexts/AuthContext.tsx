import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  // avatar?: string;
  // add more fields as needed
}

interface AuthContextType {
  token: string | null;
  role: "employee" | "employer" | null;
  user: User | null;
  login: (token: string, role: "employee" | "employer", user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<"employee" | "employer" | null>(
    (localStorage.getItem("role") as "employee" | "employer") || null
  );
  const [user, setUser] = useState<User | null>(() => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
});


  const login = (token: string, role: "employee" | "employer", user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user))
    setToken(token);
    setRole(role);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setToken(null);
    setRole(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      // const res = await axios.get("/auth/me", {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      logout();
    }
  };

  // Fetch user on mount if token exists
  useEffect(() => {
    if (token && !user) {
      refreshUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
