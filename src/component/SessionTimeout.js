import React, { useEffect, useCallback } from "react";

const SessionTimeout = ({ isLoggedIn, handleLogout, timeoutDuration }) => {
  let inactivityTimer;

  const resetInactivityTimer = useCallback(() => {
    if (isLoggedIn) {
      localStorage.setItem("lastActivity", new Date().getTime());
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(handleLogout, timeoutDuration);
    }
  }, [isLoggedIn, handleLogout, timeoutDuration]);

  useEffect(() => {
    const handleInactive = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      const currentTime = new Date().getTime();
      if (isLoggedIn && currentTime - lastActivity > timeoutDuration) {
        handleLogout();
      }
    };

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    resetInactivityTimer();

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);

    const cleanup = () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      clearTimeout(inactivityTimer);
    };

    return cleanup;
  }, [isLoggedIn, resetInactivityTimer, timeoutDuration, handleLogout]);

  return null;
};

export default SessionTimeout;
