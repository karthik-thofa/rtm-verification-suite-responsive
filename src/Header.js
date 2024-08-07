import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css';
import logo from './assets/logo.gif'; 
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const Header = ({ isLoggedIn, onLoginSuccess, onLoginFailure, logout, loginError }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobileView(width < 480);
      if (!isMobileView) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleGoogleSignInSuccess = (credentialResponse) => {
    const accessToken = credentialResponse?.credential;
    onLoginSuccess(accessToken);
    if (isMobileView) {
      setDropdownOpen(false);
    }
  };

  const handleGoogleSignInError = (error) => {
    onLoginFailure(error);
  };

  return (
    <header>
      <div className="header-container">
        {isLoggedIn ? (
          <Link to="/introduction" className="logo-link">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="logo" />
            </div>
          </Link>
        ) : (
          <div className="logo-container disabled">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        )}
        <div className="verification-container">
          <h1 className="verification-text">Verification Suite</h1>
        </div>
        <div className="auth-container">
          {!isMobileView && (
            <div className="desktop-auth">
              {!isLoggedIn ? (
                <GoogleLogin
                  onSuccess={handleGoogleSignInSuccess}
                  onError={handleGoogleSignInError}
                  className="google-login-btn"
                />
              ) : (
                <button className="sign-out-btn" onClick={logout}>
                  Sign out
                </button>
              )}
            </div>
          )}
          {isMobileView && (
            <div className="mobile-auth">
              <FontAwesomeIcon
                icon={faBars}
                className="sign-in-icon"
                onClick={handleDropdownToggle}
                style={{ cursor: 'pointer' }}
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {!isLoggedIn ? (
                    <GoogleLogin
                      onSuccess={handleGoogleSignInSuccess}
                      onError={handleGoogleSignInError}
                      className="google-login-btn"
                    />
                  ) : (
                    <button className="sign-out-btn" onClick={logout}>
                      Sign out
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {loginError && (
          <div className="login-error">
            {loginError}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
