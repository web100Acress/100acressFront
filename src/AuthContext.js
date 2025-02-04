import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./MyContext";
import { useJwt } from "react-jwt";
export const AuthContext = createContext();
const localStorageToken = localStorage.getItem("myToken");


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const {admin} =useContext(DataContext)
  const [loading, setLoading] = useState(false);
  const [decodedTokenState,setDecodedTokenState] = useState(null);
  const history = useNavigate();
  const [token, setToken] = useState("");
  const { decodedToken } = useJwt(localStorageToken);

  
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("myToken");
      //console.log(token,"token")
      setDecodedTokenState(decodedToken);
      setIsAuthenticated(!!token);
    };
    checkAuthStatus();
  }, [decodedToken]);

  useEffect(() => {
    const agentDataFromLocalStorage = localStorage.getItem("agentData");
    if (agentDataFromLocalStorage) {
      const agentDataJSON = JSON.parse(agentDataFromLocalStorage);
      setAgentData(agentDataJSON);
    }
  }, []);

  const login = async (formData,messageApi) => {
    try {
      const { email, password } = formData;
      messageApi.open({
        key:"loginLoading",
        type: "loading",
        content: "Logging in...",
        duration: 0,
      })
      if (email && password) {
        try {
          const loginResponse = await axios.post(
            "https://api.100acress.com/postPerson/verify_Login",
            { email, password }
          );
          const newToken = loginResponse.data.token;
          // Check if user's email is verified or not

          localStorage.setItem("myToken", JSON.stringify(newToken));
          setToken(newToken);
  
          if (loginResponse.status === 200) {
            const roleResponse = await axios.get(
              `https://api.100acress.com/postPerson/Role/${email}`
            );
            setAgentData(roleResponse.data.User);
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
              if (roleResponse.data.User.role === "Admin" || roleResponse.data.User.role === admin) {
                console.log(roleResponse.data.User.role,"roleResponse.data.User.role")
                history("/Admin/dashboard");
              } else {
                history("/userdashboard/");
                window.location.reload()
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
              // Email not verified
              messageApi.destroy("loginLoading");
              messageApi.open({
                key:"loginError",
                type: "error",
                content: "Please verify your email before logging in.",
                duration: 3,
              })
              const newToken = data.token;
              const User = data.User;
              localStorage.setItem("myToken", JSON.stringify(newToken));
              setToken(newToken);
                setAgentData(User);
                localStorage.setItem(
                  "agentData",
                  JSON.stringify(User)
              );
              history("/signup/email-verification"); // Redirect to verification page
            } else if (status === 401) {
              // Invalid credentials
              messageApi.destroy("loginLoading");
              messageApi.open({
                key:"loginError",
                type: "error",
                content: "Invalid email or password.",
                duration: 3,
              })
            } else {
              // Other errors (500, etc.)
              messageApi.destroy("loginLoading");
              messageApi.open({
                key:"loginError",
                type: "error",
                content: "An error occurred. Please try again later.",
                duration: 3,
              })
            }
          } else {
            // Network or unexpected errors
            
            messageApi.destroy("loginLoading");
            messageApi.open({
              key:"loginError",
              type: "error",
              content: "An error occurred. Please try again later.",
              duration: 3,
            });
          }
        }
      } else {
        messageApi.destroy("loginLoading");
        messageApi.open({
          key:"loginError",
          type: "error",
          content: "Please enter email and password.",
          duration: 3,
        })
      }
      setIsAuthenticated(true);
    } catch (error) {
      
      messageApi.destroy("loginLoading");
      messageApi.open({
        key:"loginError",
        type: "error",
        content: "Invalid Username or Password.",
        duration: 3,
      })
    }
  };

  const signup = async (userSignUp,messageApi,resetData,setResponseMessage)=>{
    const { name, mobile, password, cpassword, email } = userSignUp;
    try {
      messageApi.open({
        key: "loading",
        type: "loading",
        content: "Creating your account...",
        duration: 0, // No auto-close
      });

      if (name && mobile && email && password && password === cpassword) {
        axios
          .post("https://api.100acress.com/postPerson/register", userSignUp)
          .then((registrationResponse) => {

            // if error 409 User already Exist
            if (registrationResponse.status === 409) {
              messageApi.destroy("loading");
              messageApi.error({
                content: "User already exists. Please login.",
                duration: 3,
              });
              return;
            }

            //Create token for user to login
            const newToken = registrationResponse.data.token;
            localStorage.setItem("myToken", JSON.stringify(newToken));
            setToken(newToken);
            setAgentData(registrationResponse.data.User);
            localStorage.setItem(
              "agentData",
              JSON.stringify(registrationResponse.data.User)
            );

            //generate otp for the user to to verify the email
            return axios.post("https://api.100acress.com/postPerson/verifyEmail", { 
              email: email // Pass relevant data for OTP
            })
          })
          .then(() => {
              messageApi.destroy("loading");

              messageApi.success({
                content: "Account created. Please Confirm your email to login.",
                duration: 2,
            })
            .then(() => {
                // Redirect to OTP verification page
                history("/signup/otp-verification/");
                resetData();
            });
          })
          .catch((error) => {
              // Close loading immediately on error
              messageApi.destroy("loading");
              console.error("Registration failed:", error);
              messageApi.open({
                type: "error",
                content: "Registration failed. Please try again.",
                duration: 3,
              });
          });
      } else {
        setResponseMessage("Please fill all fields");
      }
    } catch (error) {
      
    }
  }
  
  
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};
