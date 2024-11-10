import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode"; // Pastikan jwtDecode diimpor dengan benar
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  handleLogin: async () => {},
  handleLogout: async () => {},
  token: undefined,
  userData: undefined,
  loading: false,
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil token dari localStorage saat komponen dimuat
    const storedToken = localStorage.getItem("ACCOUNT_TOKEN");
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setToken(storedToken);
        setUserData(decodedUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
        handleLogout();
      }
    }
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();

      if (response.ok) {
        const token = responseJson.token;
        localStorage.setItem("ACCOUNT_TOKEN", token);

        const decodedUser = jwtDecode(token);
        localStorage.setItem("ACCOUNT_DATA", JSON.stringify(decodedUser));
        setToken(token);
        setUserData(decodedUser);

        // Redirect based on role
        if (decodedUser.role === "admin" || decodedUser.role === "super admin") {
          navigate("/");
        } else if (decodedUser.role === "user") {
          navigate("/forbidden");
        }
      } else {
        console.error("Login failed:", responseJson.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCOUNT_TOKEN");
    localStorage.removeItem("ACCOUNT_DATA");
    setToken(undefined);
    setUserData(undefined);
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, handleLogin, userData, handleLogout, loading }}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
