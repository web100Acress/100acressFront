import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [token, setToken] = useState("");

  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const agentDataFromLocalStorage = localStorage.getItem("agentData");
    if (agentDataFromLocalStorage) {
      setAgentData(JSON.parse(agentDataFromLocalStorage));
    }
  }, []);

  const login = async (formData) => {
    try {
      const { email, password } = formData;
      if (email && password) {
        try {
          const loginResponse = await axios.post(
            "https://api.100acress.com/postPerson/verify_Login",
            { email, password }
          );
          const newToken = loginResponse.data.token;
          localStorage.setItem("myToken", JSON.stringify(newToken));
          setToken(newToken);

          if (loginResponse.status === 200) {
            const roleResponse = await axios.get(
              `https://api.100acress.com/postPerson/Role/${email}`
            );
            setAgentData(roleResponse.data.User);
            // Save agentData to local storage
            localStorage.setItem(
              "agentData",
              JSON.stringify(roleResponse.data.User)
            );
            if (roleResponse.status === 200) {
              localStorage.setItem(
                "userRole",
                JSON.stringify(roleResponse.data.User.role)
              );
              const sellerId = roleResponse.data.User._id;
              localStorage.setItem("mySellerId", JSON.stringify(sellerId));
              if (roleResponse.data.User.role === "admin") {
                history("/admin/acress/property/aadhar");
              } else {
                history("/userdashboard");
              }
            } else {
              console.error("Role fetch failed:", roleResponse);
              alert(
                `Failed to fetch role information. Server responded with an error: ${roleResponse.status}`
              );
            }
          } else {
            console.error("Login failed:", loginResponse);
            alert(
              `Invalid credentials. Server responded with an error: ${loginResponse.status}`
            );
          }
        } catch (error) {
          console.error("Error during login:", error);
          alert("The email address or password entered is not valid");
        }
      } else {
        alert("Please Enter both Email and Password");
      }
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  };

  const { id } = useParams();
  console.log(id, "Use Auth Id");

  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const res = await axios.delete(
          `https://api.100acress.com/postPerson/propertyDelete/${id}`
        );
        if (res.status >= 200 && res.status < 300) {
          window.location.reload();
        } else {
          console.error("Failed to delete user. Server returned an error.");
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        login,
        agentData,
        handleDeleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
