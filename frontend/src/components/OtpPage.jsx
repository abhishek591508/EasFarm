// File: src/pages/OTPPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtpPage.css";
import { useAuth } from "../context/AuthContext";

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { setIsLoggedIn } = useAuth();
  const location = useLocation();
  const emailId = location.state?.emailId;

  // Handle input change for each OTP box
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // keep as string

    if (otpValue.length === 6) {
      try {
        const resp = await fetch(`${import.meta.env.VITE_API_URL}/user/verifyotp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // important for cookie/session auth
          body: JSON.stringify({ otp: otpValue, emailId }),
        });

        const data = await resp.json();

        if (!data.success) {
          alert(data.message || "Wrong OTP!");
        } else {
          alert("OTP verified successfully!");
          setIsLoggedIn(true);
          navigate("/"); // navigate to home
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
        alert("Something went wrong. Please try again!");
      }
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <div className="otp-inputs">
          {otp.map((val, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={val}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button type="submit" className="submit-btn1">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTPPage;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./OTPPage.css";
// import { useAuth } from "../context/AuthContext";
// import { useLocation } from "react-router-dom";

// const OTPPage = () => {
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const {isLoggedIn, setIsLoggedIn} = useAuth();
//   const location = useLocation();
//   const emailId = location.state?.emailId;

//   // Handle input change for each OTP box
//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return; // allow only numbers

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Auto-focus next input box
//     if (element.value && element.nextSibling) {
//       element.nextSibling.focus();
//     }
//   };

//   // Handle backspace to go back to previous input
//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
//       e.target.previousSibling.focus();
//     }
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     let otpValue = otp.join(""); //now otpValue is a string
//     if (otpValue.trim() !== "" && otpValue.length === 6) {
//       otpValue = Number(otpValue);
//       console.log(otpValue)


//       try{
//         const resp = await fetch("http://localhost:5000/user/verifyotp",{
//           method:"POST",
//           headers:{"Content-Type":"application/json"},
//           body:JSON.stringify({otp:otpValue, emailId: emailId})
//         })
      
//         const data = await resp.json();
//           if(data.success === "failed"){
//             alert("wrong OTP!")
//           }else{
//             alert("Otp verified successfully!")
//             setIsLoggedIn(true);
//             navigate("/"); // navigate if OTP entered
//           }
//           }
//         catch(error){
//         console.error(error);
//         alert("something went wrong!!")
//       }



//       // setIsLoggedIn(true);
//       // navigate("/"); // navigate if OTP entered
//     } else {
//       alert("Please enter a valid 6-digit OTP");
//     }
//   };

//   return (
//     <div className="otp-container">
//       <h2>Enter OTP</h2>
//       <form onSubmit={handleSubmit} className="otp-form">
//         <div className="otp-inputs">
//           {otp.map((data, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={data}
//               onChange={(e) => handleChange(e.target, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//             />
//           ))}
//         </div>
//         <button type="submit" className="submit-btn1">Verify OTP</button>
//       </form>
//     </div>
//   );
// };

// export default OTPPage;
