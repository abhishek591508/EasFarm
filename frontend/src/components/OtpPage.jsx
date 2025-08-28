import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OTPPage.css";
import { useAuth } from "../context/AuthContext";

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  // Handle input change for each OTP box
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input box
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle backspace to go back to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.trim() !== "" && otpValue.length === 6) {
      setIsLoggedIn(true);
      navigate("/"); // navigate if OTP entered
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button type="submit" className="submit-btn">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPPage;
