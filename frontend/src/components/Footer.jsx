import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">EasFarm</h2>
        <p className="footer-msg">
          At EasFarm,<br /> Farmers get a one-stop solution to compare prices of seeds, fertilizers,<br /> and machinery nearby and make smart choices with ease. More than a marketplace, easFarm is the new-age social platform where farmers connect, share,<br /> and grow together
          <br /><br />
        </p>
      </div>
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/message">Message for Farmers</a>
      </div>
      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedin />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} EasFarm. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
