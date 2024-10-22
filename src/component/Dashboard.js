import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, AccountBox, CurrencyExchange} from '@mui/icons-material';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import './Dashboard.css';
import panIcon from './picture/panicon.png';
import aadhaarIcon from './picture/aadhaaricon.png';
import dropdown from './picture/dropdown.png';
import pricejewel from './priceimage/pricejewel.png';
import homeicon from './picture/homeicon.png';
import pricejewelbl from './priceimage/pricejewelbl.png'; 
import homeblicon from './picture/homeblicon.png'; 

const Dashboard = ({ hideIntroduction }) => {
  const location = useLocation();
  const [selectedLink, setSelectedLink] = useState(null);
  const [isPANDropdownOpen, setPANDropdownOpen] = useState(false);
  const [isAadhaarDropdownOpen, setAadhaarDropdownOpen] = useState(false);
  const [panDropdownRotation, setPanDropdownRotation] = useState(0);
  const [aadhaarDropdownRotation, setAadhaarDropdownRotation] = useState(0);
  const [isPriceUpdateButtonEnabled, setPriceUpdateButtonEnabled] = useState(false);
  const [isHomeButtonEnabled, setHomeButtonEnabled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname === "/introduction") {
      setHomeButtonEnabled(true);
    } else {
      setHomeButtonEnabled(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/introduction") {
      setSelectedLink(null);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    if (location.pathname === "/pan360" || location.pathname === "/aadhaar360") {
      setSelectedLink(location.pathname);
    } else {
      setSelectedLink(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/priceupdates") {
      setPriceUpdateButtonEnabled(true);
    } else {
      setPriceUpdateButtonEnabled(false);
    }
  }, [location.pathname]);

  const togglePANDropdown = () => {
    setPANDropdownOpen(!isPANDropdownOpen);
    setPanDropdownRotation(isPANDropdownOpen ? 0 : 180);
  };

  const toggleAadhaarDropdown = () => {
    setAadhaarDropdownOpen(!isAadhaarDropdownOpen);
    setAadhaarDropdownRotation(isAadhaarDropdownOpen ? 0 : 180);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    hideIntroduction();
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div id="outerdashcont">
      <div className={`dashboard ${isExpanded ? 'expanded' : ''}`} onMouseEnter={handleExpand} onMouseLeave={handleCollapse}>
        <ul>
          <li>
            <Link to="/introduction" className={`hometext-style ${isHomeButtonEnabled ? 'enabled' : 'disabled'}`}>
              <div id="homeborder">
                <div className="hometext">
                  <img src={isHomeButtonEnabled ? homeblicon : homeicon} alt="Home Icon" className="homeicon" />
                  {isExpanded && <p>Home</p>}
                </div>
              </div>
            </Link>
          </li>
          <li onClick={togglePANDropdown}>
            <div className="dashboard-icon-container">
              <img src={panIcon} alt="PAN Icon" className="dashboard-icon" />
              {isExpanded && <span>PAN</span>}
              {isExpanded && (
                <img
                  src={dropdown}
                  alt="Dropdown Icon"
                  className="dropdown-icon"
                  style={{ transform: `rotate(${panDropdownRotation}deg)` }}
                />
              )}
            </div>
            {isPANDropdownOpen && isExpanded && (
              <ul className="dropdown" onClick={handleDropdownClick}>
                 <li>
        <Link
          to="/basicpan"
          style={{
            backgroundColor: selectedLink === "/basicpan" ? "#FFD966" : "",
            width: "120px",
            borderRadius: "8px",
            height: "40px",
            position: "absolute",
            display: "block",
            top: "100%",
            transform: "translate(0%, -50%)",
            left: "50%",
            textAlign: "center",
            lineHeight: "40px",
            marginTop: "50px", 
            marginLeft: "-57px",
            fontWeight: selectedLink === "/basicpan" ? "bold" : "",
            color: selectedLink === "/basicpan" ? "#000000" : "#ffffff",
          }}
          onClick={() => handleLinkClick("/basicpan")}
        >
          Basic PAN
        </Link>
      </li>
                  <li>
                  <Link
                    to="/pan360"
                    style={{
                      backgroundColor: selectedLink === "/pan360" ? "#FFD966" : "",
                      width: "120px",
                      borderRadius: "8px",
                      height: "40px",
                      position: "absolute",
                      display: "block",
                      top: "100%",
                      transform: "translate(0%, -50%)",
                      left: "50%",
                      textAlign: "center",
                      lineHeight: "40px",
                      marginTop: "65px",
                      marginLeft: "-57px",
                      fontWeight: selectedLink === "/pan360" ? "bold" : "",
                      color: selectedLink === "/pan360" ? "#000000" : "#ffffff",
                    }}
                    onClick={() => handleLinkClick("/pan360")}
                  >
                    PAN 360
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li onClick={toggleAadhaarDropdown}>
            <div className="dashboard-icon-container">
              <img src={aadhaarIcon} alt="Aadhaar Icon" className="dashboard-icon" />
              {isExpanded && <span>Aadhaar</span>}
              {isExpanded && (
                <img
                  src={dropdown}
                  alt="Dropdown Icon"
                  className="dropdown-iconaadh"
                  style={{ transform: `rotate(${aadhaarDropdownRotation}deg)` }}
                />
              )}
            </div>
            {isAadhaarDropdownOpen && isExpanded && (
              <ul className="basic-validation-dropdown" onClick={handleDropdownClick}>
                <li>
                  <Link
                    to="/aadhaar360"
                    style={{
                      backgroundColor: selectedLink === "/aadhaar360" ? "#FFD966" : "",
                      width: "120px",
                      borderRadius: "8px",
                      height: "40px",
                      position: "absolute",
                      display: "block",
                      top: "100%",
                      transform: "translate(0%, -50%)",
                      left: "50%",
                      textAlign: "center",
                      lineHeight: "40px",
                      marginTop: "25px",
                      marginLeft: "-85px",
                      fontWeight: selectedLink === "/aadhaar360" ? "bold" : "",
                      color: selectedLink === "/aadhaar360" ? "#000000" : "#ffffff",
                    }}
                    onClick={() => handleLinkClick("/aadhaar360")}
                  >
                    Aadhaar 360
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/priceupdates" className={`priceupdate-style ${isPriceUpdateButtonEnabled ? 'enabled' : 'disabled'}`}>
              <div id="priceupdatebox">
                <div className="priceupdatetext">
                  <img src={isPriceUpdateButtonEnabled ? pricejewelbl : pricejewel} alt="Price Icon" className="pricejewel-icon" />
                  {isExpanded && <div id="priceup">Price Updates</div>}
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <BottomNavigation
        value={location.pathname}
        onChange={(event, newValue) => setSelectedLink(newValue)}
        className="bottom-navigation"
      >
        <BottomNavigationAction
          label="Home"
          value="/introduction"
          icon={<Home />}
          component={Link}
          to="/introduction"
          onClick={() => handleLinkClick("/introduction")}
        />
        <BottomNavigationAction
          label="PAN"
          value="/pan360"
          icon={<AccountBox />}
          component={Link}
          to="/pan360"
          onClick={() => handleLinkClick("/pan360")}
        />
        <BottomNavigationAction
          label="Aadhaar"
          value="/aadhaar360"
          icon={<FingerprintIcon/>}
          component={Link}
          to="/aadhaar360"
          onClick={() => handleLinkClick("/aadhaar360")}
        />
        <BottomNavigationAction
          label="Price Up..."
          value="/priceupdates"
          icon={<CurrencyExchange />}
          component={Link}
          to="/priceupdates"
          onClick={() => handleLinkClick("/priceupdates")}
        />
      </BottomNavigation>
    </div>
  );
};

export default Dashboard;

