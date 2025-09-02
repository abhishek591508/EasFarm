import React, { useState } from 'react';
import './OwnerLogin.css';

const OwnerRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    mobile: '',
    email: '',
    city: '',
    rate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted!");
  };

  return (
    <div className="owner-form-container">
      <h2>Owner Registration <br /><p style={{fontSize:"smaller", color:"#cc33ff"}}>Available soon...</p></h2>
      
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" placeholder='Comming soon...' name="name" value={formData.name} onChange={handleChange} required />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="seed">Seed Supplier</option>
          <option value="tractor">Tractor Owner</option>
          <option value="fertilizer">Fertilizer Manufacturer</option>
        </select>

        <label>Mobile:</label>
        <input type="tel" placeholder='Comming soon...' name="mobile" value={formData.mobile} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" placeholder='Comming soon...' name="email" value={formData.email} onChange={handleChange} required />

        <label>City:</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} required />

        <label>Rate:</label>
        <input type="number" name="rate" value={formData.rate} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default OwnerRegister;
