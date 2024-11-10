import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {jwtDecode} from "jwt-decode";
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
    const tokenData = localStorage.getItem("ACCOUNT_TOKEN");
    const userHasLoggedIn = JSON.parse(localStorage.getItem("ACCOUNT_DATA"));
    if (tokenData && userHasLoggedIn) {
      setToken(tokenData);
      setUserData(userHasLoggedIn);
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
        const decoded = jwtDecode(token);
        localStorage.setItem("ACCOUNT_DATA", JSON.stringify(decoded));
        setToken(token);
        setUserData(decoded);

        // Redirect based on role
        if (decoded.role === "admin") {
          navigate("/");
        } else if (decoded.role === "user") {
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
