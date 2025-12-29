import api from "./config/apiClient";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./MyContext";
import { useJwt } from "react-jwt";
import { hydrateFavoritesFromServer } from "./Utils/favorites";

export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
  const [isSalesHead, setIsSalesHead] = useState(false);

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
      
      // Check user role from localStorage and set appropriate states
      const userRole = localStorage.getItem("userRole");
      if (userRole) {
        try {
          const role = JSON.parse(userRole);
          const roleRaw = (role || "").toString();
          const roleNormalized = roleRaw.replace(/\s+/g, "").toLowerCase();
          
          console.log("Checking role from localStorage:", roleRaw, "normalized:", roleNormalized);
          
          if (roleRaw === "Admin" || roleRaw === admin) {
            setIsAdmin(true);
          } else if (roleNormalized === "contentwriter" || roleNormalized === "blog") {
            setIsContentWriter(true);
          } else if (roleNormalized === "hr") {
            setIsHr(true);
          } else if (roleNormalized === "saleshead" || roleNormalized === "sales_head" || roleRaw === "Sales Head" || roleRaw === "sales head" || roleRaw === "SALES HEAD" || roleRaw === "SalesHead") {
            console.log("Setting Sales Head role from localStorage");
            setIsSalesHead(true);
          }
        } catch (error) {
          console.error("Error parsing user role from localStorage:", error);
        }
      }
      
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
          const roleRaw = (roleResponse?.data?.User?.role || "").toString();
          const roleNormalized = roleRaw.replace(/\s+/g, "").toLowerCase();

          localStorage.setItem("userRole", JSON.stringify(roleRaw));
          const sellerId = roleResponse.data.User._id;
          localStorage.setItem("mySellerId", JSON.stringify(sellerId));
          try { hydrateFavoritesFromServer(); } catch (_) { }

          console.log("Role detected:", roleRaw, "| Normalized:", roleNormalized);

          if (roleRaw === "Admin" || roleRaw === admin) {
            setIsAdmin(true);
            history("/admin/user");
          } else if (roleNormalized === "contentwriter" || roleNormalized === "blog") {
            setIsContentWriter(true);
            history("/seo/blogs");
          } else if (roleNormalized === "hr") {
            setIsHr(true);
            history("/hr/dashboard");
          } else if (
            roleNormalized === "saleshead" ||
            roleNormalized === "sales_head" ||
            roleRaw.toLowerCase() === "sales head" ||
            roleRaw === "SalesHead"
          ) {
            console.log("Sales Head role detected, redirecting to dashboard");
            setIsSalesHead(true);
            history("/sales-head/dashboard");
          } else {
            console.log("Role not matched, going to user dashboard. Role:", roleRaw);
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

        // ✅ Email verification required (ONLY when backend explicitly says so)
        if (
          status === 403 &&
          data?.reason === "EMAIL_NOT_VERIFIED"
        ) {
          history("/auth/signup/email-verification");
          throw new Error("Please verify your email before logging in.");
        }

        // ❌ Wrong credentials (NO redirect)
        if (status === 401 || status === 403) {
          throw new Error("Invalid email or password.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      // Already a thrown Error
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Network error. Please try again.");
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

      // Store email in localStorage for OTP verification
      localStorage.setItem("userEmail", email);

      try {
        await api.post(`/postPerson/verifyEmail`, {
          email: email
        });
        // OTP sent successfully
      } catch (verifyError) {
        if (verifyError.response?.status === 409) {
          // OTP already sent (409 Conflict) - this is fine, continue to OTP page
          console.log("OTP already sent, proceeding to verification page");
        } else {
          // Other errors - still navigate to OTP page in case OTP was sent before error
          console.error("Error sending OTP:", verifyError);
          // Don't throw - allow user to proceed to OTP page anyway
        }
      }

      // Close any open auth modal before navigating (hide register UI)
      try {
        if (typeof window !== 'undefined' && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('closeAuthModal'));
        }
      } catch (_) {}

      // Navigate to OTP verification page
      history("/auth/signup/otp-verification/");
      
      // Reset form data after successful navigation
      if (typeof resetData === 'function') {
        resetData();
      }

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
        isSalesHead,
        setIsSalesHead,
        showLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
