import React from 'react'
import './MainHome.css'

const MainHome = ({ user, onLogout }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="main-home">
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome, {user.fullName}!</h1>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="welcome-section">
          <div className="welcome-card">
            <h2>🎉 Account Verified Successfully!</h2>
            <p>Your email has been verified and your account is now active.</p>
          </div>
        </div>

        <div className="user-info-section">
          <h3>Your Profile Information</h3>
          
          <div className="info-grid">
            <div className="info-card">
              <h4>Personal Information</h4>
              <div className="info-row">
                <span className="label">Full Name:</span>
                <span className="value">{user.fullName}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Mobile Number:</span>
                <span className="value">{user.mobileNumber}</span>
              </div>
              {user.alternateMobile && (
                <div className="info-row">
                  <span className="label">Alternate Mobile:</span>
                  <span className="value">{user.alternateMobile}</span>
                </div>
              )}
              <div className="info-row">
                <span className="label">Role:</span>
                <span className="value role-badge">{user.role}</span>
              </div>
            </div>

            <div className="info-card">
              <h4>Address Information</h4>
              <div className="info-row">
                <span className="label">Village/City:</span>
                <span className="value">{user.villageOrCity}</span>
              </div>
              <div className="info-row">
                <span className="label">District:</span>
                <span className="value">{user.district}</span>
              </div>
              <div className="info-row">
                <span className="label">State:</span>
                <span className="value">{user.state}</span>
              </div>
              <div className="info-row">
                <span className="label">Pincode:</span>
                <span className="value">{user.pincode}</span>
              </div>
              {user.gpsLocation && (
                <div className="info-row">
                  <span className="label">GPS Location:</span>
                  <span className="value">{user.gpsLocation}</span>
                </div>
              )}
            </div>

            <div className="info-card">
              <h4>Account Details</h4>
              <div className="info-row">
                <span className="label">Account Created:</span>
                <span className="value">{formatDate(user.createdAt)}</span>
              </div>
              <div className="info-row">
                <span className="label">Email Verified:</span>
                <span className="value verified">✅ Yes</span>
              </div>
              <div className="info-row">
                <span className="label">Data Sharing:</span>
                <span className="value">{user.allowDataSharing ? '✅ Allowed' : '❌ Not Allowed'}</span>
              </div>
              <div className="info-row">
                <span className="label">Terms Accepted:</span>
                <span className="value verified">✅ Yes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-button">
              <span className="action-icon">👤</span>
              <span>Edit Profile</span>
            </button>
            <button className="action-button">
              <span className="action-icon">🔒</span>
              <span>Change Password</span>
            </button>
            <button className="action-button">
              <span className="action-icon">⚙️</span>
              <span>Account Settings</span>
            </button>
            <button className="action-button">
              <span className="action-icon">📧</span>
              <span>Email Preferences</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MainHome


