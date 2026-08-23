import { createContext, useEffect, useState } from "react";
import axios from "axios";
import apiLinkv1 from "../apiLink";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);
    axios
      .get(`${apiLinkv1}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAuth({ user: res.data.user, token });
      })
      .catch((err) => {
        console.error("Not logged in:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}
