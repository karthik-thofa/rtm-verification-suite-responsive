import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import VerificationPDF from './VerificationPDF';
import './BasicPAN.css';


const BasicPAN = () => {
  const [panNumber, setPanNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationData, setVerificationData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setVerificationData(null);

    try {
      if (panNumber.length !== 10) {
        throw new Error('PAN number must be exactly 10 characters');
      }

       const response = await fetch(`${process.env.REACT_APP_BASE_URL}pan/basic`, {
        method: 'POST',
        referrerPolicy: "unsafe-url" ,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pan: panNumber })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      if (!data.content || !data.content.registeredName) {
        throw new Error('Invalid PAN number or data not found');
      }

      const verifiedData = {
        panNumber: panNumber,
        name: data.content.registeredName,
        fathersName: data.content.fatherName || '-',
        referenceId: data.content.referenceId || '-',
        type: data.content.type || '-',
        nameProvided: data.content.nameProvided || '-',
        valid: data.content.valid || false,
        message: data.content.message || 'PAN verified successfully'
      };

      setVerificationData(verifiedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFileName = `${panNumber.replace(/\s+/g, '_')}_${verificationData ? verificationData.name.replace(/\s+/g, '_') : 'verification'}.pdf`;

  return (
    <div>
     <div className="panouter">
      <div className="container">
        <h2 className="heading">PAN Card Verification</h2>
        <div className="description">
        <p>Verify PAN details with ease</p>
        <p>PAN (Permanent Account Number) is a unique 10-character alphanumeric identifier issued by the Income Tax Department of India.</p>
        <p>PAN card verification ensures the accuracy and validity of PAN details provided.</p>
      </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="panNumber" className="label">PAN Number:</label>
            <input
              type="text"
              id="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="input"
              required
            />
          </div>
          <button type="submit" className="button">Verify</button>
        </form>
        {loading && <p className="loading">Loading...</p>}
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
                  <td>Father's Name:</td>
                  <td>{verificationData.fathersName}</td>
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
                  <td>Valid:</td>
                  <td>{verificationData.valid ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td>Message:</td>
                  <td>{verificationData.message}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <PDFDownloadLink document={<VerificationPDF verificationData={verificationData} />} fileName={downloadFileName}>
                      {({ loading }) =>
                        loading ? 'Loading document...' : <button className="download-button">Download PDF</button>
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
  );
};

export default BasicPAN;
