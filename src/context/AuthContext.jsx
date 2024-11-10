import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  handleLogin: async () => {},
  handleLogout: async () => {},
  updateUserData: () => {},
  token: undefined,
  userData: undefined,
  loading: false,
});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = localStorage.getItem("ACCOUNT_TOKEN");
    const storedUserData = JSON.parse(localStorage.getItem("ACCOUNT_DATA"));

    if (tokenData && storedUserData) {
      try {
        setToken(tokenData);
        // Gunakan userData dari localStorage
        setUserData(storedUserData);
      } catch (error) {
        console.error("Failed to decode token:", error);
        handleLogout();
      }
    }
    setAuthLoading(false);
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
        const decodedUserData = jwtDecode(token);
        localStorage.setItem("ACCOUNT_DATA", JSON.stringify(decodedUserData));
        setToken(token);
        setUserData(decodedUserData);

        if (decodedUserData.role === "admin" || decodedUserData.role === "super admin") {
          navigate("/");
        } else if (decodedUserData.role === "user") {
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

  const updateUserData = (newData) => {
    const updatedUserData = { ...userData, ...newData };
    setUserData(updatedUserData);
    // Perbarui data di localStorage
    localStorage.setItem("ACCOUNT_DATA", JSON.stringify(updatedUserData));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        handleLogin,
        handleLogout,
        updateUserData,
        userData,
        loading,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
