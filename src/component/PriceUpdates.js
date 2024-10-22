import React, { useState, useEffect } from "react";
import "./PriceUpdates.css";
import data_icon from "./priceimage/date_icon.png";
import calender_icon from "./priceimage/calender_icon.png";
import goldicon from "./priceimage/gold_icon.png";
import silvericon from "./priceimage/silver_icon.png";
import platinumicon from "./priceimage/platinum_icon.png";
import valueedit from "./priceimage/valueedit.png";
import DatePicker from "react-datepicker";
import MessageModal from './MessageModal';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const PriceUpdates = () => {
  const [goldRate, setGoldRate] = useState("");
  const [silverRate, setSilverRate] = useState("");
  const [platinumRate, setPlatinumRate] = useState("");
  const [editableRate, setEditableRate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previousData, setPreviousData] = useState({
    date: "",
    gold: "",
    silver: "",
    platinum: "",
    previousDate: "",
    previousGold: "",
    previousSilver: "",
    previousPlatinum: "",
    previousTemplate: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  const handleSuccess = () => {
    setMessageType('success');
    setMessage('Price updated successfully.');
    setShowModal(true);
  };

  const handleError = (message) => {
    setMessageType('error');
    setMessage(message);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token not found in localStorage");
      return;
    }

    setLoading(true);
    fetch(`${process.env.REACT_APP_BASE_URL}price`, {

      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGoldRate(data.gold || "");
        setSilverRate(data.silver || "");
        setPlatinumRate(data.platinum || "");
        setDate(new Date(data.date));
        setPreviousData({
          date: data.date || "",
          gold: data.gold || "",
          silver: data.silver || "",
          platinum: data.platinum || "",
          previousDate: data.previousDate || "",
          previousGold: data.previousGold || "",
          previousSilver: data.previousSilver || "",
          previousPlatinum: data.previousPlatinum || "",
          previousTemplate: data.previousTemplate|| "",
        });
        setLoading(false);
      })
      .catch((error) => {
        handleError(error.message);
        setLoading(false); 
      });
      
  }, []);

  useEffect(() => {

    setEditableRate(null);
  }, [date]);

  const handleEdit = (rate) => {
    setEditableRate((prevEditableRate) =>
      prevEditableRate === rate ? null : rate
    );
  };
  const handleInputChange = (e, setter) => {
    const { value } = e.target;

    const regex = /^[0-9]*(\.[0-9]{0,2})?$/;

    if (regex.test(value) || value === "") {
      setter(value);
    }
  };

  const createNewObjectWithoutValues = (obj) => {
   
    const keys = Object.keys(obj);

   
    const newObj = {};
    keys.forEach((key) => {
      newObj[key] = "";
    });

    return newObj;
  };

  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  };

  const getTemplate = (date, gold, silver, platinum) => {
    return `${date.toLocaleDateString("en-GB")} ${getDayOfWeek(
      date
    )}\nGold Rate: ${gold}\nSilver Rate: ${silver}\nPlatinum Rate: ${platinum}\nRam Thanga Nagai Maligai, Puducherry.\nGive a missed call 9361111623 to get the rate.`;
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const previousTemplate = getTemplate(
      date,
      previousData.gold,
      previousData.silver,
      previousData.platinum
    );

    let selectedDate = date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "/");

    let today = new Date().toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const postData = createNewObjectWithoutValues(previousData);

    postData.date = selectedDate;
    postData.gold = goldRate;
    postData.silver = silverRate;
    postData.platinum = platinumRate;
    postData.template = getTemplate(date, goldRate, silverRate, platinumRate);

    if (selectedDate === today && previousData.date === today) {
      postData.previousDate = previousData.previousDate;
      postData.previousGold = previousData.previousGold;
      postData.previousSilver = previousData.previousSilver;
      postData.previousPlatinum = previousData.previousPlatinum;
      postData.previousTemplate = getTemplate(new Date(previousData.previousDate), previousData.previousGold, previousData.previousSilver, previousData.previousPlatinum)
    } else {
      postData.previousDate =
        previousData.gold.length === 0 ? selectedDate : previousData.date;
      postData.previousGold =
        previousData.gold.length === 0 ? goldRate : previousData.gold;
      postData.previousSilver =
        previousData.gold.length === 0 ? silverRate : previousData.silver;
      postData.previousPlatinum =
        previousData.gold.length === 0 ? platinumRate : previousData.platinum;
      postData.previousTemplate =
        previousData.gold.length === 0
          ? getTemplate(date, goldRate, silverRate, platinumRate)
          : previousTemplate;
    }
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("Access token not found in localStorage");
      return;
    }

    setPreviousData({
      date: date.toLocaleDateString(),
      gold: goldRate,
      silver: silverRate,
      platinum: platinumRate,
      previousDate: previousData.previousDate,
      previousGold: previousData.previousGold,
      previousPlatinum: previousData.previousPlatinum,
      previousTemplate: previousData.previousTemplate
    });
    fetch(`${process.env.REACT_APP_BASE_URL}price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        handleSuccess();
        setGoldRate(data.gold || "");
        setSilverRate(data.silver || "");
        setPlatinumRate(data.platinum || "");
        setDate(new Date(data.date));
        setPreviousData({
          date: data.date || "",
          gold: data.gold || "",
          silver: data.silver || "",
          platinum: data.platinum || "",
          previousDate: data.previousDate || "",
          previousGold: data.previousGold || "",
          previousSilver: data.previousSilver || "",
          previousPlatinum: data.previousPlatinum || "",
          previousTemplate: data.previousTemplate | ""
        });
        setLoading(false);
      })
      .catch((error) =>{ 
        handleError(error.message);
        setLoading(false);
      });
  };

  const smsCharacterCount = getTemplate(
    date,
    goldRate,
    silverRate,
    platinumRate
  ).length;

  const handleDatePickerClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = (selectedDate) => {
    setGoldRate("");
    setSilverRate("");
    setPlatinumRate("");
    setDate(selectedDate);
    setShowDatePicker(false);
  };
  const handleCancel = () => {
    setGoldRate(previousData.gold || "");
    setSilverRate(previousData.silver || "");
    setPlatinumRate(previousData.platinum || "");
    setDate(new Date(previousData.date));
  };

  return (
    
    <div id="priceoutercont">
    <div id="rtmprice">RTM Gold Price Updates</div>
    {loading && (
      <div className="overlay">
        <div className="spinner"></div>
      </div>
    )}
   {showModal && <MessageModal type={messageType} message={message} onClose={closeModal} />}
    <div id="realtime">
      Stay informed with real-time rates of gold, silver, and platinum.
      Customize your SMS notifications for seamless updates.
    </div>
    
    <div id="smswhole">
      <div id="staydetail">
        <table>
          <tbody>
            <tr>
              <td className="icon-cell">
                <img src={data_icon} alt="Date Icon" className="dateicon" />
              </td>
              <td colSpan="2">
                <div className="date-container">
                  <span className="todaydate">Today's Date:</span>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3" onClick={handleDatePickerClick}>
                <div id="backgrddate">
                  <span className="date-value">
                    {date.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                  <img
                    src={calender_icon}
                    alt="Calender Icon"
                    className="calicon"
                    onClick={handleDatePickerClick}
                  />
                </div>
              </td>
            </tr>
            {showDatePicker && (
              <tr>
                <td colSpan="3" className="datepicker-cell">
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    inline={true}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    maxDate={new Date()}
                    onClickOutside={() => setShowDatePicker(false)}
                    onSelect={() => setShowDatePicker(false)}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td className="icon-cell1">
                <img src={goldicon} alt="Gold Icon" className="goldicon" />
              </td>
              <td colSpan="2">
                <div className="gold-container">
                  <span className="goldrate">Gold Rate</span>
                  <img
                    src={valueedit}
                    alt="Edit Icon"
                    className="editicon"
                    onClick={() => handleEdit("gold")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={editableRate === "gold" ? "editable" : ""}>
                {editableRate === "gold" ? (
                  <input
                    type="text"
                    id="goldRate"
                    value={goldRate}
                    onChange={(e) => handleInputChange(e, setGoldRate)}
                    className="gold-input"
                  />
                ) : (
                  <span
                    className="gold-value"
                    onClick={() => handleEdit("gold")}
                  >
                    <span className="rupees-symbol">&#8377;</span>{" "}
                    {goldRate}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="icon-cell2">
                <img src={silvericon} alt="Silver Icon" className="silvericon" />
              </td>
              <td colSpan="2">
                <div className="silver-container">
                  <span className="silverrate">Silver Rate</span>
                  <img
                    src={valueedit}
                    alt="Edit Icon"
                    className="editiconsilver"
                    onClick={() => handleEdit("silver")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={editableRate === "silver" ? "editable" : ""}>
                {editableRate === "silver" ? (
                  <input
                    type="text"
                    id="silverRate"
                    value={silverRate}
                    onChange={(e) => handleInputChange(e, setSilverRate)}
                    className="silver-input"
                  />
                ) : (
                  <span
                    className="silver-value"
                    onClick={() => handleEdit("silver")}
                  >
                    <span className="rupees-symbol">&#8377;</span>{" "}
                    {silverRate}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <td className="icon-cell3">
                <img src={platinumicon} alt="Platinum Icon" className="platinumicon" />
              </td>
              <td colSpan="2">
                <div className="platinum-container">
                  <span className="platinumrate">Platinum Rate</span>
                  <img
                    src={valueedit}
                    alt="Edit Icon"
                    className="editiconplatinum"
                    onClick={() => handleEdit("platinum")}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={editableRate === "platinum" ? "editable" : ""}>
                {editableRate === "platinum" ? (
                  <input
                    type="text"
                    id="platinumRate"
                    value={platinumRate}
                    onChange={(e) => handleInputChange(e, setPlatinumRate)}
                    className="platinum-input"
                  />
                ) : (
                  <span
                    className="platinum-value"
                    onClick={() => handleEdit("platinum")}
                  >
                    <span className="rupees-symbol">&#8377;</span>{" "}
                    {platinumRate}
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="smsraterow">
        <div id="yestcont">
          <div className="yestconttitle">Yesterday's Rate</div>
          <div id="table-container">
            <table className="tabular-column">
              <tbody>
                <tr>
                  <td>Date</td>
                  <td>
                    {previousData.previousDate !== ""
                      ? new Date(previousData.previousDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Gold</td>
                  <td>{previousData.previousGold}</td>
                </tr>
                <tr>
                  <td>Silver</td>
                  <td>{previousData.previousSilver}</td>
                </tr>
                <tr>
                  <td>Platinum</td>
                  <td>{previousData.previousPlatinum}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div id="smscont">
          <div id="smstem">SMS Template</div>
          <br />
          <div id="smsdetail">
            {date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            -{" "}
            {date.toLocaleDateString("en-IN", { weekday: "long" }).toUpperCase()}
            <br />
            GOLD RATE: {goldRate}
            <br />
            SILVER RATE: {silverRate}
            <br />
            PLATINUM RATE: {platinumRate}
            <div>Ram Thanga Nagai Maligai, Puducherry.</div>
            <div>Give a missed call 9361111623 to get the rate.</div>
          </div>
          <div id="allcount">
            <div id="chatcount">{smsCharacterCount}/160 characters</div>
            <div id="mescount">
              {smsCharacterCount <= 160
                ? "No of messages: 01"
                : `No of messages is ${Math.ceil(smsCharacterCount / 160)}`}
            </div>
          </div>
        </div>
        
          <React.Fragment>
            <button
              type="submit"
              onClick={handleSubmit}
              className="save-button"
            >
              Save
            </button>
            <button
              type="cancel"
              onClick={handleCancel}
              className="cancel-button"
            >
              Cancel
            </button>
          </React.Fragment>
          
      </div>
    </div>
  </div>
);
};

export default PriceUpdates;

