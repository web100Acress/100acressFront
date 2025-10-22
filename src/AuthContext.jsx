import api from "./config/apiClient";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./MyContext";
import { useJwt } from "react-jwt";
import { hydrateFavoritesFromServer } from "./Utils/favorites";

export const AuthContext = createContext();
const localStorageToken = localStorage.getItem("myToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { admin = '' } = useContext(DataContext) || {}; 
  const [loading, setLoading] = useState(false);
  const [decodedTokenState, setDecodedTokenState] = useState(null);
  const history = useNavigate();
  const [token, setToken] = useState("");
  const { decodedToken } = useJwt(localStorageToken);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isContentWriter, setIsContentWriter] = useState(false);
  const [isHr, setIsHr] = useState(false);

  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("myToken");
      setDecodedTokenState(decodedToken);
      setIsAuthenticated(!!token);
      if (token) {
        try { hydrateFavoritesFromServer(); } catch (_) { }
      }
    };
    checkAuthStatus();
  }, [decodedToken]);

  const login = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
      throw new Error("Please enter email and password.");
    }

    try {
      const loginResponse = await api.post(
        `/postPerson/verify_Login`,
        { email, password }
      );

      const newToken = loginResponse?.data?.token;
      if (!newToken || typeof newToken !== 'string') {
        throw new Error("Login failed: token not received.");
      }

      localStorage.setItem("myToken", newToken);
      setToken(newToken);

      if (loginResponse.status === 200) {
        const roleResponse = await api.get(
          `/postPerson/Role/${email}`
        );

        setAgentData(roleResponse.data.User);
        localStorage.setItem(
          "agentData",
          JSON.stringify(roleResponse.data.User)
        );

        try {
          const userName = roleResponse?.data?.User?.name || "";
          const first = (userName || "").toString().trim().split(/\s+/)[0] || "";
          if (first) {
            localStorage.setItem("firstName", first);
          } else {
            localStorage.removeItem("firstName");
          }
        } catch (_) { }

        if (roleResponse.status === 200) {
          localStorage.setItem(
            "userRole",
            JSON.stringify(roleResponse.data.User.role)
          );
          const sellerId = roleResponse.data.User._id;
          localStorage.setItem("mySellerId", JSON.stringify(sellerId));
          try { hydrateFavoritesFromServer(); } catch (_) { }

          const roleRaw = (roleResponse?.data?.User?.role || "").toString();
          const roleNormalized = roleRaw.replace(/\s+/g, "").toLowerCase();

          try { console.debug("[login redirect] role:", roleRaw, "normalized:", roleNormalized); } catch { }

          if (roleRaw === "Admin" || roleRaw === admin) {
            setIsAdmin(true);
            history("/admin/user");
          } else if (roleNormalized === "contentwriter" || roleNormalized === "blog") {
            setIsContentWriter(true);
            history("/seo/blogs");
          } else if (roleNormalized === "hr") {
            setIsHr(true);
            history("/hr/dashboard");
          } else {
            history("/userdashboard/");
          }
        } else {
          console.error("Role fetch failed:", roleResponse);
          throw new Error(`Failed to fetch role information. Server responded with an error: ${roleResponse.status}`);
        }
      } else {
        console.error("Login failed:", loginResponse);
        throw new Error(`Invalid credentials. Server responded with an error: ${loginResponse.status}`);
      }

      setIsAuthenticated(true);

    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 403) {
          // Check if it's email verification required or wrong credentials
          if (data && data.token && data.User) {
            // Email verification required
            const newToken = data.token;
            const User = data.User;
            localStorage.setItem("myToken", newToken);
            setToken(newToken);
            setAgentData(User);
            localStorage.setItem(
              "agentData",
              JSON.stringify(User)
            );
            try {
              const userName = User?.name || "";
              const first = (userName || "").toString().trim().split(/\s+/)[0] || "";
              if (first) {
                localStorage.setItem("firstName", first);
              } else {
                localStorage.removeItem("firstName");
              }
            } catch (_) { }
            history("/auth/signup/email-verification");
            throw new Error("Please verify your email before logging in.");
          } else {
            // Wrong credentials or other 403 error
            throw new Error("Invalid email or password.");
          }
        } else if (status === 401) {
          throw new Error("Invalid email or password.");
        } else {
          throw new Error("An error occurred. Please try again later.");
        }
      } else {
        // If it's already an Error object from our throws above, re-throw it
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An error occurred. Please try again later.");
      }
    }
  };

  const signup = async (userSignUp, resetData, setResponseMessage) => {
    const { name, mobile, password, cpassword, email } = userSignUp;

    if (!name || !mobile || !email || !password || password !== cpassword) {
      throw new Error("Please fill the details properly");
    }

    try {
      const registrationResponse = await api.post(`/postPerson/register`, userSignUp);

      if (registrationResponse.status === 409) {
        throw new Error("User already exists. Please login.");
      }

      const newToken = registrationResponse.data.token;
      localStorage.setItem("myToken", newToken);
      setToken(newToken);
      setAgentData(registrationResponse.data.User);
      localStorage.setItem(
        "agentData",
        JSON.stringify(registrationResponse.data.User)
      );
      try {
        const userName = registrationResponse?.data?.User?.name || "";
        const first = (userName || "").toString().trim().split(/\s+/)[0] || "";
        if (first) {
          localStorage.setItem("firstName", first);
        } else {
          localStorage.removeItem("firstName");
        }
      } catch (_) { }

      try {
        await api.post(`/postPerson/verifyEmail`, {
          email: email
        });
      } catch (verifyError) {
        if (verifyError.response?.status !== 409) {
          throw verifyError;
        }
        // If 409, OTP already sent, continue to OTP page
      }

      history("/auth/signup/otp-verification/");
      resetData();

    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409 || status === 400) {
          throw new Error("User already exists. Please login.");
        } else {
          throw new Error("Registration failed. Please try again.");
        }
      } else if (error.message) {
        throw error;
      } else {
        throw new Error("Internal Server Error, Something went wrong");
      }
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        const res = await api.delete(
          `/postPerson/propertyDelete/${id}`
        );
        if (res.status >= 200 && res.status < 300) {
          setAgentData(prevData => ({
            ...prevData,
            postProperty: prevData.postProperty.filter(item => item._id !== id)
          }));
          const updatedAgentData = {
            ...agentData,
            postProperty: agentData.postProperty.filter(item => item._id !== id)
          };
          localStorage.setItem("agentData", JSON.stringify(updatedAgentData));
        } else {
          console.error("Failed to delete user. Server returned an error.");
        }
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error.message);
    }
  };

  const showLogin = () => {
    // You can implement your login modal logic here
    // For example, if you're using a state to control the login modal:
    // setShowLoginModal(true);
    
    // Or if you're using a global modal:
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('showLoginModal'));
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
        signup,
        agentData,
        token,
        handleDeleteUser,
        decodedTokenState,
        isAdmin,
        setIsAdmin,
        isContentWriter,
        setIsContentWriter,
        isHr,
        setIsHr,
        showLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
