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

  const login = async (formData, messageApi) => {
    try {
      const { email, password } = formData;
      messageApi.open({
        key: "loginLoading",
        type: "loading",
        content: "Logging in...",
        duration: 0,
      })
      if (email && password) {
        try {
          const loginResponse = await api.post(
            `/postPerson/verify_Login`,
            { email, password }
          );
          const newToken = loginResponse?.data?.token;
          if (!newToken || typeof newToken !== 'string') {
            messageApi.destroy("loginLoading");
            messageApi.open({
              key: "loginError",
              type: "error",
              content: "Login failed: token not received.",
              duration: 3,
            })
            return;
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
              } else {
                history("/userdashboard/");
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
          if (error.response) {
            const { status, data } = error.response;

            if (status === 403) {
              messageApi.destroy("loginLoading");
              messageApi.open({
                key: "loginError",
                type: "error",
                content: "Please verify your email before logging in.",
                duration: 3,
              })
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
            } else if (status === 401) {
              messageApi.destroy("loginLoading");
              messageApi.open({
                key: "loginError",
                type: "error",
                content: "Invalid email or password.",
                duration: 3,
              })
            } else {
              messageApi.destroy("loginLoading");
              messageApi.open({
                key: "loginError",
                type: "error",
                content: "An error occurred. Please try again later.",
                duration: 3,
              })
            }
          } else {
            messageApi.destroy("loginLoading");
            messageApi.open({
              key: "loginError",
              type: "error",
              content: "An error occurred. Please try again later.",
              duration: 3,
            });
          }
        }
      } else {
        messageApi.destroy("loginLoading");
        messageApi.open({
          key: "loginError",
          type: "error",
          content: "Please enter email and password.",
          duration: 3,
        })
      }
      setIsAuthenticated(true);
    } catch (error) {
      messageApi.destroy("loginLoading");
      messageApi.open({
        key: "loginError",
        type: "error",
        content: "Invalid Username or Password.",
        duration: 3,
      })
    }
  };

  const signup = async (userSignUp, messageApi, resetData, setResponseMessage) => {
    const { name, mobile, password, cpassword, email } = userSignUp;
    try {
      messageApi.open({
        key: "SignUpLoading",
        type: "loading",
        content: "Creating your account...",
        duration: 0,
      });

      if (name && mobile && email && password && password === cpassword) {
        api
          .post(`/postPerson/register`, userSignUp)
          .then((registrationResponse) => {
            if (registrationResponse.status === 409) {
              messageApi.destroy("SignUpLoading");
              messageApi.error({
                content: "User already exists. Please login.",
                duration: 3,
              });
              return;
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
            return api.post(`/postPerson/verifyEmail`, {
              email: email
            })
          })
          .then(() => {
            messageApi.destroy("SignUpLoading");
            messageApi.success({
              content: "Account created. Please Confirm your email to login.",
              duration: 2,
            });
            history("/auth/signup/otp-verification/");
            resetData();
          })
          .catch((error) => {
            messageApi.destroy("SignUpLoading");
            console.error("Registration failed:", error);
            messageApi.open({
              type: "error",
              content: "Registration failed. Please try again.",
              duration: 3,
            });
          });
      } else {
        messageApi.destroy("SignUpLoading");
        messageApi.error({
          content: "Please fill the details properly",
          duration: 3
        })
      }
    } catch (error) {
      messageApi.destroy("SignUpLoading");
      messageApi.error({
        content: "Internal Sever Error, Something went wrong",
        duration: 3
      })
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
        showLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
