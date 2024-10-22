import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PAN360PDF from "./PAN360PDF";
import LoadingIndicator from "./LoadingIndicator";
import "./PAN360.css";
import leftArrowImage from "./picture/leftarrow.png";
import landImage from './picture/landimg.png';
import axios from "axios";

const PAN360 = () => {
  const [panNumber, setPanNumber] = useState(localStorage.getItem("panNumber") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationData, setVerificationData] = useState(JSON.parse(localStorage.getItem("verificationData")));
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [showComponent, setShowComponent] = useState(localStorage.getItem("showComponent") === "true");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setVerificationData(null);
  
    try {
      if (panNumber.length !== 10) {
        throw new Error("PAN number must be exactly 10 characters");
      }
      const token = localStorage.getItem("accessToken");
      
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}pan/advance`,
        { pan: panNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = response.data;
  
      if (!data || data.status !== "VALID") {
        console.log("Invalid PAN data received: ", data);
        throw new Error("Invalid PAN number or data not found");
      }
  
      const verifiedData = {
        panNumber: panNumber,
        name: data.registeredName || "-",
        namePANCard: data.namePANCard || "-",
        referenceId: data.referenceId || "-",
        type: data.type || "-",
        nameProvided: data.nameProvided || "-",
        valid: data.status === "VALID",
        message: data.message || "PAN verified successfully",
        gender: data.gender || "-",
        dateOfBirth: data.dateOfBirth || "-",
        maskedAadhaarNumber: data.maskedAadhaarNumber || "-",
        email: data.email || "-",
        mobileNumber: data.mobileNumber || "-",
        aadhaarLinked: data.aadhaarLinked ? "Yes" : "No",
        address: {
          fullAddress: data.address.fullAddress || "-",
          street: data.address.street || "-",
          city: data.address.city || "-",
          state: data.address.state || "-",
          pincode: data.address.pincode || "-",
          country: data.address.country || "India",
        },
      };
  
      setVerificationData(verifiedData);
      localStorage.setItem("verificationData", JSON.stringify(verifiedData));
      setShowComponent(true);
      localStorage.setItem("showComponent", true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleHideComponent = () => {
    setShowComponent(false);
    localStorage.setItem("showComponent", false);
    setPanNumber("");
    setVerificationData(null);
    localStorage.removeItem("verificationData");
    localStorage.removeItem("panNumber");
  };

  useEffect(() => {
   
    return () => {
      localStorage.removeItem("verificationData");
      localStorage.removeItem("panNumber");
      
    };
  }, []);

  useEffect(() => {
    if (showComponent) {
      localStorage.setItem("showComponent", true);
    } else {
      localStorage.setItem("showComponent", false);
    }
  }, [showComponent]);

  useEffect(() => {
    if (verificationData) {
      localStorage.setItem("verificationData", JSON.stringify(verificationData));
    } else {
      localStorage.removeItem("verificationData");
    }
  }, [verificationData]);

  useEffect(() => {
    localStorage.setItem("panNumber", panNumber);
  }, [panNumber]);

  const downloadFileName = `${panNumber.replace(/\s+/g, "_")}_${
    verificationData ? verificationData.name.replace(/\s+/g, "_") : "verification"
  }.pdf`;

  
  return (
    <div>
      {showComponent && (
        <div className="panouter1">
          <div className="go-back-container">
            <a href="#" className="back-link" onClick={handleHideComponent}>
              <img src={leftArrowImage} alt="Left Arrow" className="left-arrow" />
              <span>Go Back</span>
            </a>
          </div>
          <div className="container1">
            <h2 className="heading1">PAN 360 Verification</h2>
            <div className="description1">
              <p>PAN (Permanent Account Number) is a unique 10-character alphanumeric identifier<br/>
                issued by the Income Tax Department of India. Pan Card Verification ensures the<br/>
              accuracy and validity of PAN details provided</p>
            </div>
            <div id="panbox">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="panNumber" className="label" style={{ color: 'black' }}>
                    PAN Number:
                  </label>
                  <input
                    type="text"
                    id="panNumber"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    className="input"
                    style={{ backgroundColor: '#EDEDED' }}
                    required
                  />
                </div>
                <button type="submit" className="button" disabled={loading}>
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </form>
              <LoadingIndicator isLoading={loading}>
                {loading && <p className="loading">Loading...</p>}
              </LoadingIndicator>
              {error && <p className="error">Error: {error}</p>}
              {verificationData !== null && (
                <div className="verification-table">
                  <h3>Verification Result</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>PAN Number:</td>
                        <td>{verificationData.panNumber}</td>
                      </tr>
                      <tr>
                        <td>Name Registered:</td>
                        <td>{verificationData.name}</td>
                      </tr>
                      <tr>
                        <td>Name on PAN Card:</td>
                        <td>{verificationData.namePANCard}</td>
                      </tr>
                      <tr>
                        <td>Reference ID:</td>
                        <td>{verificationData.referenceId}</td>
                      </tr>
                      <tr>
                        <td>Type:</td>
                        <td>{verificationData.type}</td>
                      </tr>
                      <tr>
                        <td>Name Provided:</td>
                        <td>{verificationData.nameProvided}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{verificationData.gender}</td>
                      </tr>
                      <tr>
                        <td>Date of Birth:</td>
                        <td>{verificationData.dateOfBirth}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{verificationData.email}</td>
                      </tr>
                      <tr>
                        <td>Mobile Number:</td>
                        <td>{verificationData.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td>Aadhaar Linked:</td>
                        <td>{verificationData.aadhaarLinked ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Masked Aadhaar Number:</td>
                        <td>{verificationData.maskedAadhaarNumber}</td>
                      </tr>
                      <tr>
                        <td>Full Address:</td>
                        <td>{verificationData.address.fullAddress}</td>
                      </tr>
                      <tr>
                        <td>Valid:</td>
                        <td>{verificationData.valid ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Message:</td>
                        <td>{verificationData.message}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <PDFDownloadLink document={<PAN360PDF verificationData={verificationData} />} fileName={downloadFileName}>
                            {({ loading }) =>
                              loading ? (
                                "Loading document..."
                              ) : (
                                <button className="download-button">Download PDF</button>
                              )
                            }
                          </PDFDownloadLink>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!showComponent && (
        <div id="pan360banner">
          <h3>Verification Suite - PAN 360</h3>
          <div id="backimg360" className="backimg360-container" style={{ backgroundImage: `url(${landImage})` }}>
            <div className="verifytext"> Verify the PAN 360 information of your users</div>
            <div className="verifypara">
              <p>The most reliable way to verify sensitive information that complies with data protection and privacy regulation.</p>
            </div>

            <button className="pan360-button" onClick={() => setShowComponent(true)}>Verify PAN</button>
            <button className="viewhistory"> View history</button>
          </div>
          <div id="panworkdes">
            <div className="panwork">How does Basic PAN verification work?</div>
            <div className="pan360row">
              <div className="datasubdes">
                <div className="datasub">Data Submission</div>
                <div className="dataline"></div>
                <div className="datainput">Users input their PAN card number for verification purposes.</div>
              </div>
              <div className="validdes">
                <div className="validprocess">Validation Process</div>
                <div className="validline"></div>
                <div className="subdata">The submitted data is cross-referenced with authoritative databases to confirm its accuracy and authenticity.</div>
              </div>
              <div className="outdes">
                <div className="outnot">Outcome Notification</div>
                <div className="outline"></div>
                <div className="informed">Users are informed about the verification outcome, regarding the outcome of their verification, ensuring a secure and transparent financial environment while deterring fraudulent activities.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PAN360;