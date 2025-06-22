import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/User";
import api from "../services/api";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth can't be used outside of an AuthContextProvider");
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await api.get(`/user/me`);
          setUser(response.data);
        } catch (e) {
          console.log(e);
          localStorage.removeItem("access_token");
          setUser(null);
        }
      }
    }
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
