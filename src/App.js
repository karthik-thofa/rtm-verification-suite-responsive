import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./component/Dashboard";
import Introduction from "./component/Introduction";
import Body from "./component/Body";
import { Outlet, useLocation, Navigate } from "react-router-dom"; 
import SessionTimeout from "./component/SessionTimeout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showIntroduction, setShowIntroduction] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const timeoutDuration = parseInt(process.env.REACT_APP_TIMEOUT_DURATION);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setShowIntroduction(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("lastActivity");
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      const lastActivity = localStorage.getItem("lastActivity");
      const currentTime = new Date().getTime();
      if (lastActivity && currentTime - lastActivity > timeoutDuration) {
        handleLogout();
      } else {
        localStorage.setItem("lastActivity", currentTime);
      }
    } else {
      navigate("/");
    }
  }, [handleLogout, navigate, timeoutDuration]);

  useEffect(() => {
    if (isLoggedIn && location.pathname === "/") {
      navigate("/introduction");
    }
    if (!isLoggedIn && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    localStorage.setItem("currentPath", location.pathname); 
  }, [location.pathname]);

  useEffect(() => {
    const currentPath = localStorage.getItem("currentPath");
    if (currentPath) {
      navigate(currentPath); 
    }
  }, [navigate]);

  const onLoginSuccess = async (accessToken) => {
    try {
      if (!accessToken) {
        setLoginError("Unauthorized access. Please contact support.");
        return;
      }
    
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
       
        if (data.credentials) {
          localStorage.setItem("accessToken", data.credentials);
          setIsLoggedIn(true);
          setLoginError(null);
          setShowIntroduction(true);
          navigate("/introduction");
        }
      } else {
        const errorMessage = await response.text();
        setLoginError("Unauthorized access. Please contact support.");
      }
    } catch (error) {
      setLoginError("Unauthorized access. Please contact support.");
    }
  };

  const onLoginFailure = (error) => {
    setLoginError("Unauthorized access. Please contact support.");
  };

  const logout = () => {
    handleLogout();
  };

  const hideIntroduction = () => {
    setShowIntroduction(false);
  };

  if (!isLoggedIn && location.pathname !== '/') {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <>
        <Header 
          isLoggedIn={isLoggedIn} 
          onLoginSuccess={onLoginSuccess}
          onLoginFailure={onLoginFailure}
          logout={logout}
          loginError={loginError}
        />
        <div className="main-content">
        <div className="connect-cont">
          {isLoggedIn ? (
            <Dashboard hideIntroduction={hideIntroduction} />
          ) : (
            <Body />
          )}
          <Outlet />
        </div>
      </div>
        <Footer />
        {showIntroduction && !isLoggedIn && <Introduction />}
        <SessionTimeout
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          timeoutDuration={timeoutDuration}
        >
          {!isLoggedIn && <Navigate to="/" />}
        </SessionTimeout>
      </>
    </div>
  );
}

export default App;
