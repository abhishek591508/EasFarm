import React from "react";
import "./ContactUs.css"; // Import the CSS file
import Header from "./Header";
import Footer from "./Footer";

export default function ContactUs() {
  return (
    <div>
       {/* Header Section */}
        <Header/>
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-text">
          This is the <span className="highlight">official page of EastFarm</span>, 
          where you can share all your queries, feedback, complaints, or any concerns you may have about our services, 
          products, and farmer networking programs.
        </p>

        <p className="contact-text">
          EastFarm, India’s trusted agriculture networking platform, is here to help farmers 
          connect and grow together. We aim to resolve your queries within <b>7 days</b>. 
          You can call on EastFarm’s official Contact No.{" "}
          <b>9696591508 / 9622209640</b>, available <b>24 x 7</b>.  
          If the phone is busy, it means we’re helping someone else. Kindly call back after a few minutes.  
        </p>

        <p className="contact-text">
          In case of any grievance, don’t hesitate to reach us at 
          <span className="highlight"> support@eastfarm.live</span>.
        </p>

        {/* Address Section */}
        <div className="contact-grid">
          <div>
            <h2 className="office-title">EastFarm</h2>
            <h3 className="office-subtitle">Green Valley Office</h3>
            <p className="office-address">
              Plot 45, Agri Tech Park, Sector 21<br />
              Lucknow, Uttar Pradesh 226010
            </p>

            <a 
              href="mailto:abhishekkumar591508@gmail.com" 
              className="contact-email"
            >
              support@eastfarm.live
            </a>

            <button className="direction-btn">
              ➤ Get Directions
            </button>
          </div>

          {/* Map */}
          <div className="map-container">
            <iframe
              title="EastFarm Office"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.056732942389!2d80.94616631504456!3d26.84669398315888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a0b2f0b8c3%3A0x9f2c7f65b07c5cb4!2sLucknow%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1706526400000!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
