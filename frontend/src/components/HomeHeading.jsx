import React from 'react';
import './HomeHeading.css';

const HomeHeading = () => {
  return (
    <div className="heading-container">
      <h1 className="home-heading">
        <span className="heading-gradient">Welcome to EasFarm</span>
      </h1>
      <div className="heading-underline"></div>
      <p className="heading-subtitle">Empowering farmers with tools, technology, and smart solutions</p>
    </div>
  );
};

export default HomeHeading;