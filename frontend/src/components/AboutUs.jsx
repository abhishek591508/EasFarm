import React from 'react';
import './AboutUs.css';
import Header from './Header';

const AboutUs = () => {
  return (
    <div>
        <Header/>
    <div className="about-us-container"> 
      <div className="about-hero">
        <h1>About easFarm</h1>
        <p>Bridging the gap between farmers and agricultural stakeholders</p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            After talking to more than a dozen farmers, we discovered a major problem: farmers often struggle to connect with nearby farmers, suppliers, manufacturers, and owners of tractors or harvesters.
            <br /><br />To solve this problem, we launched EasFarm, a platform that connects farmers with product and service providers. On EasFarm, farmers can: <br />
            <br /><br />
                <b>Find nearby machine owners, manufacturers, suppliers, and more..</b>
                <br /><b>Contact and bargain the products or services</b>
                <br /><b>Compare prices</b>
            
            <br /><br />The app will be completely <u>free for farmers</u> and <u>supported by ads only</u>, making it scalable to meet growing demand and benefit from technological advancements..
          </p>
        </section>

        <section className="what-we-do">
          <h2>What We Do</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Farmer Connections</h3>
              <p>Connect farmers with reliable suppliers for quality inputs and resources</p>
            </div>
            <div className="service-card">
              <h3>Manufacturer Network</h3>
              <p>Bridge manufacturers with farmers for direct equipment and tool access</p>
            </div>
            <div className="service-card">
              <h3>Machinery Sharing</h3>
              <p>Enable efficient machinery sharing and rental services for farmers</p>
            </div>
            <div className="service-card">
              <h3>Supply Chain</h3>
              <p>Streamline agricultural supply chains for better efficiency and transparency</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <h4>Sustainability</h4>
              <p>Promoting sustainable farming practices and resource management</p>
            </div>
            <div className="value-item">
              <h4>Innovation</h4>
              <p>Leveraging technology to transform traditional agricultural practices</p>
            </div>
            <div className="value-item">
              <h4>Community</h4>
              <p>Building strong, supportive agricultural communities</p>
            </div>
            <div className="value-item">
              <h4>Transparency</h4>
              <p>Ensuring fair and transparent transactions for all stakeholders</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get In Touch</h2>
          <p>Ready to join our agricultural network? Contact us today!</p>
          <div className="contact-info">
            <p>Email:- abhishekkumar591508@gmail.com & ujjwaldikshit1@gmail.com</p>
            <p>Phone:- 9696591508</p>
            <p>Address: 123 Farm Road, Agricultural District</p>
            <p>Site maintained by:- Abhishek Kumar & Ujjwal Dikshit</p>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default AboutUs;